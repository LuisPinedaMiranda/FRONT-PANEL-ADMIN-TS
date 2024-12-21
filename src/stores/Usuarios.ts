// src/stores/usuarios.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Usuario } from '@/models/types'
import { userAuthToken } from './Auth'
import { useLocalStorage } from '@vueuse/core'
const backend_url = import.meta.env.VITE_BACKEND_URL

export const useUsersStore = defineStore('usuarios', {
  state: () => ({
    users: useLocalStorage<Usuario[]>('usersData', []),
  }),

  actions: {
    async fetchUsers() {
      const loginUser = userAuthToken() // Asegúrate de importar o definir esta función
      try {
        const response = await axios.get(`${backend_url}/listar_usuario`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginUser.token}`,
          },
        })
        if (response.data && Array.isArray(response.data.data.usuarios)) {
          this.users = response.data.data.usuarios // Asegúrate de acceder a response.data.data
        } else {
          console.error('Formato de datos inesperado:', response.data)
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error)
      }
    },
    clearUsers() {
      this.users = []
    },
  },
})
