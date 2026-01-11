const { validateJSON } = require('./json-editor.logic');

const tests = [
    {
        name: 'Success for valid JSON',
        input: '{"name": "Pravin", "role": "Engineer"}',
        expected: { valid: true, message: 'Valid JSON' }
    },
    {
        name: 'Error for invalid JSON',
        input: '{"name": "Pravin", "role": "Engineer"',
        expected: { valid: false }
    },
    {
        name: 'Error for empty input',
        input: '',
        expected: { valid: false, message: 'Input is empty' }
    }
];

let failedCount = 0;

tests.forEach(t => {
    try {
        const result = validateJSON(t.input);
        if (result.valid === t.expected.valid && (!t.expected.message || result.message === t.expected.message)) {
            console.log(`✅ [PASS] ${t.name}`);
        } else {
            console.error(`❌ [FAIL] ${t.name}. Expected ${JSON.stringify(t.expected)}, got ${JSON.stringify(result)}`);
            failedCount++;
        }
    } catch (e) {
        console.error(`❌ [FAIL] ${t.name}. Threw error: ${e.message}`);
        failedCount++;
    }
});

if (failedCount > 0) {
    process.exit(1);
} else {
    console.log('All logic tests passed!');
}
