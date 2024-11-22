<template>
    <div class="page-container">
        <header id="header">
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

            <section id="auth-section">
                <button @click="openModal" class="btn btn-dark">Авторизація</button>
            </section>
        </header>

        <main id="main-body">
            <h1> Бронюйте житло легко !</h1>

            <!-- <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img id="carousel-img" src="../assets/img/rose.PNG" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/img/rose_2.PNG" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/img/butterfly.PNG" class="d-block w-100" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div> -->


            <p id="conv"> Зручності для гостей</p>
            <section id="conven" class="d-flex flex-row">
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/cutlery_icon.png" alt="cutlery_icon">
                    <p>Кухня</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/wifi_icon.png" alt="wifi_icon">
                    <p>Wi-Fi</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/paw_icon.png" alt="paw_icon">
                    <p>Можна з тваринами</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/laptop_icon.png" alt="laptop_icon">
                    <p>Робоче місце</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/parking_icon.png" alt="parking_icon">
                    <p>Паркінг</p>
                </div>

                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/snowflake_icon.png" alt="snowflake_icon">
                    <p>Кондиціонування</p>
                </div>

                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/heating_icon.png" alt="heating_icon">
                    <p>Опалення</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/breakfast_icon.png" alt="breakfast_icon">
                    <p>Сніданки</p>
                </div>
                <div class="conven-card">
                    <img class="conven-img" src="../assets/img/shower_icon.png" alt="shower_icon">
                    <p>Душ</p>
                </div>
            </section>
        </main>

        <Authorization :showModal="showModal" @close-modal="closeModal" />

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
import Authorization from './Authorization.vue';

export default {
    name: 'Home',
    components: {
        Authorization
    },
    setup() {
        const showModal = ref(false);

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        return {
            showModal,
            openModal,
            closeModal,
        };
    }
};
</script>

<style>
#carouselExample {
    width: 40%;
}

.page-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 15%;
    background-color: #f1f584;
    padding-top: 2%;
    padding-left: 5%;
    display: inline-flex;
    gap: 22%;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: black;
}

#main-name {
    display: flex;
    align-items: center;
    padding-bottom: 3%;
}

#main-icon {
    width: 60px;
    height: 60px;
    margin-right: 10px;
}

#search-section {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
}

#search {
    height: 30px;
    padding: 5px;
    border-radius: 5px;
}

#search-sign {
    width: 30px;
    height: 30px;
}

#main-body {
    position: absolute;
    left: 0;
    width: 100%;
    display: grid;
    justify-content: center;
    margin-top: 1%;
}

main {
    flex: 1;
    padding-top: 80px;
}

.conven-card {
    box-shadow: 0.0145rem 0.029rem 0.174rem rgba(0, 0, 0, 0.01698),
        0.0335rem 0.067rem 0.402rem rgba(0, 0, 0, 0.024),
        0.0625rem 0.125rem 0.75rem rgba(0, 0, 0, 0.03),
        0.1125rem 0.225rem 1.35rem rgba(0, 0, 0, 0.036),
        0.2085rem 0.417rem 2.502rem rgba(0, 0, 0, 0.04302),
        0.5rem 1rem 6rem rgba(0, 0, 0, 0.06),
        0 0 0 0.0625rem rgba(0, 0, 0, 0.015);
    background: whitesmoke;
    border-radius: 0.5rem;
    padding: 5%;
    width: 25%;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2%;
    text-wrap: nowrap;
}

.conven-img {
    width: 40px;
}

#conv {
    position: absolute;
    margin-left: 3%;
    margin-top: 15%;
}

#conven {
    gap: 3%;
    position: absolute;
    margin-left: 3%;
    margin-top: 20%;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-left: 5%;
    display: grid;
    gap: 20%;
    color: whitesmoke;
    background-color: black;

}

.footer-text {
    display: flex;
    gap: 10px;
    padding-top: 1%;
}

.footer-text a {
    color: whitesmoke;
    text-decoration: none;
}

.footer-text a:hover {
    text-decoration: underline;
}
</style>
