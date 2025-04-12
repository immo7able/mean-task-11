export const handleApiError = (error) => {
    if (error.response) {
        const {status, data} = error.response
        switch (status) {
            case 400:
                return data.message
            case 401:
                return 'Сессия истекла - требуется повторный вход'
            case 500:
                return 'Ошибка сервера'
            default:
                return data.message || 'Неизвестная ошибка'
        }
    } else if (error.request) {
        return 'Нет ответа от сервера'
    } else {
        return 'Ошибка формирования запроса'
    }
}
