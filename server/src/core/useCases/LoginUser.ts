import HashProvider from '@providers/HashProvider'
import UserRepository from '@repositories/UserRepository'
import AuthTokenProvider from '@providers/AuthTokenProvider'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface LoginUserDTO {
  email: string
  password: string
}

class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
    private authTokenProvider: AuthTokenProvider
  ) {}

  async execute(data: LoginUserDTO) {
    new ObjectValidator()
      .match({
        email: new StringValidator().trim().email().required(),
        password: new StringValidator().required()
      })
      .required()
      .validate(data)

    const user = await this.userRepository.findByEmail(data.email)

    if (!user) throw new Error('user not found')

    if (!user.isActive) throw new Error('user is not active')

    const passwordsMatch = await this.hashProvider.compare(
      data.password,
      user.password
    )

    if (!passwordsMatch) throw new Error('invalid password')

    const authToken = await this.authTokenProvider.generate({ id: user.id })

    return authToken
  }
}

export default LoginUser
