const fs = require('fs');
const path = require('path');

const filesToTest = [
    'index.html',
    'tools/index.html',
    'tools/json-editor/index.html',
    'tools/mongo-object-time/index.html',
    'tools/wealth-journey/index.html'
];

let failedCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ [PASS] ${message}`);
    } else {
        console.error(`❌ [FAIL] ${message}`);
        failedCount++;
    }
}

filesToTest.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`
Testing Accessibility in ${file}...`);
    
    // 1. Lang attribute check
    assert(content.includes('lang="en"'), 'Should have lang="en"');
    
    // 2. ARIA labels check for mobile menu
    if (content.includes('mobile-menu-button')) {
        assert(content.includes('aria-label="Toggle main menu"') || content.includes('aria-label="Toggle sidebar"'), 'Should have aria-label on menu toggle');
    }
});

// 3. Minified CSS check
const cssPath = path.join(__dirname, 'dist', 'output.css');
if (fs.existsSync(cssPath)) {
    const stats = fs.statSync(cssPath);
    console.log(`
Testing CSS Performance...`);
    assert(stats.size > 0, 'dist/output.css should not be empty');
    // Simple check for minification
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const newlineCount = (cssContent.match(/\n/g) || []).length;
    assert(newlineCount < 100, 'dist/output.css should be minified (few newlines)');
}

if (failedCount > 0) {
    console.error(`
${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll Phase 3 SEO/Accessibility tests passed!');
}