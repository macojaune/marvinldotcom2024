export const prerender = false // Pas nécessaire en mode `server`
import type { APIRoute } from "astro"

interface TurnstileVerification {
  success: boolean
  action?: string
  "error-codes"?: string[]
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const email = data.get("email")
  const hasConsent = data.get("agreement") === "on"
  const turnstileToken = data.get("turnstileToken")

  if (typeof email !== "string" || email.trim() === "") {
    return new Response(
      JSON.stringify({
        message: "Recevoir la newsletter sans ton e-mail, c'est compliqué!"
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const normalizedEmail = email.trim().toLowerCase()

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return new Response(
      JSON.stringify({ message: "Entre une adresse e-mail valide." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  if (!hasConsent) {
    return new Response(
      JSON.stringify({
        message: "Il faut accepter de recevoir les prochains e-mails."
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  if (typeof turnstileToken !== "string" || turnstileToken === "") {
    return new Response(
      JSON.stringify({
        message: "Confirme la vérification anti-spam avant de t'inscrire."
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  if (!import.meta.env.TURNSTILE_SECRET_KEY) {
    console.error("Turnstile newsletter configuration is incomplete")
    return new Response(
      JSON.stringify({
        success: false,
        message: "L'inscription est indisponible pour le moment."
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    const verificationBody = new URLSearchParams({
      secret: import.meta.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken
    })
    const visitorIp = request.headers.get("CF-Connecting-IP")

    if (visitorIp) {
      verificationBody.set("remoteip", visitorIp)
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verificationBody,
        signal: AbortSignal.timeout(5_000)
      }
    )

    if (!verificationResponse.ok) {
      console.error("Turnstile verification service failed", {
        status: verificationResponse.status
      })
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "La vérification anti-spam est indisponible. Réessaie plus tard."
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      )
    }

    const verification = (await verificationResponse
      .json()
      .catch(() => null)) as TurnstileVerification | null

    if (
      !verification?.success ||
      (verification.action !== undefined &&
        verification.action !== "newsletter")
    ) {
      console.warn("Turnstile newsletter verification failed", {
        codes: verification?.["error-codes"]
      })
      return new Response(
        JSON.stringify({
          success: false,
          message: "La vérification anti-spam a échoué. Réessaie."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }
  } catch (error) {
    console.error("Turnstile newsletter verification failed", error)
    return new Response(
      JSON.stringify({
        success: false,
        message:
          "La vérification anti-spam est indisponible. Réessaie plus tard."
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    )
  }

  const listId = Number(import.meta.env.BREVO_CONTACT_LIST_ID)

  if (!import.meta.env.BREVO_API_KEY || !Number.isInteger(listId)) {
    console.error("Brevo newsletter configuration is incomplete")
    return new Response(
      JSON.stringify({
        success: false,
        message: "L'inscription est indisponible pour le moment."
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": import.meta.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: normalizedEmail,
        listIds: [listId],
        updateEnabled: true
      })
    })

    if (!response.ok) {
      const error = (await response.json().catch(() => null)) as {
        code?: string
      } | null
      console.error("Brevo newsletter request failed", {
        status: response.status,
        code: error?.code
      })

      return new Response(
        JSON.stringify({
          success: false,
          message: "L'inscription n'a pas abouti. Réessaie dans un moment."
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Brevo newsletter request failed", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: "L'inscription n'a pas abouti. Réessaie dans un moment."
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    )
  }
}
