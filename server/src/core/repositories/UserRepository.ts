import User from '@entities/User'

export interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>
  create(data: CreateUserDTO): Promise<User>
}

export default UserRepository
