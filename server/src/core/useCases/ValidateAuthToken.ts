import AuthTokenProvider from '@providers/AuthTokenProvider'
import StringValidator from '@validators/StringValidator'

class ValidateAuthToken {
  constructor(private authTokenProvider: AuthTokenProvider) {}

  async execute(token: string) {
    new StringValidator().required().validate(token)

    const payload = await this.authTokenProvider.verify(token)

    if (!payload) throw new Error('invalid token')

    return payload
  }
}

export default ValidateAuthToken
