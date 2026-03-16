import Header from '@/components/header/header'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TransactionsProvider } from '@/context/transactions-context'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <TransactionsProvider>
          <Header />
          <TooltipProvider>
            <div className="w-full max-w-5xl p-2 mx-auto mt-8 space-y-8 ">{children}</div>
          </TooltipProvider>
        </TransactionsProvider>
      </body>
    </html>
  )
}
