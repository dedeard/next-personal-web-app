'use client'

import React, { useState, useEffect } from 'react'
import { Timestamp, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { IGuestbookMessage } from '@/types'

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return formatter.format(date).replace(/\//g, '-')
}

const GuestbookMessages: React.FC<{ initialMessages: string }> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<IGuestbookMessage[]>(() => {
    return JSON.parse(initialMessages).map((el: IGuestbookMessage) => ({
      ...el,
      createdAt: el.createdAt && new Timestamp(el.createdAt.seconds, el.createdAt.nanoseconds),
    }))
  })

  useEffect(() => {
    const colRef = collection(db, 'guestbook')
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(100))

    const unsub = onSnapshot(q, (querySnapshot) => {
      const messages: IGuestbookMessage[] = []
      querySnapshot.forEach((doc) => {
        messages.push({ _id: doc.id, ...doc.data() } as IGuestbookMessage)
      })
      setMessages(messages)
    })

    return () => unsub()
  }, [])

  return (
    <div className="border border-black/5 bg-white/30 backdrop-blur dark:border-white/5 dark:bg-black/30">
      <div className="divide-y">
        {messages.map((message) => (
          <p
            key={message._id}
            className="flex flex-col items-start gap-x-3 gap-y-1 border-black/5 p-3 text-xs dark:border-white/5 md:!text-sm lg:flex-row lg:py-2"
          >
            <span className="flex w-full shrink-0 items-center justify-between gap-x-2 truncate opacity-75 lg:w-36">
              {message.name.substring(0, 20)}
              <span className="flex shrink-0 items-center justify-center gap-x-2 text-xs opacity-75 lg:hidden">
                {formatDate(message.createdAt?.toDate() || new Date())}
              </span>
            </span>
            <span className="hidden lg:block">:</span>
            <span className="flex-1 whitespace-pre-line">{message.message}</span>
            <span className="hidden shrink-0 items-center justify-center gap-x-2 text-xs opacity-75 lg:flex">
              {formatDate(message.createdAt?.toDate() || new Date())}
            </span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default GuestbookMessages
