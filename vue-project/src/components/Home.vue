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
