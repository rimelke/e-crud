import AuthTokenProvider from '@providers/AuthTokenProvider'
import crypto from 'crypto'

const PRIVATE_SECRET = 'secret'

class CryptoAuthTokenProvider implements AuthTokenProvider {
  async generate(payload: object) {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      'base64'
    )

    return `${crypto
      .createHmac('sha256', PRIVATE_SECRET)
      .update(encodedPayload)
      .digest('base64')}.${encodedPayload}`
  }

  async verify(token: string) {
    const [signature, encodedPayload] = token.split('.')

    if (!signature || !encodedPayload) return null

    const testSignature = crypto
      .createHmac('sha256', PRIVATE_SECRET)
      .update(encodedPayload)
      .digest('base64')

    if (signature !== testSignature) return null

    return JSON.parse(Buffer.from(encodedPayload, 'base64').toString())
  }
}

export default CryptoAuthTokenProvider
