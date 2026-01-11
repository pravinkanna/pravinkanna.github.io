const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running hero section verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify Name exists in Hero
    assert.ok(indexHtmlContent.includes('Pravinkanna Parthiban'), 'index.html hero should contain "Pravinkanna Parthiban"');

    // 2. Verify Title/Role exists
    assert.ok(indexHtmlContent.includes('Software Developer') || indexHtmlContent.includes('Full Stack Developer') || indexHtmlContent.includes('Software Engineer'), 'index.html hero should contain a professional title');

    // 3. Verify console.log style intro
    assert.ok(indexHtmlContent.includes('console.log') || indexHtmlContent.includes('> '), 'index.html hero should have technical/console aesthetic');

    // 4. Verify CTA exists
    assert.ok(indexHtmlContent.includes('./view-projects.sh') || indexHtmlContent.includes('#projects'), 'index.html hero should have a call-to-action to projects');

    console.log('All hero tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
