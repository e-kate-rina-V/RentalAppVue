import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

async function getCsrfToken() {
    try {
        const response = await axios.get('/api/csrf-token');
        const csrfToken = response.data.csrf_token;
        localStorage.setItem('csrf_token', csrfToken);
        return csrfToken;
    } catch (error) {
        console.error('Ошибка при получении CSRF токена:', error);
        return null;
    }
}

api.interceptors.request.use(
    async (config) => {
        let csrfToken = localStorage.getItem('csrf_token');

        if (!csrfToken) {
            csrfToken = await getCsrfToken();
        }

        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 422) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((field) => {
                    const messages = errors[field].join(', ');
                    alert(`Ошибка в поле ${field}: ${messages}`);
                });
            } else if (error.response.status === 401) {
                alert('Неавторизованный доступ. Выполните вход.');
            } else {
                alert(`Ошибка: ${error.response.status}`);
            }
        } else {
            alert('Ошибка соединения с сервером.');
        }
        return Promise.reject(error);
    }
);

export default api;
