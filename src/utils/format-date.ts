import timeFromNow from './time-from-now'

export default function formatDate(date: string) {
  const datetime = new Date(date)

  const fullDate = datetime.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${timeFromNow(date)})`
}
