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
        if (!(date instanceof Date) || isNaN(date.getTime())) return '';
        
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 5) return 'just now';
        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MongoIDConverter;
}
