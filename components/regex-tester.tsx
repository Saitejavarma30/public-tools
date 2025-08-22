'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Copy, Share2, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react'
import { encodeShareableUrl } from '@/lib/utils'
import { AdBanner, AdSquare } from '@/components/ads'

interface RegexMatch {
  match: string
  index: number
  groups: string[]
}

interface RegexFlags {
  global: boolean
  ignoreCase: boolean
  multiline: boolean
  dotAll: boolean
  unicode: boolean
  sticky: boolean
}

export function RegexTester() {
  const searchParams = useSearchParams()
  const [regex, setRegex] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState<RegexFlags>({
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false
  })
  const [matches, setMatches] = useState<RegexMatch[]>([])
  const [error, setError] = useState<string | null>(null)
  const [highlightedText, setHighlightedText] = useState('')
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false)

  // Load from URL params on mount
  useEffect(() => {
    const regexParam = searchParams.get('regex')
    const testParam = searchParams.get('test')
    const flagsParam = searchParams.get('flags')

    if (regexParam) setRegex(regexParam)
    if (testParam) setTestString(testParam)
    if (flagsParam) {
      const flagArray = flagsParam.split('')
      setFlags({
        global: flagArray.includes('g'),
        ignoreCase: flagArray.includes('i'),
        multiline: flagArray.includes('m'),
        dotAll: flagArray.includes('s'),
        unicode: flagArray.includes('u'),
        sticky: flagArray.includes('y')
      })
    }
  }, [searchParams])

  const processRegex = useCallback(() => {
    if (!regex || !testString) {
      setMatches([])
      setHighlightedText(testString)
      setError(null)
      return
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          const flagMap: Record<string, string> = {
            global: 'g',
            ignoreCase: 'i',
            multiline: 'm',
            dotAll: 's',
            unicode: 'u',
            sticky: 'y'
          }
          return flagMap[key]
        })
        .join('')

      const regexObj = new RegExp(regex, flagString)
      const foundMatches: RegexMatch[] = []
      let highlighted = testString

      if (flags.global) {
        let match
        while ((match = regexObj.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          })
          if (!flags.global) break
        }
      } else {
        const match = regexObj.exec(testString)
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          })
        }
      }

      // Create highlighted text
      if (foundMatches.length > 0) {
        let offset = 0
        foundMatches.forEach((match) => {
          const start = match.index + offset
          const end = start + match.match.length
          const before = highlighted.slice(0, start)
          const matchText = highlighted.slice(start, end)
          const after = highlighted.slice(end)
          highlighted = before + `<mark class="bg-yellow-300 text-black">${matchText}</mark>` + after
          offset += 47 // Length of mark tags
        })
      }

      setMatches(foundMatches)
      setHighlightedText(highlighted)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regular expression')
      setMatches([])
      setHighlightedText(testString)
    }
  }, [regex, testString, flags])

  useEffect(() => {
    processRegex()
  }, [processRegex])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        processRegex()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [processRegex])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareRegex = async () => {
    const flagArray = Object.entries(flags)
      .filter(([_, value]) => value)
      .map(([key, _]) => {
        const flagMap: Record<string, string> = {
          global: 'g',
          ignoreCase: 'i',
          multiline: 'm',
          dotAll: 's',
          unicode: 'u',
          sticky: 'y'
        }
        return flagMap[key]
      })

    const shareUrl = encodeShareableUrl(regex, testString, flagArray)
    await copyToClipboard(shareUrl)
  }

  const regexCheatsheet = [
    { pattern: '.', description: 'Any character except newline' },
    { pattern: '\\d', description: 'Any digit (0-9)' },
    { pattern: '\\w', description: 'Any word character (a-z, A-Z, 0-9, _)' },
    { pattern: '\\s', description: 'Any whitespace character' },
    { pattern: '^', description: 'Start of string' },
    { pattern: '$', description: 'End of string' },
    { pattern: '*', description: 'Zero or more of the preceding character' },
    { pattern: '+', description: 'One or more of the preceding character' },
    { pattern: '?', description: 'Zero or one of the preceding character' },
    { pattern: '{n}', description: 'Exactly n of the preceding character' },
    { pattern: '{n,}', description: 'n or more of the preceding character' },
    { pattern: '{n,m}', description: 'Between n and m of the preceding character' },
    { pattern: '[abc]', description: 'Any of the characters a, b, or c' },
    { pattern: '[^abc]', description: 'Any character except a, b, or c' },
    { pattern: '(abc)', description: 'Capture group' },
    { pattern: '(?:abc)', description: 'Non-capturing group' },
    { pattern: 'a|b', description: 'Either a or b' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Banner Ad */}
      <div className="flex justify-center">
        <AdBanner 
          dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER_TOP || "1270349401"} 
          className="mb-4"
        />
      </div>

      {/* Regex Input */}
      <div className="space-y-2">
        <label htmlFor="regex" className="text-sm font-medium">
          Regular Expression
        </label>
        <div className="flex gap-2">
          <span className="flex items-center text-lg font-mono">/</span>
          <Input
            id="regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter your regex pattern..."
            className="font-mono"
          />
          <span className="flex items-center text-lg font-mono">/</span>
        </div>
      </div>

      {/* Flags */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Flags</label>
        <div className="flex flex-wrap gap-4">
          {Object.entries(flags).map(([key, value]) => {
            const flagLabels: Record<string, string> = {
              global: 'Global (g)',
              ignoreCase: 'Ignore Case (i)',
              multiline: 'Multiline (m)',
              dotAll: 'Dot All (s)',
              unicode: 'Unicode (u)',
              sticky: 'Sticky (y)'
            }
            
            return (
              <div key={key} className="flex items-center space-x-2">
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => 
                    setFlags(prev => ({ ...prev, [key]: checked }))
                  }
                />
                <label htmlFor={key} className="text-sm">
                  {flagLabels[key]}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <label htmlFor="testString" className="text-sm font-medium">
          Test String
        </label>
        <Textarea
          id="testString"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against your regex..."
          className="min-h-[120px] font-mono"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={() => copyToClipboard(regex)} variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Copy Regex
        </Button>
        <Button onClick={() => copyToClipboard(matches.map(m => m.match).join('\n'))} variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Copy Matches
        </Button>
        <Button onClick={shareRegex} variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Middle Ad */}
      <div className="flex justify-center my-6">
        <AdSquare 
          dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_SQUARE_MIDDLE || "1350240451"} 
          className="mx-auto"
        />
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="test" className="w-full">
        <TabsList>
          <TabsTrigger value="test">Test Results</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="test" className="space-y-4">
          {/* Match Summary */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              {matches.length} match{matches.length !== 1 ? 'es' : ''} found
            </span>
          </div>

          {/* Highlighted Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Highlighted Matches</label>
            <div 
              className="p-3 bg-muted rounded-md font-mono text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>

          {/* Match Details */}
          {matches.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Match Details</label>
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <div className="text-sm font-medium">Match {index + 1}</div>
                    <div className="text-sm text-muted-foreground">
                      Position: {match.index}-{match.index + match.match.length}
                    </div>
                    <div className="text-sm font-mono bg-background p-2 rounded mt-2">
                      {match.match}
                    </div>
                    {match.groups.length > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium">Groups:</div>
                        {match.groups.map((group, groupIndex) => (
                          <div key={groupIndex} className="text-sm font-mono bg-background p-2 rounded mt-1">
                            Group {groupIndex + 1}: {group || '(empty)'}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="visualization" className="space-y-4">
          <div className="p-6 bg-muted rounded-md text-center">
            <h3 className="text-lg font-medium mb-2">Regex Visualization</h3>
            <p className="text-muted-foreground mb-4">
              Visual breakdown of your regular expression pattern
            </p>
            {regex ? (
              <div className="font-mono text-sm bg-background p-4 rounded">
                <div className="text-left">
                  <div className="mb-2 font-semibold">Pattern: /{regex}/</div>
                  <div className="text-muted-foreground">
                    This is a simplified visualization. For complex patterns, consider using specialized regex visualization tools.
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Enter a regex pattern to see its visualization</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Regex Cheatsheet */}
      <Collapsible open={cheatsheetOpen} onOpenChange={setCheatsheetOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Regex Cheatsheet
            <ChevronDown className={`h-4 w-4 transition-transform ${cheatsheetOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {regexCheatsheet.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded">
                  {item.pattern}
                </code>
                <span className="text-sm text-muted-foreground">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Keyboard Shortcuts */}
      <div className="text-xs text-muted-foreground">
        <strong>Tip:</strong> Press Ctrl+Enter (Cmd+Enter on Mac) to test your regex
      </div>
    </div>
  )
}
