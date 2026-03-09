'use client'

import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { generatePageNumbers } from '@/helpers/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TransactionsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function TransactionsPagination({ currentPage, totalPages, onPageChange }: TransactionsPaginationProps) {
  if (totalPages <= 1) return null

  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 pl-1.5"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
        </PaginationItem>

        {pageNumbers.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Button
                variant={currentPage === page ? 'outline' : 'ghost'}
                size="icon"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 pr-1.5"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
