
import { HashGenerator } from '@/components/hash-generator'
import { HashGeneratorDescription } from '@/components/hash-generator-description'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online Hash Generator - MD5, SHA-1, SHA-256, SHA-512, HMAC | Public Tools',
  description: 'Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures. Text and file input support. Secure hashing algorithms. No registration required.',
  keywords: 'hash generator, hash calculator, md5 generator, sha1 generator, sha256 generator, sha512 generator, hmac generator, checksum generator, hash online, free hash tools, md5 hash, sha1 hash, sha256 hash, sha512 hash, hmac hash, file hash, text hash, string hash, password hash, hash function, cryptographic hash, hash algorithm, hash tool, hash converter, hash checker, hash validator, md5 online, sha256 online, sha512 online, hmac online, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online Hash Generator - MD5, SHA-1, SHA-256, SHA-512, HMAC',
    description: 'Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures. Text and file input support. Secure hashing algorithms.',
    type: 'website',
    url: 'https://freetoolcompany.com/hash-generator',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Hash Generator - MD5, SHA-1, SHA-256, SHA-512, HMAC',
    description: 'Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/hash-generator',
  },
}

export default function HashGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hash Generator',
    description: 'Free online tool to generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures.',
    url: 'https://public-tools.dev/hash-generator',
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
            Hash Generator
          </h1>
          <p className="text-muted-foreground">
            Generate MD5, SHA-1, SHA-256, SHA-512 hashes and HMAC signatures.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <HashGenerator />
        </Suspense>
        <HashGeneratorDescription />
      </div>
    </>
  )
}
