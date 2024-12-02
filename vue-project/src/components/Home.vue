<template>
  <div class="page-container">
    <header id="header">
      <Head />

      <!-- <section id="search-section">
        <input type="search" id="search" placeholder="Почати пошук" />
        <img id="search-sign" src="../assets/img/search-sign.png" alt="search-sign" />
      </section> -->

      <section id="auth-section">
        <button @click="openModal" class="btn btn-dark">Авторизація</button>
      </section>
    </header>

    <main id="main-body">
      <h1>Бронюйте житло легко !</h1>

      <p id="conv-p">Зручності для гостей</p>
      <section id="conven" class="d-flex flex-row">
        <div class="conven-card">
          <img
            class="conven-img"
            src="../assets/img/cutlery_icon.png"
            alt="cutlery_icon"
          />
          <p>Кухня</p>
        </div>
        <div class="conven-card">
          <img class="conven-img" src="../assets/img/wifi_icon.png" alt="wifi_icon" />
          <p>Wi-Fi</p>
        </div>
        <div class="conven-card">
          <img class="conven-img" src="../assets/img/paw_icon.png" alt="paw_icon" />
          <p>Можна з тваринами</p>
        </div>

        <div class="conven-card">
          <img
            class="conven-img"
            src="../assets/img/snowflake_icon.png"
            alt="snowflake_icon"
          />
          <p>Кондиціонування</p>
        </div>

        <div class="conven-card">
          <img
            class="conven-img"
            src="../assets/img/breakfast_icon.png"
            alt="breakfast_icon"
          />
          <p>Сніданки</p>
        </div>
        <div class="conven-card">
          <img class="conven-img" src="../assets/img/shower_icon.png" alt="shower_icon" />
          <p>Душ</p>
        </div>
      </section>
    </main>

    <Footer />

    <Authorization :showModal="showModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import { ref } from "vue";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";
import Authorization from "./Authorization.vue";

export default {
  name: "Home",
  components: {
    Authorization,
    Head,
    Footer,
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
  },
};
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#header {
  display: flex;
  justify-content: flex-start;
  margin-left: 7%;
  z-index: 3;
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

#main-body {
  position: absolute;
  left: 0;
  width: 100%;
  display: grid;
  justify-content: center;
  margin-top: 1%;
  gap: 30%;
}

main {
  flex: 1;
  padding-top: 80px;
}

/* #conv-p {
  margin-bottom: -10%;
} */

#conven {
  display: flex;
  gap: 2%;
  justify-content: flex-start;
  width: 90%;
}

.conven-card {
  flex: 1 1 calc(25% - 2%);
  max-width: 160px;
  box-shadow: 0.0145rem 0.029rem 0.174rem rgba(0, 0, 0, 0.01698),
    0.0335rem 0.067rem 0.402rem rgba(0, 0, 0, 0.024),
    0.0625rem 0.125rem 0.75rem rgba(0, 0, 0, 0.03),
    0.1125rem 0.225rem 1.35rem rgba(0, 0, 0, 0.036),
    0.2085rem 0.417rem 2.502rem rgba(0, 0, 0, 0.04302),
    0.5rem 1rem 6rem rgba(0, 0, 0, 0.06), 0 0 0 0.0625rem rgba(0, 0, 0, 0.015);
  background: whitesmoke;
  border-radius: 0.5rem;
  padding: 50px;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
}

.conven-img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  #conven {
    gap: 5%;
  }

  .conven-card {
    flex: 1 1 calc(45% - 5%);
  }
}

@media (max-width: 480px) {
  .conven-card {
    flex: 1 1 calc(90%);
  }
}
</style>
