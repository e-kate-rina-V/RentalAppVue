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
        console.error('Error getting CSRF token:', error);
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
                    alert(`Error in ${field}: ${messages}`);
                });
            } else if (error.response.status === 401) {
                alert('Unauthorized access. Please sign in.');
            } else {
                alert(`Error: ${error.response.status}`);
            }
        } else {
            alert('Error connecting to server.');
        }
        return Promise.reject(error);
    }
);

export default api;
