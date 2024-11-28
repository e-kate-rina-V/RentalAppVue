<template>
    <div class="page-container">
        <header id="header">

            <Head />
        </header>

        <main>
            <div class="posted-ads">
                <h1>Мої оголошення</h1>

                <div v-if="isLoading" class="d-flex flex-column">
                    <div class="d-flex flex-row; load">
                        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    </div>
                    <span role="status">Завантаження оголошень...</span>
                </div>

                <div v-else-if="errorMessage">{{ errorMessage }}</div>

                <div v-else-if="ads.length === 0">
                    <p>У вас пока немає оголошень. Створіть нове!</p>
                </div>

                <div v-else class="d-flex flex-column">
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
import Footer from './vue_helpers/Footer.vue';
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



<style>
.load {
    margin-left: 40%;
    gap: 2%;
}

</style>
