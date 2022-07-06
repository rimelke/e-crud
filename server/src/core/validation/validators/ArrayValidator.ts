import { Validator } from '..'

class ArrayValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: value instanceof Array,
        newValue: value,
        errorMessage: 'value must be an array'
      })
    })
  }

  items(validator: Validator) {
    this.validators.push({
      priority: 20,
      validator: (value: Array<any>) => {
        for (let i = 0; i < value.length; i++) {
          try {
            const newValue = validator.validate(value[i])

            value[i] = newValue
          } catch (err: any) {
            return {
              isValid: false,
              newValue: value,
              errorMessage: err.message.replace('value', `value[${i}]`)
            }
          }
        }

        return {
          isValid: true,
          newValue: value
        }
      }
    })

    return this
  }

  min(amount: number) {
    this.validators.push({
      priority: 20,
      validator: (value: Array<any>) => ({
        isValid: value.length >= amount,
        newValue: value,
        errorMessage: `value must have at least ${amount} items`
      })
    })

    return this
  }
}

export default ArrayValidator
