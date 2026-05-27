import { Metadata } from 'next'

const siteConfig = {
  name: 'Well na Estrada',
  description:
    'Intercâmbio na Irlanda com quem entende. Consultoria premium para estudantes brasileiros.',
  url: 'https://wellnaestrada.com',
  ogImage: 'https://wellnaestrada.com/og-image.jpg',
  links: {
    whatsapp: 'https://wa.me/353000000000',
  },
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@wellnaestrada',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
