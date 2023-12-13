'use client'
import { memo } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const ContactForm: React.FC<{ formspreeKey: string }> = ({ formspreeKey }) => {
  const [state, handleSubmit] = useForm(formspreeKey)
  const formErrors = state.errors?.getFormErrors()

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      {state.succeeded && (
        <div className="border-l-4 border-green-500 bg-green-500/10 px-3 py-5 text-lg font-bold backdrop-blur-lg">
          Email successfully sent!
        </div>
      )}
      {formErrors?.[0]?.message && (
        <div className="border-l-4 border-red-500 bg-red-500/10 px-3 py-5 text-lg font-bold backdrop-blur-lg">{formErrors[0].message}</div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="backdrop-blur-lg">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="block h-14 w-full border-black/10 bg-white text-sm text-black placeholder-black/60 opacity-60 focus:border-black/10 focus:border-b-black focus:opacity-100 focus:ring-0 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-white/60 dark:focus:border-b-white"
            />
          </div>
          <ValidationError prefix="Name" field="name" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
        </div>
        <div>
          <div className="backdrop-blur-lg">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your Email"
              className="block h-14 w-full border-black/10 bg-white text-sm text-black placeholder-black/60 opacity-60 focus:border-black/10 focus:border-b-black focus:opacity-100 focus:ring-0 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-white/60 dark:focus:border-b-white"
            />
          </div>
          <ValidationError prefix="Email" field="email" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
        </div>
      </div>
      <div>
        <div className="backdrop-blur-lg">
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="block h-14 w-full border-black/10 bg-white text-sm text-black placeholder-black/60 opacity-60 focus:border-black/10 focus:border-b-black focus:opacity-100 focus:ring-0 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-white/60 dark:focus:border-b-white"
          />
        </div>
        <ValidationError prefix="Subject" field="subject" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
      </div>
      <div>
        <div className="backdrop-blur-lg">
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Message"
            className="block w-full border-black/10 bg-white text-sm text-black placeholder-black/60 opacity-60 focus:border-black/10 focus:border-b-black focus:opacity-100 focus:ring-0 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-white/60 dark:focus:border-b-white"
          />
        </div>
        <ValidationError prefix="Message" field="message" errors={state.errors} className="pt-1 text-xs leading-none text-red-600" />
      </div>
      <div className="mx-auto h-14 w-1/2 backdrop-blur-lg">
        <button
          disabled={state.submitting}
          className=" mx-auto block h-full w-full bg-white font-bold opacity-75 hover:opacity-100 dark:bg-black"
        >
          SEND MESSAGE
        </button>
      </div>
    </form>
  )
}

export default memo(ContactForm)
