import { Container } from '@/components/layout'
import { Text } from '@chakra-ui/react'

export const Empty = ({ keyword }: { keyword?: string }) => {
  if (keyword) {
    return (
      <Container>
        <Text w="full" textAlign="center" fontSize="xl">
          Lowongan &quot;{keyword}&quot; gak ketemu nih! Silahkan cari lowongan
          lainnya.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Text w="full" textAlign="center" fontSize="xl">
        Lowongan lagi kosong nih! Silahkan cek lagi nanti.
      </Text>
    </Container>
  )
}
