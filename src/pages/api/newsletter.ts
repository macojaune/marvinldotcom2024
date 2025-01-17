export const prerender = false // Pas nécessaire en mode `server`
import type { APIRoute } from "astro"
import mailjet from "node-mailjet"

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const email = data.get("email")
  const isAgree = data.get("agreement") ?? false

  // Valider les données - vous voudrez probablement faire plus que cela
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Recevoir la newsletter sans ton e-mail, c'est compliqué!"
      }),
      { status: 400 }
    )
  }
  try {
    await mailjet
      .apiConnect(import.meta.env.MJ_PUBLIC_KEY, import.meta.env.MJ_SECRET_KEY)
      .post("contactslist", { version: "v3" })
      .id(import.meta.env.MJ_LIST_ID)
      .action("managecontact")
      .request({
        Properties: "object",
        Action: "addnoforce",
        Email: email
      })

    return new Response(
      JSON.stringify({
        success: true
      }),
      { status: 200 }
    )
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message
      }),
      { status: 500 }
    )
  }
}
