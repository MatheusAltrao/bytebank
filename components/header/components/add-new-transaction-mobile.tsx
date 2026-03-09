'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddNewTransactionForm from './add-new-transaction-form'

export default function AddNewTransactionMobile() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus /> Nova Transação
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adicionar nova transação</DrawerTitle>
          <DrawerDescription>
            Para acompanhar seus gastos e receitas. Preencha os detalhes da transação, para manter seu controle
            financeiro atualizado.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <AddNewTransactionForm onSuccess={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
