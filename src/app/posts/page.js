'use client'

import { useEffect, useState } from 'react'
import { PostService } from '@/services/post'
import Link from 'next/link'

export default function AllPostsPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await PostService.getAllPosts()
                setPosts(data)
            } catch (err) {
                console.error('Ошибка при загрузке постов', err)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Все посты</h1>
            <div className="grid gap-4 max-w-2xl mx-auto">
                {posts.map(post => (
                    <Link
                        key={post._id}
                        href={`/posts/${post._id}`}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <p className="text-lg font-semibold mb-2">{post.author.username}</p>
                        <p className="text-gray-700">{post.content}</p>
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt="Post"
                                className="mt-4 rounded-xl max-h-60 object-cover"
                            />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}