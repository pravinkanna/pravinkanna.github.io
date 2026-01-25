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

if (failedCount > 0) {
    console.error(`
${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll blog verification tests passed!');
}
