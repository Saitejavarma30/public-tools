'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
  className?: string
}

export function AdBanner({ 
  dataAdSlot, 
  dataAdFormat = "auto", 
  dataFullWidthResponsive = true,
  className = ""
}: AdBannerProps) {
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
          display: 'block',
          minHeight: 90,
          width: '100%' 
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  )
}


{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7038543112980969"
     crossorigin="anonymous"></script>
<!-- public-tools topbar -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7038543112980969"
     data-ad-slot="1270349401"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}
