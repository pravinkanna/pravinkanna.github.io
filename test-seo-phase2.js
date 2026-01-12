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

// 1. Robots.txt check
const robotsPath = path.join(__dirname, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt should exist');
if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    assert(robotsContent.includes('Sitemap: https://pravinkanna.com/sitemap.xml'), 'robots.txt should point to sitemap');
}

// 2. Sitemap.xml check
const sitemapPath = path.join(__dirname, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml should exist');
if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    assert(sitemapContent.includes('https://pravinkanna.com/'), 'sitemap should contain home URL');
    assert(sitemapContent.includes('https://pravinkanna.com/tools/'), 'sitemap should contain tools URL');
}

// 3. JSON-LD check
filesToTest.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`\nTesting JSON-LD in ${file}...`);
    assert(content.includes('application/ld+json'), 'Should contain JSON-LD script tag');
    assert(content.includes('@context": "https://schema.org"'), 'Should contain schema.org context');
});

if (failedCount > 0) {
    console.error(`\n${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll Phase 2 SEO tests passed!');
}
