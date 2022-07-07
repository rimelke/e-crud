import CryptoAuthTokenProvider from '@tests/providers/CryptoAuthTokenProvider'
import ValidateAuthToken from '@useCases/ValidateAuthToken'

const makeSut = () => {
  const authTokenProvider = new CryptoAuthTokenProvider()

  const validateAuthToken = new ValidateAuthToken(authTokenProvider)

  return { authTokenProvider, validateAuthToken }
}

test('should validate a token', async () => {
  const { authTokenProvider, validateAuthToken } = makeSut()

  const payload = await validateAuthToken.execute(
    await authTokenProvider.generate({ id: '1' })
  )

  expect(payload).toEqual({ userId: '1' })
})

test('should not validate an invalid token', async () => {
  const { validateAuthToken } = makeSut()

  await expect(validateAuthToken.execute()).rejects.toThrow('invalid token')
  await expect(validateAuthToken.execute('invalidTokenFormat')).rejects.toThrow(
    'invalid token'
  )
  await expect(
    validateAuthToken.execute('invalidSignature.InvalidToken')
  ).rejects.toThrow('invalid token')
})
