import { Validator } from '..'

class DateValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: value instanceof Date,
        newValue: value,
        errorMessage: 'value must be a Date'
      })
    })
  }
}

export default DateValidator
