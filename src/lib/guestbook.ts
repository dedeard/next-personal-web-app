import { IGuestbookMessage } from '@/types'
import { db } from '@/utils/firebase'
import { Timestamp, collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

const GUESTBOOK_COLLECTION = 'guestbook'
const GUESTBOOK_LIMIT = 100

export interface GuestbookMessageDTO {
  _id: string
  name: string
  message: string
  userId?: string
  createdAt: { seconds: number; nanoseconds: number } | null
}

export function guestbookQuery() {
  return query(collection(db, GUESTBOOK_COLLECTION), orderBy('createdAt', 'desc'), limit(GUESTBOOK_LIMIT))
}

function toDTO(id: string, data: Record<string, unknown>): GuestbookMessageDTO {
  const createdAt = data.createdAt as Timestamp | undefined
  return {
    _id: id,
    name: String(data.name ?? ''),
    message: String(data.message ?? ''),
    userId: data.userId ? String(data.userId) : undefined,
    createdAt: createdAt ? { seconds: createdAt.seconds, nanoseconds: createdAt.nanoseconds } : null,
  }
}

export function dtoToMessage(dto: GuestbookMessageDTO): IGuestbookMessage {
  return {
    _id: dto._id,
    name: dto.name,
    message: dto.message,
    userId: dto.userId,
    createdAt: dto.createdAt ? new Timestamp(dto.createdAt.seconds, dto.createdAt.nanoseconds) : undefined,
  }
}

export async function loadMessages(): Promise<GuestbookMessageDTO[]> {
  try {
    const snapshot = await getDocs(guestbookQuery())
    return snapshot.docs.map((doc) => toDTO(doc.id, doc.data()))
  } catch {
    return []
  }
}
