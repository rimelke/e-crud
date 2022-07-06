interface ValidatorObject {
  // Priorities:
  // 0 = Before type checking, such as "required"
  // 10 = Type checking
  // 20 = After type checking, such as "email"
  priority: number
  validator: (value: any) => {
    isValid: boolean
    newValue: any
    errorMessage?: string
  }
}

export abstract class Validator {
  protected validators: ValidatorObject[] = []

  required() {
    this.validators.push({
      priority: 0,
      validator: (value) => ({
        isValid: typeof value === 'number' || Boolean(value),
        newValue: value,
        errorMessage: 'value is required'
      })
    })

    return this
  }

  validate(value: any) {
    const sortedValidators = this.validators.sort(
      (a, b) => a.priority - b.priority
    )

    let newValue = value
    for (const validator of sortedValidators) {
      if (validator.priority >= 10 && newValue === undefined) break

      const {
        isValid,
        newValue: newValueCurrent,
        errorMessage
      } = validator.validator(newValue)

      if (!isValid) throw new Error(errorMessage)

      newValue = newValueCurrent
    }

    return newValue
  }
}
