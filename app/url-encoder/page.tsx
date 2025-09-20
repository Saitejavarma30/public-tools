
import { UrlEncoder } from '@/components/url-encoder'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online URL Encoder/Decoder - Encode & Decode URLs with Query Parameters | Public Tools',
  description: 'Free online URL encoder and decoder. Encode URLs, decode URLs, parse query parameters, analyze URL components. Percent encoding, URL validation. No registration required.',
  keywords: 'url encoder, url decoder, url encoding, url decoding, percent encoding, query parameters, url parser, url analyzer, url validator, url encode, url decode, encode url, decode url, url percent encoding, url component parser, url query parser, url fragment, url path, url hostname, url protocol, url online, free url tools, url converter, url translator, url encoder online, url decoder online, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online URL Encoder/Decoder - Encode & Decode URLs with Query Parameters',
    description: 'Free online URL encoder and decoder. Encode URLs, decode URLs, parse query parameters, analyze URL components. Percent encoding, URL validation.',
    type: 'website',
    url: 'https://freetoolcompany.com/url-encoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online URL Encoder/Decoder - Encode & Decode URLs with Query Parameters',
    description: 'Free online URL encoder and decoder. Encode URLs, decode URLs, parse query parameters, analyze URL components.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/url-encoder',
  },
}

export default function UrlEncoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'URL Encoder/Decoder',
    description: 'Free online tool to encode and decode URLs with query parameter parsing and validation.',
    url: 'https://public-tools.dev/url-encoder',
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
            URL Encoder/Decoder
          </h1>
          <p className="text-muted-foreground">
            Encode and decode URLs with query parameter parsing and validation.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <UrlEncoder />
        </Suspense>
      </div>
    </>
  )
}
