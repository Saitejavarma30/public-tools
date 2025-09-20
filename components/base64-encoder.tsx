'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download, Upload, AlertCircle, CheckCircle2, FileText, Image, Type } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

export function Base64Encoder() {
  const [inputText, setInputText] = useState('')
  const [encodedText, setEncodedText] = useState('')
  const [decodedText, setDecodedText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [urlSafe, setUrlSafe] = useState(false)
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')

  const encodeBase64 = useCallback((text: string) => {
    try {
      if (urlSafe) {
        return btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
      }
      return btoa(text)
    } catch (err) {
      setError('Failed to encode text')
      return ''
    }
  }, [urlSafe])

  const decodeBase64 = useCallback((text: string) => {
    try {
      let base64 = text
      if (urlSafe) {
        base64 = text.replace(/-/g, '+').replace(/_/g, '/')
        // Add padding if needed
        while (base64.length % 4) {
          base64 += '='
        }
      }
      return atob(base64)
    } catch (err) {
      setError('Invalid Base64 string')
      return ''
    }
  }, [urlSafe])

  const handleEncode = () => {
    setError(null)
    if (!inputText.trim()) {
      setEncodedText('')
      return
    }
    const encoded = encodeBase64(inputText)
    setEncodedText(encoded)
  }

  const handleDecode = () => {
    setError(null)
    if (!encodedText.trim()) {
      setDecodedText('')
      return
    }
    const decoded = decodeBase64(encodedText)
    setDecodedText(decoded)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        // Remove data URL prefix if present
        const base64 = result.includes(',') ? result.split(',')[1] : result
        setEncodedText(base64)
        setInputText(`File: ${file.name} (${file.size} bytes)`)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadAsFile = (base64: string, filename: string) => {
    try {
      const binaryString = atob(base64)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([bytes])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to decode file')
    }
  }

  const sampleTexts = [
    { name: 'Hello World', text: 'Hello, World!' },
    { name: 'JSON Example', text: '{"name": "John", "age": 30}' },
    { name: 'URL Example', text: 'https://example.com/path?param=value' },
    { name: 'Special Chars', text: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?' }
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

      {/* URL Safe Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="url-safe"
          checked={urlSafe}
          onCheckedChange={setUrlSafe}
        />
        <label htmlFor="url-safe" className="text-sm font-medium">
          URL-safe encoding (RFC 4648)
        </label>
      </div>

      {/* Input Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'text' | 'file')}>
        <TabsList>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            File
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="input-text" className="text-sm font-medium">
              Text to Encode
            </label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to encode..."
              className="min-h-[120px] font-mono text-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputText(sample.text)}
              >
                {sample.name}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload File</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </Button>
              <span className="text-sm text-muted-foreground">
                Supports any file type
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleEncode} disabled={!inputText.trim()}>
          Encode to Base64
        </Button>
        <Button onClick={handleDecode} variant="outline" disabled={!encodedText.trim()}>
          Decode from Base64
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Encoded Result */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Base64 Encoded</label>
            <div className="flex gap-2">
              <Button 
                onClick={() => copyToClipboard(encodedText)} 
                variant="outline" 
                size="sm"
                disabled={!encodedText}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button 
                onClick={() => downloadText(encodedText, 'encoded.txt')} 
                variant="outline" 
                size="sm"
                disabled={!encodedText}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={encodedText}
            readOnly
            className="min-h-[120px] font-mono text-sm bg-muted"
            placeholder="Encoded result will appear here..."
          />
        </div>

        {/* Decoded Result */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Decoded Text</label>
            <div className="flex gap-2">
              <Button 
                onClick={() => copyToClipboard(decodedText)} 
                variant="outline" 
                size="sm"
                disabled={!decodedText}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button 
                onClick={() => downloadText(decodedText, 'decoded.txt')} 
                variant="outline" 
                size="sm"
                disabled={!decodedText}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={decodedText}
            readOnly
            className="min-h-[120px] font-mono text-sm bg-muted"
            placeholder="Decoded result will appear here..."
          />
        </div>
      </div>

      {/* Base64 Input for Decoding */}
      <div className="space-y-2">
        <label htmlFor="base64-input" className="text-sm font-medium">
          Base64 to Decode
        </label>
        <Textarea
          id="base64-input"
          value={encodedText}
          onChange={(e) => setEncodedText(e.target.value)}
          placeholder="Paste Base64 string here to decode..."
          className="min-h-[100px] font-mono text-sm"
        />
      </div>

      {/* File Download Section */}
      {encodedText && (
        <div className="p-4 bg-muted rounded-md">
          <h3 className="text-sm font-medium mb-2">Download as File</h3>
          <p className="text-xs text-muted-foreground mb-3">
            If this Base64 represents a file, you can download it:
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={() => downloadAsFile(encodedText, 'decoded-file.bin')} 
              variant="outline" 
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download as Binary
            </Button>
          </div>
        </div>
      )}

      {/* Statistics */}
      {encodedText && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-md">
          <div className="text-center">
            <div className="text-2xl font-bold">{encodedText.length}</div>
            <div className="text-xs text-muted-foreground">Encoded Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{inputText.length}</div>
            <div className="text-xs text-muted-foreground">Original Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {inputText.length > 0 ? Math.round((encodedText.length / inputText.length) * 100) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Size Increase</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round((encodedText.length / 1024) * 100) / 100}KB
            </div>
            <div className="text-xs text-muted-foreground">Encoded Size</div>
          </div>
        </div>
      )}

      {/* Detailed Description Section */}
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">What is Base64 Encoding?</h2>
          <p className="text-muted-foreground mb-4">
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's widely used to encode data that needs to be stored and transferred over media designed to deal with text. Base64 encoding is essential for embedding binary data in JSON, XML, email attachments, and web applications.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Key Features of Our Base64 Encoder:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Text Encoding:</strong> Convert any text string to Base64 format</li>
            <li><strong>File Encoding:</strong> Upload and encode files of any type to Base64</li>
            <li><strong>URL-Safe Encoding:</strong> Generate URL-safe Base64 with RFC 4648 standard</li>
            <li><strong>Real-time Processing:</strong> Instant encoding and decoding as you type</li>
            <li><strong>Copy & Download:</strong> Easy copying and downloading of encoded/decoded content</li>
            <li><strong>File Download:</strong> Download decoded Base64 as binary files</li>
            <li><strong>Statistics:</strong> View encoding statistics and size comparisons</li>
            <li><strong>No Registration:</strong> Use all features without creating an account</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Web Development:</strong> Embed images and files in HTML/CSS/JSON</li>
            <li><strong>Email Attachments:</strong> Encode binary files for email transmission</li>
            <li><strong>API Development:</strong> Send binary data through JSON APIs</li>
            <li><strong>Data Storage:</strong> Store binary data in text-based databases</li>
            <li><strong>Configuration Files:</strong> Embed small files in configuration data</li>
            <li><strong>Data Transmission:</strong> Send binary data over text-only protocols</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What is Base64 encoding and why is it used?</h3>
              <p className="text-muted-foreground">
                <strong>Base64 encoding</strong> converts binary data into a text format using 64 characters (A-Z, a-z, 0-9, +, /). It's used when you need to transmit binary data over text-based protocols like HTTP, email, or store binary data in text formats like JSON or XML. Base64 ensures data integrity during transmission.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What's the difference between regular Base64 and URL-safe Base64?</h3>
              <p className="text-muted-foreground">
                <strong>Regular Base64</strong> uses characters + and / which have special meanings in URLs. <strong>URL-safe Base64</strong> (RFC 4648) replaces + with - and / with _ to make the encoded string safe for use in URLs and filenames. Our tool supports both formats.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Can I encode large files with Base64?</h3>
              <p className="text-muted-foreground">
                Yes, our Base64 encoder can handle large files. However, Base64 encoding increases file size by approximately 33%. For very large files, consider the memory limitations of your browser. The tool processes files locally in your browser for maximum security and privacy.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How do I decode Base64 back to the original file?</h3>
              <p className="text-muted-foreground">
                Paste your Base64 string into the decoder section and click "Decode from Base64". If the Base64 represents a file, use the "Download as Binary" button to save it as the original file format. The tool automatically detects the file type and provides the correct download.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Is Base64 encoding secure for sensitive data?</h3>
              <p className="text-muted-foreground">
                <strong>Base64 is not encryption</strong> - it's encoding. Anyone can decode Base64 data easily. It's designed for data transmission, not security. For sensitive data, use proper encryption before Base64 encoding. Our tool processes everything locally, so your data never leaves your browser.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Why does Base64 increase file size?</h3>
              <p className="text-muted-foreground">
                Base64 converts every 3 bytes of binary data into 4 characters of text, resulting in a 33% size increase. This happens because binary data uses 8 bits per byte, while Base64 uses 6 bits per character, requiring more characters to represent the same amount of data.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Can I use Base64 for images in web development?</h3>
              <p className="text-muted-foreground">
                Yes! Base64-encoded images can be embedded directly in HTML using data URLs: <code>&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."&gt;</code>. This eliminates the need for separate image files but increases HTML size. Use for small images or when you need to reduce HTTP requests.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What are the limitations of Base64 encoding?</h3>
              <p className="text-muted-foreground">
                Base64 limitations include: <strong>33% size increase</strong>, <strong>not suitable for large files</strong> due to memory constraints, <strong>not secure</strong> (encoding, not encryption), <strong>slower processing</strong> than binary transmission, and <strong>not human-readable</strong> for debugging purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
