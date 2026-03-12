import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface SearchProps {
  search: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
}

export default function Filter({ search, onSearchChange, typeFilter, onTypeFilterChange }: SearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por título, data ou valor..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">
            <Badge variant={'secondary'}> Todos </Badge>
          </SelectItem>
          <SelectItem value="deposito">
            <Badge variant={'default'}> Depósito </Badge>
          </SelectItem>
          <SelectItem value="retirada">
            <Badge variant={'destructive'}> Retirada </Badge>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
