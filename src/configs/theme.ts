import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
  colors: {
    navy: '#2D3E50',
  },
})

export default theme
