const bcrypt = require('bcryptjs');

const saltRounds = 10;
const plainText = process.argv[2];

if (!plainText) {
    console.log('Usage: node scripts/hash.js <text-to-hash>');
    process.exit(1);
}

bcrypt.hash(plainText, saltRounds, function (err, hash) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Text:', plainText);
    console.log('Hash:', hash);
});
