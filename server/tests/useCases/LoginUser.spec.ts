import User from '@entities/User'
import CryptoAuthTokenProvider from '@tests/providers/CryptoAuthTokenProvider'
import CryptoHashProvider from '@tests/providers/CryptoHashProvider'
import MemoryUserRepository from '@tests/repositories/MemoryUserRepository'
import LoginUser from '@useCases/LoginUser'

const makeSut = () => {
  const userRepository = new MemoryUserRepository()
  const hashProvider = new CryptoHashProvider()
  const authTokenProvider = new CryptoAuthTokenProvider()

  const loginUser = new LoginUser(
    userRepository,
    hashProvider,
    authTokenProvider
  )

  return { userRepository, hashProvider, loginUser, authTokenProvider }
}

const data = {
  email: 'john@doe.com',
  password: 'abcd1234'
}

test('should login user', async () => {
  const { hashProvider, loginUser, userRepository, authTokenProvider } =
    makeSut()

  userRepository.users.push(
    new User({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: await hashProvider.hash('abcd1234')
    })
  )

  const token = await loginUser.execute(data)

  expect(await authTokenProvider.verify(token)).toEqual({ id: '1' })
})

test('should not login if user was not found', async () => {
  const { loginUser } = makeSut()

  await expect(loginUser.execute(data)).rejects.toThrow('user not found')
})

test('should not login if password is invalid', async () => {
  const { hashProvider, loginUser, userRepository } = makeSut()

  userRepository.users.push(
    new User({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: await hashProvider.hash('otherpassword')
    })
  )

  await expect(loginUser.execute(data)).rejects.toThrow('invalid password')
})
