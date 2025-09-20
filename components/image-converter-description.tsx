export function ImageConverterDescription() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mt-12 space-y-8">
      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-6">What is an Image Format Converter?</h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            An image format converter is a powerful tool that allows you to transform images between different formats 
            while maintaining quality. This tool works entirely in your browser, ensuring your images never leave your device, 
            providing privacy and security for your files.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Format Conversion</h3>
                <p className="text-muted-foreground mb-3">
                  Convert between popular image formats to optimize for different use cases and platforms.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>JPEG:</strong> Best for photos, smaller file sizes, no transparency</li>
                  <li>• <strong>PNG:</strong> Best for graphics, supports transparency, larger files</li>
                  <li>• <strong>WebP:</strong> Modern format, excellent compression, wide support</li>
                  <li>• <strong>AVIF:</strong> Next-generation format, best compression, growing support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Image Resizing</h3>
                <p className="text-muted-foreground mb-3">
                  Resize images to specific dimensions while maintaining aspect ratios for optimal display.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Custom Dimensions:</strong> Set specific width and height</li>
                  <li>• <strong>Aspect Ratio:</strong> Maintain proportions automatically</li>
                  <li>• <strong>Smart Scaling:</strong> High-quality resampling algorithms</li>
                  <li>• <strong>Flexible Options:</strong> Resize by width, height, or both</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                <p className="text-muted-foreground mb-3">
                  All processing happens locally in your browser - your images never leave your device.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Client-side Processing:</strong> No server uploads required</li>
                  <li>• <strong>Data Privacy:</strong> Images stay on your device</li>
                  <li>• <strong>Fast Processing:</strong> No network delays</li>
                  <li>• <strong>Offline Capable:</strong> Works without internet connection</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
                <p className="text-muted-foreground mb-3">
                  Adjust compression levels to find the perfect balance between file size and quality.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Quality Settings:</strong> From 40% to 95% quality</li>
                  <li>• <strong>Format Optimization:</strong> Choose the best format for your needs</li>
                  <li>• <strong>Batch Processing:</strong> Convert multiple images at once</li>
                  <li>• <strong>Real-time Preview:</strong> See results before downloading</li>
                </ul>
              </div>
            </div>
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
                <li>• Convert to WebP for modern browser support</li>
                <li>• Convert PNG to JPEG for smaller file sizes</li>
                <li>• Optimize images for different platforms</li>
                <li>• Ensure format compatibility across devices</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Design & Graphics</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Convert JPEG to PNG for transparency</li>
                <li>• Optimize graphics for different uses</li>
                <li>• Convert between formats for compatibility</li>
                <li>• Prepare images for different platforms</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Social Media</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Convert formats for platform requirements</li>
                <li>• Optimize for different social networks</li>
                <li>• Ensure compatibility across devices</li>
                <li>• Convert for mobile optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Print & Publishing</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Convert to high-quality formats for printing</li>
                <li>• Optimize for different print requirements</li>
                <li>• Convert between color spaces</li>
                <li>• Prepare images for publication</li>
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
            <h3 className="font-semibold mb-2">Is my data safe? Do images get uploaded to servers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, your data is completely safe! All image processing happens locally in your browser using HTML5 Canvas API. 
              Your images never leave your device and are not uploaded to any servers. This ensures complete privacy and security.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What image formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              We support all major image formats including JPEG, PNG, WebP, AVIF, GIF, BMP, and TIFF for input. 
              You can convert to JPEG, PNG, WebP, and AVIF formats. The tool automatically detects the input format.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What's the difference between JPEG and PNG?</h3>
            <p className="text-sm text-muted-foreground">
              JPEG is best for photos with many colors and gradients, offering smaller file sizes but no transparency support. 
              PNG is ideal for graphics, logos, and images requiring transparency, but typically results in larger files.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Should I use WebP or AVIF format?</h3>
            <p className="text-sm text-muted-foreground">
              WebP offers excellent compression with broad browser support (95%+). AVIF provides even better compression 
              but has limited browser support (70%+). Use WebP for maximum compatibility, AVIF for cutting-edge compression.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Can I resize images while converting?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! You can set custom width and height values, and choose whether to maintain aspect ratio. 
              This is perfect for creating thumbnails, optimizing for specific display sizes, or reducing dimensions for faster loading.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How many images can I process at once?</h3>
            <p className="text-sm text-muted-foreground">
              You can upload and process multiple images simultaneously. The limit depends on your device's memory and processing power. 
              For best performance, we recommend processing 10-20 images at a time for large files.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
