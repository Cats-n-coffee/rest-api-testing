const crypto = require('crypto');

function randomId() {
    return crypto.randomBytes(8).toString('hex');
}

module.exports = {
    randomId
}