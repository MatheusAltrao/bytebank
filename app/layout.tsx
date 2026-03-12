import { TooltipProvider } from '@/components/ui/tooltip'
import { TransactionsProvider } from '@/context/transactions-context'
import { Inter } from 'next/font/google'
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
        <TransactionsProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TransactionsProvider>
      </body>
    </html>
  )
}
