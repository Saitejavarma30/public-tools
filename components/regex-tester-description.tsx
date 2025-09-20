export function RegexTesterDescription() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is a Regex Tester?</h2>
        <p className="text-muted-foreground mb-4">
          A regex tester is an essential tool for developers working with regular expressions (regex). Regular expressions are powerful pattern-matching strings used to search, validate, and manipulate text data. Our regex tester helps you build, test, and debug regular expressions with real-time feedback and comprehensive pattern matching capabilities.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Key Features of Our Regex Tester:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Real-time Testing:</strong> Test your regex patterns against text with instant results</li>
          <li><strong>Multiple Flags:</strong> Support for global, case-insensitive, multiline, and other regex flags</li>
          <li><strong>Match Highlighting:</strong> Visual highlighting of matched text in your test string</li>
          <li><strong>Group Capture:</strong> View captured groups and their positions</li>
          <li><strong>Error Detection:</strong> Identify and fix regex syntax errors</li>
          <li><strong>Pattern Sharing:</strong> Share your regex patterns with others via URL</li>
          <li><strong>Cheatsheet Reference:</strong> Built-in regex pattern reference guide</li>
          <li><strong>Copy & Export:</strong> Easy copying of patterns and matches</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li><strong>Data Validation:</strong> Validate email addresses, phone numbers, and other formats</li>
          <li><strong>Text Processing:</strong> Extract specific patterns from large text files</li>
 <li><strong>Search & Replace:</strong> Find and replace text patterns in code or documents</li>
          <li><strong>Form Validation:</strong> Validate user input in web forms</li>
          <li><strong>Log Analysis:</strong> Parse and extract information from log files</li>
          <li><strong>Code Refactoring:</strong> Find specific code patterns for refactoring</li>
        </ul>
      </div>

      {/* Regex Cheatsheet */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Regex Pattern Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Patterns</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">.</code>
                <span className="text-sm text-muted-foreground">Any character except newline</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">\d</code>
                <span className="text-sm text-muted-foreground">Any digit (0-9)</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">\w</code>
                <span className="text-sm text-muted-foreground">Any word character (a-z, A-Z, 0-9, _)</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">\s</code>
                <span className="text-sm text-muted-foreground">Any whitespace character</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Anchors & Quantifiers</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">^</code>
                <span className="text-sm text-muted-foreground">Start of string</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">$</code>
                <span className="text-sm text-muted-foreground">End of string</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">*</code>
                <span className="text-sm text-muted-foreground">Zero or more of the preceding character</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-muted rounded">
                <code className="font-mono text-sm bg-background px-2 py-1 rounded min-w-[3rem] text-center">+</code>
                <span className="text-sm text-muted-foreground">One or more of the preceding character</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What is a regular expression and why do I need it?</h3>
            <p className="text-muted-foreground">
              <strong>Regular expressions (regex)</strong> are powerful pattern-matching tools that allow you to search, validate, and manipulate text data. They're essential for data validation, text processing, form validation, and many programming tasks. Regex patterns can match complex text patterns that would be difficult to handle with simple string operations.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I test if my regex pattern is working correctly?</h3>
            <p className="text-muted-foreground">
              Use our regex tester to input your pattern and test it against sample text. The tool will show you all matches, highlight them in the text, and display captured groups. You can also see if there are any syntax errors in your pattern. Test with various inputs to ensure your regex works as expected.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What are regex flags and when should I use them?</h3>
            <p className="text-muted-foreground">
              <strong>Regex flags</strong> modify how the pattern matching works. <strong>Global (g)</strong> finds all matches, not just the first. <strong>Case-insensitive (i)</strong> ignores case differences. <strong>Multiline (m)</strong> makes ^ and $ match line boundaries. <strong>Dot all (s)</strong> makes . match newlines. Use flags based on your specific matching needs.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I create a regex for email validation?</h3>
            <p className="text-muted-foreground">
              A basic email regex pattern is: <code>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;$</code>. This pattern checks for a valid email format, but for production use, consider using a more comprehensive pattern or a dedicated email validation library. Always test your regex with various email formats to ensure accuracy.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What's the difference between greedy and lazy quantifiers?</h3>
            <p className="text-muted-foreground">
              <strong>Greedy quantifiers</strong> (*, +, ?) match as much as possible, while <strong>lazy quantifiers</strong> (*?, +?, ??) match as little as possible. For example, <code>.*</code> will match everything until the end, while <code>.*?</code> will match only until the first occurrence of the next pattern. Use lazy quantifiers when you want minimal matching.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I escape special characters in regex?</h3>
            <p className="text-muted-foreground">
              Use a backslash (\) to escape special characters. For example, to match a literal dot, use <code>\.</code> instead of <code>.</code>. Common characters that need escaping include: . * + ? ^ $ { } [ ] ( ) | \. When in doubt, escape special characters to match them literally.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Can I use regex in different programming languages?</h3>
            <p className="text-muted-foreground">
              Yes! Regular expressions are supported in most programming languages including JavaScript, Python, Java, C#, PHP, and many others. While the basic syntax is similar, some languages have specific features or syntax differences. Our tester uses JavaScript regex syntax, which is widely compatible.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How do I debug a complex regex pattern?</h3>
            <p className="text-muted-foreground">
              Break down complex patterns into smaller parts and test each component separately. Use our regex tester to test individual parts of your pattern. Start with simple patterns and gradually add complexity. Use the match highlighting feature to see exactly what your pattern is matching. Consider using regex visualization tools for very complex patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
