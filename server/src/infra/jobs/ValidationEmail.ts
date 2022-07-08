import { sendEmail } from '@lib/nodemailer'
import Job from './Job'

interface ValidationEmailDTO {
  fullName: string
  email: string
  token: string
}

export const ValidationEmail: Job<ValidationEmailDTO> = {
  async process({ data }) {
    await sendEmail({
      from: 'Support E-crud <support@e-crud.net>',
      to: `${data.fullName} <${data.email}>`,
      subject: 'Account activation',
      template: 'ValidationEmail',
      context: {
        fullName: data.fullName,
        link: `${process.env.ACTIVATE_URL}?token=${data.token}`
      }
    })
  }
}
