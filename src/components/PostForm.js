'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PostService } from '@/services/post'
import { AvatarUploadButton } from '@/components/uploadthing'
import { UserService } from "@/services/user"
import { AuthService } from "@/services/auth"

export default function PostForm() {
    const router = useRouter()
    const params = useParams()
    const isEditing = Boolean(params?.id)
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isEditing) {
            const loadPost = async () => {
                try {
                    const { data } = await PostService.getPost(params.id)
                    setContent(data.content)
                    setImageUrl(data.imageUrl)
                } catch (err) {
                    console.error('Ошибка при загрузке поста', err)
                    router.push('/posts')
                }
            }
            loadPost()
        }
    }, [params.id, isEditing])

    const handleAvatarUpload = async (res) => {
        if (!res?.[0]?.url) return
        setImageUrl(res[0].url)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { content, imageUrl }
            if (isEditing) {
                await PostService.updatePost(params.id, payload)
            } else {
                await PostService.createPost(payload)
            }
            router.push('/posts')
        } catch (err) {
            alert('Ошибка при сохранении поста')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Удалить пост?')) return
        try {
            await PostService.deletePost(params.id)
            router.push('/posts')
        } catch (err) {
            alert('Ошибка при удалении поста')
        }
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">
                    {isEditing ? 'Редактировать пост' : 'Создать пост'}
                </h2>

                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring"
                    rows={5}
                    placeholder="Содержание поста..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                {imageUrl ? (
                    <div>
                        <img
                            src={imageUrl}
                            alt="uploaded"
                            className="rounded-xl max-h-60 object-cover mb-4"
                        />
                        <div className="text-center">
                            <AvatarUploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={handleAvatarUpload}
                                onUploadError={(err) => alert(`Ошибка: ${err.message}`)}
                            />
                        </div>
                    </div>
                ) : (
                    <AvatarUploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={handleAvatarUpload}
                        onUploadError={(err) => alert(`Ошибка: ${err.message}`)}
                    />
                )}

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {isEditing ? 'Сохранить' : 'Опубликовать'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Удалить
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}