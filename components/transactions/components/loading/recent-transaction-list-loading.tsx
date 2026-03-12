import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <div className="size-8 animate-pulse rounded bg-muted" />
          <div className="size-8 animate-pulse rounded bg-muted" />
          <div className="size-8 animate-pulse rounded bg-muted" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default function RecentTransactionListLoading() {
  return (
    <div className="space-y-4">
      <header>
        <div className="h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </header>
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
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <div className="h-8 w-52 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
