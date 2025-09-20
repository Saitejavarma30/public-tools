import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Script from 'next/script'
import { MobileNav } from '@/components/mobile-nav'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder | Public Tools',
  description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker. No registration required. Instant results.',
  keywords: 'free developer tools, online tools, json parser, regex tester, base64 encoder, url encoder, hash generator, color picker, developer utilities, web tools, coding tools, programming tools, json formatter, json validator, regex visualizer, base64 decoder, url decoder, md5 generator, sha256 generator, color converter, hex to rgb, rgb to hex, hsl converter, cmyk converter, free online tools, no registration, instant tools',
  authors: [{ name: 'Public Tools' }],
  creator: 'Public Tools',
  publisher: 'Public Tools',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freetoolcompany.com',
    siteName: 'Public Tools',
    title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder',
    description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker. No registration required.',
    images: [
      {
        url: 'https://freetoolcompany.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Public Tools - Free Developer Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder',
    description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker.',
    images: ['https://freetoolcompany.com/og-image.png'],
  },
  other: {
    'google-adsense-account': 'ca-pub-7038543112980969',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7038543112980969"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-14 max-w-7xl items-center justify-between">
              <div className="flex items-center">
                <a className="flex items-center space-x-2" href="/">
                  <span className="font-bold text-lg">
                    Public Tools
                  </span>
                </a>
              </div>
              
              {/* Desktop Navigation */}
              <Navigation />

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <MobileNav />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/40 py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with ❤️ for developers. Free tools, supported by ads. 
                  <a href="/privacy" className="underline hover:text-foreground ml-1">Privacy Policy</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
