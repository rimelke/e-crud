interface AuthTokenProvider {
  generate(payload: object): Promise<string>
  verify(token?: string): Promise<any>
}

export default AuthTokenProvider
