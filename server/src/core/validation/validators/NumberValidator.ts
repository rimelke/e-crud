import { Validator } from '..'

class NumberValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => {
        const parsedValue = Number(value)

        if (isNaN(parsedValue))
          return {
            isValid: false,
            newValue: parsedValue,
            errorMessage: 'value must be a number'
          }

        return {
          isValid: true,
          newValue: parsedValue
        }
      }
    })
  }
}

export default NumberValidator
