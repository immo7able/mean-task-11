'use client'
import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Cookies from 'js-cookie'

export default function ProtectedLayout({children}) {
    const router = useRouter()
    // Проверка авторизации при монтировании
    useEffect(() => {
        const checkAuth = () => {
            const accessToken = Cookies.get('accessToken')
            if (!accessToken) router.push('../auth/login')
        }
        checkAuth()
    }, [])
    return <>{children}</>
}
