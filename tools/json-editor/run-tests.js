const { validateJSON, formatJSON, minifyJSON } = require('./json-editor.logic');

const tests = [
    // Validation tests
    {
        name: 'Success for valid JSON',
        input: '{"name": "Pravin", "role": "Engineer"}',
        fn: (input) => validateJSON(input),
        expected: { valid: true, message: 'Valid JSON' }
    },
    {
        name: 'Error for invalid JSON',
        input: '{"name": "Pravin", "role": "Engineer"',
        fn: (input) => validateJSON(input),
        expected: { valid: false }
    },
    {
        name: 'Error for empty input',
        input: '',
        fn: (input) => validateJSON(input),
        expected: { valid: false, message: 'Input is empty' }
    },
    // Formatting tests
    {
        name: 'Prettify with 2 spaces',
        input: '{"a":1}',
        fn: (input) => formatJSON(input, '2'),
        expected: { valid: true, output: '{\n  "a": 1\n}' }
    },
    {
        name: 'Prettify with 4 spaces',
        input: '{"a":1}',
        fn: (input) => formatJSON(input, '4'),
        expected: { valid: true, output: '{\n    "a": 1\n}' }
    },
    {
        name: 'Prettify with tabs',
        input: '{"a":1}',
        fn: (input) => formatJSON(input, 'tab'),
        expected: { valid: true, output: '{\n\t"a": 1\n}' }
    },
    // Minify tests
    {
        name: 'Minify JSON',
        input: '{\n  "a": 1\n}',
        fn: (input) => minifyJSON(input),
        expected: { valid: true, output: '{"a":1}' }
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
