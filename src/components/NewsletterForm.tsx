import { useState, type FormEvent } from "react"

export function NewsletterForm() {
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

  return (
    <section className='mb-6 mt-16 w-full py-8'>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start'>
        <div className='space-y-4'>
          <p className='font-mono text-[0.68rem] uppercase tracking-[0.3em] text-l/tertiary dark:text-d/accent'>
            Newsletter
          </p>
          <div className='space-y-3'>
            <h2 className='font-display text-5xl leading-[0.9] tracking-[-0.04em] text-l/primary dark:text-d/primary md:text-7xl xl:text-[5.8rem]'>
              Suivre sans bruit.
            </h2>
            <p className='max-w-xl text-base leading-8 text-l/secondary dark:text-d/muted md:text-xl'>
              J&apos;envoie rarement des mails. C&apos;est surtout le meilleur
              moyen de suivre les sorties, les évolutions importantes et les
              projets qui mériteront un vrai lancement.
            </p>
          </div>
        </div>

        <div className='pt-2'>
          {!success ? (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <label className='space-y-2'>
                <span className='font-mono text-[0.68rem] uppercase tracking-[0.24em] text-l/secondary dark:text-d/subtle'>
                  E-mail
                </span>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder='toi@exemple.com'
                  className='placeholder:text-l/secondary/58 w-full border-b border-l/primary/20 bg-transparent px-0 py-3 text-base text-l/primary outline-none transition focus:border-l/tertiary dark:border-d/tertiary dark:text-d/primary dark:placeholder:text-d/subtle dark:focus:border-d/accent'
                  required
                />
              </label>

              <label className='flex items-start gap-3 text-sm leading-6 text-l/secondary dark:text-d/muted'>
                <input
                  type='checkbox'
                  className='mt-1 h-4 w-4 shrink-0 rounded border-l/primary/20 text-l/tertiary focus:ring-l/tertiary/20 dark:border-d/tertiary dark:bg-d/bg dark:text-d/accent'
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

              <button
                type='submit'
                value='submit'
                className='inline-flex w-fit items-center gap-3 pt-4 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-l/primary transition hover:text-l/tertiary focus-visible:text-l/tertiary dark:text-d/primary dark:hover:text-d/tertiary dark:focus-visible:text-d/tertiary'
              >
                S&apos;inscrire
                <span aria-hidden='true'>→</span>
              </button>
            </form>
          ) : (
            <div>
              <p className='font-mono text-[0.68rem] uppercase tracking-[0.3em] text-l/tertiary dark:text-d/tertiary'>
                Inscription prise
              </p>
              <p className='mt-3 text-base leading-8 text-l/primary dark:text-d/primary'>
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
