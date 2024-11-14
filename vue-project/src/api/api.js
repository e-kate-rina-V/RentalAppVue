import axios from 'axios';

// Функция для получения CSRF токена
async function getCsrfToken() {
    try {
        const response = await axios.get('http://localhost:8080/api/csrf-token'); // запрос на сервер
        const csrfToken = response.data.csrf_token;
        localStorage.setItem('csrf_token', csrfToken);  // Сохраняем токен в localStorage
        return csrfToken;
    } catch (error) {
        console.error('Ошибка при получении CSRF токена:', error);
        return null;
    }
}

// Создаем axios инстанс
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Используем CSRF токен для отправки формы
async function submitForm(formData) {
    let csrfToken = localStorage.getItem('csrf_token'); // Сначала пытаемся получить токен из localStorage

    // Если токен не найден, получаем его
    if (!csrfToken) {
        csrfToken = await getCsrfToken();
    }

    if (csrfToken) {
        try {
            await api.post('/users/store', formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken, // Отправка CSRF токена в заголовке
                }
            });
            alert('Пользователь успешно создан');
        } catch (error) {
            alert('Ошибка при создании пользователя');
            console.error(error);
        }
    } else {
        alert('Не удалось получить CSRF токен');
    }
}

export default api;
