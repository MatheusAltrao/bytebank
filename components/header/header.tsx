import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DollarSign, Home, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LogoBytebank from '../../assets/logo-bytebank.svg'
import { Button } from '../ui/button'
import AddNewTransaction from './components/add-new-transaction'

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="p-2 w-full max-w-5xl mx-auto flex items-center justify-between ">
        <Link href={'/'}>
          <Image src={LogoBytebank} alt="Logo Bytebank" className="h-6 w-full object-contain" height={40} width={180} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size={'icon-lg'} variant={'outline'}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegue pelas rotas e conheça as possibilidades</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-2 px-4">
              <Link href={'/'}>
                <Button className="w-full justify-start" variant={'outline'}>
                  <Home /> Início
                </Button>
              </Link>
              <Link href={'/my-transactions'}>
                <Button className="w-full justify-start" variant={'outline'}>
                  <DollarSign /> Minhas transações
                </Button>
              </Link>

              <AddNewTransaction />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
