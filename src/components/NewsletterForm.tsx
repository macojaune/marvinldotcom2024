import { useState, type FormEvent } from "react"

interface Props {
  emphasized?: boolean
}

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
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email === "" || !isAgree) {
      return
    }
    try {
      const formData = new FormData(e.target as HTMLFormElement)

      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
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

              <button type='submit' value='submit' className={styles.button}>
                S&apos;inscrire
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
