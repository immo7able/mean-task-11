import api from './api'
import Cookies from 'js-cookie'
import { isTokenExpired } from './auth'

export const UserService = {
    updateAvatar: async (avatarUrl) => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) {
            throw new Error('Токен истек')
        }

        return api.post('/user/avatar', { avatarUrl })
    },

    deleteAvatar: async () => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) {
            throw new Error('Токен истек')
        }

        return api.delete('/user/avatar')
    },
}
