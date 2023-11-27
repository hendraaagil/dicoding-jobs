import { Flex, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex justify="center" alignItems="center" minH="100vh" bg="gray.200">
      <Heading as="h1" size="2xl">
        Hello Dicoding!
      </Heading>
    </Flex>
  )
}
