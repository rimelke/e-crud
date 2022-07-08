import EmailProvider from '@providers/EmailProvider'
import HashProvider from '@providers/HashProvider'
import TokenProvider from '@providers/TokenProvider'
import UserRepository from '@repositories/UserRepository'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
}

class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
    private emailProvider: EmailProvider
  ) {}

  async execute(data: CreateUserDTO) {
    new ObjectValidator()
      .match({
        email: new StringValidator().trim().email().required(),
        password: new StringValidator().min(8).required()
      })
      .required()
      .validate(data)

    const emailAlreadyUsed = await this.userRepository.findByEmail(data.email)

    if (emailAlreadyUsed) throw new Error('email already used')

    const hashedPassword = await this.hashProvider.hash(data.password)

    const validationToken = this.tokenProvider.genValidationToken()

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      activationToken: validationToken
    })

    await this.emailProvider.sendUserValidationEmail({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: validationToken
    })

    return user
  }
}

export default CreateUser
