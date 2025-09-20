'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, AlertCircle, CheckCircle2, Link, Search, Globe } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface UrlComponents {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  searchParams: Record<string, string>
}

export function UrlEncoder() {
  const [inputUrl, setInputUrl] = useState('')
  const [encodedUrl, setEncodedUrl] = useState('')
  const [decodedUrl, setDecodedUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [urlComponents, setUrlComponents] = useState<UrlComponents | null>(null)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const parseUrl = useCallback((url: string) => {
    try {
      const urlObj = new URL(url)
      const searchParams: Record<string, string> = {}
      urlObj.searchParams.forEach((value, key) => {
        searchParams[key] = value
      })

      return {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        searchParams
      }
    } catch (err) {
      return null
    }
  }, [])

  const handleEncode = () => {
    setError(null)
    if (!inputUrl.trim()) {
      setEncodedUrl('')
      return
    }
    
    try {
      const encoded = encodeURIComponent(inputUrl)
      setEncodedUrl(encoded)
    } catch (err) {
      setError('Failed to encode URL')
    }
  }

  const handleDecode = () => {
    setError(null)
    if (!encodedUrl.trim()) {
      setDecodedUrl('')
      return
    }
    
    try {
      const decoded = decodeURIComponent(encodedUrl)
      setDecodedUrl(decoded)
    } catch (err) {
      setError('Failed to decode URL')
    }
  }

  const handleUrlAnalysis = () => {
    setError(null)
    if (!inputUrl.trim()) {
      setUrlComponents(null)
      setIsValidUrl(false)
      return
    }

    const components = parseUrl(inputUrl)
    if (components) {
      setUrlComponents(components)
      setIsValidUrl(true)
    } else {
      setError('Invalid URL format')
      setUrlComponents(null)
      setIsValidUrl(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const sampleUrls = [
    'https://example.com/path?param=value&other=test',
    'https://api.example.com/v1/users?page=1&limit=10&search=john',
    'https://www.google.com/search?q=url+encoding&hl=en&safe=off',
    'https://github.com/user/repo/issues/123?tab=comments',
    'https://stackoverflow.com/questions/123456/how-to-encode-url'
  ]

  const specialChars = [
    { char: ' ', encoded: '%20', description: 'Space' },
    { char: '&', encoded: '%26', description: 'Ampersand' },
    { char: '=', encoded: '%3D', description: 'Equals' },
    { char: '?', encoded: '%3F', description: 'Question mark' },
    { char: '#', encoded: '%23', description: 'Hash' },
    { char: '+', encoded: '%2B', description: 'Plus' },
    { char: '/', encoded: '%2F', description: 'Forward slash' },
    { char: '\\', encoded: '%5C', description: 'Backslash' },
    { char: ':', encoded: '%3A', description: 'Colon' },
    { char: ';', encoded: '%3B', description: 'Semicolon' },
    { char: '@', encoded: '%40', description: 'At symbol' },
    { char: '!', encoded: '%21', description: 'Exclamation' },
    { char: '$', encoded: '%24', description: 'Dollar' },
    { char: "'", encoded: '%27', description: 'Single quote' },
    { char: '(', encoded: '%28', description: 'Left parenthesis' },
    { char: ')', encoded: '%29', description: 'Right parenthesis' },
    { char: '*', encoded: '%2A', description: 'Asterisk' },
    { char: ',', encoded: '%2C', description: 'Comma' },
    { char: '[', encoded: '%5B', description: 'Left bracket' },
    { char: ']', encoded: '%5D', description: 'Right bracket' }
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

      {/* URL Input */}
      <div className="space-y-2">
        <label htmlFor="url-input" className="text-sm font-medium">
          URL Input
        </label>
        <div className="flex gap-2">
          <Input
            id="url-input"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL to encode or analyze..."
            className="font-mono"
          />
          <Button onClick={handleUrlAnalysis} variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
      </div>

      {/* Sample URLs */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Sample URLs</label>
        <div className="flex flex-wrap gap-2">
          {sampleUrls.map((url, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputUrl(url)}
              className="text-xs"
            >
              {url.length > 30 ? `${url.substring(0, 30)}...` : url}
            </Button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleEncode} disabled={!inputUrl.trim()}>
          Encode URL
        </Button>
        <Button onClick={handleDecode} variant="outline" disabled={!encodedUrl.trim()}>
          Decode URL
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {/* URL Validation Status */}
      {inputUrl.trim() && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
          {isValidUrl ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500 font-medium">Valid URL</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">Invalid URL</span>
            </>
          )}
        </div>
      )}

      {/* Middle Ad */}
      <div className="flex justify-center my-6">
        <AdSquare 
          dataAdSlot="1350240451" 
          className="mx-auto"
        />
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="encoded" className="w-full">
        <TabsList>
          <TabsTrigger value="encoded">Encoded/Decoded</TabsTrigger>
          <TabsTrigger value="analysis">URL Analysis</TabsTrigger>
          <TabsTrigger value="reference">Reference</TabsTrigger>
        </TabsList>
        
        <TabsContent value="encoded" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Encoded Result */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Encoded URL</label>
                <Button 
                  onClick={() => copyToClipboard(encodedUrl)} 
                  variant="outline" 
                  size="sm"
                  disabled={!encodedUrl}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={encodedUrl}
                readOnly
                className="min-h-[100px] font-mono text-sm bg-muted"
                placeholder="Encoded result will appear here..."
              />
            </div>

            {/* Decoded Result */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Decoded URL</label>
                <Button 
                  onClick={() => copyToClipboard(decodedUrl)} 
                  variant="outline" 
                  size="sm"
                  disabled={!decodedUrl}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={decodedUrl}
                readOnly
                className="min-h-[100px] font-mono text-sm bg-muted"
                placeholder="Decoded result will appear here..."
              />
            </div>
          </div>

          {/* Base64 Input for Decoding */}
          <div className="space-y-2">
            <label htmlFor="encoded-input" className="text-sm font-medium">
              Encoded URL to Decode
            </label>
            <Textarea
              id="encoded-input"
              value={encodedUrl}
              onChange={(e) => setEncodedUrl(e.target.value)}
              placeholder="Paste encoded URL here to decode..."
              className="min-h-[80px] font-mono text-sm"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          {urlComponents ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Protocol</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.protocol}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hostname</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.hostname}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Port</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.port || 'Default'}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pathname</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.pathname}
                  </div>
                </div>
              </div>

              {urlComponents.search && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Query String</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.search}
                  </div>
                </div>
              )}

              {Object.keys(urlComponents.searchParams).length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Query Parameters</label>
                  <div className="space-y-2">
                    {Object.entries(urlComponents.searchParams).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="font-mono text-sm font-medium min-w-0 flex-1">{key}</span>
                        <span className="text-muted-foreground">=</span>
                        <span className="font-mono text-sm min-w-0 flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {urlComponents.hash && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hash Fragment</label>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {urlComponents.hash}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Enter a valid URL and click "Analyze" to see its components
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reference" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">URL Encoding Reference</h3>
            <p className="text-sm text-muted-foreground">
              Common characters and their URL-encoded equivalents:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {specialChars.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded">
                  <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">
                    {item.char}
                  </code>
                  <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">
                    {item.encoded}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* URL Statistics */}
      {inputUrl && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-md">
          <div className="text-center">
            <div className="text-2xl font-bold">{inputUrl.length}</div>
            <div className="text-xs text-muted-foreground">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{encodedUrl.length}</div>
            <div className="text-xs text-muted-foreground">Encoded Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {inputUrl.length > 0 ? Math.round((encodedUrl.length / inputUrl.length) * 100) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Size Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {urlComponents ? Object.keys(urlComponents.searchParams).length : 0}
            </div>
            <div className="text-xs text-muted-foreground">Parameters</div>
          </div>
        </div>
      )}
    </div>
  )
}
