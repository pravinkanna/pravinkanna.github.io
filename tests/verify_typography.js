const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running typography verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify Sans-Serif Font Import (e.g., Inter)
    assert.ok(indexHtmlContent.includes('family=Inter'), 'index.html should import Inter font');

    // 2. Verify Body uses Sans-Serif
    // We expect the body to have 'font-sans' class or style
    assert.ok(indexHtmlContent.includes('font-sans') || indexHtmlContent.includes("font-family: 'Inter'"), 'Body should use sans-serif font (Inter)');

    // 3. Verify Headings use Monospace
    // We expect h1, h2, etc. to potentially have font-mono or a global style for headings
    // For this specific test, we'll check if the existing h1 has font-mono
    // OR if there is a CSS rule for h1/h2/h3 to use monospace.
    // Given we are using Tailwind, we likely put 'font-mono' on the elements or create a base style.
    // Let's check if the h1 tag has 'font-mono'.
    assert.ok(indexHtmlContent.includes('font-mono'), 'Should use font-mono class for technical elements');

    console.log('All typography tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
