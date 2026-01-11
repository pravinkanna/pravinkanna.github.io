const { validateJSON, formatJSON, minifyJSON, stringifyJSON } = require('./json-editor.logic');

const tests = [
    // Validation tests
    {
        name: 'Success for valid JSON',
        input: '{"name": "Pravin", "role": "Engineer"}',
        fn: (input) => validateJSON(input),
        expected: { valid: true, message: 'Valid JSON' }
    },
    // ... (rest of tests)
    // Minify tests
    {
        name: 'Minify JSON',
        input: '{\n  "a": 1\n}',
        fn: (input) => minifyJSON(input),
        expected: { valid: true, output: '{"a":1}' }
    },
    // Stringify tests
    {
        name: 'Stringify JSON',
        input: '{"a":1}',
        fn: (input) => stringifyJSON(input),
        expected: { valid: true, output: '"{\\\"a\\\":1}"' }
    }
];

let failedCount = 0;

tests.forEach(t => {
    try {
        const result = t.fn(t.input);
        if (result.valid === t.expected.valid && (!t.expected.message || result.message === t.expected.message) && (!t.expected.output || result.output === t.expected.output)) {
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
