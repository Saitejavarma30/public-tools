'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation() {
  const pathname = usePathname()

  const navigationItems = [
    { href: '/regex-tester', label: 'Regex Tester' },
    { href: '/json-parser', label: 'JSON Parser' },
    { href: '/base64-encoder', label: 'Base64 Tool' },
    { href: '/url-encoder', label: 'URL Encoder' },
    { href: '/hash-generator', label: 'Hash Generator' },
    { href: '/color-picker', label: 'Color Picker' },
    { href: '/privacy', label: 'Privacy' },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors hover:text-foreground/80 ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
