import HashProvider from '@providers/HashProvider'
import bcrypt from 'bcrypt'

class BcryptHashProvider implements HashProvider {
  hash(data: string) {
    return bcrypt.hash(data, 12)
  }

  compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed)
  }
}

export default BcryptHashProvider
