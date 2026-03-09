import z from 'zod'

export const transactionSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  tipo: z.enum(['deposito', 'retirada'], {
    message: 'Selecione o tipo da transação',
  }),
  data: z.date({
    message: 'Selecione a data da transação',
  }),
  valor: z
    .string()
    .min(1, 'Informe o valor da transação')
    .refine(
      (val) => {
        const num = Number(val.replace(/\./g, '').replace(',', '.'))
        return !Number.isNaN(num) && num > 0
      },
      { message: 'O valor deve ser maior que zero' },
    ),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
