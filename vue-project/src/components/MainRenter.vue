<template>
    <div class="page-container">
        <header id="mainrenter-header">
            <section>
                <div id="main-name">
                    <img id="main-icon" src="../assets/img/bee_hive_icon.png" alt="hive" />
                    <h2>HiveFind</h2>
                </div>
            </section>

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

        <footer>
            <div class="footer-text">
                <p>Ⓒ 2024 HiveFind, Inc</p>
                <p>·</p>
                <a href="#">Конфіденційність</a>
                <p>·</p>
                <a href="#">Умови</a>
            </div>
        </footer>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { logoutUser } from '@/api/api.js';

export default {
    name: 'MainRenter',

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
#mainrenter-header {
    gap: 25%;
    padding-bottom: 1%;
}

#exit-btn {
    padding: 5px 20px;
}
</style>
