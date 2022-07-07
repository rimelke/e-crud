import { Validator } from '..'

class StringValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: typeof value === 'string',
        newValue: value,
        errorMessage: 'value must be a string'
      })
    })
  }

  trim() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: true,
        newValue: value.trim()
      })
    })

    return this
  }

  min(minLength: number) {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: value.length >= minLength,
        newValue: value,
        errorMessage: `value must be at least ${minLength} characters long`
      })
    })

    return this
  }

  regex(schema: RegExp) {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: schema.test(value),
        newValue: value,
        errorMessage: `value must match ${schema}`
      })
    })

    return this
  }

  email() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value),
        newValue: value,
        errorMessage: 'value must be a valid email'
      })
    })

    return this
  }

  url() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid:
          /^https?:\/\/(www\.)?[-a-zA-Z0-9]{1,256}(\.[a-zA-Z0-9()]{1,6})?(:[0-9]{1,4})?\b([-a-zA-Z0-9()@:%_\+.~#?&/=]*)$/.test(
            value
          ),
        newValue: value,
        errorMessage: 'value must be a valid url'
      })
    })

    return this
  }

  capitalize() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: true,
        newValue: value
          .charAt(0)
          .toUpperCase()
          .concat(value.substring(1).toLowerCase())
      })
    })

    return this
  }

  noSpaces() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: !value.includes(' '),
        newValue: value,
        errorMessage: 'value must not have white spaces'
      })
    })

    return this
  }

  date() {
    this.validators.push({
      priority: 20,
      validator: (value: string) => ({
        isValid: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value),
        newValue: value,
        errorMessage: 'value must be a valid date'
      })
    })

    return this
  }
}

export default StringValidator
