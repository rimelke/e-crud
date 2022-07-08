import { Token } from '@providers/TokenProvider'
import UserRepository from '@repositories/UserRepository'
import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface ActivateUserDTO {
  token: string
}

class ActivateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ActivateUserDTO) {
    new ObjectValidator()
      .match({
        token: new StringValidator().required()
      })
      .required()
      .validate(data)

    const user = await this.userRepository.findByToken(data.token)

    if (!user) throw new Error('user not found')

    if ((user.activationToken as Token).expiresAt.getTime() < Date.now())
      throw new Error('expired token')

    const updatedUser = await this.userRepository.update(user.id, {
      isActive: true,
      activationToken: null
    })

    return updatedUser
  }
}

export default ActivateUser
