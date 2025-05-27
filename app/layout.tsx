import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'DIFM - Done For Me Websites | AI-Powered Professional Websites',
  description: 'Get your custom website built by professionals with AI assistance. Modern, responsive, and delivered in 2-3 weeks.',
  keywords: 'website development, AI websites, professional web design, custom websites',
  authors: [{ name: 'DIFM Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}
