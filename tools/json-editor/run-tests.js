const { validateJSON, formatJSON, minifyJSON, stringifyJSON, unstringifyJSON } = require('./json-editor.logic');

const tests = [
    // ... (rest of tests)
    // Stringify tests
    {
        name: 'Stringify JSON',
        input: '{"a":1}',
        fn: (input) => stringifyJSON(input),
        expected: { valid: true, output: '"{\\\"a\\\":1}"' }
    },
    // Unstringify tests
    {
        name: 'Unstringify JSON',
        input: '"{\\\"a\\\":1}"',
        fn: (input) => unstringifyJSON(input),
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
