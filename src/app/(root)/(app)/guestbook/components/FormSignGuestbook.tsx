'use client'

import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/utils/firebase'

const FormSignGuestbook = () => {
  const { isInitLoading, isAuthLoading, error, login, logout, user } = useAuth()
  const [value, setValue] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const message = value

    setFormError('')
    if (value.length == 0) return setFormError('Message Is Required.')

    try {
      const data = {
        userId: user?.uid,
        name: user?.displayName,
        createdAt: serverTimestamp(),
        message,
      }
      setValue('')
      await addDoc(collection(db, 'guestbook'), data)
    } catch (e: any) {
      setFormError(e.message)
      setValue(message)
    }
  }

  return (
    <>
      <p className="mb-3 text-sm font-light md:text-base">
        {isInitLoading && 'Loading...'}
        {!isInitLoading &&
          (!user ? (
            <>
              Welcome! Please sign in to leave a message.{' '}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-500"
                disabled={isAuthLoading}
                onClick={() => login('google.com')}
              >
                Sign In With Google
              </button>{' '}
              or{' '}
              <button
                type="button"
                className="text-blue-600 dark:text-blue-500"
                disabled={isAuthLoading}
                onClick={() => login('github.com')}
              >
                Sign In With Github
              </button>
            </>
          ) : (
            <>
              Signed In as <span className="font-semibold">{user?.displayName}</span>!{' '}
              <button type="button" className="text-red-600 dark:text-red-500" disabled={isAuthLoading} onClick={() => logout()}>
                Sign Out
              </button>
            </>
          ))}
      </p>

      {(error || formError) && (
        <div className="mb-3 border-l-4 border-red-500 bg-red-500/10 px-3 py-4 font-bold backdrop-blur-lg">{error || formError}</div>
      )}

      <form className="mb-3 flex gap-3" onSubmit={handleSubmit}>
        <div className="flex-1 backdrop-blur">
          <input
            type="text"
            name="message"
            maxLength={256}
            placeholder="Write your message here..."
            disabled={!user}
            className="block h-14 w-full border-black/10 bg-white text-sm text-black placeholder-black/60 opacity-60 focus:border-black/10 focus:border-b-black focus:opacity-100 focus:ring-0 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-white/60 dark:focus:border-b-white"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        <div className="backdrop-blur">
          <button
            type="submit"
            className="flex h-14 items-center gap-3 border border-black/10 bg-white px-3 font-bold uppercase opacity-75 dark:border-white/10 dark:bg-black hover:[&:not(:disabled)]:opacity-100"
            disabled={!user}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default FormSignGuestbook
