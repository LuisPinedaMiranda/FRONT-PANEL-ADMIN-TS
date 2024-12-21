import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { User } from '@/model/types'

export const userAuthToken = defineStore('auth', {
  state: () => ({
    user: useLocalStorage<User>('user_data', {} as User),
    token: useLocalStorage<string>('auth_token', ''),
  }),
  getters: {},
  actions: {
    setUserAndToken(user: User, token: string) {
      this.user = user
      this.token = token || ''
    },
  },
})
