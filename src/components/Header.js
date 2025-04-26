'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService, isTokenExpired } from '@/services/auth';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        setIsAuth(token && !isTokenExpired(token));
    }, [pathname]);

    const handleLogout = () => {
        AuthService.logout();
        setIsAuth(false);
        router.push('/auth/login');
    };

    const hideOnAuthPages = ['/login', '/register'].includes(pathname);

    if (hideOnAuthPages) return null;

    return (
        <header style={styles.header}>
            <h2 style={styles.logo}>
                <Link href="/posts" style={styles.link}>Posts</Link>
            </h2>
            <nav style={styles.nav}>
                {isAuth ? (
                    <>
                        <Link href="/posts/new" style={styles.link}>Создать пост</Link>
                        <Link href="/posts/my" style={styles.link}>Мои посты</Link>
                        <Link href="/protected/profile" style={styles.link}>Профиль</Link>
                        <button onClick={handleLogout} style={styles.button}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/login" style={styles.link}>Вход</Link>
                        <Link href="/auth/register" style={styles.link}>Регистрация</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        padding: '10px 20px',
        backgroundColor: '#20232a',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nav: {
        display: 'flex',
        gap: '15px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px'
    },
    logo: {
        margin: 0
    },
    button: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px'
    }
};

export default Header;
