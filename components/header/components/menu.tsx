'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Eye, Home, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import AddNewTransaction from './add-new-transaction'

export default function Menu() {
  const [open, setOpen] = useState(false)

  const handleCloseMenu = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navegue pelas rotas e conheça as possibilidades</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 px-4">
          <Link onClick={handleCloseMenu} href={'/'}>
            <Button className="w-full justify-start" variant={'outline'}>
              <Home /> Início
            </Button>
          </Link>
          <Link onClick={handleCloseMenu} href={'/my-transactions'}>
            <Button className="w-full justify-start" variant={'outline'}>
              <Eye /> Ver Todas as transações
            </Button>
          </Link>
          <AddNewTransaction />
        </div>
      </SheetContent>
    </Sheet>
  )
}
