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
          <button
            :disabled="ads.current_page === 1"
            @click="loadPage(ads.current_page - 1)"
          >
            Previous
          </button>
          <span>Page {{ ads.current_page }} of {{ ads.last_page }}</span>
          <button
            :disabled="ads.current_page === ads.last_page"
            @click="loadPage(ads.current_page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </main>

    <button @click="handleReportAction">Скачать отчет</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";
import AdCard from "./AdCard.vue";
import { fetchUserAds, generateReport } from "@/api/api.js";

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

    const handleReportAction = async () => {
      try {
        await generateReport();
        isReportGenerated.value = true;
        message.value = "Отчет генерируется...";
      } catch (error) {
        message.value = "Ошибка при генерации отчета.";
        console.error(error);
      }
    };

    const downloadPDF = (fileName) => {
      if (!fileName) {
        console.error("Отсутствует имя файла для скачивания.");
        return;
      }
      const url = `/storage/reports/${fileName}`;

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    };

    onMounted(() => {
      getAds();

      window.Echo.channel("reports").listen("ReportGenerated", (event) => {
        fileName.value = event.fileName;
        message.value = event.message;
        isReportGenerated.value = true;
        downloadPDF(fileName.value);
      });
    });

    return {
      ads,
      isLoading,
      errorMessage,
      loadPage,
      fileName,
      message,
      handleReportAction,
      downloadPDF,
      isReportGenerated,
    };
  },
};
</script>
