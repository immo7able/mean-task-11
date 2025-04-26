'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PostService } from '@/services/post'
import { AuthService } from '@/services/auth'
import { Heart } from 'lucide-react'

export default function PostPage() {
    const { id } = useParams()
    const router = useRouter()
    const [post, setPost] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const user = await AuthService.getProfile()
                setUserId(user.data._id)
                setIsAuthenticated(true)

                const { data } = await PostService.getPost(id)
                setPost(data)
                setIsLiked(data.likes.includes(user.data._id))
            } catch (err) {
                console.warn('Пользователь не авторизован или ошибка загрузки поста', err)
                setIsAuthenticated(false)

                try {
                    const { data } = await PostService.getPost(id)
                    setPost(data)
                } catch {
                    router.push('/posts')
                }
            }
        }

        load()
    }, [id])

    const handleToggleLike = async () => {
        if (!isAuthenticated) return
        try {
            const { data } = await PostService.toggleLike(id)
            setPost(data)
            setIsLiked(data.likes.includes(userId))
        } catch (err) {
            console.error('Ошибка при лайке/дизлайке', err)
            alert('Ошибка при лайке/дизлайке поста')
        }
    }

    if (!post) {
        return <div className="text-center mt-10">Загрузка...</div>
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
                <h2 className="text-2xl font-bold">{post.author.username}</h2>
                <p className="text-gray-800">{post.content}</p>
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt="Post"
                        className="rounded-xl max-h-96 object-cover"
                    />
                )}

                <div className="flex items-center gap-2 pt-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleToggleLike}
                            className={`transition duration-200 ${
                                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                            }`}
                        >
                            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500' : ''}`} />
                        </button>
                    ) : (
                        <Heart className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="text-gray-700">{post.likes.length} лайков</span>
                </div>
            </div>
        </div>
    )
}
