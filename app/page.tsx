import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AdBanner } from '@/components/ads'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Public Tools
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Free online developer utilities to help you build better software. Test regex patterns, format JSON, and more.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/regex-tester">
            <Button size="lg" className="text-lg px-8 py-3">
              Regex Tester & Visualizer
            </Button>
          </Link>
        </div>
        
        {/* Bottom Banner Ad */}
        <div className="flex justify-center mt-12">
          <AdBanner 
            dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER_BOTTOM || "1270349401"} 
            className="max-w-4xl"
          />
        </div>
      </div>
    </div>
  )
}
