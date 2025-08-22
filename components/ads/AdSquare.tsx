'use client'

import { useEffect, useRef } from 'react'

interface AdSquareProps {
  dataAdSlot: string
  className?: string
}

export function AdSquare({ dataAdSlot, className = "" }: AdSquareProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adPushed = useRef(false)

  useEffect(() => {
    // Only run on client-side and if ad hasn't been pushed yet
    const adTimeout = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 100); // A 100ms delay is usually sufficient

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(adTimeout);
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
          width: '300px', 
          height: '250px' 
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={dataAdSlot}
      />
    </div>
  )
}
