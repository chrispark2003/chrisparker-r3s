/// <reference types="node" />
export default function Encryption(secret: string): {
    _algorithm: string;
    _secret: string;
    encrypt(input: Buffer | string): string;
    decrypt(ciphertext: string): string;
};
