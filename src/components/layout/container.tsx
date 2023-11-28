import { Stack, StackProps } from '@chakra-ui/react'

export const Container = ({ children, ...rest }: StackProps) => (
  <Stack
    direction="column"
    mx="auto"
    p={4}
    w="full"
    align="start"
    maxW="container.xl"
    {...rest}
  >
    {children}
  </Stack>
)
