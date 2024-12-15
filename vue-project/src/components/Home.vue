<template>
  <div class="page-container">
    <header id="header">
      <Head />

      <section id="auth-section">
        <button id="auth-btn" @click="openModal" class="btn btn-dark">Авторизація</button>
      </section>
    </header>

    <main id="main-body">
      <h1>Бронюйте житло легко !</h1>

      <p id="conv-p">Зручності для гостей</p>
      <section id="conven" class="d-flex flex-row">
        <div class="conven-card">
          <img
            class="conven-img"
            src="../assets/img/kitchen_icon.png"
            alt="kitchen_icon"
          />
          <p>Кухня</p>
        </div>
        <div class="conven-card">
          <img class="conven-img" src="../assets/img/wifi_icon.png" alt="wifi_icon" />
          <p>Wi-Fi</p>
        </div>
        <div class="conven-card">
          <img class="conven-img" src="../assets/img/pets_icon.png" alt="pets_icon" />
          <p>Можна з тваринами</p>
        </div>

        <div class="conven-card">
          <img
            class="conven-img"
            src="../assets/img/conditioner_icon.png"
            alt="conditioner_icon"
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
