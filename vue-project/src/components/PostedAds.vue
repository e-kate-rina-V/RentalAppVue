<template>
    <div class="page-container">
        <header id="header">

            <Head />
        </header>

        <main>
            <div>
                <h1>Мої оголошення</h1>

                <div v-if="isLoading">Загрузка объявлений...</div>

                <div v-else-if="errorMessage">{{ errorMessage }}</div>

                <div v-else-if="ads.length === 0">
                    <p>У вас пока нет объявлений. Создайте новое!</p>
                </div>

                <div v-else class="ads-grid">
                    <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
                </div>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Head from './vue_helpers/Head.vue';
import Footer from './vue_helpers/footer.vue';
import AdCard from './AdCard.vue';
import { fetchUserAds } from '@/api/api.js';

export default {
    name: 'PostedAds',
    components: {
        Head,
        Footer,
        AdCard,
    },
    setup() {
        const ads = ref([]);
        const isLoading = ref(true);
        const errorMessage = ref('');

        const getAds = async () => {
            try {
                isLoading.value = true;
                const result = await fetchUserAds();
                console.log('Полученные объявления:', result); 
                ads.value = result;
            } catch (error) {
                errorMessage.value = 'Ошибка при загрузке объявлений.';
                console.error(error);
            } finally {
                isLoading.value = false;
            }
        };


        onMounted(() => {
            getAds();
        });

        return {
            ads,
            isLoading,
            errorMessage,
        };
    },
};
</script>
