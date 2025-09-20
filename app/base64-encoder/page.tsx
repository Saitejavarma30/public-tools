
import { Base64Encoder } from '@/components/base64-encoder'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online Base64 Encoder/Decoder - Encode & Decode Text, Images, Files | Public Tools',
  description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64. Decode Base64 to text, images, files. URL-safe encoding support. No registration required.',
  keywords: 'base64 encoder, base64 decoder, base64 converter, base64 encode, base64 decode, text encoding, file encoding, data encoding, base64 online, free base64 tools, base64 string, base64 image, base64 file, url safe base64, base64 to text, text to base64, image to base64, base64 to image, file to base64, base64 to file, base64 generator, base64 translator, base64 converter online, base64 encoder online, base64 decoder online, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online Base64 Encoder/Decoder - Encode & Decode Text, Images, Files',
    description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64. Decode Base64 to text, images, files. URL-safe encoding support.',
    type: 'website',
    url: 'https://freetoolcompany.com/base64-encoder',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Base64 Encoder/Decoder - Encode & Decode Text, Images, Files',
    description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64. Decode Base64 to text, images, files.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/base64-encoder',
  },
}

export default function Base64EncoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Base64 Encoder/Decoder',
    description: 'Free online tool to encode and decode text, images, and files to/from Base64 format with URL-safe options.',
    url: 'https://public-tools.dev/base64-encoder',
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
            Base64 Encoder/Decoder
          </h1>
          <p className="text-muted-foreground">
            Encode and decode text, images, and files to/from Base64 format with URL-safe options.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <Base64Encoder />
        </Suspense>
      </div>
    </>
  )
}
