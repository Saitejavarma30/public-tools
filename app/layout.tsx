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
        url: 'https://freetoolcompany.com/og-image.svg',
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
    images: ['https://freetoolcompany.com/og-image.svg'],
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
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* AdSense Script */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7038543112980969"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased overflow-x-hidden")}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-14 max-w-7xl items-center justify-between overflow-x-hidden">
              <div className="flex items-center">
                <a className="flex items-center space-x-2" href="/">
                  <img 
                    src="/logo.svg" 
                    alt="Public Tools Logo" 
                    className="h-8 w-8"
                  />
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
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <footer className="border-t border-border/40 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Tools Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Developer Tools</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <a href="/regex-tester" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Regex Tester
                    </a>
                    <a href="/json-parser" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      JSON Parser
                    </a>
                    <a href="/base64-encoder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Base64 Tool
                    </a>
                    <a href="/url-encoder" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      URL Encoder
                    </a>
                    <a href="/hash-generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Hash Generator
                    </a>
                    <a href="/color-picker" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Color Picker
                    </a>
                    <a href="/image-compressor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Image Compressor
                    </a>
                    <a href="/image-converter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Image Converter
                    </a>
                  </div>
                </div>

                {/* Legal Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Legal</h3>
                  <div className="space-y-2">
                    <a href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                    <a href="https://github.com/Saitejavarma30/public-tools/blob/main/LICENSE" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      MIT License
                    </a>
                  </div>
                </div>

                {/* Connect Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="space-y-2">
                    <a href="https://www.saitejavarma.in/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      🌐 My Website
                    </a>
                    <a href="https://github.com/Saitejavarma30/public-tools" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      💻 GitHub Repository
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-border/40 pt-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      Built with ❤️ for developers. Free tools, supported by ads.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>© 2025 Public Tools</span>
                      <span>•</span>
                      <span>Open Source</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://github.com/Saitejavarma30/public-tools" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://www.saitejavarma.in/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-muted-foreground hover:text-foreground transition-colors">
                      🌐
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
