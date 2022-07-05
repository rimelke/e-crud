import TokenProvider from '@providers/TokenProvider'
import crypto from 'crypto'

class CryptoTokenProvider implements TokenProvider {
  genValidationToken() {
    return {
      data: crypto.randomBytes(20).toString('hex'),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }
}

export default CryptoTokenProvider
