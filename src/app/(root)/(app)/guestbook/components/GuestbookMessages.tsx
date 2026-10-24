'use client'

import { useAuthIsAdmin } from '@/contexts/AuthContext'
import { dtoToMessage, guestbookQuery, type GuestbookMessageDTO } from '@/lib/guestbook'
import { IGuestbookMessage } from '@/types'
import { db } from '@/utils/firebase'
import { formatDateTime } from '@/utils/format-date'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const GuestbookMessages: React.FC<{ initialMessages: GuestbookMessageDTO[] }> = ({ initialMessages }) => {
  const isAdmin = useAuthIsAdmin()

  const [messages, setMessages] = useState<IGuestbookMessage[]>(() => initialMessages.map(dtoToMessage))

  useEffect(() => {
    const unsub = onSnapshot(guestbookQuery(), (querySnapshot) => {
      const messages: IGuestbookMessage[] = []
      querySnapshot.forEach((doc) => {
        messages.push({ _id: doc.id, ...doc.data() } as IGuestbookMessage)
      })
      setMessages(messages)
    })

    return () => unsub()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure want to delete this message?')) {
      await deleteDoc(doc(db, 'guestbook', id))
    }
  }

  return (
    <div className="border border-black/5 bg-white/30 backdrop-blur-sm dark:border-white/5 dark:bg-black/30">
      <div className="divide-y">
        {messages.map((message, index) => (
          <p
            key={message._id}
            style={{ animationDelay: `${0.2 + Math.min(index, 15) * 0.04}s` }}
            className="animate-fade-in-up flex flex-col items-start gap-x-3 gap-y-1 border-black/5 p-3 text-xs dark:border-white/5 md:text-sm! lg:flex-row lg:py-2"
          >
            <span className="flex w-full shrink-0 items-center justify-between gap-x-2 truncate opacity-75 lg:w-36">
              {message.name.substring(0, 20)}
              <span className="flex shrink-0 items-center justify-center gap-x-2 text-xs opacity-75 lg:hidden">
                {formatDateTime(message.createdAt?.toDate() || new Date())}
              </span>
            </span>
            <span className="hidden lg:block">:</span>
            <span className="flex-1 whitespace-pre-line">{message.message}</span>
            <span className="hidden shrink-0 items-center justify-center gap-x-2 text-xs opacity-75 lg:flex">
              {formatDateTime(message.createdAt?.toDate() || new Date())}
            </span>
            {isAdmin && (
              <button
                className="mt-3 flex shrink-0 items-center justify-center gap-x-2 text-xs text-red-600 opacity-75 lg:mt-0"
                onClick={() => handleDelete(message._id)}
              >
                DELETE
              </button>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}

export default GuestbookMessages
