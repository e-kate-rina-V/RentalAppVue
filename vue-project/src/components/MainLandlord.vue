<template>
    <div class="page-container">
        <header id="header">

            <Head />

            <section id="add-btn-section">
                <button @click="goToAds" class="btn btn-dark" type="button">Мої оголошення</button>
                <button @click="openModal" class="btn btn-dark" type="button">Розмістити оголошення</button>
                <button class="btn btn-dark" type="button" @click="logout">Вийти</button>
            </section>
        </header>

        <main id="main-landlord-body">
        </main>

        <Add_ad :showModal="showModal" @close-modal="closeModal" />

        <Footer />
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logoutUser } from '@/api/api.js';
import Head from './vue_helpers/Head.vue';
import Footer from './vue_helpers/footer.vue';
import Add_ad from './Add_ad.vue';

export default {
    name: 'MainLandlord',
    components: {
        Add_ad,
        Head,
        Footer
    },
    setup() {
        const router = useRouter();
        const showModal = ref(false);

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const goToAds = () => {
            router.push("/ads");
        }

        const logout = async () => {
            try {
                await logoutUser();
                router.push('/home');
            } catch (error) {
                console.error('Logout error:', error);
                alert('Произошла ошибка при выходе. Попробуйте снова.');
            }
        };

        return {
            showModal,
            openModal,
            closeModal,
            goToAds,
            logout,
        };
    },
};
</script>

<style scoped>
#add-btn-section {
    display: flex;
    gap: 5%;
    text-wrap: nowrap;
}

#add-btn-section button {
    padding: 7px 18px;
}
</style>