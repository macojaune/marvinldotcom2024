import { useEffect, useRef, useState, type FormEvent } from "react"

interface Props {
  emphasized?: boolean
}

interface TurnstileOptions {
  sitekey: string
  action: string
  appearance: "interaction-only"
  size: "flexible"
  theme: "auto" | "dark"
  callback: (token: string) => void
  "expired-callback": () => void
  "error-callback": () => void
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
const turnstileScriptId = "cloudflare-turnstile-script"

const defaultStyles = {
  section: "mb-6 mt-16 w-full py-8",
  heading:
    "font-display text-5xl leading-[0.9] tracking-[-0.04em] text-l/primary dark:text-d/primary md:text-7xl xl:text-[5.8rem]",
  body: "max-w-xl text-base leading-8 text-l/secondary dark:text-d/muted md:text-xl",
  label:
    "font-mono text-[0.68rem] uppercase tracking-[0.24em] text-l/secondary dark:text-d/subtle",
  input:
    "placeholder:text-l/secondary/58 w-full border-b border-l/primary/20 bg-transparent px-0 py-3 text-base text-l/primary outline-none transition focus:border-l/tertiary dark:border-d/tertiary dark:text-d/primary dark:placeholder:text-d/subtle dark:focus:border-d/accent",
  agreement:
    "flex items-start gap-3 text-sm leading-6 text-l/secondary dark:text-d/muted",
  checkbox:
    "mt-1 h-4 w-4 shrink-0 rounded border-l/primary/20 text-l/tertiary focus:ring-l/tertiary/20 dark:border-d/tertiary dark:bg-d/bg dark:text-d/accent",
  button:
    "inline-flex w-fit items-center gap-3 pt-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-l/primary transition hover:text-l/tertiary focus-visible:text-l/tertiary dark:text-d/primary dark:hover:text-d/tertiary dark:focus-visible:text-d/tertiary",
  successLabel:
    "font-mono text-[0.68rem] uppercase tracking-[0.3em] text-l/tertiary dark:text-d/tertiary",
  successBody: "mt-3 text-base leading-8 text-l/primary dark:text-d/primary"
}

const emphasizedStyles = {
  section:
    "relative -mx-5 mb-6 mt-16 w-[calc(100%+2.5rem)] overflow-hidden bg-[#2a0d3e] px-5 py-10 md:-mx-8 md:w-[calc(100%+4rem)] md:px-8 lg:mx-0 lg:w-full lg:rounded-2xl lg:px-12 lg:py-12",
  heading:
    "font-display text-5xl leading-[0.9] tracking-[-0.04em] text-[#fff4cf] md:text-7xl xl:text-[5.8rem]",
  body: "max-w-xl text-base leading-8 text-[#dfc59a] md:text-xl",
  label: "font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#f3bf86]",
  input:
    "w-full border-b border-[#f3bf86]/55 bg-transparent px-0 py-3 text-base text-[#fff4cf] outline-none transition placeholder:text-[#dfc59a]/70 focus:border-[#df5e37]",
  agreement: "flex items-start gap-3 text-sm leading-6 text-[#dfc59a]",
  checkbox:
    "mt-1 h-4 w-4 shrink-0 rounded border-[#f3bf86]/55 bg-transparent text-[#df5e37] focus:ring-[#df5e37]/30",
  button:
    "mt-2 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#df5e37] px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#fff4cf] outline-none transition-colors hover:bg-[#ed704d] focus-visible:ring-2 focus-visible:ring-[#fff4cf] focus-visible:ring-offset-4 focus-visible:ring-offset-[#2a0d3e]",
  successLabel:
    "font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#f3bf86]",
  successBody: "mt-3 text-base leading-8 text-[#fff4cf]"
}

export function NewsletterForm({ emphasized = false }: Props) {
  const [email, setEmail] = useState("")
  const [isAgree, setAgree] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaError, setCaptchaError] = useState("")
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const captchaContainer = useRef<HTMLDivElement>(null)
  const captchaWidgetId = useRef<string | null>(null)

