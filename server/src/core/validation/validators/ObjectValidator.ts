import { Validator } from '..'

class ObjectValidator extends Validator {
  constructor() {
    super()
    this.validators.push({
      priority: 10,
      validator: (value) => ({
        isValid: typeof value === 'object',
        newValue: value,
        errorMessage: 'value must be an object'
      })
    })
  }

  match(schema: Record<string, Validator>) {
    this.validators.push({
      priority: 20,
      validator: (value) => {
        for (const key of Object.keys(schema)) {
          try {
            const newValue = schema[key].validate(value[key])

            value[key] = newValue
          } catch (err: any) {
            return {
              isValid: false,
              newValue: value,
              errorMessage: err.message.replace('value', `value.${key}`)
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

  instance(schema: Function) {
    this.validators.push({
      priority: 20,
      validator: (value) => ({
        isValid: value instanceof schema,
        newValue: value,
        errorMessage: `value must be an instance of ${schema.name}`
      })
    })

    return this
  }
}

export default ObjectValidator
