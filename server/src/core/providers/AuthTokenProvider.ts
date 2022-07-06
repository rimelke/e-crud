interface AuthTokenProvider {
  generate(payload: object): Promise<string>
  verify(token: string): Promise<object | null>
}

export default AuthTokenProvider
