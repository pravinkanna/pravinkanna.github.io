const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running setup verification tests...');

try {
    // 1. Verify tailwind.config.js exists and has content
    assert.ok(fs.existsSync(tailwindConfigPath), 'tailwind.config.js should exist');
    const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8');
    assert.ok(tailwindConfigContent.includes('colors'), 'tailwind.config.js should define colors');
    assert.ok(tailwindConfigContent.includes('fontFamily'), 'tailwind.config.js should define fontFamily');
    assert.ok(tailwindConfigContent.includes('monospace'), 'tailwind.config.js should use monospace font');

    // 2. Verify index.html exists and uses Tailwind CDN
    assert.ok(fs.existsSync(indexHtmlPath), 'index.html should exist');
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    assert.ok(indexHtmlContent.includes('cdn.tailwindcss.com'), 'index.html should include Tailwind CSS CDN');
    assert.ok(indexHtmlContent.includes('bg-slate-900') || indexHtmlContent.includes('bg-gray-900'), 'index.html body should have dark background class');

    console.log('All tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
