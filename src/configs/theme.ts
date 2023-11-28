import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      '.tiptap:focus': {
        outline: 'none',
      },
      'ol, ul': {
        paddingLeft: '1.5rem',
      },
      a: {
        color: 'var(--chakra-colors-blue-600)',
        textDecoration: 'underline',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 'bold',
      },
      h1: {
        fontSize: '2.25rem',
      },
      h2: {
        fontSize: '1.875rem',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1rem',
      },
      h6: {
        fontSize: '0.875rem',
      },
    },
  },
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
  colors: {
    navy: {
      50: '#2d3e50',
      100: '#2d3e50',
      200: '#2d3e50',
      300: '#2d3e50',
      400: '#2d3e50',
      500: '#2d3e50',
      600: '#2d3e50',
      700: '#2d3e50',
      800: '#2d3e50',
      900: '#2d3e50',
    },
  },
})

export default theme
