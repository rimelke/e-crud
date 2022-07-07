import { Validator } from '..'

class DateValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: !isNaN(Date.parse(value)),
        newValue: new Date(value),
        errorMessage: 'value must be a Date'
      })
    })
  }
}

export default DateValidator
