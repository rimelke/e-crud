import User from '@entities/User'
import UserRepository, {
  CreateUserDTO,
  UpdateUserDTO
} from '@repositories/UserRepository'

class MemoryUserRepository implements UserRepository {
  private lastId = 0
  users: User[] = []

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async findByToken(token: string) {
    return this.users.find(
      (user) => user.activationToken && user.activationToken.data === token
    )
  }

  async create(data: CreateUserDTO) {
    const user = new User({ ...data, id: (++this.lastId).toString() })

    this.users.push(user)

    return user
  }

  async update(id: string, data: UpdateUserDTO) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    const updatedUser = new User({
      ...this.users[userIndex],
      ...data
    })

    this.users.splice(userIndex, 1, updatedUser)

    return updatedUser
  }
}

export default MemoryUserRepository
