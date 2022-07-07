import { Validator } from '..'

class BooleanValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: typeof value === 'boolean',
        newValue: value
      })
    })
  }
}

export default BooleanValidator
