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
    if (!fs.existsSync(filePath)) {
        console.error(`Missing file: ${file}`);
        failedCount++;
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`\nTesting ${file}...`);

    // 1. Branding check
    assert(!content.includes('Pravin Kanna'), 'Should not contain "Pravin Kanna"');
    
    // 2. Meta tags check
    assert(content.includes('<meta name="description" content="') || content.includes('<meta property="og:description" content="'), 'Should contain a meta description');
    assert(content.includes('<link rel="canonical" href="https://pravinkanna.com/'), 'Should contain correct canonical link');
    
    // 3. OG/Twitter tags check
    assert(content.includes('og:title'), 'Should contain og:title');
    assert(content.includes('og:type'), 'Should contain og:type');
    assert(content.includes('og:image'), 'Should contain og:image');
    assert(content.includes('twitter:card'), 'Should contain twitter:card');
});

// Specific Branding check in GEMINI.md
const geminiPath = path.join(__dirname, 'GEMINI.md');
if (fs.existsSync(geminiPath)) {
    const geminiContent = fs.readFileSync(geminiPath, 'utf8');
    assert(!geminiContent.includes('Pravin Kanna'), 'GEMINI.md should not contain "Pravin Kanna"');
}

if (failedCount > 0) {
    console.error(`\n${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll Phase 1 SEO tests passed!');
}