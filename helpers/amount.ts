export function formatAmount(amount: number) {
  if (!amount || Number.isNaN(amount)) {
    return 'R$ 0,00'
  }

  const formattedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedAmount
}
