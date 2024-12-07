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
          <AdCard v-for="ad in ads.data" :key="ad.id" :ad="ad" />
        </div>

        <div v-if="ads.total > ads.per_page">
          <button :disabled="ads.current_page === 1" @click="loadPage(ads.current_page - 1)">
            Previous
          </button>
          <span>Page {{ ads.current_page }} of {{ ads.last_page }}</span>
          <button :disabled="ads.current_page === ads.last_page" @click="loadPage(ads.current_page + 1)">
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";
import AdCard from "./AdCard.vue";
import { fetchUserAds } from "@/api/api.js";

export default {
  name: "PostedAds",
  components: {
    Head,
    Footer,
    AdCard,
  },
  setup() {
    const ads = ref({ data: [], current_page: 1, last_page: 1, total: 0, per_page: 10 });
    const isLoading = ref(true);
    const errorMessage = ref("");
    const fileName = ref("");
    const message = ref("");
    const isReportGenerated = ref(false);

    const getAds = async (page = 1) => {
      try {
        isLoading.value = true;
        const result = await fetchUserAds(page);
        ads.value = result;
      } catch (error) {
        errorMessage.value = "Ошибка при загрузке оголошень.";
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const loadPage = (page) => {
      getAds(page);
    };

    onMounted(() => {
      getAds();

    });

    return {
      ads,
      isLoading,
      errorMessage,
      loadPage,
      fileName,
      message,
    };
  },
};
</script>
