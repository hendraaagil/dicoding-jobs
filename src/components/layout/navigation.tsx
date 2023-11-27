import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/next-js'
import { Flex, Heading } from '@chakra-ui/react'

const navigations = [
  {
    name: 'Lowongan Kerja',
    href: '/jobs',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
]

const Link = ({ name, href }: { name: string; href: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const linkProps: LinkProps = {
    py: 2,
    px: 4,
    href: href,
    fontWeight: '500',
    borderBottom: '2px',
    borderBottomColor: 'transparent',
    _hover: {
      textDecoration: 'none',
      bg: 'gray.100',
    },
  }

  if (isActive) {
    linkProps.borderBottomColor = 'navy'
  }

  return <ChakraLink {...linkProps}>{name}</ChakraLink>
}

export const Navigation = () => (
  <Flex as="nav" position="fixed" bg="white" w="full" boxShadow="sm">
    <Flex
      px={4}
      py={4}
      mx="auto"
      w="full"
      maxW="container.xl"
      justify="space-between"
      alignItems="center"
    >
      <Flex columnGap={2} alignItems="center">
        <Image
          src="/favicon.svg"
          alt="Dicoding's logo"
          width={32}
          height={32}
        />
        <Heading as="h3" size="lg" color="navy">
          Jobs
        </Heading>
      </Flex>
      <Flex columnGap={8} alignItems="center">
        {navigations.map((navigation) => (
          <Link
            key={navigation.name}
            name={navigation.name}
            href={navigation.href}
          />
        ))}
      </Flex>
    </Flex>
  </Flex>
)
