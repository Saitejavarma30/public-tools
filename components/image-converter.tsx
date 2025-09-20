'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download, Upload, Image as ImageIcon,  RotateCcw, FileImage, Settings } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface ImageFile {
  file: File
  preview: string
  originalSize: number
  convertedSize?: number
  convertedBlob?: Blob
  convertedUrl?: string
}

interface ConversionSettings {
  quality: number
  width?: number
  height?: number
  maintainAspectRatio: boolean
}

export function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
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

  const convertImage = useCallback(async (
    imageFile: ImageFile, 
    targetFormat: string, 
    quality: number = 80,
    width?: number,
    height?: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let { width: imgWidth, height: imgHeight } = img

        // Calculate new dimensions if resizing is requested
        if (width || height) {
          if (conversionSettings.maintainAspectRatio) {
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

        // Convert to target format
        const mimeType = `image/${targetFormat.toLowerCase()}`
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Conversion failed'))
            }
          },
          mimeType,
          quality / 100
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = imageFile.preview
    })
  }, [conversionSettings.maintainAspectRatio])

  const processImage = useCallback(async (imageFile: ImageFile, targetFormat: string) => {
    try {
      const blob = await convertImage(
        imageFile, 
        targetFormat, 
        conversionSettings.quality,
        conversionSettings.width,
        conversionSettings.height
      )
      
      const url = URL.createObjectURL(blob)
      
      return {
        ...imageFile,
        convertedBlob: blob,
        convertedUrl: url,
        convertedSize: blob.size
      }
    } catch (error) {
      console.error('Conversion error:', error)
      return imageFile
    }
  }, [convertImage, conversionSettings])

  const handleConvert = useCallback(async (targetFormat: string) => {
    setIsProcessing(true)
    
    try {
      const updatedImages = await Promise.all(
        images.map(image => processImage(image, targetFormat))
      )
      
      setImages(updatedImages)
    } catch (error) {
      console.error('Batch conversion error:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [images, processImage])

  const downloadImage = useCallback((imageFile: ImageFile) => {
    if (!imageFile.convertedBlob) return

    const link = document.createElement('a')
    link.href = imageFile.convertedUrl!
    link.download = `${imageFile.file.name.split('.')[0]}.${getImageFormat(imageFile.convertedBlob.type).toLowerCase()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const downloadAll = useCallback(() => {
    images.forEach(image => {
      if (image.convertedBlob) {
        downloadImage(image)
      }
    })
  }, [images, downloadImage])

  const clearImages = useCallback(() => {
    images.forEach(image => {
      if (image.convertedUrl) {
        URL.revokeObjectURL(image.convertedUrl)
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

  const supportedFormats = [
    { name: 'JPEG', extension: 'jpg', description: 'Best for photos, smaller file size' },
    { name: 'PNG', extension: 'png', description: 'Best for graphics, supports transparency' },
    { name: 'WebP', extension: 'webp', description: 'Modern format, excellent compression' },
    { name: 'AVIF', extension: 'avif', description: 'Next-gen format, best compression' }
  ]

  return (
    <div className="space-y-6">
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
          <h2 className="text-2xl font-bold">Image Converter & Compressor</h2>
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

      {/* Conversion Settings */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Conversion Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality</label>
              <select
                value={conversionSettings.quality}
                onChange={(e) => setConversionSettings(prev => ({
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
                value={conversionSettings.width || ''}
                onChange={(e) => setConversionSettings(prev => ({
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
                value={conversionSettings.height || ''}
                onChange={(e) => setConversionSettings(prev => ({
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
              checked={conversionSettings.maintainAspectRatio}
              onChange={(e) => setConversionSettings(prev => ({
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

      {/* Conversion Buttons */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Convert To</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {supportedFormats.map(format => (
              <Button
                key={format.extension}
                onClick={() => handleConvert(format.extension)}
                disabled={isProcessing}
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
              >
                <FileImage className="h-6 w-6 mb-2" />
                <span className="font-medium">{format.name}</span>
                <span className="text-xs text-muted-foreground text-center">
                  {format.description}
                </span>
              </Button>
            ))}
          </div>
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
            {images.some(img => img.convertedBlob) && (
              <Button
                onClick={downloadAll}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div>Original: {formatFileSize(image.originalSize)}</div>
                    {image.convertedSize && (
                      <div className="flex items-center justify-between">
                        <span>Converted: {formatFileSize(image.convertedSize)}</span>
                        <span className="text-green-500">
                          -{Math.round((1 - image.convertedSize / image.originalSize) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {image.convertedBlob && (
                    <Button
                      onClick={() => downloadImage(image)}
                      size="sm"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Description Section */}
      <div className="mt-12 space-y-8">
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">What is an Image Converter & Compressor?</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              An image converter and compressor is a powerful tool that allows you to transform images between different formats 
              and reduce file sizes while maintaining quality. This tool works entirely in your browser, ensuring your images 
              never leave your device, providing privacy and security for your files.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Image Format Conversion</h3>
                  <p className="text-muted-foreground mb-3">
                    Convert between popular image formats to optimize for different use cases and platforms.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>JPEG:</strong> Best for photos, smaller file sizes, no transparency</li>
                    <li>• <strong>PNG:</strong> Best for graphics, supports transparency, larger files</li>
                    <li>• <strong>WebP:</strong> Modern format, excellent compression, wide support</li>
                    <li>• <strong>AVIF:</strong> Next-generation format, best compression, growing support</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Image Compression</h3>
                  <p className="text-muted-foreground mb-3">
                    Reduce file sizes while maintaining visual quality through intelligent compression algorithms.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Quality Control:</strong> Adjust compression levels from 40% to 95%</li>
                    <li>• <strong>Size Reduction:</strong> Typically 20-80% smaller files</li>
                    <li>• <strong>Batch Processing:</strong> Convert multiple images at once</li>
                    <li>• <strong>Real-time Preview:</strong> See results before downloading</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Image Resizing</h3>
                  <p className="text-muted-foreground mb-3">
                    Resize images to specific dimensions while maintaining aspect ratios for optimal display.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Custom Dimensions:</strong> Set specific width and height</li>
                    <li>• <strong>Aspect Ratio:</strong> Maintain proportions automatically</li>
                    <li>• <strong>Smart Scaling:</strong> High-quality resampling algorithms</li>
                    <li>• <strong>Flexible Options:</strong> Resize by width, height, or both</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                  <p className="text-muted-foreground mb-3">
                    All processing happens locally in your browser - your images never leave your device.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Client-side Processing:</strong> No server uploads required</li>
                    <li>• <strong>Data Privacy:</strong> Images stay on your device</li>
                    <li>• <strong>Fast Processing:</strong> No network delays</li>
                    <li>• <strong>Offline Capable:</strong> Works without internet connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileImage className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Format Conversion</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Convert between JPEG, PNG, WebP, and AVIF formats with high-quality results.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Smart Compression</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Reduce file sizes by 20-80% while maintaining visual quality with adjustable compression levels.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Custom Resizing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Resize images to specific dimensions with aspect ratio preservation options.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">Batch Processing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload and convert multiple images simultaneously for efficient workflow.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Instant Download</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Download individual images or all converted images with a single click.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500"></span>
                <h3 className="font-semibold">Privacy First</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All processing happens locally in your browser - your images never leave your device.
              </p>
            </div>
          </div>
        </div>

        {/* Common Use Cases Section */}
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Web Development</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Optimize images for faster website loading</li>
                  <li>• Convert to WebP for modern browser support</li>
                  <li>• Resize images for responsive design</li>
                  <li>• Compress images for better performance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Social Media</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Resize images for platform requirements</li>
                  <li>• Compress photos for faster uploads</li>
                  <li>• Convert formats for compatibility</li>
                  <li>• Optimize for mobile viewing</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Email & Documents</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reduce file sizes for email attachments</li>
                  <li>• Convert formats for document compatibility</li>
                  <li>• Compress images for presentations</li>
                  <li>• Optimize for printing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Storage & Backup</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Compress images to save storage space</li>
                  <li>• Convert to efficient formats</li>
                  <li>• Batch process large collections</li>
                  <li>• Maintain quality while reducing size</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Is my data safe? Do images get uploaded to servers?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, your data is completely safe! All image processing happens locally in your browser using HTML5 Canvas API. 
                Your images never leave your device and are not uploaded to any servers. This ensures complete privacy and security.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What image formats are supported?</h3>
              <p className="text-sm text-muted-foreground">
                We support all major image formats including JPEG, PNG, WebP, AVIF, GIF, BMP, and TIFF for input. 
                You can convert to JPEG, PNG, WebP, and AVIF formats. The tool automatically detects the input format.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How much can I compress images without losing quality?</h3>
              <p className="text-sm text-muted-foreground">
                Compression results vary by image content. Photos can typically be compressed 20-60% with minimal quality loss, 
                while graphics may achieve 40-80% reduction. Use the quality slider to find the perfect balance for your needs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What's the difference between JPEG and PNG?</h3>
              <p className="text-sm text-muted-foreground">
                JPEG is best for photos with many colors and gradients, offering smaller file sizes but no transparency support. 
                PNG is ideal for graphics, logos, and images requiring transparency, but typically results in larger files.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Should I use WebP or AVIF format?</h3>
              <p className="text-sm text-muted-foreground">
                WebP offers excellent compression with broad browser support (95%+). AVIF provides even better compression 
                but has limited browser support (70%+). Use WebP for maximum compatibility, AVIF for cutting-edge compression.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I resize images while converting?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can set custom width and height values, and choose whether to maintain aspect ratio. 
                This is perfect for creating thumbnails, optimizing for specific display sizes, or reducing dimensions for faster loading.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How many images can I process at once?</h3>
              <p className="text-sm text-muted-foreground">
                You can upload and process multiple images simultaneously. The limit depends on your device's memory and processing power. 
                For best performance, we recommend processing 10-20 images at a time for large files.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Why is my converted image larger than the original?</h3>
              <p className="text-sm text-muted-foreground">
                This can happen when converting from a highly compressed format (like JPEG) to a less compressed format (like PNG), 
                or when using high quality settings. Try reducing the quality setting or choosing a more efficient output format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
