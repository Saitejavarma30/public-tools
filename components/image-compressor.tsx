    'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Upload, Image as ImageIcon, RotateCcw, FileImage, Settings } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface ImageFile {
  file: File
  preview: string
  originalSize: number
  compressedSize?: number
  compressedBlob?: Blob
  compressedUrl?: string
  isCompressing?: boolean
}

interface CompressionSettings {
  quality: number
  width?: number
  height?: number
  maintainAspectRatio: boolean
}

export function ImageCompressor() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [compressionSettings, setCompressionSettings] = useState<CompressionSettings>({
    quality: 80,
    maintainAspectRatio: true
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getImageFormat = (mimeType: string) => {
    const formats: { [key: string]: string } = {
      'image/jpeg': 'JPEG',
      'image/jpg': 'JPEG',
      'image/png': 'PNG',
      'image/webp': 'WebP',
      'image/avif': 'AVIF',
      'image/gif': 'GIF',
      'image/bmp': 'BMP',
      'image/tiff': 'TIFF'
    }
    return formats[mimeType] || 'Unknown'
  }

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return

    const newImages: ImageFile[] = []
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData: ImageFile = {
            file,
            preview: e.target?.result as string,
            originalSize: file.size
          }
          newImages.push(imageData)
          
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }, [])

  const compressImage = useCallback(async (
    imageFile: ImageFile, 
    quality: number = 80,
    width?: number,
    height?: number,
    maintainAspectRatio: boolean = true
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let { width: imgWidth, height: imgHeight } = img

        // Calculate new dimensions if resizing is requested
        if (width || height) {
          if (maintainAspectRatio) {
            const aspectRatio = imgWidth / imgHeight
            if (width && !height) {
              imgHeight = width / aspectRatio
              imgWidth = width
            } else if (height && !width) {
              imgWidth = height * aspectRatio
              imgHeight = height
            } else if (width && height) {
              // Use the smaller dimension to maintain aspect ratio
              const widthRatio = width / imgWidth
              const heightRatio = height / imgHeight
              const ratio = Math.min(widthRatio, heightRatio)
              imgWidth = imgWidth * ratio
              imgHeight = imgHeight * ratio
            }
          } else {
            imgWidth = width || imgWidth
            imgHeight = height || imgHeight
          }
        }

        canvas.width = imgWidth
        canvas.height = imgHeight

        // Draw image on canvas
        ctx?.drawImage(img, 0, 0, imgWidth, imgHeight)

        // Compress to JPEG format (best for compression)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(`Successfully compressed image, size: ${blob.size} bytes`)
              resolve(blob)
            } else {
              console.error('Failed to compress image')
              reject(new Error('Compression failed'))
            }
          },
          'image/jpeg',
          quality / 100
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = imageFile.preview
    })
  }, [])

  const processImage = useCallback(async (imageFile: ImageFile) => {
    try {
      const blob = await compressImage(
        imageFile, 
        compressionSettings.quality,
        compressionSettings.width,
        compressionSettings.height,
        compressionSettings.maintainAspectRatio
      )
      
      const url = URL.createObjectURL(blob)
      
      return {
        ...imageFile,
        compressedBlob: blob,
        compressedUrl: url,
        compressedSize: blob.size
      }
    } catch (error) {
      console.error('Compression error:', error)
      return imageFile
    }
  }, [compressImage, compressionSettings])

  const handleCompress = useCallback(async () => {
    if (images.length === 0) {
      alert('Please upload some images first!')
      return
    }
    
    setIsProcessing(true)
    
    // Set all images to compressing state
    setImages(prev => prev.map(img => ({ ...img, isCompressing: true })))
    
    try {
      console.log(`Compressing ${images.length} images...`)
      const updatedImages = await Promise.all(
        images.map(image => processImage(image))
      )
      
      setImages(updatedImages)
      console.log('Compression completed successfully!')
    } catch (error) {
      console.error('Batch compression error:', error)
      alert('Compression failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }, [images, processImage])

  const downloadImage = useCallback((imageFile: ImageFile) => {
    if (!imageFile.compressedBlob) return

    const link = document.createElement('a')
    link.href = imageFile.compressedUrl!
    link.download = `${imageFile.file.name.split('.')[0]}_compressed.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const downloadAll = useCallback(() => {
    images.forEach(image => {
      if (image.compressedBlob) {
        downloadImage(image)
      }
    })
  }, [images, downloadImage])

  const clearImages = useCallback(() => {
    images.forEach(image => {
      if (image.compressedUrl) {
        URL.revokeObjectURL(image.compressedUrl)
      }
    })
    setImages([])
  }, [images])

  const compressionLevels = [
    { label: 'High Quality', value: 95, description: 'Larger file, best quality' },
    { label: 'Good Quality', value: 80, description: 'Balanced size and quality' },
    { label: 'Medium Quality', value: 60, description: 'Smaller file, good quality' },
    { label: 'Low Quality', value: 40, description: 'Small file, lower quality' }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6 overflow-x-hidden">
      {/* Top Banner Ad */}
      <div className="flex justify-center">
        <AdBanner 
          dataAdSlot="1270349401" 
          className="mb-4"
        />
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Image Compressor</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
            {images.length > 0 && (
              <Button
                onClick={clearImages}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            Drag and drop images here, or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PNG, JPG, WebP, AVIF, GIF, BMP, TIFF
          </p>
        </div>
      </div>

      {/* Compression Settings */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Compression Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality</label>
              <select
                value={compressionSettings.quality}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  quality: parseInt(e.target.value)
                }))}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                {compressionLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label} ({level.value}%) - {level.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Width (optional)</label>
              <Input
                type="number"
                placeholder="Auto"
                value={compressionSettings.width || ''}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  width: e.target.value ? parseInt(e.target.value) : undefined
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Height (optional)</label>
              <Input
                type="number"
                placeholder="Auto"
                value={compressionSettings.height || ''}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  height: e.target.value ? parseInt(e.target.value) : undefined
                }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="maintainAspectRatio"
              checked={compressionSettings.maintainAspectRatio}
              onChange={(e) => setCompressionSettings(prev => ({
                ...prev,
                maintainAspectRatio: e.target.checked
              }))}
              className="rounded"
            />
            <label htmlFor="maintainAspectRatio" className="text-sm">
              Maintain aspect ratio when resizing
            </label>
          </div>
        </div>
      )}

      {/* Compress Button */}
      {images.length > 0 && (
        <div className="space-y-4">
          <Button
            onClick={handleCompress}
            disabled={isProcessing}
            className={`flex items-center gap-2 w-full md:w-auto transition-all duration-200 ${
              isProcessing 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "hover:scale-105"
            }`}
            size="lg"
          >
            {isProcessing ? '🗜️ Compressing Images...' : '🗜️ Compress Images'}
          </Button>
        </div>
      )}

      {/* Middle Ad */}
      <div className="flex justify-center my-6">
        <AdSquare 
          dataAdSlot="1350240451" 
          className="mx-auto"
        />
      </div>

      {/* Results */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Images ({images.length})</h3>
            {images.some(img => img.compressedBlob) && (
              <Button
                onClick={downloadAll}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">
                      {image.file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getImageFormat(image.file.type)}
                    </span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Original: {formatFileSize(image.originalSize)}</span>
                      <span className="text-blue-500 font-medium">
                        {getImageFormat(image.file.type)}
                      </span>
                    </div>
                    {image.isCompressing && (
                      <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-2">
                        <div className="text-orange-600 dark:text-orange-400 font-semibold text-sm animate-pulse">
                          🗜️ Compressing to JPEG...
                        </div>
                      </div>
                    )}
                    {image.compressedSize && !image.isCompressing && (
                      <div className="space-y-2">
                        <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <div className="text-green-700 dark:text-green-300 font-bold text-sm mb-1">
                            ✅ COMPRESSION COMPLETE
                          </div>
                          <div className="text-green-600 dark:text-green-400 font-semibold text-base">
                            {getImageFormat(image.file.type)} → JPEG
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Compressed: {formatFileSize(image.compressedSize)}</span>
                          <span className="text-green-500 font-semibold">
                            -{Math.round((1 - image.compressedSize / image.originalSize) * 100)}% smaller
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {image.compressedBlob && !image.isCompressing && (
                    <Button
                      onClick={() => downloadImage(image)}
                      size="sm"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download JPEG
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
