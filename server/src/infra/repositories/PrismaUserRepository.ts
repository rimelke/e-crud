import User from '@entities/User'
import nanoid from '@lib/nanoid'
import prisma from '@lib/prisma'
import UserRepository, {
  CreateUserDTO,
  UpdateUserDTO
} from '@repositories/UserRepository'

class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const savedUser = await prisma.users.findUnique({ where: { email } })

    if (!savedUser) return

    const user = new User({
      ...savedUser,
      activationToken:
        savedUser.activationToken && savedUser.activationExpires
          ? {
              data: savedUser.activationToken,
              expiresAt: savedUser.activationExpires
            }
          : null
    })

    return user
  }

  async findByToken(token: string) {
    const savedUser = await prisma.users.findFirst({
      where: { activationToken: token }
    })

    if (!savedUser) return

    return new User({
      ...savedUser,
      activationToken:
        savedUser.activationToken && savedUser.activationExpires
          ? {
              data: savedUser.activationToken,
              expiresAt: savedUser.activationExpires
            }
          : null
    })
  }

  async create(data: CreateUserDTO) {
    const user = new User({ ...data, id: nanoid() })

    await prisma.users.create({
      data: {
        ...user,
        activationToken: user.activationToken?.data,
        activationExpires: user.activationToken?.expiresAt
      }
    })

    return user
  }

  async update(id: string, data: UpdateUserDTO) {
    const savedUser = await prisma.users.findUniqueOrThrow({ where: { id } })

    const updatedUser = new User({
      ...savedUser,
      ...data
    })

    await prisma.users.update({
      where: { id },
      data: {
        isActive: updatedUser.isActive,
        activationToken: updatedUser.activationToken
          ? updatedUser.activationToken.data
          : null,
        activationExpires: updatedUser.activationToken
          ? updatedUser.activationToken.expiresAt
          : null
      }
    })

    return updatedUser
  }
}

export default PrismaUserRepository
