import { DefaultSeoProps } from 'next-seo'

const title = 'Dicoding Jobs'
const description =
  'Dicoding Jobs adalah platform pencarian lowongan kerja untuk developer.'
const config: DefaultSeoProps = {
  defaultTitle: title,
  titleTemplate: '%s | Dicoding Jobs',
  description: description,
  openGraph: {
    siteName: title,
    description: description,
    images: [
      {
        url: 'https://jobs.dicoding.com/jobs-thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
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
