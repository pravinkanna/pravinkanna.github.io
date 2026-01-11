const MongoIDConverter = require('./mongo-id-converter');

const tests = [
    {
        name: 'isValidObjectID - Valid 24-char hex',
        fn: () => MongoIDConverter.isValidObjectID('507f1f77bcf86cd799439011'),
        expected: true
    },
    {
        name: 'isValidObjectID - Invalid characters',
        fn: () => MongoIDConverter.isValidObjectID('507f1f77bcf86cd79943901g'),
        expected: false
    },
    {
        name: 'isValidObjectID - Too short',
        fn: () => MongoIDConverter.isValidObjectID('507f1f77bcf86cd79943901'),
        expected: false
    },
    {
        name: 'isValidObjectID - Too long',
        fn: () => MongoIDConverter.isValidObjectID('507f1f77bcf86cd7994390111'),
        expected: false
    },
    {
        name: 'isValidObjectID - Empty string',
        fn: () => MongoIDConverter.isValidObjectID(''),
        expected: false
    },
    {
        name: 'isValidObjectID - Non-string',
        fn: () => MongoIDConverter.isValidObjectID(null),
        expected: false
    },
    // extractTimestamp tests
    {
        name: 'extractTimestamp - Valid ObjectID',
        fn: () => {
            const date = MongoIDConverter.extractTimestamp('507f1f77bcf86cd799439011');
            return date instanceof Date ? date.toISOString() : null;
        },
        expected: '2012-10-17T21:13:27.000Z'
    },
    {
        name: 'extractTimestamp - Recent ObjectID',
        fn: () => {
            const date = MongoIDConverter.extractTimestamp('659f8a800000000000000000');
            return date instanceof Date ? date.toISOString() : null;
        },
        expected: '2024-01-11T06:28:16.000Z'
    },
    {
        name: 'extractTimestamp - Invalid ObjectID',
        fn: () => MongoIDConverter.extractTimestamp('invalid'),
        expected: null
    }
];

let failedCount = 0;

function runTests() {
    console.log('Running MongoDB ObjectID Converter Logic Tests...\n');
    
    if (tests.length === 0) {
        console.log('No tests defined yet.');
        return;
    }

    tests.forEach(t => {
        try {
            const result = t.fn();
            const expected = t.expected;
            
            // Deep comparison helper for objects/dates if needed, 
            // but for now simple comparison or JSON.stringify is enough
            const resultStr = JSON.stringify(result);
            const expectedStr = JSON.stringify(expected);

            if (resultStr === expectedStr) {
                console.log(`✅ [PASS] ${t.name}`);
            } else {
                console.error(`❌ [FAIL] ${t.name}`);
                console.error(`   Expected: ${expectedStr}`);
                console.error(`   Got:      ${resultStr}`);
                failedCount++;
            }
        } catch (e) {
            console.error(`❌ [FAIL] ${t.name}. Threw error: ${e.message}`);
            console.error(e.stack);
            failedCount++;
        }
    });

    console.log('\n-----------------------------------');
    if (failedCount > 0) {
        console.log(`Tests failed: ${failedCount}`);
        process.exit(1);
    } else {
        console.log('All tests passed! 🎉');
    }
}

// Export for use in specific test files if we split them, 
// or just run if this is the main test entry
if (require.main === module) {
    runTests();
}

module.exports = { tests, runTests };
