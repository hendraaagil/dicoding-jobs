import { Tag, TagProps } from '@chakra-ui/react'

export const Badge = ({ children, ...rest }: TagProps) => (
  <Tag
    px={4}
    w="fit-content"
    fontSize="xs"
    variant="outline"
    colorScheme="blue"
    bg="blue.50"
    borderRadius="full"
    {...rest}
  >
    {children}
  </Tag>
)
