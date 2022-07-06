import HashProvider from '@providers/HashProvider'
import UserRepository from '@repositories/UserRepository'
import AuthTokenProvider from '@providers/AuthTokenProvider'

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
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) throw new Error('user not found')

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
