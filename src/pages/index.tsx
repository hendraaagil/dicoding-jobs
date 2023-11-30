import { Flex, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex as="main" justify="center" alignItems="center" minH="100vh">
      <Heading as="h1" size="2xl">
        Hello Dicoding!
      </Heading>
    </Flex>
  )
}
