import DateValidator from '@validators/DateValidator'

test('should validate a Date', () => {
  const validator = new DateValidator()

  expect(validator.validate(new Date())).toBeInstanceOf(Date)
  expect(() => validator.validate('test')).toThrow('value must be a Date')
})
