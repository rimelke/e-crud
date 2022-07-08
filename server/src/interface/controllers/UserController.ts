import BcryptHashProvider from '@infra/providers/BcryptHashProvider'
import BullNodemailerEmailProvider from '@infra/providers/BullNodemailerEmailProvider'
import JwtAuthTokenProvider from '@infra/providers/JwtAuthTokenProvider'
import NanoidTokenProvider from '@infra/providers/NanoidTokenProvider'
import PrismaUserRepository from '@infra/repositories/PrismaUserRepository'
import ActivateUser from '@useCases/ActivateUser'
import CreateUser from '@useCases/CreateUser'
import LoginUser from '@useCases/LoginUser'
import Controller from './Controller'

class UserController {
  static createUser: Controller = async ({ body }) => {
    const userRepository = new PrismaUserRepository()
    const hashProvider = new BcryptHashProvider()
    const tokenProvider = new NanoidTokenProvider()
    const emailProvider = new BullNodemailerEmailProvider()

    const createUser = new CreateUser(
      userRepository,
      hashProvider,
      tokenProvider,
      emailProvider
    )

    const result = await createUser.execute(body)

    return {
      id: result.id
    }
  }

  static loginUser: Controller = async ({ body }) => {
    const userRepository = new PrismaUserRepository()
    const hashProvider = new BcryptHashProvider()
    const authTokenProvider = new JwtAuthTokenProvider()

    const loginUser = new LoginUser(
      userRepository,
      hashProvider,
      authTokenProvider
    )

    const token = await loginUser.execute(body)

    return { token }
  }

  static activateUser: Controller = async ({ body }) => {
    const userRepository = new PrismaUserRepository()

    const activateUser = new ActivateUser(userRepository)

    const result = await activateUser.execute(body)

    return { id: result.id, isActive: result.isActive }
  }
}

export default UserController
