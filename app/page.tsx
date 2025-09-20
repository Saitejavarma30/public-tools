import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AdBanner } from '@/components/ads'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder | Public Tools',
  description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker. No registration required. Instant results.',
  keywords: 'free developer tools, online tools, json parser, regex tester, base64 encoder, url encoder, hash generator, color picker, developer utilities, web tools, coding tools, programming tools, json formatter, json validator, regex visualizer, base64 decoder, url decoder, md5 generator, sha256 generator, color converter, hex to rgb, rgb to hex, hsl converter, cmyk converter, free online tools, no registration, instant tools',
  openGraph: {
    title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder',
    description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker. No registration required.',
    type: 'website',
    url: 'https://freetoolcompany.com',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Developer Tools - JSON Parser, Regex Tester, Base64 Encoder',
    description: 'Free online developer tools: JSON parser & formatter, regex tester, Base64 encoder/decoder, URL encoder, hash generator, color picker.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com',
  },
}

export default function HomePage() {
  const tools = [
    {
      title: "Regex Tester & Visualizer",
      description: "Test, debug, and visualize regular expressions with real-time highlighting",
      href: "/regex-tester",
      icon: "🔍"
    },
    {
      title: "JSON Parser & Formatter",
      description: "Validate, format, minify, and convert JSON with syntax highlighting",
      href: "/json-parser",
      icon: "📄"
    },
    {
      title: "Base64 Encoder/Decoder",
      description: "Encode and decode text, images, and files to/from Base64 format",
      href: "/base64-encoder",
      icon: "🔐"
    },
    {
      title: "URL Encoder/Decoder",
      description: "Encode and decode URLs with query parameter parsing and validation",
      href: "/url-encoder",
      icon: "🔗"
    },
    {
      title: "Hash Generator",
      description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures",
      href: "/hash-generator",
      icon: "🔒"
    },
    {
      title: "Color Picker & Converter",
      description: "Pick colors and convert between HEX, RGB, HSL, CMYK formats",
      href: "/color-picker",
      icon: "🎨"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Public Tools
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Free online developer utilities to help you build better software. Test regex patterns, format JSON, encode data, and more.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tools.map((tool, index) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{tool.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Bottom Banner Ad */}
      <div className="flex justify-center">
        <AdBanner 
          dataAdSlot="1270349401" 
          className="max-w-4xl"
        />
      </div>

      {/* SEO Footer */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>All tools are free to use with no registration required.</p>
        <p className="mt-2">
          <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a> • 
          <a href="/privacy" className="hover:text-primary transition-colors ml-2">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
