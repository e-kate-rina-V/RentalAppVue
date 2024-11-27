<template>
    <div class="page-container">
        <header id="header">

            <Head />
        </header>

        <main>
            <div>
                <h1>Мої оголошення</h1>
                <div v-if="ads.length === 0">
                    <p>У вас пока нет объявлений. Создайте новое!</p>
                </div>

                <div class="ads-grid">
                    <div v-if="isLoading">Загрузка объявлений...</div>
                    <div v-else-if="errorMessage">{{ errorMessage }}</div>
                    <div v-else>
                        <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
                    </div>

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
                ads.value = await fetchUserAds();
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
        };
    },
};
</script>

<style scoped>
.ads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
}
</style>
