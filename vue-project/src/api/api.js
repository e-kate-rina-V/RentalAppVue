import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const registerUser = async (data) => {
    try {
        const response = await api.post('register', data);

        console.log('Registration API Response:', response.data);

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

export const logoutUser = async () => {
    try {
        const response = await api.post('logout', {}, {
            withCredentials: true,
        });
        alert("Logout successfull");
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

export const registerAd = async (formData) => {
    try {
        const response = await api.post('ad_register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const fetchUserAds = async () => {
    try {
        const response = await api.get('/ads');
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
        throw error;
    }
};

export const fetchAdById = async (id) => {
    try {
        const response = await api.get(`/ads/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке объявления:', error);
        throw error;
    }
};

export const fetchAllAds = async () => {
    try {
        const response = await api.get('/all_ads');
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
        throw error;
    }
};


