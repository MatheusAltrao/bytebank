'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTransactions } from '@/context/transactions-context'
import { formatCurrency } from '@/helpers/currency'
import { cn } from '@/lib/utils'
import { TransactionFormData, transactionSchema } from '@/schema/transaction.schema'
import type { Transaction } from '@/types/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'

interface EditTransactionFormProps {
  transaction: Transaction
  onSuccess?: () => void
}

function numberToCurrencyString(value: number): string {
  const fixed = value.toFixed(2)
  const [intPart, decPart] = fixed.split('.')
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${intFormatted},${decPart}`
}

export default function EditTransactionForm({ transaction, onSuccess }: EditTransactionFormProps) {
  const { updateTransaction } = useTransactions()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      titulo: transaction.title,
      tipo: transaction.type,
      data: new Date(transaction.date),
      valor: numberToCurrencyString(transaction.value),
    },
  })

  const valorAtual = useWatch({ control, name: 'valor' })

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const formatted = formatCurrency(raw)
    setValue('valor', formatted, { shouldValidate: true })
  }

  function onSubmit(data: TransactionFormData) {
    const valorNumerico = Number(data.valor.replace(/\./g, '').replace(',', '.'))

    updateTransaction(transaction.id, {
      title: data.titulo,
      type: data.tipo,
      date: data.data.toISOString(),
      value: valorNumerico,
    })

    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Título */}
      <div className="grid gap-2">
        <Label htmlFor="edit-titulo">Título</Label>
        <Input
          id="edit-titulo"
          placeholder="Ex: Salário, Aluguel..."
          {...register('titulo')}
          aria-invalid={!!errors.titulo}
        />
        {errors.titulo && <span className="text-xs text-destructive">{errors.titulo.message}</span>}
      </div>

      {/* Tipo */}
      <div className="grid gap-2">
        <Label>Tipo</Label>
        <Controller
          control={control}
          name="tipo"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.tipo}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposito">Depósito</SelectItem>
                <SelectItem value="retirada">Retirada</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.tipo && <span className="text-xs text-destructive">{errors.tipo.message}</span>}
      </div>

      {/* Data */}
      <div className="grid gap-2">
        <Label>Data</Label>
        <Controller
          control={control}
          name="data"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                  aria-invalid={!!errors.data}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {field.value
                    ? format(field.value, 'dd/MM/yyyy', {
                        locale: ptBR,
                      })
                    : 'Selecione uma data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={ptBR} initialFocus />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.data && <span className="text-xs text-destructive">{errors.data.message}</span>}
      </div>

      {/* Valor */}
      <div className="grid gap-2">
        <Label htmlFor="edit-valor">Valor</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            R$
          </span>
          <Input
            id="edit-valor"
            placeholder="0,00"
            className="pl-9"
            inputMode="numeric"
            value={valorAtual}
            onChange={handleValorChange}
            aria-invalid={!!errors.valor}
          />
        </div>
        {errors.valor && <span className="text-xs text-destructive">{errors.valor.message}</span>}
      </div>

      <Button type="submit" className="w-full">
        Salvar alterações
      </Button>
    </form>
  )
}
