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

export const resendVerification = () => api.post("/email/verify-notification");


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
        const response = await api.post('ads/register', formData, {
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

export const fetchUserAds = async (page = 1, perPage = 5) => {
    try {
        const response = await api.get(`/ads?page=${page}&per_page=${perPage}`);
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

export const fetchAllAds = async (page = 1, filters = {}, sort = '') => {
    try {
        const response = await api.get('all_ads', {
            params: {
                page,
                premType: filters.premType,
                accomType: filters.accomType,
                priceRange: filters.priceRange,
                guestCount: filters.guestCount,
                conveniences: filters.conveniences,
                sort,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
        throw error;
    }
};

export const reserveAd = async (formData) => {
    try {
        const response = await api.post('reservation', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getUnavailableDates = async (adId) => {
    const response = await api.get(`/ads/${adId}/unavailable-dates`);
    return response;
  };
  
export const submitReview = async (adId, ratings, reviews, averageRating) => {
    try {
        const payload = {
            ratings,
            reviews,
            adId,
            averageRating,
        };

        const response = await api.post('reviews', payload, {
            withCredentials: true,
        });

        console.log('Review successfully submitted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error.response ? error.response.data : error;
    }
};

export const fetchReviewsByAdId = async (adId) => {
    try {
        const response = await api.get(`/ads/${adId}/reviews`);
        const reviews = response.data;

        for (let review of reviews) {
            const userResponse = await api.get(`/users/${review.user_id}`);
            review.user_name = userResponse.data.name;
        }

        return reviews;
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        throw error;
    }
};

export const generateReport = async () => {
    try {
        const response = await api.post("/generate-report");
        return response.data;
    } catch (error) {
        throw new Error("Ошибка при генерации отчета");
    }
};

export const openChat = async (adId) => {
    try {
        const response = await api.post(`chats/${adId}/start`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при открытии чата:", error);
        throw error;
    }
};

export const fetchUserChats = async () => {
    try {
        const response = await api.get('/chats');
        return response.data; 
    } catch (error) {
        console.error("Ошибка при получении чатов пользователя:", error);
        throw error;
    }
};

  export const fetchMessages = async (chatId) => {
    try {
        const response = await api.get(`chats/${chatId}/messages`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
        throw error;
    }
};

export const sendMessageAPI = async (chatId, messageContent) => {
    try {
      const response = await api.post(`chats/${chatId}/messages`, {
        message: messageContent,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
};
  












