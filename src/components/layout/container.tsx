import { Stack, StackProps } from '@chakra-ui/react'

export const Container = ({ children, ...rest }: StackProps) => (
  <Stack
    direction="column"
    mx="auto"
    px={4}
    py={10}
    w="full"
    align="start"
    maxW="container.xl"
    color="navy.500"
    {...rest}
  >
    {children}
  </Stack>
)
