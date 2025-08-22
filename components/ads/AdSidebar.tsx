'use client'

import { useEffect, useRef } from 'react'

interface AdSidebarProps {
  dataAdSlot: string
  className?: string
}

export function AdSidebar({ dataAdSlot, className = "" }: AdSidebarProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adPushed = useRef(false)

  useEffect(() => {
    // Only run on client-side and if ad hasn't been pushed yet
    if (typeof window === 'undefined' || adPushed.current) return

    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      adPushed.current = true
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  // Only render if we have an adsense ID
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID) {
    return null
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'inline-block', 
          width: '160px', 
          height: '600px' 
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={dataAdSlot}
      />
    </div>
  )
}
