import { addJob } from '@lib/bull'
import EmailProvider, { UserValidationEmailDTO } from '@providers/EmailProvider'

class BullNodemailerEmailProvider implements EmailProvider {
  async sendUserValidationEmail(data: UserValidationEmailDTO) {
    await addJob('ValidationEmail', {
      email: data.email,
      fullName: `${data.firstName} ${data.lastName}`,
      token: data.token.data
    })
  }
}

export default BullNodemailerEmailProvider
