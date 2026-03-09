import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'UI/Table',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const sampleData = [
  { id: '1', title: 'Salário', type: 'Depósito', date: '08/03/2026', value: 'R$ 5.000,00' },
  { id: '2', title: 'Aluguel', type: 'Retirada', date: '05/03/2026', value: 'R$ 1.200,00' },
  { id: '3', title: 'Freelance', type: 'Depósito', date: '01/03/2026', value: 'R$ 800,00' },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant={item.type === 'Depósito' ? 'default' : 'destructive'}>{item.type}</Badge>
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell className="font-medium">{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Total de 3 transação(s).</TableCaption>
    </Table>
  ),
}

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody />
      <TableCaption>Nenhuma transação cadastrada.</TableCaption>
    </Table>
  ),
}
