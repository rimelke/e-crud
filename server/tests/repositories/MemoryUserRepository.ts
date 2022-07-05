import User from '@entities/User'
import UserRepository, { CreateUserDTO } from '@repositories/UserRepository'

class MemoryUserRepository implements UserRepository {
  private lastId = 0
  users: User[] = []

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async create(data: CreateUserDTO) {
    const user = new User({ ...data, id: (++this.lastId).toString() })

    this.users.push(user)

    return user
  }
}

export default MemoryUserRepository
