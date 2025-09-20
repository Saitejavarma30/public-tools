export function ImageCompressorDescription() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mt-12 space-y-8">
      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-6">What is an Image Compressor?</h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            An image compressor is a powerful tool that reduces file sizes while maintaining visual quality. 
            This tool works entirely in your browser, ensuring your images never leave your device, providing 
            privacy and security for your files.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Smart Compression</h3>
                <p className="text-muted-foreground mb-3">
                  Reduce file sizes by 20-80% while maintaining visual quality through intelligent compression algorithms.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Quality Control:</strong> Adjust compression levels from 40% to 95%</li>
                  <li>• <strong>Size Reduction:</strong> Typically 20-80% smaller files</li>
                  <li>• <strong>Batch Processing:</strong> Compress multiple images at once</li>
                  <li>• <strong>Real-time Preview:</strong> See results before downloading</li>
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
                <h3 className="text-xl font-semibold mb-3">Output Format</h3>
                <p className="text-muted-foreground mb-3">
                  All compressed images are saved as JPEG format for maximum compression efficiency.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>JPEG Format:</strong> Best compression for photos</li>
                  <li>• <strong>Universal Support:</strong> Works on all devices and platforms</li>
                  <li>• <strong>Small File Sizes:</strong> Optimized for web and storage</li>
                  <li>• <strong>Quality Control:</strong> Adjustable compression levels</li>
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
                <li>• Optimize images for faster website loading</li>
                <li>• Reduce bandwidth usage</li>
                <li>• Improve page load times</li>
                <li>• Compress images for better performance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Email & Documents</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Reduce file sizes for email attachments</li>
                <li>• Compress images for presentations</li>
                <li>• Optimize for printing</li>
                <li>• Save storage space</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Social Media</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Compress photos for faster uploads</li>
                <li>• Optimize for mobile viewing</li>
                <li>• Reduce data usage</li>
                <li>• Improve sharing speed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Storage & Backup</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Compress images to save storage space</li>
                <li>• Batch process large collections</li>
                <li>• Maintain quality while reducing size</li>
                <li>• Optimize for cloud storage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
