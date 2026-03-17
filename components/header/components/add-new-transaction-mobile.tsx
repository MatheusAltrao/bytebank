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
import { useRef, useState } from 'react'
import AddNewTransactionForm from './add-new-transaction-form'

export default function AddNewTransactionMobile() {
  const [open, setOpen] = useState(false)
  const isPendingRef = useRef(false)

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (!isPendingRef.current) setOpen(value)
      }}
    >
      <DrawerTrigger asChild>
        <Button className="justify-start">
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
          <AddNewTransactionForm
            setOpen={setOpen}
            onPendingChange={(p) => {
              isPendingRef.current = p
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
