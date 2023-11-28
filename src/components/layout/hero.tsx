import React from 'react'
import { Flex } from '@chakra-ui/react'

export const Hero = ({ children }: { children?: React.ReactNode }) => (
  <Flex bgImage='url("/bg-hero.jpg")' bgRepeat="no-repeat" bgSize="cover">
    <Flex
      py={16}
      w="full"
      bgGradient={{
        base: 'linear(to-r, gray.800, gray.800)',
        sm: 'linear(to-r, gray.800 85%, blackAlpha.50)',
        md: 'linear(to-r, gray.800 65%, blackAlpha.50)',
      }}
      color="white"
    >
      <Flex
        mx="auto"
        px={4}
        w="full"
        maxW="container.xl"
        direction="column"
        rowGap={6}
      >
        {children}
      </Flex>
    </Flex>
  </Flex>
)
