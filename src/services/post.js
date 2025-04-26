import api from './api'
import Cookies from 'js-cookie'
import {isTokenExpired} from './auth'

export const PostService = {
    getAllPosts: async () => {
        return api.get('/posts')
    },
    getPost: async (id) => {
        return api.get(`/posts/${id}`)
    },
    createPost: async (data) => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) throw new Error('Unauthorized')
        return api.post('/posts', data)
    },
    updatePost: async (id, data) => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) throw new Error('Unauthorized')
        return api.patch(`/posts/${id}`, data)
    },
    deletePost: async (id) => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) throw new Error('Unauthorized')
        return api.delete(`/posts/${id}`)
    },
    getUserPosts: async () => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) throw new Error('Unauthorized')
        return api.get(`/posts/my`)
    },
    toggleLike: async (id) => {
        const token = Cookies.get('accessToken')
        if (!token || isTokenExpired(token)) throw new Error('Unauthorized')
        return api.post(`/posts/${id}/like`)
    }
}
