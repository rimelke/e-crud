import AuthTokenProvider from '@providers/AuthTokenProvider'
import StringValidator from '@validators/StringValidator'

interface ValidateAuthTokenResult {
  userId: string
}

class ValidateAuthToken {
  constructor(private authTokenProvider: AuthTokenProvider) {}

  async execute(token?: string) {
    const payload = await this.authTokenProvider.verify(token as string)

    if (!payload) throw new Error('invalid token')

    const result: ValidateAuthTokenResult = {
      userId: payload.id
    }

    return result
  }
}

export default ValidateAuthToken
