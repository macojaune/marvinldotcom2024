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
    <div className='mb-4 mt-12 w-full'>
      <h2 className='my-2 w-fit px-2 text-2xl font-bold text-l/primary dark:bg-d/secondary dark:text-d/primary'>
        Abonne-toi à ma Newsletter
      </h2>
      <p className='mb-8 text-l/primary dark:text-d/primary'>
        Sois informé de l'évolution des projets au fur et à mesure (promis, je
        ne spam pas)
      </p>
      {!success ? (
        <form
          onSubmit={handleSubmit}
          className='mx-auto flex flex-col gap-4 lg:w-1/2'
        >
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='E-mail'
            className='px-4 py-3 dark:bg-d/secondary dark:text-d/primary dark:placeholder:text-d/primary/80'
          />

          <div className='flex'>
            <input
              type='checkbox'
              className='mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-l/secondary disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-d/secondary dark:checked:bg-d/secondary dark:focus:ring-offset-gray-800'
              id='agreement'
              name='agreement'
              checked={isAgree}
              onChange={(e) => setAgree(e.currentTarget.checked)}
              required
            />
            <label
              htmlFor='agreement'
              className='ms-3 text-sm text-l/primary dark:text-d/primary'
            >
              J'accepte de recevoir des emails, avec la possibilité de me
              désabonner à tout moment.
            </label>
          </div>
          <button
            type='submit'
            value='submit'
            className='my-4 w-full self-end border px-4 py-2 dark:border-d/primary dark:text-d/primary dark:hover:border-d/tertiary dark:hover:bg-d/tertiary lg:w-fit'
          >
            Ok
          </button>
        </form>
      ) : (
        <div className='flex justify-center'>
          <p className='w-fit bg-l/secondary p-3 text-center text-lg text-l/bg dark:bg-d/secondary dark:text-d/primary'>
            Merci pour ton inscription, tu recevras bientôt un e-mail de
            confirmation.
          </p>
        </div>
      )}
    </div>
  )
}
