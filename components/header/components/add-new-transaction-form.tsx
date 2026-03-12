'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTransactions } from '@/context/transactions-context'
import { formatCurrency } from '@/helpers/currency'
import { badgeVariant } from '@/helpers/transactions'
import { cn } from '@/lib/utils'
import { TransactionFormData, transactionSchema } from '@/schema/transaction.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'

interface AddNewTransactionFormProps {
  onSuccess?: () => void
}

export default function AddNewTransactionForm({ onSuccess }: AddNewTransactionFormProps) {
  const { addTransaction } = useTransactions()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: '',
      date: new Date(),
      type: 'deposit',
    },
  })

  const currentAmount = useWatch({ control, name: 'amount' })

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const formatted = formatCurrency(raw)
    setValue('amount', formatted, { shouldValidate: true })
  }

  function onSubmit(data: TransactionFormData) {
    const amountNumerico = Number(data.amount.replace(/\./g, '').replace(',', '.'))

    addTransaction({
      title: data.title,
      type: data.type,
      date: data.date.toISOString(),
      amount: amountNumerico,
      description: data.description,
    })

    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Título */}
      <div className="grid gap-2">
        <Label htmlFor="titulo">Título</Label>
        <Input id="title" placeholder="Ex: Salário, Aluguel..." {...register('title')} aria-invalid={!!errors.title} />
        {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
      </div>

      {/* Descrição */}
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          placeholder="Ex: Recebimento do salário mensal"
          {...register('description')}
          aria-invalid={!!errors.description}
        />
        {errors.description && <span className="text-xs text-destructive">{errors.description.message}</span>}
      </div>

      {/* Tipo */}
      <div className="grid gap-2">
        <Label>Tipo</Label>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.type}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposit">
                  <Badge variant={badgeVariant('deposit')}>Depósito</Badge>
                </SelectItem>
                <SelectItem value="withdrawal">
                  <Badge variant={badgeVariant('withdrawal')}>Retirada</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <span className="text-xs text-destructive">{errors.type.message}</span>}
      </div>

      {/* Data */}
      <div className="grid gap-2">
        <Label>Data</Label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                  aria-invalid={!!errors.date}
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
        {errors.date && <span className="text-xs text-destructive">{errors.date.message}</span>}
      </div>

      {/* Valor */}
      <div className="grid gap-2">
        <Label htmlFor="valor">Valor</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            R$
          </span>
          <Input
            id="valor"
            placeholder="0,00"
            className="pl-9"
            inputMode="numeric"
            value={currentAmount}
            onChange={handleAmountChange}
            aria-invalid={!!errors.amount}
          />
        </div>
        {errors.amount && <span className="text-xs text-destructive">{errors.amount.message}</span>}
      </div>

      <Button type="submit" className="w-full">
        Adicionar transação
      </Button>
    </form>
  )
}
