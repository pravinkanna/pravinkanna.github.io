const { validateJSON } = require('./json-editor.logic');

describe('JSON Editor Logic - Validation', () => {
    test('should return success for valid JSON', () => {
        const input = '{"name": "Pravin", "role": "Engineer"}';
        const result = validateJSON(input);
        expect(result.valid).toBe(true);
        expect(result.message).toBe('Valid JSON');
    });

    test('should return error for invalid JSON', () => {
        const input = '{"name": "Pravin", "role": "Engineer"'; // Missing closing brace
        const result = validateJSON(input);
        expect(result.valid).toBe(false);
        expect(result.message).toContain('Unexpected end of JSON input');
    });

    test('should return error for empty input', () => {
        const input = '';
        const result = validateJSON(input);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Input is empty');
    });
});

describe('JSON Editor Logic - Formatting', () => {
    const input = '{"a":1,"b":[2,3]}';

    test('should prettify with 2 spaces', () => {
        const { validateJSON, formatJSON } = require('./json-editor.logic');
        const result = formatJSON(input, '2');
        expect(result.valid).toBe(true);
        expect(result.output).toBe(JSON.stringify(JSON.parse(input), null, 2));
    });

    test('should prettify with 4 spaces', () => {
        const { formatJSON } = require('./json-editor.logic');
        const result = formatJSON(input, '4');
        expect(result.valid).toBe(true);
        expect(result.output).toBe(JSON.stringify(JSON.parse(input), null, 4));
    });

    test('should prettify with tabs', () => {
        const { formatJSON } = require('./json-editor.logic');
        const result = formatJSON(input, 'tab');
        expect(result.valid).toBe(true);
        expect(result.output).toBe(JSON.stringify(JSON.parse(input), null, '\t'));
    });

    test('should return error for invalid JSON when formatting', () => {
        const { formatJSON } = require('./json-editor.logic');
        const invalidInput = '{a:1}';
        const result = formatJSON(invalidInput, '2');
        expect(result.valid).toBe(false);
        expect(result.message).toBeDefined();
    });
});

describe('JSON Editor Logic - Minifying', () => {
    const input = '{\n  "a": 1,\n  "b": [2, 3]\n}';

    test('should minify JSON', () => {
        const { minifyJSON } = require('./json-editor.logic');
        const result = minifyJSON(input);
        expect(result.valid).toBe(true);
        expect(result.output).toBe('{"a":1,"b":[2,3]}');
    });

    test('should return error for invalid JSON when minifying', () => {
        const { minifyJSON } = require('./json-editor.logic');
        const invalidInput = '{a:1}';
        const result = minifyJSON(invalidInput);
        expect(result.valid).toBe(false);
        expect(result.message).toBeDefined();
    });
});

describe('JSON Editor Logic - Stringifying', () => {
    const input = '{"a": 1, "b": "hello"}';

    test('should stringify JSON (escaped)', () => {
        const { stringifyJSON } = require('./json-editor.logic');
        const result = stringifyJSON(input);
        expect(result.valid).toBe(true);
        expect(result.output).toBe(JSON.stringify(input));
    });

    test('should return error for invalid JSON when stringifying', () => {
        const { stringifyJSON } = require('./json-editor.logic');
        const invalidInput = '{a:1}';
        const result = stringifyJSON(invalidInput);
        expect(result.valid).toBe(false);
        expect(result.message).toBeDefined();
    });
});
