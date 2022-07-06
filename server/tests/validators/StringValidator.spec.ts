import StringValidator from '@validators/StringValidator'

test('should validate a string', () => {
  const validator = new StringValidator()

  expect(validator.validate('test')).toBe('test')
  expect(() => validator.validate(0)).toThrow('value must be a string')
})

test('should trim a string', () => {
  const validator = new StringValidator().trim()

  expect(validator.validate('   test   ')).toBe('test')
})

test('should validate a min length string', () => {
  const validator = new StringValidator().min(4)

  expect(validator.validate('test')).toBe('test')
  expect(() => validator.validate('tes')).toThrow(
    'value must be at least 4 characters long'
  )
})

test('should validate a regex', () => {
  const validator = new StringValidator().regex(/^test/)

  expect(validator.validate('test')).toBe('test')
  expect(() => validator.validate('wrong test')).toThrow(
    'value must match /^test/'
  )
})

test('should validate an email', () => {
  const validator = new StringValidator().email()

  expect(validator.validate('john@doe.com')).toBe('john@doe.com')
  expect(() => validator.validate('test')).toThrow(
    'value must be a valid email'
  )
})

test('should validate an url', () => {
  const validator = new StringValidator().url()

  expect(validator.validate('https://example.com')).toBe('https://example.com')
  expect(() => validator.validate('test')).toThrow('value must be a valid url')
})

test('should capitalize a string', () => {
  const validator = new StringValidator().capitalize()

  expect(validator.validate('teSt')).toBe('Test')
})

test('should validate no spaces', () => {
  const validator = new StringValidator().noSpaces()

  expect(validator.validate('test')).toBe('test')
  expect(() => validator.validate('te st')).toThrow(
    'value must not have white spaces'
  )
})

test('should validate a date', () => {
  const validator = new StringValidator().date()

  expect(validator.validate('2022-06-29')).toBe('2022-06-29')
  expect(() => validator.validate('test')).toThrow('value must be a valid date')
})
