import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Public Tools',
  description: 'Privacy policy for Public Tools - how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground">
            Public Tools is committed to protecting your privacy. We collect minimal information to provide our services:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Usage data through Google Analytics for improving our services</li>
            <li>No personal information is stored or collected</li>
            <li>All regex patterns and test strings remain in your browser only</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Advertising</h2>
          <p className="text-muted-foreground">
            We use Google AdSense to display advertisements that help keep our tools free. Google may use cookies and other tracking technologies to serve personalized ads based on your interests.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Third-party vendors, including Google, use cookies to serve ads</li>
            <li>Google's use of advertising cookies enables it to serve ads based on your visits to this site and other sites</li>
            <li>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Google Ads Settings</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies to enhance your experience and serve relevant advertisements:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Advertising cookies for personalized ad experiences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            Your data security is important to us:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>All tools run entirely in your browser - no data is sent to our servers</li>
            <li>We use HTTPS encryption for all connections</li>
            <li>No personal information is stored or transmitted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-muted-foreground">
            We use the following third-party services:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Google Analytics:</strong> For understanding website usage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-muted-foreground">
            If you have any questions about this privacy policy, please contact us through our GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates</h2>
          <p className="text-muted-foreground">
            This privacy policy may be updated from time to time. We will notify users of any significant changes.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  )
}
