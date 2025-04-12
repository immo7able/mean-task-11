import { useEffect } from 'react'
import styles from './Notification.module.css'
export const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            {message}
            <button onClick={onClose} className={styles.closeButton}>
                ×
            </button>
        </div>
    )
}