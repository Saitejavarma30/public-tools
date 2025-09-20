import { ImageCompressor } from '@/components/image-compressor'
import { ImageCompressorDescription } from '@/components/image-compressor-description'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Image Compressor - Reduce Image File Size Online | Public Tools',
  description: 'Free online image compressor to reduce file sizes by 20-80% while maintaining quality. Compress PNG, JPG, WebP, AVIF images. No registration required. Works in browser.',
  keywords: 'image compressor, compress images, reduce image size, image optimization, jpeg compressor, png compressor, webp compressor, avif compressor, free image compression, online image compressor, image file size reducer, batch image compression, image resizer, image quality optimizer, free online tools, no registration, instant compression',
  openGraph: {
    title: 'Free Image Compressor - Reduce Image File Size Online',
    description: 'Free online image compressor to reduce file sizes by 20-80% while maintaining quality. Compress PNG, JPG, WebP, AVIF images. No registration required.',
    type: 'website',
    url: 'https://freetoolcompany.com/image-compressor',
    images: ['https://freetoolcompany.com/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Compressor - Reduce Image File Size Online',
    description: 'Free online image compressor to reduce file sizes by 20-80% while maintaining quality. Compress PNG, JPG, WebP, AVIF images.',
  },
  alternates: {
    canonical: 'https://freetoolcompany.com/image-compressor',
  },
}

export default function ImageCompressorPage() {
  return (
    <>
      <ImageCompressor />
      <ImageCompressorDescription />
    </>
  )
}
