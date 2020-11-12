## UI Accessibility Guide
Documentation for accessibility best practices and how Draftivist plan's to adhere to said best practices.

### Design Considerations
- Use greater contrast, like opposites on the color field
    * For Mac users, there's an app to help with this called [Contrast](https://usecontrast.com/) which uses scores and ratios for determing the grade of contrast
- Don't use color alone for important information. Some suggestions include:
    * add an icon
    * use an underline
    * increase font weight
    * for graphs, try shape, labels, and size
- Consider text size and avoid using too small of font. 
- [Focus Indicators](https://css-tricks.com/focusing-on-focus-styles/) for items such as buttons or tabs. 
- Make use of Labels for form fields.
- Include an Alt Tag to explain an image for readers
- Develop with correct MarkUp so that layout markup no longer gets in the way and confuses the content readout. Example:

    ```
        <header>
            <h1>Header</h1>
        </header>

        <nav>
            <!-- main navigation in here -->
        </nav>

        <!-- Here is our page's main content -->
        <main>

            <!-- It contains an article -->
            <article>
                <h2>Article heading</h2>

                <!-- article content in here -->
            </article>

            <aside>
                <h2>Related</h2>

                <!-- aside content in here -->
            </aside>

        </main>

            <!-- And here is our main footer that is used across all the pages of our website -->

        <footer>
            <!-- footer content in here -->
        </footer>
    ```

### Resources
- [5 Accessibility Concerns](https://bighack.org/5-most-annoying-website-features-i-face-as-a-blind-screen-reader-user-accessibility/)

- [Designing for accessibility is not that hard](https://uxdesign.cc/designing-for-accessibility-is-not-that-hard-c04cc4779d94)

- [MarkUp Format](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
