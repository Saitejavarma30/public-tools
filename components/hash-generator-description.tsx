export function HashGeneratorDescription() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is a Hash Generator?</h2>
        <p className="text-muted-foreground mb-4">
          A hash generator is a cryptographic tool that converts input data (text, files, or any digital content) into a fixed-length string of characters called a hash. Hash functions are one-way mathematical algorithms that produce a unique fingerprint for any given input, making them essential for data integrity verification, password security, and digital signatures.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Key Features of Our Hash Generator:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Multiple Hash Algorithms:</strong> Support for MD5, SHA-1, SHA-256, SHA-384, and SHA-512</li>
          <li><strong>HMAC Generation:</strong> Create secure hash-based message authentication codes</li>
          <li><strong>Text & File Input:</strong> Generate hashes from text strings or uploaded files</li>
          <li><strong>Instant Results:</strong> Real-time hash generation with no delays</li>
          <li><strong>Copy & Download:</strong> Easy copying and downloading of generated hashes</li>
          <li><strong>Security Information:</strong> Learn about hash algorithm security and best practices</li>
          <li><strong>No Registration:</strong> Use all features without creating an account</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Password Security:</strong> Hash passwords before storing in databases</li>
          <li><strong>File Integrity:</strong> Verify file downloads haven't been corrupted</li>
          <li><strong>Digital Signatures:</strong> Create unique identifiers for documents</li>
          <li><strong>Data Deduplication:</strong> Identify duplicate files or content</li>
          <li><strong>API Authentication:</strong> Generate HMAC signatures for secure API calls</li>
          <li><strong>Blockchain Technology:</strong> Create transaction hashes for cryptocurrency</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is the difference between MD5, SHA-1, and SHA-256?</h3>
            <p className="text-muted-foreground">
              <strong>MD5</strong> produces a 128-bit hash and is fast but cryptographically broken. <strong>SHA-1</strong> creates a 160-bit hash and is also deprecated for security purposes. <strong>SHA-256</strong> generates a 256-bit hash and is currently secure and recommended for most applications. SHA-384 and SHA-512 provide even stronger security with longer hash lengths.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Is it safe to use MD5 or SHA-1 for password hashing?</h3>
            <p className="text-muted-foreground">
              <strong>No, MD5 and SHA-1 should not be used for password hashing</strong> as they are vulnerable to collision attacks and rainbow table attacks. Use SHA-256 or SHA-512 with a salt for password security, or better yet, use specialized password hashing algorithms like bcrypt, scrypt, or Argon2.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is HMAC and when should I use it?</h3>
            <p className="text-muted-foreground">
              <strong>HMAC (Hash-based Message Authentication Code)</strong> combines a secret key with your data before hashing. It's used for API authentication, message integrity verification, and secure communication. HMAC ensures that only someone with the secret key can generate a valid hash for your data.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I generate hashes for large files?</h3>
            <p className="text-muted-foreground">
              Yes, our hash generator supports file uploads of any size. The tool will process the file content and generate hashes for MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. This is useful for verifying file integrity after downloads or transfers.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I verify if a file hash is correct?</h3>
            <p className="text-muted-foreground">
              Upload the file to our hash generator and compare the generated hash with the expected hash. If they match exactly, the file is intact and hasn't been modified. Even a single byte change will produce a completely different hash value.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What's the difference between a hash and encryption?</h3>
            <p className="text-muted-foreground">
              <strong>Hashing is one-way</strong> - you cannot reverse a hash to get the original data. <strong>Encryption is two-way</strong> - you can decrypt encrypted data back to its original form. Hashes are used for verification and integrity, while encryption is used for confidentiality and secure storage.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Are my inputs stored or logged anywhere?</h3>
            <p className="text-muted-foreground">
              <strong>No, we don't store or log any of your input data.</strong> All hash generation happens locally in your browser, and your data is never sent to our servers. This ensures complete privacy and security for sensitive information like passwords or confidential documents.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Which hash algorithm should I use for my project?</h3>
            <p className="text-muted-foreground">
              For <strong>general purposes</strong>, use SHA-256. For <strong>high-security applications</strong>, use SHA-512. For <strong>API authentication</strong>, use HMAC-SHA256. For <strong>legacy compatibility</strong> only, MD5 or SHA-1 (but avoid for new projects). Always consider your specific security requirements and compliance needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