  useEffect(() => {
    let isDisposed = false
    let script: HTMLScriptElement | null = null

    const handleScriptError = () => {
      if (!isDisposed) {
        setCaptchaError("La vérification anti-spam n'a pas pu charger.")
      }
    }

    const renderCaptcha = () => {
      if (
        isDisposed ||
        !captchaContainer.current ||
        !window.turnstile ||
        captchaWidgetId.current
      ) {
        return
      }

      captchaWidgetId.current = window.turnstile.render(
        captchaContainer.current,
        {
          sitekey: turnstileSiteKey,
          action: "newsletter",
          appearance: "interaction-only",
          size: "flexible",
          theme: emphasized ? "dark" : "auto",
          callback: (token) => {
            setCaptchaToken(token)
            setCaptchaError("")
          },
          "expired-callback": () => {
            setCaptchaToken("")
            setCaptchaError("La vérification a expiré. Réessaie.")
          },
          "error-callback": () => {
            setCaptchaToken("")
            setCaptchaError("La vérification anti-spam n'a pas pu charger.")
          }
        }
      )
    }

    if (window.turnstile) {
      renderCaptcha()
    } else {
      script = document.getElementById(
        turnstileScriptId
      ) as HTMLScriptElement | null

      if (!script) {
        script = document.createElement("script")
        script.id = turnstileScriptId
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }

      script.addEventListener("load", renderCaptcha)
      script.addEventListener("error", handleScriptError)
    }

    return () => {
      isDisposed = true
      script?.removeEventListener("load", renderCaptcha)
      script?.removeEventListener("error", handleScriptError)
      if (captchaWidgetId.current && window.turnstile) {
        window.turnstile.remove(captchaWidgetId.current)
        captchaWidgetId.current = null
      }
    }
  }, [emphasized])

  const resetCaptcha = () => {
    setCaptchaToken("")
    if (captchaWidgetId.current && window.turnstile) {
      window.turnstile.reset(captchaWidgetId.current)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    if (email === "" || !isAgree || !captchaToken || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData
      })
      const data = (await response.json().catch(() => null)) as {
        success?: boolean
        message?: string
      } | null

      if (response.ok && data?.success) {
        setSuccess(true)
        return
      }

      setFormError(
        data?.message ??
          "L'inscription n'a pas abouti. Réessaie dans un moment."
      )
      resetCaptcha()
    } catch (error) {
      console.error("Newsletter signup failed", error)
      setFormError("Connexion impossible. Vérifie ta connexion puis réessaie.")
      resetCaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }

  const styles = emphasized ? emphasizedStyles : defaultStyles

  return (
    <section aria-labelledby='newsletter-title' className={styles.section}>
      {emphasized && (
        <div
          aria-hidden='true'
          className='absolute right-0 top-0 h-px w-1/2 bg-[#df5e37]'
        />
      )}
      <div className='relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start'>
        <div className='space-y-3'>
          <h2 id='newsletter-title' className={styles.heading}>
            Les prochains projets arrivent par e-mail.
          </h2>
          <p className={styles.body}>
            Nouveaux produits, relances et concepts : j&apos;en parle ici en
            premier.
          </p>
        </div>

        <div className='pt-2'>
          {!success ? (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <label className='space-y-2'>
                <span className={styles.label}>E-mail</span>
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  inputMode='email'
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder='toi@exemple.com'
                  className={styles.input}
                  required
                />
              </label>

              <label className={styles.agreement}>
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  id='agreement'
                  name='agreement'
                  checked={isAgree}
                  onChange={(e) => setAgree(e.currentTarget.checked)}
                  required
                />
                <span>
                  J&apos;accepte de recevoir des e-mails occasionnels, avec
                  désabonnement possible à tout moment.
                </span>
              </label>

              <input type='hidden' name='turnstileToken' value={captchaToken} />
              <div>
                <div ref={captchaContainer} />
                {captchaError && (
                  <p className='mt-2 text-sm text-[#df5e37]' role='alert'>
                    {captchaError}
                  </p>
                )}
              </div>

              {formError && (
                <p
                  className='text-sm leading-6 text-[#df5e37]'
                  role='alert'
                  aria-live='polite'
                >
                  {formError}
                </p>
              )}

              <button
                type='submit'
                value='submit'
                className={`${styles.button} disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={!captchaToken || isSubmitting}
              >
                {isSubmitting ? "Inscription..." : "S'inscrire"}
                <span aria-hidden='true'>→</span>
              </button>
            </form>
          ) : (
            <div>
              <p className={styles.successLabel}>Inscription prise</p>
              <p className={styles.successBody}>
                Merci pour ton inscription. Tu recevras bientôt un e-mail de
                confirmation.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
