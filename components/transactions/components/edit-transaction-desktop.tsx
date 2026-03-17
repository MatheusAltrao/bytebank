'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { TransactionProps } from '@/types/transaction.types'
import { Pen } from 'lucide-react'
import { useRef, useState } from 'react'
import EditTransactionForm from './edit-transaction-form'

interface EditTransactionDesktopProps {
  transaction: TransactionProps
}

export default function EditTransactionDesktop({ transaction }: EditTransactionDesktopProps) {
  const [open, setOpen] = useState(false)
  const isPendingRef = useRef(false)

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!isPendingRef.current) setOpen(value)
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button size={'icon-lg'} variant={'warning'}>
              <Pen />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Editar transação</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar transação</AlertDialogTitle>
          <AlertDialogDescription>
            Altere os dados da transação e clique em salvar para atualizar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <EditTransactionForm
          transaction={transaction}
          onSuccess={() => setOpen(false)}
          onPendingChange={(p) => {
            isPendingRef.current = p
          }}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
