const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');

console.log('Running skills matrix verification tests...');

try {
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

    // 1. Verify Skills Section exists
    assert.ok(indexHtmlContent.includes('id="skills"'), 'index.html should contain a "skills" section');

    // 2. Verify some common technical skills are present
    const expectedSkills = ['Golang', 'Node.js', 'Kubernetes', 'GCP']; 
    expectedSkills.forEach(skill => {
        assert.ok(indexHtmlContent.includes(skill), `index.html skills section should contain: ${skill}`);
    });

    // 3. Verify terminal-like aesthetics (e.g., specific classes or styles)
    // We expect some styling like bg-slate-800 or borders
    assert.ok(indexHtmlContent.includes('grid') || indexHtmlContent.includes('flex'), 'Skills should be in a grid or flex layout');

    console.log('All skills tests passed!');
} catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
}
