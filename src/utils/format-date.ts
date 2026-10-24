import timeFromNow from './time-from-now'

export default function formatDate(date: string) {
  const datetime = new Date(date)

  const fullDate = datetime.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${timeFromNow(date)})`
}

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

export function formatDateTime(date: Date) {
  return dateTimeFormatter.format(date).replace(/\//g, '-')
}
