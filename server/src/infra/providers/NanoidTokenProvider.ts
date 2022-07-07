import nanoid from '@lib/nanoid'
import TokenProvider, { Token } from '@providers/TokenProvider'

class NanoidTokenProvider implements TokenProvider {
  genValidationToken(): Token {
    return {
      data: nanoid(40),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }
}

export default NanoidTokenProvider
