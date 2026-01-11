/**
 * Validates a JSON string.
 * @param {string} input - The JSON string to validate.
 * @returns {Object} - An object with 'valid' (boolean) and 'message' (string).
 */
function validateJSON(input) {
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Input is empty' };
    }

    try {
        JSON.parse(input);
        return { valid: true, message: 'Valid JSON' };
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

/**
 * Formats (prettifies) a JSON string.
 * @param {string} input - The JSON string to format.
 * @param {string|number} indent - Indentation: '2', '4', or 'tab'.
 * @returns {Object} - An object with 'valid' (boolean), 'output' (string), and optional 'message'.
 */
function formatJSON(input, indent) {
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Input is empty' };
    }

    try {
        const parsed = JSON.parse(input);
        let space = 2;
        if (indent === '4') space = 4;
        if (indent === 'tab') space = '\t';
        
        const output = JSON.stringify(parsed, null, space);
        return { valid: true, output };
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

/**
 * Minifies a JSON string.
 * @param {string} input - The JSON string to minify.
 * @returns {Object} - An object with 'valid' (boolean), 'output' (string), and optional 'message'.
 */
function minifyJSON(input) {
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Input is empty' };
    }

    try {
        const parsed = JSON.parse(input);
        const output = JSON.stringify(parsed);
        return { valid: true, output };
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

/**
 * Stringifies a JSON string (escapes it).
 * @param {string} input - The JSON string to stringify.
 * @returns {Object} - An object with 'valid' (boolean), 'output' (string), and optional 'message'.
 */
function stringifyJSON(input) {
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Input is empty' };
    }

    try {
        JSON.parse(input); // Validate first
        const output = JSON.stringify(input);
        return { valid: true, output };
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

/**
 * Unstringifies a JSON string (parses an escaped string).
 * @param {string} input - The escaped JSON string.
 * @returns {Object} - An object with 'valid' (boolean), 'output' (string), and optional 'message'.
 */
function unstringifyJSON(input) {
    if (!input || input.trim() === '') {
        return { valid: false, message: 'Input is empty' };
    }

    try {
        const parsed = JSON.parse(input);
        if (typeof parsed !== 'string') {
            return { valid: false, message: 'Input is not a stringified JSON' };
        }
        return { valid: true, output: parsed };
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateJSON, formatJSON, minifyJSON, stringifyJSON, unstringifyJSON };
}
