import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Página não encontrada</p>
      <Button asChild size="lg">
        <Link href="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  )
}
