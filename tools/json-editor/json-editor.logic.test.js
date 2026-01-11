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
