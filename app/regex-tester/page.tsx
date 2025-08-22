import { RegexTester } from '@/components/regex-tester'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online Regex Tester & Visualizer | Public Tools',
  description: 'Test, debug, and visualize your regular expressions instantly with our free online regex tester. Supports flags, highlighting, and shareable links.',
  keywords: 'regex tester, regular expression, regex validator, regex visualizer, pattern matching, developer tools',
  openGraph: {
    title: 'Free Online Regex Tester & Visualizer',
    description: 'Test, debug, and visualize your regular expressions instantly with our free online regex tester.',
    type: 'website',
    url: 'https://public-tools.dev/regex-tester',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Regex Tester & Visualizer',
    description: 'Test, debug, and visualize your regular expressions instantly.',
  },
}

export default function RegexTesterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Regex Tester & Visualizer',
    description: 'Free online tool to test, debug, and visualize regular expressions with real-time highlighting and pattern matching.',
    url: 'https://public-tools.dev/regex-tester',
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Regex Tester & Visualizer
          </h1>
          <p className="text-muted-foreground">
            Test, debug, and visualize your regular expressions with real-time highlighting and pattern matching.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <RegexTester />
        </Suspense>
      </div>
    </>
  )
}
