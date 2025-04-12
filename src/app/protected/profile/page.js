'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {AuthService} from '@/services/auth'

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const {data} = await AuthService.getProfile()
                setUser(data)
            } catch (err) {
                router.push('../auth/login')
            } finally {
                setLoading(false)
            }
        }
        loadProfile()
    }, [])

    const handleLogout = () => {
        AuthService.logout()
        router.push('../auth/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-600 text-lg">Загрузка...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Профиль пользователя</h1>
                {user && (
                    <div className="space-y-4 mb-6">
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Имя:</span> {user.username}</p>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition duration-200"
                >
                    Выйти
                </button>
            </div>
        </div>
    )
}
