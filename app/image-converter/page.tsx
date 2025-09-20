import { ImageConverter } from '@/components/image-converter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Image Converter & Compressor - PNG to JPG, WebP, AVIF | Public Tools',
  description: 'Convert and compress images between PNG, JPG, WebP, AVIF formats. Resize images, reduce file sizes, and optimize for web. 100% client-side processing - your images never leave your device.',
  keywords: 'image converter, image compressor, png to jpg, jpg to png, webp converter, avif converter, image resizer, image optimizer, compress images, reduce image size, batch image converter, free image tools, online image converter, image format converter, photo compressor, image optimization, web image optimization, client-side image processing, privacy-focused image tools',
  openGraph: {
    title: 'Free Image Converter & Compressor - PNG to JPG, WebP, AVIF',
    description: 'Convert and compress images between PNG, JPG, WebP, AVIF formats. Resize images, reduce file sizes, and optimize for web. 100% client-side processing.',
    type: 'website',
    url: 'https://freetoolcompany.com/image-converter',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Converter & Compressor - PNG to JPG, WebP, AVIF',
    description: 'Convert and compress images between PNG, JPG, WebP, AVIF formats. Resize images, reduce file sizes, and optimize for web.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/image-converter',
  },
}

export default function ImageConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ImageConverter />
    </div>
  )
}
