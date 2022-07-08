import User from '@entities/User'
import MemoryUserRepository from '@tests/repositories/MemoryUserRepository'
import ActivateUser from '@useCases/ActivateUser'

const makeSut = () => {
  const userRepository = new MemoryUserRepository()

  const activateUser = new ActivateUser(userRepository)

  userRepository.users = [
    new User({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'password',
      activationToken: {
        data: 'token',
        expiresAt: new Date(Date.now() + 60 * 1000)
      }
    })
  ]

  return { userRepository, activateUser }
}

test('should activate an user', async () => {
  const { activateUser } = makeSut()

  const user = await activateUser.execute({ token: 'token' })

  expect(user.activationToken).toBe(null)
  expect(user.isActive).toBe(true)
})

test('should not activate if user was not found', async () => {
  const { activateUser } = makeSut()

  await expect(activateUser.execute({ token: 'token2' })).rejects.toThrow(
    'user not found'
  )
})

test('should not activate with expired token', async () => {
  const { activateUser, userRepository } = makeSut()

  userRepository.users.push(
    new User({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'password',
      activationToken: {
        data: 'token2',
        expiresAt: new Date(Date.now() - 60 * 1000)
      }
    })
  )

  await expect(activateUser.execute({ token: 'token2' })).rejects.toThrow(
    'expired token'
  )
})
