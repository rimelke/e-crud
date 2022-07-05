import EmailProvider from '@providers/EmailProvider'

class FakeEmailProvider implements EmailProvider {
  counts = {
    sendUserValidationEmail: 0
  }

  async sendUserValidationEmail(): Promise<void> {
    this.counts.sendUserValidationEmail++
  }
}

export default FakeEmailProvider
