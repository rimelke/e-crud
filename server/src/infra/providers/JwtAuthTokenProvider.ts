import AuthTokenProvider from '@providers/AuthTokenProvider'
import jwt from 'jsonwebtoken'

const SECRET = 'SECRET_EXAMPLE'

class JwtAuthTokenProvider implements AuthTokenProvider {
  generate(payload: object) {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, SECRET, (err, result) => {
        if (err || !result) reject(err)
        else resolve(result)
      })
    })
  }

  async verify(authorization?: string) {
    if (!authorization) return null

    const parts = authorization.split(' ')

    if (parts.length !== 2) return null

    const [schema, token] = parts

    if (!/^Bearer$/i.test(schema)) return null

    return new Promise<any>((resolve) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err || !decoded) resolve(null)
        else resolve(decoded)
      })
    })
  }
}

export default JwtAuthTokenProvider
