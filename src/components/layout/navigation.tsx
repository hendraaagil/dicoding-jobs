import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/next-js'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Menu } from 'lucide-react'

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

const Link = ({
  name,
  href,
  ...rest
}: { name: string; href: string } & LinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const linkProps: LinkProps = {
    py: 2,
    px: 4,
    href: href,
    fontWeight: '500',
    borderBottom: '2px',
    borderBottomColor: 'transparent',
    rounded: 'sm',
    _hover: {
      textDecoration: 'none',
      bg: 'gray.100',
    },
  }

  if (isActive) {
    linkProps.borderBottomColor = 'navy.500'
  }

  return (
    <ChakraLink {...linkProps} {...rest}>
      {name}
    </ChakraLink>
  )
}

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent py={6} rounded="sm">
          <DrawerBody>
            <Stack>
              {navigations.map((navigation) => (
                <Link
                  key={navigation.name}
                  name={navigation.name}
                  href={navigation.href}
                  onClick={onClose}
                />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <IconButton
        aria-label="Show menu"
        icon={<Menu />}
        display={{ base: 'flex', sm: 'none' }}
        variant="outline"
        rounded="sm"
        onClick={onOpen}
      />
    </>
  )
}

export const Navigation = () => (
  <Flex
    as="nav"
    position="fixed"
    bg="white"
    w="full"
    boxShadow="sm"
    borderBottom="2px"
    borderColor="gray.200"
    zIndex={10}
  >
    <Flex
      px={{ base: 2, sm: 4 }}
      py={2}
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
        <Text fontWeight="700" fontSize="2xl" color="navy.500">
          Jobs
        </Text>
      </Flex>
      <Flex
        display={{ base: 'none', sm: 'flex' }}
        columnGap={{ base: 4, md: 8 }}
        alignItems="center"
      >
        {navigations.map((navigation) => (
          <Link
            key={navigation.name}
            name={navigation.name}
            href={navigation.href}
          />
        ))}
      </Flex>
      <MobileNav />
    </Flex>
  </Flex>
)
