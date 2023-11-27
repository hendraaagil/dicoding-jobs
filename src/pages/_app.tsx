import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import { Footer, Navigation } from '@/components/layout'
import SEO from '@/configs/next-seo'
import theme from '@/configs/theme'

const inter = Inter({ subsets: ['latin'] })

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
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  )
}
