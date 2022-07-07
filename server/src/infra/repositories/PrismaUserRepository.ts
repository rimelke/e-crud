import User from '@entities/User'
import nanoid from '@lib/nanoid'
import prisma from '@lib/prisma'
import UserRepository, { CreateUserDTO } from '@repositories/UserRepository'

class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const savedUser = await prisma.users.findUnique({ where: { email } })

    if (!savedUser) return

    const user = new User(savedUser)

    return user
  }

  async create(data: CreateUserDTO) {
    const user = new User({ ...data, id: nanoid() })

    await prisma.users.create({
      data: { ...user }
    })

    return user
  }
}

export default PrismaUserRepository
