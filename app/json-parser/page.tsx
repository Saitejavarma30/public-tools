
import { JsonParser } from '@/components/json-parser'
import { JsonParserDescription } from '@/components/json-parser-description'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online JSON Parser & Formatter - Validate, Format, Minify JSON | Public Tools',
  description: 'Free online JSON parser and formatter. Validate JSON syntax, format/beautify JSON, minify JSON, convert JSON to CSV. No registration required. Instant JSON validation and formatting.',
  keywords: 'json parser, json formatter, json validator, json minifier, json beautifier, json converter, json to csv, json syntax checker, json lint, json prettify, json online, free json tools, json editor, json viewer, json validator online, json formatter online, json minifier online, json beautifier online, json syntax validator, json error checker, json pretty print, json compact, json stringify, json parse, json tools, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online JSON Parser & Formatter - Validate, Format, Minify JSON',
    description: 'Free online JSON parser and formatter. Validate JSON syntax, format/beautify JSON, minify JSON, convert JSON to CSV. No registration required.',
    type: 'website',
    url: 'https://freetoolcompany.com/json-parser',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online JSON Parser & Formatter - Validate, Format, Minify JSON',
    description: 'Free online JSON parser and formatter. Validate JSON syntax, format/beautify JSON, minify JSON, convert JSON to CSV.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/json-parser',
  },
}

export default function JsonParserPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'JSON Parser & Formatter',
    description: 'Free online tool to validate, format, minify, and convert JSON with syntax highlighting and error detection.',
    url: 'https://public-tools.dev/json-parser',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Public Tools',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            JSON Parser & Formatter
          </h1>
          <p className="text-muted-foreground">
            Validate, format, minify, and convert JSON with syntax highlighting and error detection.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <JsonParser />
        </Suspense>
        <JsonParserDescription />
      </div>
    </>
  )
}
