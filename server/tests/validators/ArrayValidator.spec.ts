import ArrayValidator from '@validators/ArrayValidator'

test('should validate an array', () => {
  const validator = new ArrayValidator()

  expect(validator.validate([])).toEqual([])
  expect(() => validator.validate('test')).toThrow('value must be an array')
})

test('should validate items', () => {
  const validator = new ArrayValidator().items(new ArrayValidator())

  expect(validator.validate([[], []])).toEqual([[], []])
  expect(() => validator.validate(['test'])).toThrow(
    'value[0] must be an array'
  )
})

test('should validate min length', () => {
  const validator = new ArrayValidator().min(1)

  expect(validator.validate([1])).toEqual([1])
  expect(() => validator.validate([])).toThrow(
    'value must have at least 1 items'
  )
})
