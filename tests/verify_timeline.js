const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running timeline verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify Timeline Section exists
    assert.ok(indexHtmlContent.includes('id="about"') || indexHtmlContent.includes('id="experience"'), 'index.html should contain an experience/about section for timeline');

    // 2. Verify some keywords expected in a timeline
    const timelineKeywords = ['20', 'Present', 'Experience', 'Education'];
    let found = false;
    timelineKeywords.forEach(kw => {
        if (indexHtmlContent.includes(kw)) found = true;
    });
    assert.ok(found, 'index.html timeline should contain year or experience-related keywords');

    console.log('All timeline tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
