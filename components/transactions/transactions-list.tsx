import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function TransactionsList() {


    const TRANSACTIONS_MOCK = [
        {
            id: 1,
            title: 'Trabalho',
            type: 'Depósito',
            date: new Date(),
            value: 250
        },
        {
            id: 2,
            title: 'Aluguel',
            type: 'Retirada',
            date: new Date(),
            value: 1200
        },
    ]

    const badgeVariant = (type: string) => {
        switch (type) {
            case 'Depósito':
                return 'default';
            case 'Retirada':
                return 'destructive';
            default:
                return 'secondary';
        }
    }

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
                {TRANSACTIONS_MOCK.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.title}</TableCell>
                        <TableCell> <Badge variant={badgeVariant(transaction.type)}> {transaction.type} </Badge>  </TableCell>
                        <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">R${transaction.value},00</TableCell>
                        <TableCell className="text-right" >
                            <div className="flex items-center justify-end gap-1"     >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size={'icon-lg'} variant={'warning'}><Pen /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Editar transação
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size={'icon-lg'} variant={'destructive'}><Trash /></Button>
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
        </Table>
    )
}