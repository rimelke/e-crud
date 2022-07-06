import ObjectValidator from '@validators/ObjectValidator'

test('should validate an object', () => {
  const validator = new ObjectValidator()

  expect(validator.validate({})).toEqual({})
  expect(() => validator.validate('test')).toThrow('value must be an object')
})

test('should match object schema', () => {
  const validator = new ObjectValidator().match({
    test: new ObjectValidator()
      .match({
        subtest: new ObjectValidator()
      })
      .required()
  })

  expect(validator.validate({ test: {} })).toEqual({ test: {} })
  expect(validator.validate({ test: { subtest: {} } })).toEqual({
    test: { subtest: {} }
  })
  expect(() => validator.validate({})).toThrow('value.test is required')
  expect(() => validator.validate({ test: 'test' })).toThrow(
    'value.test must be an object'
  )
  expect(() => validator.validate({ test: { subtest: 1 } })).toThrow(
    'value.test.subtest must be an object'
  )
})

test('should validate an instance', () => {
  const validator = new ObjectValidator().instance(ObjectValidator)

  expect(validator.validate(new ObjectValidator())).toBeDefined()
  expect(() => validator.validate({})).toThrow(
    'value must be an instance of ObjectValidator'
  )
})
