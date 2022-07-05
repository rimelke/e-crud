import { Token } from './TokenProvider'

export interface UserValidationEmailDTO {
  firstName: string
  email: string
  token: Token
}

interface EmailProvider {
  sendUserValidationEmail(data: UserValidationEmailDTO): Promise<void>
}

export default EmailProvider
