import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  defaultTitle: 'Dicoding Jobs',
  titleTemplate: '%s | Dicoding Jobs',
  description:
    'Dicoding Jobs adalah platform pencarian lowongan kerja untuk developer.',
  additionalMetaTags: [
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge; chrome=1',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg+xml',
    },
  ],
}

export default config
