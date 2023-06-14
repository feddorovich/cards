export const formatDate = (date: string): string => {
  const serverDate = new Date(date)
  const day = serverDate.getDate().toString().padStart(2, "0")
  const month = (serverDate.getMonth() + 1).toString().padStart(2, "0")
  const year = serverDate.getFullYear()
  const formattedDate = `${day}.${month}.${year}`

  return formattedDate
}
