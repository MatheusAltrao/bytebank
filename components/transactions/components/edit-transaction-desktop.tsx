'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Transaction } from '@/types/transaction'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import EditTransactionForm from './edit-transaction-form'

interface EditTransactionDesktopProps {
  transaction: Transaction
}

export default function EditTransactionDesktop({ transaction }: EditTransactionDesktopProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={'icon-lg'} variant={'warning'}>
              <Pen />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Editar transação</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>
          <DialogDescription>Altere os dados da transação e clique em salvar para atualizar.</DialogDescription>
        </DialogHeader>
        <EditTransactionForm transaction={transaction} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
