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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Transaction } from '@/types/transaction'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import EditTransactionForm from './edit-transaction-form'

interface EditTransactionMobileProps {
  transaction: Transaction
}

export default function EditTransactionMobile({ transaction }: EditTransactionMobileProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <Button size={'icon-lg'} variant={'warning'}>
              <Pen />
            </Button>
          </DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent>Editar transação</TooltipContent>
      </Tooltip>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar transação</DrawerTitle>
          <DrawerDescription>Altere os dados da transação e clique em salvar para atualizar.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <EditTransactionForm transaction={transaction} onSuccess={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
