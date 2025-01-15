import { useState, type FormEvent } from "react"
import mailjet from 'node-mailjet'

export function NewsletterForm() {
    const [email,setEmail]=useState("")
    const [isAgree, setAgree] = useState(false)
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
        try {
            const res = await mailjet.apiConnect(import.meta.env.MJ_PUBLIC_KEY, import.meta.env.MJ_SECRET_KEY).post("contact", { version: 'v3' }).request({ IsExcludedFromCampaigns: isAgree, Email: email })
            console.log(res)

        //
        } catch (e) {
            console.error(e)
        }
    }
    return <div className="my-4">
            <h2 className="my-2 w-fit px-2 text-2xl font-bold text-l/primary dark:bg-d/secondary dark:text-d/primary">Abonne-toi à ma Newsletter</h2>
        <p className="dark:text-d/primary text-l/primary mb-8">Sois informé de l'évolution des projets au fur et à mesure (promis, je ne spam pas)</p>
        <form method="POST" onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4 mx-auto">
            <input type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="E-mail" className="px-4 py-3 dark:bg-d/secondary dark:text-d/primary dark:placeholder:text-d/primary/80" />
            <label className="text-l/primary dark:text-d/primary text-base"><input type="checkbox" name="agreement" checked={isAgree} onChange={e=>setAgree(e.currentTarget.value)} className="w-4 h-4"/> J'accepte de recevoir des emails, avec la possibilité de me désabonner à tout moment.</label>
            <button type="submit" value="submit" className="px-4 py-2 my-4 w-fit self-end border dark:border-d/primary dark:text-d/primary dark:hover:bg-d/tertiary dark:hover:border-d/tertiary">Ok</button>
        </form>
    </div>
}