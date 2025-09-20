import { RegexTester } from '@/components/regex-tester'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online Regex Tester & Visualizer - Test Regular Expressions | Public Tools',
  description: 'Free online regex tester and visualizer. Test, debug, and visualize regular expressions instantly. Pattern matching, syntax highlighting, regex flags. No registration required.',
  keywords: 'regex tester, regular expression tester, regex validator, regex visualizer, regex debugger, pattern matching, regex online, free regex tools, regex test, regex match, regex pattern, regex syntax, regex flags, regex global, regex multiline, regex case insensitive, regex cheatsheet, regex examples, regex tutorial, regex generator, regex builder, regex checker, regex matcher, regex finder, regex search, regex replace, regex split, regex online tool, regex tester online, regex visualizer online, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online Regex Tester & Visualizer - Test Regular Expressions',
    description: 'Free online regex tester and visualizer. Test, debug, and visualize regular expressions instantly. Pattern matching, syntax highlighting, regex flags.',
    type: 'website',
    url: 'https://freetoolcompany.com/regex-tester',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Regex Tester & Visualizer - Test Regular Expressions',
    description: 'Free online regex tester and visualizer. Test, debug, and visualize regular expressions instantly.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/regex-tester',
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
