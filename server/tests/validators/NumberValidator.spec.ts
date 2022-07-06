import NumberValidator from '@validators/NumberValidator'

test('should validate a number', () => {
  const validator = new NumberValidator()

  expect(validator.validate(1)).toBe(1)
  expect(() => validator.validate('test')).toThrow('value must be a number')
})
