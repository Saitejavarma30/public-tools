'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Upload, FileText, Lock, Key, AlertCircle, CheckCircle2 } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface HashResult {
  algorithm: string
  hash: string
  length: number
}

export function HashGenerator() {
  const [inputText, setInputText] = useState('')
  const [hmacKey, setHmacKey] = useState('')
  const [useHmac, setUseHmac] = useState(false)
  const [hashResults, setHashResults] = useState<HashResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateHash = useCallback(async (text: string, algorithm: string, key?: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    if (useHmac && key) {
      const keyData = encoder.encode(key)
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algorithm },
        false,
        ['sign']
      )
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)
      const hashArray = Array.from(new Uint8Array(signature))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } else {
      const hashBuffer = await crypto.subtle.digest(algorithm, data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    }
  }, [useHmac])

  const generateAllHashes = async () => {
    if (!inputText.trim()) {
      setHashResults([])
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const algorithms = [
        { name: 'MD5', value: 'MD5' },
        { name: 'SHA-1', value: 'SHA-1' },
        { name: 'SHA-256', value: 'SHA-256' },
        { name: 'SHA-384', value: 'SHA-384' },
        { name: 'SHA-512', value: 'SHA-512' }
      ]

      const results: HashResult[] = []

      for (const algo of algorithms) {
        try {
          const hash = await generateHash(inputText, algo.value, hmacKey)
          results.push({
            algorithm: useHmac ? `HMAC-${algo.name}` : algo.name,
            hash,
            length: hash.length
          })
        } catch (err) {
          console.error(`Failed to generate ${algo.name}:`, err)
        }
      }

      setHashResults(results)
    } catch (err) {
      setError('Failed to generate hashes')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputText(content)
      }
      reader.readAsText(file)
    }
  }

  const sampleTexts = [
    'Hello, World!',
    'The quick brown fox jumps over the lazy dog',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Password123!',
    '{"name": "John", "age": 30}',
    'https://example.com/api/endpoint'
  ]

  const hashInfo = {
    'MD5': {
      description: 'Message Digest 5 - 128-bit hash',
      security: 'Deprecated for security purposes',
      use: 'Checksums, non-cryptographic applications'
    },
    'SHA-1': {
      description: 'Secure Hash Algorithm 1 - 160-bit hash',
      security: 'Deprecated for security purposes',
      use: 'Legacy systems, non-cryptographic applications'
    },
    'SHA-256': {
      description: 'Secure Hash Algorithm 256 - 256-bit hash',
      security: 'Cryptographically secure',
      use: 'Blockchain, digital signatures, password hashing'
    },
    'SHA-384': {
      description: 'Secure Hash Algorithm 384 - 384-bit hash',
      security: 'Cryptographically secure',
      use: 'High-security applications'
    },
    'SHA-512': {
      description: 'Secure Hash Algorithm 512 - 512-bit hash',
      security: 'Cryptographically secure',
      use: 'High-security applications, password hashing'
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
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium">
            Text to Hash
          </label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to generate hashes..."
            className="min-h-[120px] font-mono text-sm"
          />
        </div>

        {/* Sample Texts */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sample Texts</label>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((text, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputText(text)}
              >
                {text.length > 20 ? `${text.substring(0, 20)}...` : text}
              </Button>
            ))}
          </div>
        </div>

        {/* File Upload */}
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
              File content will be hashed
            </span>
          </div>
        </div>
      </div>

      {/* HMAC Settings */}
      <div className="space-y-4 p-4 bg-muted rounded-md">
        <div className="flex items-center space-x-2">
          <Switch
            id="use-hmac"
            checked={useHmac}
            onCheckedChange={setUseHmac}
          />
          <label htmlFor="use-hmac" className="text-sm font-medium">
            Use HMAC (Hash-based Message Authentication Code)
          </label>
        </div>
        
        {useHmac && (
          <div className="space-y-2">
            <label htmlFor="hmac-key" className="text-sm font-medium">
              HMAC Secret Key
            </label>
            <Input
              id="hmac-key"
              value={hmacKey}
              onChange={(e) => setHmacKey(e.target.value)}
              placeholder="Enter secret key for HMAC..."
              type="password"
              className="font-mono"
            />
          </div>
        )}
      </div>

      {/* Generate Button */}
      <Button 
        onClick={generateAllHashes} 
        disabled={!inputText.trim() || isGenerating || (useHmac && !hmacKey.trim())}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating Hashes...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Generate All Hashes
          </>
        )}
      </Button>

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
      {hashResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Generated Hashes</h3>
          <div className="space-y-3">
            {hashResults.map((result, index) => (
              <div key={index} className="p-4 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {useHmac ? (
                      <Key className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-green-500" />
                    )}
                    <span className="font-medium">{result.algorithm}</span>
                    <span className="text-xs text-muted-foreground">
                      ({result.length} characters)
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(result.hash)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="font-mono text-sm bg-background p-2 rounded break-all">
                  {result.hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hash Information */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Algorithm Info</TabsTrigger>
          <TabsTrigger value="security">Security Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(hashInfo).map(([algorithm, info]) => (
              <div key={algorithm} className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">{algorithm}</h4>
                <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                <p className="text-xs text-muted-foreground">
                  <strong>Use case:</strong> {info.use}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <h4 className="font-medium text-destructive mb-2">⚠️ Deprecated Algorithms</h4>
              <p className="text-sm text-destructive">
                <strong>MD5 and SHA-1</strong> are cryptographically broken and should not be used for security purposes. 
                They are vulnerable to collision attacks and should only be used for checksums or legacy compatibility.
              </p>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
              <h4 className="font-medium text-green-500 mb-2">✅ Recommended Algorithms</h4>
              <p className="text-sm text-green-500">
                <strong>SHA-256, SHA-384, and SHA-512</strong> are cryptographically secure and recommended for 
                security applications like digital signatures, password hashing, and blockchain technology.
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <h4 className="font-medium text-blue-500 mb-2">🔐 HMAC Security</h4>
              <p className="text-sm text-blue-500">
                <strong>HMAC</strong> (Hash-based Message Authentication Code) provides authentication and integrity. 
                It's secure when used with a strong secret key and a secure hash function like SHA-256.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      {inputText && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-md">
          <div className="text-center">
            <div className="text-2xl font-bold">{inputText.length}</div>
            <div className="text-xs text-muted-foreground">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{inputText.split('\n').length}</div>
            <div className="text-xs text-muted-foreground">Lines</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{hashResults.length}</div>
            <div className="text-xs text-muted-foreground">Hashes Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round((inputText.length / 1024) * 100) / 100}KB
            </div>
            <div className="text-xs text-muted-foreground">Input Size</div>
          </div>
        </div>
      )}

      {/* Detailed Description Section */}
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">What is a Hash Generator?</h2>
          <p className="text-muted-foreground mb-4">
            A hash generator is a cryptographic tool that converts input data (text, files, or any digital content) into a fixed-length string of characters called a hash. Hash functions are one-way mathematical algorithms that produce a unique fingerprint for any given input, making them essential for data integrity verification, password security, and digital signatures.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Key Features of Our Hash Generator:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Multiple Hash Algorithms:</strong> Support for MD5, SHA-1, SHA-256, SHA-384, and SHA-512</li>
            <li><strong>HMAC Generation:</strong> Create secure hash-based message authentication codes</li>
            <li><strong>Text & File Input:</strong> Generate hashes from text strings or uploaded files</li>
            <li><strong>Instant Results:</strong> Real-time hash generation with no delays</li>
            <li><strong>Copy & Download:</strong> Easy copying and downloading of generated hashes</li>
            <li><strong>Security Information:</strong> Learn about hash algorithm security and best practices</li>
            <li><strong>No Registration:</strong> Use all features without creating an account</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li><strong>Password Security:</strong> Hash passwords before storing in databases</li>
            <li><strong>File Integrity:</strong> Verify file downloads haven't been corrupted</li>
            <li><strong>Digital Signatures:</strong> Create unique identifiers for documents</li>
            <li><strong>Data Deduplication:</strong> Identify duplicate files or content</li>
            <li><strong>API Authentication:</strong> Generate HMAC signatures for secure API calls</li>
            <li><strong>Blockchain Technology:</strong> Create transaction hashes for cryptocurrency</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What is the difference between MD5, SHA-1, and SHA-256?</h3>
              <p className="text-muted-foreground">
                <strong>MD5</strong> produces a 128-bit hash and is fast but cryptographically broken. <strong>SHA-1</strong> creates a 160-bit hash and is also deprecated for security purposes. <strong>SHA-256</strong> generates a 256-bit hash and is currently secure and recommended for most applications. SHA-384 and SHA-512 provide even stronger security with longer hash lengths.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Is it safe to use MD5 or SHA-1 for password hashing?</h3>
              <p className="text-muted-foreground">
                <strong>No, MD5 and SHA-1 should not be used for password hashing</strong> as they are vulnerable to collision attacks and rainbow table attacks. Use SHA-256 or SHA-512 with a salt for password security, or better yet, use specialized password hashing algorithms like bcrypt, scrypt, or Argon2.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What is HMAC and when should I use it?</h3>
              <p className="text-muted-foreground">
                <strong>HMAC (Hash-based Message Authentication Code)</strong> combines a secret key with your data before hashing. It's used for API authentication, message integrity verification, and secure communication. HMAC ensures that only someone with the secret key can generate a valid hash for your data.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Can I generate hashes for large files?</h3>
              <p className="text-muted-foreground">
                Yes, our hash generator supports file uploads of any size. The tool will process the file content and generate hashes for MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. This is useful for verifying file integrity after downloads or transfers.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How do I verify if a file hash is correct?</h3>
              <p className="text-muted-foreground">
                Upload the file to our hash generator and compare the generated hash with the expected hash. If they match exactly, the file is intact and hasn't been modified. Even a single byte change will produce a completely different hash value.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What's the difference between a hash and encryption?</h3>
              <p className="text-muted-foreground">
                <strong>Hashing is one-way</strong> - you cannot reverse a hash to get the original data. <strong>Encryption is two-way</strong> - you can decrypt encrypted data back to its original form. Hashes are used for verification and integrity, while encryption is used for confidentiality and secure storage.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Are my inputs stored or logged anywhere?</h3>
              <p className="text-muted-foreground">
                <strong>No, we don't store or log any of your input data.</strong> All hash generation happens locally in your browser, and your data is never sent to our servers. This ensures complete privacy and security for sensitive information like passwords or confidential documents.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Which hash algorithm should I use for my project?</h3>
              <p className="text-muted-foreground">
                For <strong>general purposes</strong>, use SHA-256. For <strong>high-security applications</strong>, use SHA-512. For <strong>API authentication</strong>, use HMAC-SHA256. For <strong>legacy compatibility</strong> only, MD5 or SHA-1 (but avoid for new projects). Always consider your specific security requirements and compliance needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
