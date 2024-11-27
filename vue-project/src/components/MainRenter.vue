<template>
    <div class="page-container">
        <header id="header">

            <Head />

            <section id="search-section">
                <input type="search" id="search" placeholder="Почати пошук" />
                <img id="search-sign" src="../assets/img/search-sign.png" alt="search-sign" />
            </section>
            <section>
                <button id="exit-btn" class="btn btn-dark" type="button" @click="logout">Вийти</button>
            </section>
        </header>

        <main id="main-renter-body">
        </main>

        <Footer />
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { logoutUser } from '@/api/api.js';
import Head from './vue_helpers/Head.vue';
import Footer from './vue_helpers/footer.vue';

export default {
    name: 'MainRenter',
    components: {
        Head,
        Footer
    },
    setup() {
        const router = useRouter();

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
            logout,
        };
    },
};
</script>

<style scoped>

#exit-btn {
    padding: 5px 20px;
}
</style>
