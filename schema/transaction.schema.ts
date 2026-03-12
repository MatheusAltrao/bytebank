import z from 'zod'

export const transactionSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(30, 'O título deve ter no máximo 30 caracteres'),
  description: z.string().max(100, 'A descrição deve ter no máximo 100 caracteres'),
  type: z.enum(['deposit', 'withdrawal'], {
    message: 'Selecione o tipo da transação',
  }),
  date: z.date({
    message: 'Selecione a data da transação',
  }),
  amount: z
    .string()
    .min(1, 'Informe o valor da transação')
    .max(15, 'O valor é muito grande')
    .refine(
      (val) => {
        const num = Number(val.replace(/\./g, '').replace(',', '.'))
        return !Number.isNaN(num) && num > 0
      },
      { message: 'O valor deve ser maior que zero' },
    ),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
