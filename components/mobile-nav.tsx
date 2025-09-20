'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/regex-tester', label: 'Regex Tester' },
    { href: '/json-parser', label: 'JSON Parser' },
    { href: '/base64-encoder', label: 'Base64 Tool' },
    { href: '/url-encoder', label: 'URL Encoder' },
    { href: '/hash-generator', label: 'Hash Generator' },
    { href: '/color-picker', label: 'Color Picker' },
    { href: '/image-converter', label: 'Image Converter' },
    { href: '/privacy', label: 'Privacy' },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border/40 shadow-lg md:hidden">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-muted rounded-md ${
                    isActive ? 'text-foreground bg-muted' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
