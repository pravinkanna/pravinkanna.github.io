const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const requiredElements = [
    { name: 'Navigation', pattern: /<nav/ },
    { name: 'Footer', pattern: /<footer/ },
    { name: 'JSON Input', pattern: /id="json-input"/ },
    { name: 'JSON Output', pattern: /id="json-output"/ },
    { name: 'Validate Button', pattern: /id="btn-validate"/ },
    { name: 'Prettify Button', pattern: /id="btn-prettify"/ },
    { name: 'Minify Button', pattern: /id="btn-minify"/ },
    { name: 'Stringify Button', pattern: /id="btn-stringify"/ },
    { name: 'Clear Button', pattern: /id="btn-clear"/ },
    { name: 'Indentation Selector', pattern: /id="indent-select"/ }
];

let failed = false;
console.log('Running UI Verification Tests...');

requiredElements.forEach(el => {
    if (el.pattern.test(html)) {
        console.log(`✅ ${el.name} exists.`);
    } else {
        console.error(`❌ ${el.name} is missing!`);
        failed = true;
    }
});

if (failed) {
    process.exit(1);
} else {
    console.log('All UI elements verified successfully.');
}
