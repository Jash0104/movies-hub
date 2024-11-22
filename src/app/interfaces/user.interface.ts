
export interface User {
  name: string,
  lastName: string,
  email: string,
  password: string
}

export interface LoggedUser extends User {
    role: "USER" | "ADMIN"
}

export interface CreatedUser extends User {
  id: string,
  token: string
}

export interface SignInUser {
  email: string,
  password: string
}
