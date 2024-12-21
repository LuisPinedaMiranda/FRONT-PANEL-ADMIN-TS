export interface User {
  nombre: string
  apellidos: string
  email: string
  rol: string
  estado: string // Cambia el tipo a boolean si "estado" es un booleano en el backend
}

export interface Usuario {
  nombre: string
  apellidos: string
  email: string
  rol: string
  password: string
  estado: boolean
  createdAt: Date
}
