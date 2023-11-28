import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Footer, Navigation } from '@/components/layout'
import SEO from '@/configs/next-seo'
import theme from '@/configs/theme'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...SEO} />
      <ChakraProvider theme={theme} resetCSS>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}
