const crypto = require('crypto');
const { env } = require('process');
const algorithm = process.env.process || 'aes-256-cbc';
const key = Buffer.alloc(32);
const iv = Buffer.alloc(16, 0); 

function cipher(text) {
    let cipher = crypto.createCipheriv(algorithm, key,iv);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

function decipher(text) {
    let decipher = crypto.createDecipheriv(algorithm, key,iv);
    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = {
    cipher: function(key){
        return cipher(key)
    },
    decipher: function(key){
        return decipher(key)
    }
  };