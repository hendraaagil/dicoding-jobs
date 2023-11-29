import type { NextRouter } from 'next/router'
import type { JobPagination } from '@/types/job'

import { Button, Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  router: NextRouter
  pagination: JobPagination
}

export const Pagination = ({
  router,
  pagination: { currentPage, totalPage, hasNextPage, hasPrevPage },
}: PaginationProps) => {
  const counts = Array.from({ length: totalPage }, (_, i) => i + 1)

  return (
    <Flex as="nav" w="full" justifyContent="center" overflow="auto">
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeft size={20} />}
        variant="outline"
        rounded="sm"
        isDisabled={!hasPrevPage}
        _disabled={{ cursor: 'not-allowed', opacity: 0.5 }}
        onClick={() =>
          router.push({ query: { ...router.query, page: currentPage - 1 } })
        }
      />
      {counts.map((item) => (
        <Button
          key={item}
          bg={currentPage === item ? 'gray.200' : undefined}
          variant="outline"
          rounded="sm"
          onClick={() =>
            router.push({ query: { ...router.query, page: item } })
          }
        >
          {item}
        </Button>
      ))}
      <IconButton
        aria-label="Next page"
        icon={<ChevronRight size={20} />}
        variant="outline"
        rounded="sm"
        isDisabled={!hasNextPage}
        _disabled={{ cursor: 'not-allowed', opacity: 0.5 }}
        onClick={() =>
          router.push({ query: { ...router.query, page: currentPage + 1 } })
        }
      />
    </Flex>
  )
}
