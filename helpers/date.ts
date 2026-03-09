export function formatDate(date: Date) {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    return 'Data inválida'
  }

  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return formattedDate
}
