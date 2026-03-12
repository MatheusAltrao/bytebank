import Image from 'next/image'
import Link from 'next/link'
import LogoBytebank from '../../assets/logo-bytebank.svg'
import AddNewTransaction from './components/add-new-transaction'
import Menu from './components/menu'

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="p-2 w-full max-w-5xl mx-auto flex items-center justify-between ">
        <Link href={'/'}>
          <Image src={LogoBytebank} alt="Logo Bytebank" className="h-6 w-full object-contain" height={40} width={180} />
        </Link>

        <div className="flex items-center gap-1">
          <AddNewTransaction />
          <Menu />
        </div>
      </div>
    </header>
  )
}
