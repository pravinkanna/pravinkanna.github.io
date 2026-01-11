/**
 * MongoDB ObjectID Utility Functions
 */

const MongoIDConverter = {
    isValidObjectID(oid) {
        if (typeof oid !== 'string') return false;
        return /^[0-9a-fA-F]{24}$/.test(oid);
    },

    extractTimestamp(oid) {
        if (!this.isValidObjectID(oid)) return null;
        const timestamp = parseInt(oid.substring(0, 8), 16);
        return new Date(timestamp * 1000);
    },

    generateObjectID(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) return '';
        const timestamp = Math.floor(date.getTime() / 1000);
        const hexTimestamp = timestamp.toString(16).padStart(8, '0');
        return hexTimestamp + '0000000000000000';
    },

    getRelativeTime(date) {
        // TODO: Implementation
        return '';
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MongoIDConverter;
}
