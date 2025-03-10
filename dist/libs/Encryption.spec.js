"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Encryption_1 = __importDefault(require("./Encryption"));
describe('Encryption', function () {
    const enc = Encryption_1.default('abc123');
    const originalText = 'test123';
    let cipherTextAndIv;
    let plainText;
    describe('#encrypt()', function () {
        it(`should encrypt string without issue`, function () {
            cipherTextAndIv = enc.encrypt(originalText);
            assert_1.default.strictEqual(typeof cipherTextAndIv, 'string');
            assert_1.default.strictEqual(2, cipherTextAndIv.split(':').length);
        });
    });
    describe('#decrypt()', function () {
        it(`should decrypt cipher string without issue`, function () {
            plainText = enc.decrypt(cipherTextAndIv);
            assert_1.default.strictEqual(typeof plainText, 'string');
            assert_1.default.strictEqual(plainText, originalText);
        });
    });
});
