import type { Transaction } from "@/types/transaction";

export interface TransactionsState {
    transactions: Transaction[];
}

export interface TransactionsActions {
    addTransaction: (transaction: Omit<Transaction, "id">) => void;
    removeTransaction: (id: string) => void;
}

export type TransactionsStore = TransactionsState & TransactionsActions;
