
import { ColorPicker } from '@/components/color-picker'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Free Online Color Picker & Converter - HEX, RGB, HSL, CMYK | Public Tools',
  description: 'Free online color picker and converter. Convert between HEX, RGB, HSL, CMYK color formats. Generate color palettes, check accessibility contrast. No registration required.',
  keywords: 'color picker, color converter, hex to rgb, rgb to hex, hsl converter, cmyk converter, color palette generator, color picker online, hex color, rgb color, hsl color, cmyk color, color code, color hex, color rgb, color hsl, color cmyk, color wheel, color scheme, color palette, color harmony, color contrast, accessibility color, wcag color, color accessibility, hex converter, rgb converter, hsl converter, cmyk converter, color tool, color utility, color generator, color picker tool, free color tools, online color picker, color picker app, developer tools, web tools, coding tools',
  openGraph: {
    title: 'Free Online Color Picker & Converter - HEX, RGB, HSL, CMYK',
    description: 'Free online color picker and converter. Convert between HEX, RGB, HSL, CMYK color formats. Generate color palettes, check accessibility contrast.',
    type: 'website',
    url: 'https://freetoolcompany.com/color-picker',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Color Picker & Converter - HEX, RGB, HSL, CMYK',
    description: 'Free online color picker and converter. Convert between HEX, RGB, HSL, CMYK color formats.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/color-picker',
  },
}

export default function ColorPickerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Color Picker & Converter',
    description: 'Free online tool to pick colors and convert between HEX, RGB, HSL, CMYK formats with palette generation.',
    url: 'https://public-tools.dev/color-picker',
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
            Color Picker & Converter
          </h1>
          <p className="text-muted-foreground">
            Pick colors and convert between HEX, RGB, HSL, CMYK formats with palette generation.
          </p>
        </div>
        <Suspense fallback={<div className="flex items-center justify-center py-8">Loading...</div>}>
          <ColorPicker />
        </Suspense>
      </div>
    </>
  )
}
