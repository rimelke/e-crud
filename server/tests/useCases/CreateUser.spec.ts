import User from '@entities/User'
import CryptoHashProvider from '@tests/providers/CryptoHashProvider'
import CryptoTokenProvider from '@tests/providers/CryptoTokenProvider'
import FakeEmailProvider from '@tests/providers/FakeEmailProvider'
import MemoryUserRepository from '@tests/repositories/MemoryUserRepository'
import CreateUser from '@useCases/CreateUser'

const makeSut = () => {
  const userRepository = new MemoryUserRepository()
  const hashProvider = new CryptoHashProvider()
  const tokenProvider = new CryptoTokenProvider()
  const emailProvider = new FakeEmailProvider()

  const createUser = new CreateUser(
    userRepository,
    hashProvider,
    tokenProvider,
    emailProvider
  )

  return {
    userRepository,
    hashProvider,
    tokenProvider,
    emailProvider,
    createUser
  }
}

const fakeData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  password: 'abcd1234'
}

test('should create an user', async () => {
  const { createUser, hashProvider, emailProvider } = makeSut()

  const user = await createUser.execute(fakeData)

  expect(user).toHaveProperty('id')
  expect(await hashProvider.compare(fakeData.password, user.password)).toBe(
    true
  )
  expect(emailProvider.counts.sendUserValidationEmail).toBe(1)
  expect(user.activationToken).toBeDefined()
  expect(user.activationToken).not.toBe(null)
})

test('should not create with already used email', async () => {
  const { userRepository, createUser } = makeSut()

  userRepository.users = [
    new User({
      id: '1',
      ...fakeData
    })
  ]

  await expect(createUser.execute(fakeData)).rejects.toThrow(
    'email already used'
  )
})
