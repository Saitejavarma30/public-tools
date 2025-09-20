'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Palette, Eye, Contrast, RefreshCw } from 'lucide-react'
import { AdBanner, AdSquare } from '@/components/ads'

interface ColorFormats {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  cmyk: { c: number; m: number; y: number; k: number }
}

interface ContrastRatio {
  ratio: number
  level: string
  status: 'pass' | 'fail'
}

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [colorFormats, setColorFormats] = useState<ColorFormats>({
    hex: '#3b82f6',
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
    cmyk: { c: 76, m: 47, y: 0, k: 4 }
  })
  const [contrastRatio, setContrastRatio] = useState<ContrastRatio>({
    ratio: 4.5,
    level: 'AA',
    status: 'pass'
  })
  const [palette, setPalette] = useState<string[]>([])

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const k = 1 - Math.max(r, g, b)
    const c = (1 - r - k) / (1 - k) || 0
    const m = (1 - g - k) / (1 - k) || 0
    const y = (1 - b - k) / (1 - k) || 0

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)
    
    if (!rgb1 || !rgb2) return 1

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
    
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  }

  const generatePalette = useCallback((baseColor: string) => {
    const rgb = hexToRgb(baseColor)
    if (!rgb) return

    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors: string[] = []

    // Generate monochromatic palette
    for (let i = 0; i < 5; i++) {
      const newL = Math.max(10, Math.min(90, l + (i - 2) * 15))
      const newColor = `hsl(${h}, ${s}%, ${newL}%)`
      colors.push(newColor)
    }

    // Generate complementary colors
    const complementary = (h + 180) % 360
    colors.push(`hsl(${complementary}, ${s}%, ${l}%)`)
    
    // Generate triadic colors
    const triadic1 = (h + 120) % 360
    const triadic2 = (h + 240) % 360
    colors.push(`hsl(${triadic1}, ${s}%, ${l}%)`)
    colors.push(`hsl(${triadic2}, ${s}%, ${l}%)`)

    setPalette(colors)
  }, [])

  const updateColor = useCallback((hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) {
      // If hex is invalid, keep the current formats but update the hex display
      setColorFormats(prev => ({
        ...prev,
        hex
      }))
      return
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

    setColorFormats({
      hex,
      rgb,
      hsl,
      cmyk
    })

    generatePalette(hex)
  }, [generatePalette])

  useEffect(() => {
    updateColor(selectedColor)
  }, [selectedColor, updateColor])

  useEffect(() => {
    const ratio = getContrastRatio(selectedColor, '#ffffff')
    const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'
    const status = ratio >= 4.5 ? 'pass' : 'fail'
    
    setContrastRatio({
      ratio: Math.round(ratio * 100) / 100,
      level,
      status
    })
  }, [selectedColor])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleHexChange = (hex: string) => {
    // Allow partial input while typing
    if (hex === '' || /^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
      setSelectedColor(hex)
    }
  }

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...colorFormats.rgb, [component]: Math.max(0, Math.min(255, value)) }
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setSelectedColor(hex)
  }

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...colorFormats.hsl, [component]: Math.max(0, Math.min(component === 'h' ? 360 : 100, value)) }
    // Convert HSL back to RGB and then to HEX
    const { h, s, l } = newHsl
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l / 100 - c / 2
    
    let r = 0, g = 0, b = 0
    if (0 <= h && h < 60) { r = c; g = x; b = 0 }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0 }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x }
    
    const rgb = {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    }
    
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setSelectedColor(hex)
  }

  const presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e', '#64748b', '#374151', '#000000'
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

      {/* Color Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Display */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Color Picker</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-16 h-16 rounded-lg border border-border cursor-pointer"
              />
              <div className="flex-1">
                <Input
                  value={selectedColor}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#000000"
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <div 
              className="w-full h-24 rounded-lg border border-border"
              style={{ backgroundColor: selectedColor }}
            />
          </div>

          {/* Preset Colors */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Preset Colors</label>
            <div className="grid grid-cols-10 gap-2">
              {presetColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Color Formats */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Formats</h3>
          
          {/* HEX */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HEX</label>
            <div className="flex gap-2">
              <Input
                value={colorFormats.hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="font-mono"
              />
              <Button
                onClick={() => copyToClipboard(colorFormats.hex)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* RGB */}
          <div className="space-y-2">
            <label className="text-sm font-medium">RGB</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={colorFormats.rgb.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="255"
              />
              <Input
                type="number"
                value={colorFormats.rgb.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="255"
              />
              <Input
                type="number"
                value={colorFormats.rgb.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="255"
              />
              <Button
                onClick={() => copyToClipboard(`rgb(${colorFormats.rgb.r}, ${colorFormats.rgb.g}, ${colorFormats.rgb.b})`)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HSL</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={colorFormats.hsl.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="360"
              />
              <Input
                type="number"
                value={colorFormats.hsl.s}
                onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="100"
              />
              <Input
                type="number"
                value={colorFormats.hsl.l}
                onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                className="font-mono"
                min="0"
                max="100"
              />
              <Button
                onClick={() => copyToClipboard(`hsl(${colorFormats.hsl.h}, ${colorFormats.hsl.s}%, ${colorFormats.hsl.l}%)`)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* CMYK */}
          <div className="space-y-2">
            <label className="text-sm font-medium">CMYK</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={colorFormats.cmyk.c}
                readOnly
                className="font-mono"
              />
              <Input
                type="number"
                value={colorFormats.cmyk.m}
                readOnly
                className="font-mono"
              />
              <Input
                type="number"
                value={colorFormats.cmyk.y}
                readOnly
                className="font-mono"
              />
              <Input
                type="number"
                value={colorFormats.cmyk.k}
                readOnly
                className="font-mono"
              />
              <Button
                onClick={() => copyToClipboard(`cmyk(${colorFormats.cmyk.c}%, ${colorFormats.cmyk.m}%, ${colorFormats.cmyk.y}%, ${colorFormats.cmyk.k}%)`)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Ad */}
      <div className="flex justify-center my-6">
        <AdSquare 
          dataAdSlot="1350240451" 
          className="mx-auto"
        />
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="palette" className="w-full">
        <TabsList>
          <TabsTrigger value="palette">Color Palette</TabsTrigger>
          <TabsTrigger value="contrast">Contrast Checker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="palette" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Generated Palette</h3>
              <Button
                onClick={() => generatePalette(selectedColor)}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-16 rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                  <div className="text-center">
                    <p className="text-xs font-mono">{color}</p>
                    <Button
                      onClick={() => copyToClipboard(color)}
                      variant="outline"
                      size="sm"
                      className="mt-1"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contrast" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Accessibility Contrast</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* White Background */}
              <div className="space-y-2">
                <label className="text-sm font-medium">White Background</label>
                <div className="p-4 rounded-lg border border-border" style={{ backgroundColor: '#ffffff' }}>
                  <div 
                    className="text-2xl font-bold p-2 rounded"
                    style={{ color: selectedColor }}
                  >
                    Sample Text
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  <span className="text-sm">
                    Ratio: {contrastRatio.ratio}:1 ({contrastRatio.level})
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    contrastRatio.status === 'pass' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {contrastRatio.status === 'pass' ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>

              {/* Black Background */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Black Background</label>
                <div className="p-4 rounded-lg border border-border" style={{ backgroundColor: '#000000' }}>
                  <div 
                    className="text-2xl font-bold p-2 rounded"
                    style={{ color: selectedColor }}
                  >
                    Sample Text
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  <span className="text-sm">
                    Ratio: {Math.round(getContrastRatio(selectedColor, '#000000') * 100) / 100}:1
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">WCAG Guidelines</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>AA (Normal text):</strong> 4.5:1 contrast ratio minimum</li>
                <li>• <strong>AA (Large text):</strong> 3:1 contrast ratio minimum</li>
                <li>• <strong>AAA (Normal text):</strong> 7:1 contrast ratio minimum</li>
                <li>• <strong>AAA (Large text):</strong> 4.5:1 contrast ratio minimum</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Description Section */}
      <div className="mt-12 space-y-8">
        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">What is a Color Picker & Converter?</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              A color picker and converter is an essential tool for designers, developers, and digital artists. 
              It allows you to select colors visually and convert them between different color formats used in 
              web development, graphic design, and digital media. Understanding color formats is crucial for 
              creating consistent, accessible, and visually appealing designs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></span>
                    HEX Color Format
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    HEX (Hexadecimal) is the most common color format in web development. It uses a 6-digit 
                    hexadecimal number preceded by a hash (#) to represent colors.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">#3b82f6</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: #RRGGBB (Red, Green, Blue in hexadecimal)
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                    <li>• Used in CSS, HTML, and most web technologies</li>
                    <li>• Each pair represents red, green, and blue values (0-255)</li>
                    <li>• Supports 16,777,216 different colors</li>
                    <li>• Case insensitive (#FF0000 = #ff0000)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></span>
                    RGB Color Format
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    RGB (Red, Green, Blue) represents colors using three numerical values for each primary color component.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">rgb(59, 130, 246)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: rgb(Red, Green, Blue) - each value 0-255
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                    <li>• Used in CSS and many design applications</li>
                    <li>• Each value ranges from 0 to 255</li>
                    <li>• Additive color model (combines light)</li>
                    <li>• Basis for most digital color systems</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}></span>
                    HSL Color Format
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    HSL (Hue, Saturation, Lightness) represents colors in a more intuitive way, similar to how 
                    artists think about color.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">hsl(217, 91%, 60%)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: hsl(Hue, Saturation%, Lightness%)
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                    <li>• Hue: 0-360° (color wheel position)</li>
                    <li>• Saturation: 0-100% (color intensity)</li>
                    <li>• Lightness: 0-100% (brightness)</li>
                    <li>• Great for creating color variations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></span>
                    CMYK Color Format
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    CMYK (Cyan, Magenta, Yellow, Key/Black) is used primarily in print design and represents 
                    how colors are created by mixing inks.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-mono text-sm">cmyk(76%, 47%, 0%, 4%)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: cmyk(Cyan%, Magenta%, Yellow%, Black%)
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                    <li>• Used in professional printing</li>
                    <li>• Each value represents ink percentage (0-100%)</li>
                    <li>• Subtractive color model (absorbs light)</li>
                    <li>• Key (K) represents black ink</li>
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
                <Palette className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Visual Color Picker</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Interactive color picker with preset colors for quick selection and visual feedback.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Format Conversion</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Convert between HEX, RGB, HSL, and CMYK formats with real-time updates.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Color Palette Generation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate monochromatic, complementary, and triadic color palettes automatically.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Contrast className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold">Accessibility Checker</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Check color contrast ratios against WCAG guidelines for accessibility compliance.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Copy className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">One-Click Copy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Copy color values in any format with a single click for easy use in your projects.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500"></span>
                <h3 className="font-semibold">Real-time Preview</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                See color changes instantly with live preview and contrast testing on different backgrounds.
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
                  <li>• CSS color values for styling websites</li>
                  <li>• Brand color consistency across projects</li>
                  <li>• Theme color selection for applications</li>
                  <li>• Accessibility-compliant color schemes</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Graphic Design</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Print design color preparation</li>
                  <li>• Logo and branding color selection</li>
                  <li>• Color palette creation for projects</li>
                  <li>• CMYK conversion for printing</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Digital Art</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Digital painting color selection</li>
                  <li>• Color harmony and theory application</li>
                  <li>• Palette generation for artwork</li>
                  <li>• Color temperature adjustments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">UI/UX Design</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Interface color scheme design</li>
                  <li>• Accessibility compliance checking</li>
                  <li>• User experience color optimization</li>
                  <li>• Cross-platform color consistency</li>
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
              <h3 className="font-semibold mb-2">What is the difference between RGB and CMYK?</h3>
              <p className="text-sm text-muted-foreground">
                RGB is an additive color model used for digital displays (screens, monitors) where colors are created by adding red, green, and blue light. CMYK is a subtractive color model used for printing where colors are created by subtracting cyan, magenta, yellow, and black inks from white paper.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Why do colors look different on screen vs. print?</h3>
              <p className="text-sm text-muted-foreground">
                Screens use RGB (light-based) while printers use CMYK (ink-based). RGB can display more vibrant colors than CMYK can print. Always convert RGB colors to CMYK before printing to see how they'll actually appear on paper.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What is color contrast and why is it important?</h3>
              <p className="text-sm text-muted-foreground">
                Color contrast is the difference in brightness between text and background colors. It's crucial for accessibility - people with visual impairments need sufficient contrast to read content. WCAG guidelines recommend 4.5:1 ratio for normal text and 3:1 for large text.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How do I create a harmonious color palette?</h3>
              <p className="text-sm text-muted-foreground">
                Use color theory principles: monochromatic (same hue, different saturation/lightness), complementary (opposite colors), triadic (three evenly spaced colors), or analogous (adjacent colors). Our tool generates these automatically based on your selected color.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What does HSL stand for and when should I use it?</h3>
              <p className="text-sm text-muted-foreground">
                HSL stands for Hue, Saturation, Lightness. It's intuitive for designers because it matches how we think about color. Use HSL when you want to easily create variations of a color by adjusting saturation or lightness while keeping the same hue.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I use any color format in CSS?</h3>
              <p className="text-sm text-muted-foreground">
                CSS supports HEX (#ff0000), RGB (rgb(255,0,0)), HSL (hsl(0,100%,50%)), and named colors (red). HEX is most common, RGB is good for transparency (rgba), and HSL is great for creating color variations programmatically.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What is the difference between 3-digit and 6-digit HEX codes?</h3>
              <p className="text-sm text-muted-foreground">
                3-digit HEX (#f00) is shorthand for 6-digit HEX (#ff0000). Each digit is duplicated: #f00 = #ff0000, #abc = #aabbcc. Both represent the same color, but 6-digit provides more precision and is more commonly used.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How do I ensure my colors are accessible?</h3>
              <p className="text-sm text-muted-foreground">
                Use our contrast checker to ensure your text/background combinations meet WCAG guidelines. Aim for at least 4.5:1 contrast ratio for normal text and 3:1 for large text. Test with both light and dark backgrounds to ensure versatility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
