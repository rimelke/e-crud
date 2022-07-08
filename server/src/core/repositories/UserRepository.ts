import User from '@entities/User'
import { Token } from '@providers/TokenProvider'

export interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  activationToken: Token
}

export interface UpdateUserDTO {
  isActive: boolean
  activationToken: Token | null
}

interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>
  findByToken(token: string): Promise<User | undefined>
  create(data: CreateUserDTO): Promise<User>
  update(id: string, data: UpdateUserDTO): Promise<User>
}

export default UserRepository
