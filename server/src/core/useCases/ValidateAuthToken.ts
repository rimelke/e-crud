import AuthTokenProvider from '@providers/AuthTokenProvider'

class ValidateAuthToken {
  constructor(private authTokenProvider: AuthTokenProvider) {}

  async execute(token: string) {
    const payload = await this.authTokenProvider.verify(token)

    if (!payload) throw new Error('invalid token')

    return payload
  }
}

export default ValidateAuthToken
