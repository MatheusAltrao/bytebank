'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import AddNewTransactionForm from './add-new-transaction-form'

export default function AddNewTransactionDesktop() {
  const [open, setOpen] = useState(false)
  const isPendingRef = useRef(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPendingRef.current) setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button className="justify-start">
          <Plus /> Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova transação</DialogTitle>
          <DialogDescription>
            Para acompanhar seus gastos e receitas. Preencha os detalhes da transação, para manter seu controle
            financeiro atualizado.
          </DialogDescription>
        </DialogHeader>
        <AddNewTransactionForm
          setOpen={setOpen}
          onPendingChange={(p) => {
            isPendingRef.current = p
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
