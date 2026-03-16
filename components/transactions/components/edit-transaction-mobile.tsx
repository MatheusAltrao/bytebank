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
import { TransactionProps } from '@/types/transaction.types'
import { Pen } from 'lucide-react'
import { useRef, useState } from 'react'
import EditTransactionForm from './edit-transaction-form'

interface EditTransactionMobileProps {
  transaction: TransactionProps
}

export default function EditTransactionMobile({ transaction }: EditTransactionMobileProps) {
  const [open, setOpen] = useState(false)
  const isPendingRef = useRef(false)

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (!isPendingRef.current) setOpen(value)
      }}
    >
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
          <EditTransactionForm
            transaction={transaction}
            onSuccess={() => setOpen(false)}
            onPendingChange={(p) => {
              isPendingRef.current = p
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
