<template>
  <div class="page-container">
    <header id="header">
      <Head />
    </header>

    <main id="main-posted-ads">
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

        <div v-else id="adCard" class="row row-cols-2">
          <AdCard v-for="ad in ads.data" :key="ad.id" :ad="ad" />
        </div>

        <div
          v-if="ads.total > ads.per_page"
          id="pagination"
          class="d-flex justify-content-center mt-4"
        >
          <button
            :disabled="ads.current_page === 1"
            @click="loadPage(ads.current_page - 1)"
            class="btn btn-dark"
          >
            Previous
          </button>
          <span>Page {{ ads.current_page }} of {{ ads.last_page }}</span>
          <button
            :disabled="ads.current_page === ads.last_page"
            @click="loadPage(ads.current_page + 1)"
            class="btn btn-dark"
          >
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
    const ads = ref({ data: [], current_page: 1, last_page: 1, total: 0, per_page: 5 });
    const isLoading = ref(true);
    const errorMessage = ref("");
    const fileName = ref("");
    const message = ref("");
    const isReportGenerated = ref(false);

    const getAds = async (page = 1) => {
      try {
        isLoading.value = true;
        const result = await fetchUserAds(page, ads.value.per_page);
        ads.value = result;
      } catch (error) {
        errorMessage.value = "Помилка при завантаженні оголошень.";
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
