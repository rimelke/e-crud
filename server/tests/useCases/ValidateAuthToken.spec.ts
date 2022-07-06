import CryptoAuthTokenProvider from '@tests/providers/CryptoAuthTokenProvider'
import ValidateAuthToken from '@useCases/ValidateAuthToken'

const makeSut = () => {
  const authTokenProvider = new CryptoAuthTokenProvider()

  const validateAuthToken = new ValidateAuthToken(authTokenProvider)

  return { authTokenProvider, validateAuthToken }
}

const payloadData = { id: '1' }

test('should validate a token', async () => {
  const { authTokenProvider, validateAuthToken } = makeSut()

  const payload = await validateAuthToken.execute(
    await authTokenProvider.generate(payloadData)
  )

  expect(payload).toEqual(payloadData)
})

test('should not validate an invalid token', async () => {
  const { validateAuthToken } = makeSut()

  await expect(validateAuthToken.execute('invalidTokenFormat')).rejects.toThrow(
    'invalid token'
  )
  await expect(
    validateAuthToken.execute('invalidSignature.InvalidToken')
  ).rejects.toThrow('invalid token')
})
