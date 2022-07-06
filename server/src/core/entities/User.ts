import ObjectValidator from '@validators/ObjectValidator'
import StringValidator from '@validators/StringValidator'

interface UserDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

const validator = new ObjectValidator().match({
  id: new StringValidator().required(),
  firstName: new StringValidator().trim().noSpaces().capitalize().required(),
  lastName: new StringValidator().trim().noSpaces().capitalize().required(),
  email: new StringValidator().trim().email().required(),
  password: new StringValidator().required()
})

class User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string

  constructor(data: UserDTO) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.password = data.password

    this.validate()
  }

  validate() {
    validator.validate(this)
  }
}

export default User
