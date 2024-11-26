<template>
    <div class="page-container">
        <header id="mainlandlord-header">
            <section>
                <div id="main-name">
                    <img id="main-icon" src="@/assets/img/bee_hive_icon.png" alt="hive" />
                    <h2>HiveFind</h2>
                </div>
            </section>

            <section id="add-btn-section">
                <button @click="openModal" class="btn btn-dark" type="button">Розмістити оголошення</button>
                <button class="btn btn-dark" type="button" @click="logout">Вийти</button>
            </section>
        </header>

        <main id="main-landlord-body">
        </main>

        <Add_ad v-model:showModal="showModal" />

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";
import Add_ad from './Add_ad.vue';

export default {
    name: 'MainLandlord',
    components: {
        Add_ad,
    },
    setup() {
        const router = useRouter();
        const showModal = ref(false);

        const openModal = () => {
            showModal.value = true;
        };
        // const logout = async () => {
        //     try {
        //         await logoutUser();  
        //         localStorage.removeItem("auth_token"); 
        //         localStorage.removeItem("user");  
        //         delete axios.defaults.headers.common["Authorization"];  
                
        //         router.push('/home');
        //     } catch (error) {
        //         console.error("Ошибка при выходе из системы:", error);
        //     }
        // };

        return {
            showModal,
            openModal,
        };
    },
};
</script>


<style scoped>
#mainlandlord-header {
    gap: 50%;
    padding-bottom: 1%;
}

#add-btn-section {
    display: flex;
    gap: 5%;
    text-wrap: nowrap;
}

#add-btn-section button {
    padding: 7px 18px;
}
</style>