
export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface CreatedUser extends User {
  id: string
}

export interface SignInUser {
  email: string,
  password: string
}