export function UrlEncoderDescription() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is a URL Encoder & Decoder?</h2>
        <p className="text-muted-foreground mb-4">
          A URL encoder and decoder is an essential tool for web developers and anyone working with URLs. URL encoding (also known as percent encoding) converts special characters in URLs into a format that can be safely transmitted over the internet. This tool helps you encode, decode, and analyze URLs to ensure they work correctly across different systems and browsers.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Key Features of Our URL Encoder:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>URL Encoding/Decoding:</strong> Convert special characters to percent-encoded format</li>
          <li><strong>URL Analysis:</strong> Break down URLs into their components (protocol, hostname, path, etc.)</li>
          <li><strong>Query Parameter Parsing:</strong> Extract and display query parameters in a readable format</li>
          <li><strong>Real-time Processing:</strong> Instant encoding and decoding as you type</li>
          <li><strong>Copy & Export:</strong> Easy copying of encoded/decoded URLs</li>
          <li><strong>Character Reference:</strong> Built-in reference for common URL-encoded characters</li>
          <li><strong>URL Validation:</strong> Check if URLs are properly formatted</li>
          <li><strong>No Registration:</strong> Use all features without creating an account</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Web Development:</strong> Encode URLs for API calls and web applications</li>
          <li><strong>Data Transmission:</strong> Safely transmit URLs with special characters</li>
          <li><strong>URL Debugging:</strong> Analyze and debug malformed URLs</li>
          <li><strong>API Integration:</strong> Prepare URLs for API requests and responses</li>
          <li><strong>Form Handling:</strong> Encode form data for URL transmission</li>
          <li><strong>SEO Optimization:</strong> Create clean, properly encoded URLs</li>
        </ul>
      </div>

      {/* URL Encoding Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">URL Encoding Reference</h2>
        <p className="text-sm text-muted-foreground">
          Common characters and their URL-encoded equivalents:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center"> </code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%20</code>
            <span className="text-sm text-muted-foreground">Space</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">&</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%26</code>
            <span className="text-sm text-muted-foreground">Ampersand</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">=</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%3D</code>
            <span className="text-sm text-muted-foreground">Equals</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">?</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%3F</code>
            <span className="text-sm text-muted-foreground">Question mark</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">#</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%23</code>
            <span className="text-sm text-muted-foreground">Hash</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">+</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%2B</code>
            <span className="text-sm text-muted-foreground">Plus</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">/</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%2F</code>
            <span className="text-sm text-muted-foreground">Forward slash</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">\</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%5C</code>
            <span className="text-sm text-muted-foreground">Backslash</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-muted rounded">
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">:</code>
            <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">%3A</code>
            <span className="text-sm text-muted-foreground">Colon</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is URL encoding and why is it necessary?</h3>
            <p className="text-muted-foreground">
              <strong>URL encoding</strong> (percent encoding) converts special characters in URLs into a format that can be safely transmitted over the internet. URLs can only contain certain characters (letters, digits, and a few special characters). Characters like spaces, ampersands, and other symbols must be encoded to prevent conflicts with URL syntax and ensure proper transmission.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">When should I encode URLs?</h3>
            <p className="text-muted-foreground">
              You should encode URLs when they contain special characters, spaces, or non-ASCII characters. This is especially important for query parameters, form data, and file paths. Always encode user input before including it in URLs to prevent security issues and ensure compatibility across different systems and browsers.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What's the difference between encodeURI and encodeURIComponent?</h3>
            <p className="text-muted-foreground">
              <strong>encodeURI</strong> encodes a complete URL but preserves characters that are valid in URLs (like :, /, ?, #). <strong>encodeURIComponent</strong> encodes individual URL components and encodes more characters. Use encodeURI for complete URLs and encodeURIComponent for query parameters or path segments.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I handle international characters in URLs?</h3>
            <p className="text-muted-foreground">
              International characters (like accented letters, Chinese characters, etc.) should be encoded using UTF-8 encoding before URL encoding. Most modern browsers and servers handle this automatically, but for maximum compatibility, always encode international characters properly. Our tool handles UTF-8 encoding automatically.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I decode any URL-encoded string?</h3>
            <p className="text-muted-foreground">
              Yes, you can decode any properly URL-encoded string back to its original form. However, be careful when decoding user input as it might contain malicious content. Always validate decoded data before using it in your application. Our tool safely decodes URLs and shows you the original content.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Why do some URLs have plus signs (+) instead of spaces?</h3>
            <p className="text-muted-foreground">
              In form data and query parameters, spaces are often encoded as plus signs (+) instead of %20. This is a legacy from HTML forms. Both %20 and + represent spaces, but %20 is the standard URL encoding. Our tool handles both formats correctly when decoding URLs.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I create SEO-friendly URLs?</h3>
            <p className="text-muted-foreground">
              For SEO-friendly URLs, use lowercase letters, hyphens instead of spaces or underscores, and avoid special characters. Keep URLs short and descriptive. If you need special characters, encode them properly. Our URL analyzer can help you understand the structure of your URLs for better SEO optimization.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What are the security considerations for URL encoding?</h3>
            <p className="text-muted-foreground">
              URL encoding is not encryption - it's just a way to safely transmit data. Never use URL encoding to hide sensitive information. Always validate and sanitize user input before encoding it. Be aware of URL injection attacks and ensure your application properly handles encoded URLs. Use HTTPS for sensitive data transmission.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
