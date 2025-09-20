export function JsonParserDescription() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is a JSON Parser & Formatter?</h2>
        <p className="text-muted-foreground mb-4">
          A JSON parser and formatter is an essential tool for developers working with JSON (JavaScript Object Notation) data. JSON is a lightweight data interchange format that's easy for humans to read and write, and easy for machines to parse and generate. Our JSON parser helps you validate, format, minify, and convert JSON data with ease.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Key Features of Our JSON Parser:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>JSON Validation:</strong> Check if your JSON syntax is correct with detailed error messages</li>
          <li><strong>JSON Formatting:</strong> Beautify and format JSON with customizable indentation</li>
          <li><strong>JSON Minification:</strong> Compress JSON by removing unnecessary whitespace</li>
          <li><strong>JSON to CSV:</strong> Convert JSON arrays to CSV format for spreadsheet applications</li>
          <li><strong>File Upload:</strong> Upload and process JSON files directly</li>
          <li><strong>Real-time Processing:</strong> Instant validation and formatting as you type</li>
          <li><strong>Copy & Download:</strong> Easy copying and downloading of processed JSON</li>
          <li><strong>Statistics:</strong> View character count, lines, properties, and file size</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>API Development:</strong> Validate and format API responses and requests</li>
          <li><strong>Data Processing:</strong> Clean and structure JSON data for analysis</li>
          <li><strong>Configuration Files:</strong> Format JSON configuration files for better readability</li>
          <li><strong>Data Migration:</strong> Convert JSON data to other formats like CSV</li>
          <li><strong>Debugging:</strong> Identify and fix JSON syntax errors</li>
          <li><strong>Web Development:</strong> Process JSON data from web APIs and services</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is JSON and why do I need a JSON parser?</h3>
            <p className="text-muted-foreground">
              <strong>JSON (JavaScript Object Notation)</strong> is a text format for storing and transporting data. It's widely used in web APIs, configuration files, and data exchange. A JSON parser helps you validate syntax, format for readability, and convert between different formats, making it essential for developers working with JSON data.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I fix JSON syntax errors?</h3>
            <p className="text-muted-foreground">
              Our JSON parser provides detailed error messages showing exactly where the syntax error occurs. Common issues include missing commas, unclosed brackets, trailing commas, and incorrect quotes. The tool highlights the line and column where the error is found, making it easy to identify and fix problems.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What's the difference between JSON formatting and minification?</h3>
            <p className="text-muted-foreground">
              <strong>JSON formatting</strong> adds proper indentation and line breaks to make JSON readable. <strong>JSON minification</strong> removes all unnecessary whitespace to create the smallest possible file size. Formatting is used for development and debugging, while minification is used for production to reduce file size and improve performance.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I convert JSON to CSV format?</h3>
            <p className="text-muted-foreground">
              Yes! Our JSON parser can convert JSON arrays to CSV format. This is useful when you need to import JSON data into spreadsheet applications like Excel or Google Sheets. The tool automatically detects array structures and creates appropriate CSV headers and rows.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Is my JSON data secure when using this tool?</h3>
            <p className="text-muted-foreground">
              <strong>Yes, your data is completely secure.</strong> All JSON processing happens locally in your browser - your data is never sent to our servers. This ensures complete privacy and security for sensitive JSON data like API keys, user information, or confidential configuration files.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What file sizes can the JSON parser handle?</h3>
            <p className="text-muted-foreground">
              Our JSON parser can handle large JSON files efficiently. The tool processes data in your browser's memory, so the limit depends on your device's available RAM. For very large files (several MB), the tool will still work but may take longer to process. We recommend testing with your specific file sizes.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I validate JSON from an API response?</h3>
            <p className="text-muted-foreground">
              Simply copy the JSON response from your API and paste it into our JSON parser. The tool will immediately validate the syntax and show any errors. You can also format it for better readability or minify it for storage. This is especially useful when debugging API integrations.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What are the most common JSON syntax errors?</h3>
            <p className="text-muted-foreground">
              Common JSON errors include: <strong>missing commas</strong> between properties, <strong>trailing commas</strong> after the last item, <strong>unclosed brackets or braces</strong>, <strong>incorrect quotes</strong> (using single quotes instead of double), <strong>undefined values</strong> (JSON doesn't support undefined), and <strong>comments</strong> (JSON doesn't support comments).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
