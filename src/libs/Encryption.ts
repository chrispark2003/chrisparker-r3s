import crypto from 'crypto'

export default function Encryption(secret: string) {
  const alg = 'aes-256-ctr'

  return {
    _algorithm: alg,
    _secret: secret,

    encrypt(input: Buffer | string) {
      const secret = getFilledSecret(this._secret)
      const { iv, key } = getKeyAndIV(secret)
      const cipher = crypto.createCipheriv(this._algorithm, key, iv)

      const inputStr =
        input instanceof Buffer ? input.toString('base64') : input
      let cipherText = cipher.update(inputStr, 'utf8', 'base64')
      cipherText += cipher.final('base64')
      return `${cipherText}:${iv.toString('base64')}`
    },

    decrypt(ciphertext: string) {
      // Get Secret
      const secret = getFilledSecret(this._secret)

      // Split into text and iv
      const cipherTextAndIv = ciphertext.split(':')

      // Decode base64s into a buffer
      const cipherText = Buffer.from(cipherTextAndIv[0], 'base64')
      const textIv = Buffer.from(cipherTextAndIv[1], 'base64')

      // Get key, iv
      const {iv, key } = getKeyAndIV(secret, textIv)

      // Create decipher using secret key & iv pulled from text
      const decipher = crypto.createDecipheriv(this._algorithm, key, textIv)

      // Decrypt
      let text = decipher.update(cipherText, undefined, 'utf8')
      text += decipher.final('utf8')

      // Return decrypted text
      return text
      
    },
  }
}

// Private methods
function getFilledSecret(secret: string): string {
  const sha256Sum = crypto.createHash('sha256')
  sha256Sum.update(secret)
  return sha256Sum.digest('base64')
}

function getKeyAndIV(key: string, iv?: Buffer) {
  const ivBuffer = iv || crypto.randomBytes(16)
  const derivedKey = crypto.pbkdf2Sync(key, ivBuffer, 1e5, 32, 'sha256')
  return {
    iv: ivBuffer,
    key: derivedKey,
  }
}
