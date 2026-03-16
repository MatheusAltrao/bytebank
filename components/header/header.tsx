import LogoBiteBank from '@/assets/icons/logo-bitebank'
import Link from 'next/link'
import AddNewTransaction from './components/add-new-transactionArea'
import Menu from './components/menu'

export default function Header() {
  return (
    <header className="w-full border-b h-14">
      <div className="p-2 w-full max-w-5xl mx-auto flex items-center justify-between ">
        <Link href={'/'}>
          <LogoBiteBank className="h-6 w-full max-w-45 object-contain" />
        </Link>

        <div className="flex items-center gap-1">
          <AddNewTransaction />
          <Menu />
        </div>
      </div>
    </header>
  )
}
