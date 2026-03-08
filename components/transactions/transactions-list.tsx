"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { formatAmount } from "@/helpers/amount";
import { formatDate } from "@/helpers/date";
import { useTransactionsStore } from "@/store/transactions";
import type { TransactionType } from "@/types/transaction";
import { Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import EditTransaction from "./components/edit-transaction";

const TYPE_LABELS: Record<TransactionType, string> = {
    deposito: "Depósito",
    retirada: "Retirada",
};

const badgeVariant = (type: TransactionType) => {
    switch (type) {
        case "deposito":
            return "default";
        case "retirada":
            return "destructive";
        default:
            return "secondary";
    }
};

export default function TransactionsList() {
    const transactions = useTransactionsStore((state) => state.transactions);
    const removeTransaction = useTransactionsStore((state) => state.removeTransaction);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.title}</TableCell>
                        <TableCell>
                            <Badge variant={badgeVariant(transaction.type)}>
                                {TYPE_LABELS[transaction.type]}
                            </Badge>
                        </TableCell>
                        <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
                        <TableCell className="font-medium">{formatAmount(transaction.value)}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <EditTransaction transaction={transaction} />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size={"icon-lg"}
                                            variant={"destructive"}
                                            onClick={() => removeTransaction(transaction.id)}
                                        >
                                            <Trash />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Excluir transação
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableCaption>
                {transactions.length === 0
                    ? "Nenhuma transação registrada."
                    : `Total de ${transactions.length} transação(s).`}
            </TableCaption>
        </Table>
    )
}