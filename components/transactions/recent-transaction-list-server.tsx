import { getRecentTransactions } from '@/app/http/transactions.http'
import RecentTransactionList from './recent-transaction-list'

export default function RecentTransactionListServer() {
  const recentTransactionsList = getRecentTransactions()
  return <RecentTransactionList transactions={recentTransactionsList.data} />
}
