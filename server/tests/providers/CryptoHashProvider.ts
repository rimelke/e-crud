import HashProvider from '@providers/HashProvider'
import crypto from 'crypto'

class CryptoHashProvider implements HashProvider {
  async hash(value: string) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(value)
      .digest('base64')

    return hashedPassword
  }

  async compare(value: string, hashed: string) {
    return hashed === (await this.hash(value))
  }
}

export default CryptoHashProvider
