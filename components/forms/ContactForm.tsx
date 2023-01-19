import React, { memo } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const ContactForm = ({ formspreeKey }: { formspreeKey: string }) => {
  const [state, handleSubmit] = useForm(formspreeKey)
  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      {state.succeeded && <div className="alert-success">Email successfully sent!</div>}
      {state.errors[0] && state.errors[0].code === 'EMPTY' && <div className="alert-error">{state.errors[0].message}</div>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input type="text" required name="name" id="name" placeholder="Your Name" className="input h-14 w-full" />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div>
          <input type="text" required name="email" id="email" placeholder="Your Email" className="input h-14 w-full" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div>
        <input type="text" required name="subject" id="subject" placeholder="Subject" className="input h-14 w-full" />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} />
      </div>
      <div>
        <textarea name="message" required minLength={10} id="message" rows={5} placeholder="Message" className="input w-full" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <div>
        <button
          disabled={state.submitting}
          className=" mx-auto block h-14 w-1/2 bg-white font-bold opacity-75 hover:opacity-100 dark:bg-black"
        >
          SEND MESSAGE
        </button>
      </div>
    </form>
  )
}

export default memo(ContactForm)
