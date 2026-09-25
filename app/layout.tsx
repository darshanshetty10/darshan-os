import type { Metadata, Viewport } from 'next'
import { DM_Mono, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Darshan Shetty — Product Manager | E-Commerce · Hyperlocal · AI',
    template: '%s | Darshan Shetty',
  },

  description:
    'Darshan Shetty is a Product Manager with 8+ years across e-commerce, D2C, retail-tech and hyperlocal commerce, building customer experiences, growth products and AI experiments.',

  keywords: [
    'Darshan Shetty',
    'Product Manager',
    'Senior Product Manager',
    'Product Management',
    'E-commerce Product Manager',
    'D2C Product Manager',
    'Hyperlocal Commerce',
    'AI Product Manager',
    'Product Portfolio',
    'Growth Product Manager',
  ],

  authors: [
    {
      name: 'Darshan Shetty',
    },
  ],

  creator: 'Darshan Shetty',
  publisher: 'Darshan Shetty',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Darshan Shetty — Product Manager | Commerce · AI',
    description:
      'How Darshan thinks, builds and ships products across commerce, customer experience, growth and AI.',
    type: 'website',
    url: '/',
    siteName: 'DARSHAN.OS',
    locale: 'en_IN',
    images: [
      {
        url: '/assets/darshan.jpg',
        alt: 'Darshan Shetty — Product Manager',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Darshan Shetty — Product Manager | Commerce · AI',
    description:
      'Product portfolio covering commerce, customer experience, growth, operations and AI.',
    images: ['/assets/darshan.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0d10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}