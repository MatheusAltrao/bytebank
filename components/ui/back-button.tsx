'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './button'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      <ArrowLeft />
      Voltar
    </Button>
  )
}
