import { ImageConverter } from '@/components/image-converter-new'
import { ImageConverterDescription } from '@/components/image-converter-description'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Image Format Converter - Convert PNG, JPG, WebP, AVIF Online | Public Tools',
  description: 'Free online image format converter. Convert between PNG, JPG, WebP, AVIF formats. Resize images while converting. No registration required. Works in browser.',
  keywords: 'image converter, format converter, png to jpg, jpg to png, webp converter, avif converter, image format converter, convert images, png converter, jpeg converter, image resizer, batch image conversion, free image converter, online image converter, image format changer, free online tools, no registration, instant conversion',
  openGraph: {
    title: 'Free Image Format Converter - Convert PNG, JPG, WebP, AVIF Online',
    description: 'Free online image format converter. Convert between PNG, JPG, WebP, AVIF formats. Resize images while converting. No registration required.',
    type: 'website',
    url: 'https://freetoolcompany.com/image-converter',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Format Converter - Convert PNG, JPG, WebP, AVIF Online',
    description: 'Free online image format converter. Convert between PNG, JPG, WebP, AVIF formats. Resize images while converting.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/image-converter',
  },
}

export default function ImageConverterPage() {
  return (
    <>
      <ImageConverter />
      <ImageConverterDescription />
    </>
  )
}
