export function Base64EncoderDescription() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is Base64 Encoding?</h2>
        <p className="text-muted-foreground mb-4">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's widely used to encode data that needs to be stored and transferred over media designed to deal with text. Base64 encoding is essential for embedding binary data in JSON, XML, email attachments, and web applications.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Key Features of Our Base64 Encoder:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Text Encoding:</strong> Convert any text string to Base64 format</li>
          <li><strong>File Encoding:</strong> Upload and encode files of any type to Base64</li>
          <li><strong>URL-Safe Encoding:</strong> Generate URL-safe Base64 with RFC 4648 standard</li>
          <li><strong>Real-time Processing:</strong> Instant encoding and decoding as you type</li>
          <li><strong>Copy & Download:</strong> Easy copying and downloading of encoded/decoded content</li>
          <li><strong>File Download:</strong> Download decoded Base64 as binary files</li>
          <li><strong>Statistics:</strong> View encoding statistics and size comparisons</li>
          <li><strong>No Registration:</strong> Use all features without creating an account</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Web Development:</strong> Embed images and files in HTML/CSS/JSON</li>
          <li><strong>Email Attachments:</strong> Encode binary files for email transmission</li>
          <li><strong>API Development:</strong> Send binary data through JSON APIs</li>
          <li><strong>Data Storage:</strong> Store binary data in text-based databases</li>
          <li><strong>Configuration Files:</strong> Embed small files in configuration data</li>
          <li><strong>Data Transmission:</strong> Send binary data over text-only protocols</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is Base64 encoding and why is it used?</h3>
            <p className="text-muted-foreground">
              <strong>Base64 encoding</strong> converts binary data into a text format using 64 characters (A-Z, a-z, 0-9, +, /). It's used when you need to transmit binary data over text-based protocols like HTTP, email, or store binary data in text formats like JSON or XML. Base64 ensures data integrity during transmission.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What's the difference between regular Base64 and URL-safe Base64?</h3>
            <p className="text-muted-foreground">
              <strong>Regular Base64</strong> uses characters + and / which have special meanings in URLs. <strong>URL-safe Base64</strong> (RFC 4648) replaces + with - and / with _ to make the encoded string safe for use in URLs and filenames. Our tool supports both formats.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I encode large files with Base64?</h3>
            <p className="text-muted-foreground">
              Yes, our Base64 encoder can handle large files. However, Base64 encoding increases file size by approximately 33%. For very large files, consider the memory limitations of your browser. The tool processes files locally in your browser for maximum security and privacy.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I decode Base64 back to the original file?</h3>
            <p className="text-muted-foreground">
              Paste your Base64 string into the decoder section and click "Decode from Base64". If the Base64 represents a file, use the "Download as Binary" button to save it as the original file format. The tool automatically detects the file type and provides the correct download.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Is Base64 encoding secure for sensitive data?</h3>
            <p className="text-muted-foreground">
              <strong>Base64 is not encryption</strong> - it's encoding. Anyone can decode Base64 data easily. It's designed for data transmission, not security. For sensitive data, use proper encryption before Base64 encoding. Our tool processes everything locally, so your data never leaves your browser.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Why does Base64 increase file size?</h3>
            <p className="text-muted-foreground">
              Base64 converts every 3 bytes of binary data into 4 characters of text, resulting in a 33% size increase. This happens because binary data uses 8 bits per byte, while Base64 uses 6 bits per character, requiring more characters to represent the same amount of data.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I use Base64 for images in web development?</h3>
            <p className="text-muted-foreground">
              Yes! Base64-encoded images can be embedded directly in HTML using data URLs: <code>&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."&gt;</code>. This eliminates the need for separate image files but increases HTML size. Use for small images or when you need to reduce HTTP requests.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What are the limitations of Base64 encoding?</h3>
            <p className="text-muted-foreground">
              Base64 limitations include: <strong>33% size increase</strong>, <strong>not suitable for large files</strong> due to memory constraints, <strong>not secure</strong> (encoding, not encryption), <strong>slower processing</strong> than binary transmission, and <strong>not human-readable</strong> for debugging purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
