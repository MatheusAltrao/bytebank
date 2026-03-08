import { create } from "zustand";
import { persist } from "zustand/middleware";

import { INITIAL_TRANSACTIONS } from "./initial-transactions";
import type { TransactionsStore } from "./types";

export const useTransactionsStore = create<TransactionsStore>()(
    persist(
        (set) => ({
            transactions: INITIAL_TRANSACTIONS,

            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        { ...transaction, id: crypto.randomUUID() },
                    ],
                })),

            updateTransaction: (id, transaction) =>
                set((state) => ({
                    transactions: state.transactions.map((t) =>
                        t.id === id ? { ...transaction, id } : t
                    ),
                })),

            removeTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter(
                        (t) => t.id !== id
                    ),
                })),
        }),
        {
            name: "transactions-storage",
        }
    )
);
