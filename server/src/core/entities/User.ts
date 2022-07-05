interface UserDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

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
  }
}

export default User
