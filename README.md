# Public Tools - Free Developer Utilities

A collection of free, open-source developer tools built with Next.js 14+ and optimized for performance, SEO, and monetization through Google AdSense.

## 🚀 Live Demo

Visit the live application: [https://your-domain.com](https://your-domain.com)

## 🛠️ Available Tools

### Regex Tester & Visualizer
- **Real-time regex testing** with live match highlighting
- **All regex flags support** (g, i, m, s, u, y) with toggle switches
- **Copy & Share functionality** with URL encoding for shareable links
- **Comprehensive error handling** for invalid regex patterns
- **Keyboard shortcuts** (Ctrl+Enter to test regex)
- **Collapsible regex cheatsheet** with common patterns
- **Match details** showing position info and capture groups
- **Tabs interface** for Test Results and Visualization

## 💰 Monetization

This project is monetized through **Google AdSense** with strategically placed advertisements that don't interfere with user experience:

- **Banner ads** at the top and bottom of pages
- **Square ads** between content sections
- **Sidebar ads** for wider screens
- **Privacy-compliant** with GDPR considerations

## 🏗️ Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Monetization:** Google AdSense
- **Analytics:** Google Analytics (optional)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/public-tools.git
   cd public-tools
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Google AdSense Publisher ID:
   ```env
   NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-YOUR_PUBLISHER_ID
   NEXT_PUBLIC_AD_SLOT_BANNER_TOP=1234567890
   NEXT_PUBLIC_AD_SLOT_SQUARE_MIDDLE=0987654321
   NEXT_PUBLIC_AD_SLOT_BANNER_BOTTOM=1122334455
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 🎯 Google AdSense Setup

### Prerequisites
1. **Google AdSense Account:** Apply at [Google AdSense](https://www.google.com/adsense/)
2. **Website Approval:** Your site needs to be approved by Google AdSense
3. **Publisher ID:** Get your publisher ID from AdSense dashboard

### Configuration Steps

1. **Replace Publisher ID** in the layout file:
   ```tsx
   // app/layout.tsx
   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
   ```

2. **Update Ad Slot IDs** in your environment variables and ad components:
   ```env
   NEXT_PUBLIC_AD_SLOT_BANNER_TOP=your-banner-ad-slot-id
   NEXT_PUBLIC_AD_SLOT_SQUARE_MIDDLE=your-square-ad-slot-id
   ```

3. **Create Ad Units** in your AdSense dashboard:
   - **Banner (728x90 or responsive)** for top/bottom placement
   - **Square (300x250)** for content breaks
   - **Sidebar (160x600)** for wider layouts

### Ad Placement Strategy

- **Top Banner:** Above the main content to capture immediate attention
- **Middle Square:** Between input and results sections for natural breaks
- **Bottom Banner:** After content completion for exit intent
- **Sidebar:** For desktop users with wider screens

## 🏛️ Project Structure

```
public-tools/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout with AdSense integration
│   ├── page.tsx           # Homepage
│   ├── privacy/           # Privacy policy page
│   └── regex-tester/      # Regex tester tool
│       └── page.tsx
├── components/            # React components
│   ├── ads/              # Ad components
│   │   ├── AdBanner.tsx  # Banner ad component
│   │   ├── AdSquare.tsx  # Square ad component
│   │   ├── AdSidebar.tsx # Sidebar ad component
│   │   └── index.ts      # Ad components export
│   ├── ui/               # UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   └── regex-tester.tsx  # Main regex tester component
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── public/               # Static assets
```

## 🎨 Adding New Tools

The project is designed for easy expansion. To add a new tool:

1. **Create a new route:**
   ```bash
   mkdir app/your-tool-name
   touch app/your-tool-name/page.tsx
   ```

2. **Add to navigation:**
   ```tsx
   // app/layout.tsx
   <a href="/your-tool-name">Your Tool Name</a>
   ```

3. **Create the tool component:**
   ```tsx
   // components/your-tool.tsx
   export function YourTool() {
     return <div>Your tool implementation</div>
   }
   ```

4. **Add strategic ad placements** using the existing ad components.

## 📊 SEO Optimization

- **Metadata API:** Complete meta tags for each page
- **OpenGraph & Twitter Cards:** Social media optimization
- **JSON-LD Structured Data:** Enhanced search engine understanding
- **Performance:** Optimized for Core Web Vitals
- **Mobile-first:** Responsive design for all devices

## 🔒 Privacy & Compliance

- **Privacy Policy:** Comprehensive privacy policy at `/privacy`
- **Cookie Disclosure:** Clear information about cookie usage
- **GDPR Compliance:** Privacy-first approach
- **Data Security:** All processing happens client-side

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify:** Works with static export
- **Railway:** Full-stack deployment
- **DigitalOcean:** App Platform deployment

## 💡 Revenue Optimization Tips

1. **Content Quality:** High-quality tools attract more users
2. **SEO:** Optimize for developer-focused keywords
3. **User Experience:** Balance ads with usability
4. **Performance:** Fast loading times improve ad viewability
5. **Mobile Optimization:** Most traffic comes from mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tool`
3. Commit changes: `git commit -am 'Add new tool'`
4. Push to branch: `git push origin feature/new-tool`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons

## 📈 Analytics & Monitoring

- **Google Analytics:** Track user engagement and popular tools
- **AdSense Performance:** Monitor ad revenue and optimization
- **Core Web Vitals:** Ensure optimal performance scores

---

**Built with ❤️ for developers. Free tools, supported by ads.**