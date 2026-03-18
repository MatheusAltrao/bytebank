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
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddNewTransactionForm from './add-new-transaction-form'

export default function AddNewTransactionDesktop() {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="justify-start">
          <Plus /> Nova Transação
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar nova transação</AlertDialogTitle>
          <AlertDialogDescription>
            Para acompanhar seus gastos e receitas. Preencha os detalhes da transação, para manter seu controle
            financeiro atualizado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddNewTransactionForm setOpen={setOpen} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
