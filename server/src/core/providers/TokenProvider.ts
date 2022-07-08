import DateValidator from '@validators/DateValidator'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

export interface Token {
  data: string
  expiresAt: Date
}

export class TokenValidator extends ObjectValidator {
  constructor() {
    super()
    this.match({
      data: new StringValidator().required(),
      expiresAt: new DateValidator().required()
    })
  }
}

interface TokenProvider {
  genValidationToken(): Token
}

export default TokenProvider
