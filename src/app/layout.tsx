import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToolsEmpire',
  description: 'Tools to make you gamba experience a little bit better.',
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
      <body className="min-h-screen bg-black text-[#00ff00] font-['Kode_Mono']">{children}</body>
    </html>
  )
}
