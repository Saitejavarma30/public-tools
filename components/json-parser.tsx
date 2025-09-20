'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Download, Upload, AlertCircle, CheckCircle2, FileText, Minus, Plus } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface JsonError {
  message: string
  line?: number
  column?: number
}

export function JsonParser() {
  const searchParams = useSearchParams()
  const [inputJson, setInputJson] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [minifiedJson, setMinifiedJson] = useState('')
  const [error, setError] = useState<JsonError | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  // Load from URL params on mount
  useEffect(() => {
    const jsonParam = searchParams.get('json')
    if (jsonParam) {
      setInputJson(decodeURIComponent(jsonParam))
    }
  }, [searchParams])

  const processJson = useCallback(() => {
    if (!inputJson.trim()) {
      setFormattedJson('')
      setMinifiedJson('')
      setError(null)
      setIsValid(false)
      return
    }

    try {
      const parsed = JSON.parse(inputJson)
      const formatted = JSON.stringify(parsed, null, indentSize)
      const minified = JSON.stringify(parsed)
      
      setFormattedJson(formatted)
      setMinifiedJson(minified)
      setError(null)
      setIsValid(true)
    } catch (err) {
      const error = err as Error
      setError({
        message: error.message,
        line: error.message.match(/position (\d+)/)?.[1] ? 
          Math.floor(parseInt(error.message.match(/position (\d+)/)?.[1] || '0') / 50) + 1 : undefined
      })
      setFormattedJson('')
      setMinifiedJson('')
      setIsValid(false)
    }
  }, [inputJson, indentSize])

  useEffect(() => {
    processJson()
  }, [processJson])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadJson = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' })
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
        const content = e.target?.result as string
        setInputJson(content)
      }
      reader.readAsText(file)
    }
  }

  const sampleJson = {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    },
    "hobbies": ["reading", "coding", "traveling"],
    "isActive": true,
    "metadata": {
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": null
    }
  }

  const loadSample = () => {
    setInputJson(JSON.stringify(sampleJson, null, 2))
  }

  const convertToCsv = () => {
    if (!isValid) return ''
    
    try {
      const parsed = JSON.parse(inputJson)
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return ''
        
        const headers = Object.keys(parsed[0])
        const csvHeaders = headers.join(',')
        const csvRows = parsed.map(row => 
          headers.map(header => {
            const value = row[header]
            if (typeof value === 'string' && value.includes(',')) {
              return `"${value}"`
            }
            return value
          }).join(',')
        )
        
        return [csvHeaders, ...csvRows].join('\n')
      }
      return 'CSV conversion only works with JSON arrays'
    } catch {
      return 'Invalid JSON for CSV conversion'
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Ad */}
      <div className="flex justify-center">
        <AdBanner 
          dataAdSlot="1270349401" 
          className="mb-4"
        />
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="json-input" className="text-sm font-medium">
            JSON Input
          </label>
          <div className="flex items-center gap-2">
            <Button onClick={loadSample} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Load Sample
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" size="sm">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </label>
            </Button>
          </div>
        </div>
        
        <Textarea
          id="json-input"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder="Paste your JSON here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      {/* Indent Size Control */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Indent Size:</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIndentSize(Math.max(1, indentSize - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{indentSize}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIndentSize(Math.min(8, indentSize + 1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
          <div>
            <span className="text-sm text-destructive font-medium">JSON Error:</span>
            <p className="text-sm text-destructive mt-1">{error.message}</p>
            {error.line && (
              <p className="text-xs text-destructive/80 mt-1">Line: {error.line}</p>
            )}
          </div>
        </div>
      )}

      {/* Validation Status */}
      {inputJson.trim() && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
          {isValid ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500 font-medium">Valid JSON</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">Invalid JSON</span>
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
      <Tabs defaultValue="formatted" className="w-full">
        <TabsList>
          <TabsTrigger value="formatted">Formatted</TabsTrigger>
          <TabsTrigger value="minified">Minified</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formatted" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Formatted JSON</label>
              <div className="flex gap-2">
                <Button 
                  onClick={() => copyToClipboard(formattedJson)} 
                  variant="outline" 
                  size="sm"
                  disabled={!formattedJson}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={() => downloadJson(formattedJson, 'formatted.json')} 
                  variant="outline" 
                  size="sm"
                  disabled={!formattedJson}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={formattedJson}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="minified" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Minified JSON</label>
              <div className="flex gap-2">
                <Button 
                  onClick={() => copyToClipboard(minifiedJson)} 
                  variant="outline" 
                  size="sm"
                  disabled={!minifiedJson}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={() => downloadJson(minifiedJson, 'minified.json')} 
                  variant="outline" 
                  size="sm"
                  disabled={!minifiedJson}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={minifiedJson}
              readOnly
              className="min-h-[100px] font-mono text-sm bg-muted"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="csv" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">CSV Conversion</label>
              <div className="flex gap-2">
                <Button 
                  onClick={() => copyToClipboard(convertToCsv())} 
                  variant="outline" 
                  size="sm"
                  disabled={!isValid}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={() => downloadJson(convertToCsv(), 'converted.csv')} 
                  variant="outline" 
                  size="sm"
                  disabled={!isValid}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={convertToCsv()}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted"
              placeholder="CSV conversion only works with JSON arrays"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* JSON Statistics */}
      {isValid && (() => {
        try {
          const parsed = JSON.parse(inputJson)
          const stringified = JSON.stringify(parsed)
          return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-md">
              <div className="text-center">
                <div className="text-2xl font-bold">{stringified.length}</div>
                <div className="text-xs text-muted-foreground">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{inputJson.split('\n').length}</div>
                <div className="text-xs text-muted-foreground">Lines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0}</div>
                <div className="text-xs text-muted-foreground">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((stringified.length / 1024) * 100) / 100}KB</div>
                <div className="text-xs text-muted-foreground">Size</div>
              </div>
            </div>
          )
        } catch (err) {
          return null
        }
      })()}

    </div>
  )
}
