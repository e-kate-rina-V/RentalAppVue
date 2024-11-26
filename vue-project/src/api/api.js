import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    withCredentials: true,
});

export const registerUser = async (data) => {
    try {
        const response = await api.post('register', data);

        console.log('API Response:', response.data);

        return response.data;
    } catch (error) {

        if (error.response) {
            console.error('API Error:', error.response.data || error.response.status);
            throw error.response.data || error.response.status;
        } else {
            console.error('Unknown Error:', error.message || error);
            throw error.message || error;
        }
    }
};


export const loginUser = async (data) => {
    try {
        const response = await api.post('login', data);  
        console.log('Login API Response:', response.data);
        return response.data; 
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message || error);
        throw error.response?.data || error;  
    }
};


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

