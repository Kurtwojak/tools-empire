import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToolsEmpire',
  description: 'Tools to make you gamba experience a little bit better.',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '16x16'
      }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ToolsEmpire',
    description: 'Tools to make you gamba experience a little bit better.',
    images: [
      {
        url: '/social_preview.png',
        width: 1200,
        height: 630,
        alt: 'ToolsEmpire Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolsEmpire',
    description: 'Tools to make you gamba experience a little bit better.',
    images: ['/social_preview.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-black text-[#00ff00] font-['Kode_Mono']">{children}</body>
    </html>
  )
}
