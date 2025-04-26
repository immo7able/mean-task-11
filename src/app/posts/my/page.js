'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostService } from '@/services/post'

export default function PostsPage() {
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await PostService.getUserPosts()
                setPosts(data)
            } catch (err) {
                console.error('Ошибка при загрузке постов', err)
            }
        }
        fetchPosts()
    }, [])

    const handleEdit = (postId) => {
        router.push(`/posts/edit/${postId}`)
    }

    const handleDelete = async (postId) => {
        if (!confirm('Вы уверены, что хотите удалить этот пост?')) return
        try {
            await PostService.deletePost(postId)
            setPosts(posts.filter((post) => post._id !== postId))
        } catch (err) {
            console.error('Ошибка при удалении поста', err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Ваши посты</h1>
            {posts.length === 0 ? (
                <p>У вас нет постов.</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                            <p>{post.content}</p>
                            {post.imageUrl && <img src={post.imageUrl} alt="Post Image" />}
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleEdit(post._id)}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}