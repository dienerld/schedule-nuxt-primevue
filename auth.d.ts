// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number
    apartment: number
    name: string
  }

  interface UserSession {
    // Add your own fields
  }
}

export { }
