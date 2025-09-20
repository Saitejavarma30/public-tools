export function ColorPickerDescription() {
  return (
    <div className="mt-12 space-y-8">
      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-6">What is a Color Picker & Converter?</h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            A color picker and converter is an essential tool for designers, developers, and digital artists. 
            It allows you to select colors visually and convert them between different color formats used in 
            web development, graphic design, and digital media. Understanding color formats is crucial for 
            creating consistent, accessible, and visually appealing designs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></span>
                  HEX Color Format
                </h3>
                <p className="text-muted-foreground mb-3">
                  HEX (Hexadecimal) is the most common color format in web development. It uses a 6-digit 
                  hexadecimal number preceded by a hash (#) to represent colors.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm">#3b82f6</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: #RRGGBB (Red, Green, Blue in hexadecimal)
                  </p>
                </div>
                <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                  <li>• Used in CSS, HTML, and most web technologies</li>
                  <li>• Each pair represents red, green, and blue values (0-255)</li>
                  <li>• Supports 16,777,216 different colors</li>
                  <li>• Case insensitive (#FF0000 = #ff0000)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(59, 130, 246)' }}></span>
                  RGB Color Format
                </h3>
                <p className="text-muted-foreground mb-3">
                  RGB (Red, Green, Blue) represents colors using three numerical values for each primary color component.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm">rgb(59, 130, 246)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: rgb(Red, Green, Blue) - each value 0-255
                  </p>
                </div>
                <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                  <li>• Used in CSS and many design applications</li>
                  <li>• Each value ranges from 0 to 255</li>
                  <li>• Additive color model (combines light)</li>
                  <li>• Basis for most digital color systems</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}></span>
                  HSL Color Format
                </h3>
                <p className="text-muted-foreground mb-3">
                  HSL (Hue, Saturation, Lightness) represents colors in a more intuitive way, similar to how 
                  artists think about color.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm">hsl(217, 91%, 60%)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: hsl(Hue, Saturation%, Lightness%)
                  </p>
                </div>
                <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                  <li>• Hue: 0-360° (color wheel position)</li>
                  <li>• Saturation: 0-100% (color intensity)</li>
                  <li>• Lightness: 0-100% (brightness)</li>
                  <li>• Great for creating color variations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></span>
                  CMYK Color Format
                </h3>
                <p className="text-muted-foreground mb-3">
                  CMYK (Cyan, Magenta, Yellow, Key/Black) is used primarily in print design and represents 
                  how colors are created by mixing inks.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm">cmyk(76%, 47%, 0%, 4%)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: cmyk(Cyan%, Magenta%, Yellow%, Black%)
                  </p>
                </div>
                <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                  <li>• Used in professional printing</li>
                  <li>• Each value represents ink percentage (0-100%)</li>
                  <li>• Subtractive color model (absorbs light)</li>
                  <li>• Key (K) represents black ink</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-blue-500"></span>
              <h3 className="font-semibold">Visual Color Picker</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive color picker with preset colors for quick selection and visual feedback.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-green-500"></span>
              <h3 className="font-semibold">Format Conversion</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Convert between HEX, RGB, HSL, and CMYK formats with real-time updates.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-purple-500"></span>
              <h3 className="font-semibold">Color Palette Generation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate monochromatic, complementary, and triadic color palettes automatically.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-orange-500"></span>
              <h3 className="font-semibold">Accessibility Checker</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Check color contrast ratios against WCAG guidelines for accessibility compliance.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-red-500"></span>
              <h3 className="font-semibold">One-Click Copy</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy color values in any format with a single click for easy use in your projects.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500"></span>
              <h3 className="font-semibold">Real-time Preview</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              See color changes instantly with live preview and contrast testing on different backgrounds.
            </p>
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
                <li>• CSS color values for styling websites</li>
                <li>• Brand color consistency across projects</li>
                <li>• Theme color selection for applications</li>
                <li>• Accessibility-compliant color schemes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Graphic Design</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Print design color preparation</li>
                <li>• Logo and branding color selection</li>
                <li>• Color palette creation for projects</li>
                <li>• CMYK conversion for printing</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Digital Art</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Digital painting color selection</li>
                <li>• Color harmony and theory application</li>
                <li>• Palette generation for artwork</li>
                <li>• Color temperature adjustments</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">UI/UX Design</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Interface color scheme design</li>
                <li>• Accessibility compliance checking</li>
                <li>• User experience color optimization</li>
                <li>• Cross-platform color consistency</li>
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
            <h3 className="font-semibold mb-2">What is the difference between RGB and CMYK?</h3>
            <p className="text-sm text-muted-foreground">
              RGB is an additive color model used for digital displays (screens, monitors) where colors are created by adding red, green, and blue light. CMYK is a subtractive color model used for printing where colors are created by subtracting cyan, magenta, yellow, and black inks from white paper.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Why do colors look different on screen vs. print?</h3>
            <p className="text-sm text-muted-foreground">
              Screens use RGB (light-based) while printers use CMYK (ink-based). RGB can display more vibrant colors than CMYK can print. Always convert RGB colors to CMYK before printing to see how they'll actually appear on paper.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What is color contrast and why is it important?</h3>
            <p className="text-sm text-muted-foreground">
              Color contrast is the difference in brightness between text and background colors. It's crucial for accessibility - people with visual impairments need sufficient contrast to read content. WCAG guidelines recommend 4.5:1 ratio for normal text and 3:1 for large text.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How do I create a harmonious color palette?</h3>
            <p className="text-sm text-muted-foreground">
              Use color theory principles: monochromatic (same hue, different saturation/lightness), complementary (opposite colors), triadic (three evenly spaced colors), or analogous (adjacent colors). Our tool generates these automatically based on your selected color.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What does HSL stand for and when should I use it?</h3>
            <p className="text-sm text-muted-foreground">
              HSL stands for Hue, Saturation, Lightness. It's intuitive for designers because it matches how we think about color. Use HSL when you want to easily create variations of a color by adjusting saturation or lightness while keeping the same hue.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Can I use any color format in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              CSS supports HEX (#ff0000), RGB (rgb(255,0,0)), HSL (hsl(0,100%,50%)), and named colors (red). HEX is most common, RGB is good for transparency (rgba), and HSL is great for creating color variations programmatically.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What is the difference between 3-digit and 6-digit HEX codes?</h3>
            <p className="text-sm text-muted-foreground">
              3-digit HEX (#f00) is shorthand for 6-digit HEX (#ff0000). Each digit is duplicated: #f00 = #ff0000, #abc = #aabbcc. Both represent the same color, but 6-digit provides more precision and is more commonly used.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How do I ensure my colors are accessible?</h3>
            <p className="text-sm text-muted-foreground">
              Use our contrast checker to ensure your text/background combinations meet WCAG guidelines. Aim for at least 4.5:1 contrast ratio for normal text and 3:1 for large text. Test with both light and dark backgrounds to ensure versatility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
