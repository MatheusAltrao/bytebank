export function formatAmount(amount: number) {
  if (!amount || Number.isNaN(amount)) {
    return 'Valor inválido'
  }

  const formattedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedAmount
}
