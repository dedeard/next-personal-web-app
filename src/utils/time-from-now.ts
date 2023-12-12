export default function timeFromNow(value: string | number | Date) {
  const currentDate = new Date()
  const targetDate = new Date(value)

  const timeDifference = currentDate.getTime() - targetDate.getTime()
  const secondsAgo = Math.floor(timeDifference / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)
  const monthsAgo = Math.floor(daysAgo / 30.44)
  const yearsAgo = Math.floor(daysAgo / 365.25)

  if (yearsAgo > 0) {
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`
  } else if (monthsAgo > 0) {
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
  } else if (secondsAgo > 0) {
    return `${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}
