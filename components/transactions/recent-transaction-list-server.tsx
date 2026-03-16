import { getRecentTransactions } from '@/app/http/transactions.http'
import RecentTransactionList from './recent-transaction-list'

export default async function RecentTransactionListServer() {
  const recentTransactionsList = await getRecentTransactions()
  return <RecentTransactionList transactions={recentTransactionsList.data} />
}
