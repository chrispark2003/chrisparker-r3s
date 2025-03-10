"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function Encryption(secret) {
    const alg = 'aes-256-ctr';
    return {
        _algorithm: alg,
        _secret: secret,
        encrypt(input) {
            const secret = getFilledSecret(this._secret);
            const { iv, key } = getKeyAndIV(secret);
            const cipher = crypto_1.default.createCipheriv(this._algorithm, key, iv);
            const inputStr = input instanceof Buffer ? input.toString('base64') : input;
            let cipherText = cipher.update(inputStr, 'utf8', 'base64');
            cipherText += cipher.final('base64');
            return `${cipherText}:${iv.toString('base64')}`;
        },
        decrypt(ciphertext) {
            // Get Secret
            const secret = getFilledSecret(this._secret);
            // Split into text and iv
            const cipherTextAndIv = ciphertext.split(':');
            // Decode base64s into a buffer
            const cipherText = Buffer.from(cipherTextAndIv[0], 'base64');
            const textIv = Buffer.from(cipherTextAndIv[1], 'base64');
            // Get key, iv
            const { iv, key } = getKeyAndIV(secret, textIv);
            // Create decipher using secret key & iv pulled from text
            const decipher = crypto_1.default.createDecipheriv(this._algorithm, key, textIv);
            // Decrypt
            let text = decipher.update(cipherText, undefined, 'utf8');
            text += decipher.final('utf8');
            // Return decrypted text
            console.log(text);
            return text;
        },
    };
}
exports.default = Encryption;
// Private methods
function getFilledSecret(secret) {
    const sha256Sum = crypto_1.default.createHash('sha256');
    sha256Sum.update(secret);
    return sha256Sum.digest('base64');
}
function getKeyAndIV(key, iv) {
    const ivBuffer = iv || crypto_1.default.randomBytes(16);
    const derivedKey = crypto_1.default.pbkdf2Sync(key, ivBuffer, 1e5, 32, 'sha256');
    return {
        iv: ivBuffer,
        key: derivedKey,
    };
}
