const fs = require('fs');
const path = require('path');

console.log('Running Build Verification Tests...');

let failedCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ [PASS] ${message}`);
    } else {
        console.error(`❌ [FAIL] ${message}`);
        failedCount++;
    }
}

// Test 1: dist/output.css exists
const outputPath = path.join(__dirname, 'dist', 'output.css');
assert(fs.existsSync(outputPath), 'dist/output.css should exist');

// Test 2: dist/output.css is not empty
if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    assert(stats.size > 0, 'dist/output.css should not be empty');
}

// Test 3: dist/output.css contains expected classes
if (fs.existsSync(outputPath)) {
    const content = fs.readFileSync(outputPath, 'utf8');
    assert(content.includes('bg-slate-900'), 'Should contain .bg-slate-900');
    assert(content.includes('text-accent'), 'Should contain .text-accent');
    assert(content.includes('code-container'), 'Should contain custom .code-container');
}

if (failedCount > 0) {
    console.error(`
${failedCount} tests failed.`);
    process.exit(1);
} else {
    console.log('\nAll build verification tests passed!');
}
