const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running footer verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify Footer Section exists
    assert.ok(indexHtmlContent.includes('<footer'), 'index.html should contain a <footer> element');

    // 2. Verify Social Links
    assert.ok(indexHtmlContent.includes('github.com/pravinkanna'), 'Footer should contain GitHub link');
    assert.ok(indexHtmlContent.includes('linkedin.com/in/pravinkanna'), 'Footer should contain LinkedIn link');
    assert.ok(indexHtmlContent.includes('mailto:pravinkannap@gmail.com'), 'Footer should contain Email link');

    // 3. Verify Copyright
    assert.ok(indexHtmlContent.includes('2026') || indexHtmlContent.includes('Pravinkanna Parthiban'), 'Footer should contain copyright information');

    console.log('All footer tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
