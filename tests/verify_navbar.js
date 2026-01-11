const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running navbar verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify nav element exists
    assert.ok(indexHtmlContent.includes('<nav'), 'index.html should contain a <nav> element');

    // 2. Verify navigation links
    const expectedLinks = ['Home', 'Experience', 'Skills', 'Projects'];
    expectedLinks.forEach(link => {
        assert.ok(indexHtmlContent.includes(link), `index.html should contain navigation link: ${link}`);
    });

    // 3. Verify mobile menu button exists (for responsive toggle)
    // We can look for a button with an id or class typically used for mobile menu
    assert.ok(indexHtmlContent.includes('id="mobile-menu-button"') || indexHtmlContent.includes('class="mobile-menu-button"'), 'index.html should contain a mobile menu toggle button');

    console.log('All navbar tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
