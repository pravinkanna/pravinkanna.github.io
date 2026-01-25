const fs = require('fs');
const path = require('path');

console.log('Running Blog Verification Tests...');

let failedCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ [PASS] ${message}`);
    } else {
        console.error(`❌ [FAIL] ${message}`);
        failedCount++;
    }
}

// Initial infrastructure verification
console.log('Verifying Blog Infrastructure...');

// Check if blogs directory exists
const blogsDir = path.join(__dirname, 'blogs');
assert(fs.existsSync(blogsDir), 'blogs/ directory should exist');

// Check if blogs/index.html exists
const blogsIndex = path.join(blogsDir, 'index.html');
assert(fs.existsSync(blogsIndex), 'blogs/index.html should exist');

if (fs.existsSync(blogsIndex)) {
    const content = fs.readFileSync(blogsIndex, 'utf8');
    assert(content.includes('My Thoughts & Writings'), 'Should contain header "My Thoughts & Writings"');
    assert(content.includes('<nav'), 'Should contain navigation');
    assert(content.includes('blog-list'), 'Should contain a container with class or id "blog-list"');
}

// Check main navigation integration
const mainIndex = path.join(__dirname, 'index.html');
if (fs.existsSync(mainIndex)) {
    const content = fs.readFileSync(mainIndex, 'utf8');
    assert(content.includes('href="/blogs/"'), 'Main index.html should link to /blogs/');
}

// Check first blog post existence and basic structure
const firstPostPath = path.join(blogsDir, 'first-post.html');
assert(fs.existsSync(firstPostPath), 'blogs/first-post.html should exist');

if (fs.existsSync(firstPostPath)) {
    const content = fs.readFileSync(firstPostPath, 'utf8');
    assert(content.includes('Back to Blogs'), 'Should contain "Back to Blogs" link');
    assert(content.includes('Jan 25, 2026'), 'Should contain publication date');
    assert(content.includes('Pravinkanna Parthiban'), 'Should contain author name "Pravinkanna Parthiban"');
    assert(content.includes('blog-content'), 'Should contain container with class or id "blog-content"');
    assert(content.includes('prism'), 'Should include Prism.js');
}

if (failedCount > 0) {
    console.error(`
${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll blog verification tests passed!');
}
