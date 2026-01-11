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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateJSON };
}
