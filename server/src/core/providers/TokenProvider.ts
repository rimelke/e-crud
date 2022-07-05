export interface Token {
  data: string
  expiresAt: Date
}

interface TokenProvider {
  genValidationToken(): Token
}

export default TokenProvider
