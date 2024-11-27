<template>
    <div class="ad-details">
        <h1>{{ ad.title }}</h1>
        <!-- <img :src="ad.image" alt="Ad image" class="ad-details-img" /> -->
        <img :src="ad.image || '/placeholder.jpg'" alt="Ad image" class="ad-details-img" />
        <p>{{ ad.description }}</p>
        <span>Ціна: {{ ad.price }} грн/ночь</span>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchAdById } from '@/api/api.js';

export default {
    name: 'AdDetails',
    setup() {
        const route = useRoute();
        const ad = ref(null);

        const getAdDetails = async () => {
            try {
                ad.value = await fetchAdById(route.params.id);
            } catch (error) {
                console.error('Ошибка при загрузке данных объявления:', error);
                ad.value = null;
            }
        };

        onMounted(() => {
            getAdDetails();
        });

        return {
            ad,
        };
    },
};
</script>

<style scoped>
.ad-details {
    padding: 16px;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.ad-details-img {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    border-radius: 8px;
}
</style>
