'use client'
import { useForm, ValidationError } from '@formspree/react'
import { memo } from 'react'
import { FiSend } from 'react-icons/fi'

const fieldClass =
  'block w-full border border-black/10 bg-white/50 px-4 text-sm text-black placeholder-black/40 backdrop-blur-sm transition-colors focus:border-black focus:outline-none focus:ring-0 dark:border-white/15 dark:bg-black/50 dark:text-white dark:placeholder-white/40 dark:focus:border-white'

const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50'

const ContactForm: React.FC<{ formspreeKey: string }> = ({ formspreeKey }) => {
  const [state, handleSubmit] = useForm(formspreeKey)
  const formErrors = state.errors?.getFormErrors()

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
      {state.succeeded && (
        <div className="border-l-4 border-green-500 bg-green-500/10 px-4 py-4 font-bold backdrop-blur-lg">
          Thanks — your message has been sent!
        </div>
      )}
      {formErrors?.[0]?.message && (
        <div className="border-l-4 border-red-500 bg-red-500/10 px-4 py-4 font-bold backdrop-blur-lg">{formErrors[0].message}</div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input required type="text" name="name" id="name" placeholder="Your name" className={`h-13 ${fieldClass}`} />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input required type="email" name="email" id="email" placeholder="you@example.com" className={`h-13 ${fieldClass}`} />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input required type="text" name="subject" id="subject" placeholder="What is this about?" className={`h-13 ${fieldClass}`} />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          required
          name="message"
          id="message"
          rows={6}
          placeholder="Tell me a little about your project or idea…"
          className={`resize-none py-3 ${fieldClass}`}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
      </div>

      <div className="flex items-center gap-4">
        <button
          disabled={state.submitting}
          className="cursor-target group inline-flex h-13 items-center justify-center gap-2 bg-black px-8 font-bold text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80"
        >
          {state.submitting ? 'Sending…' : 'Send message'}
          <FiSend size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
        <span className="text-xs text-black/40 dark:text-white/40">I usually reply within a day.</span>
      </div>
    </form>
  )
}

export default memo(ContactForm)
