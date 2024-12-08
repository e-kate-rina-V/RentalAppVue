<template>
  <div class="page-container">
    <header id="header">
      <Head />

      <section id="add-btn-section">
        <button @click="goToAds" class="btn btn-dark" type="button">
          Мої оголошення
        </button>
        <button @click="openModal" class="btn btn-dark" type="button">
          Розмістити оголошення
        </button>
        <button class="btn btn-dark" type="button" @click="logout">Вийти</button>
        <button class="btn btn-dark" type="button" @click="handleReportAction">
          Скачать отчет
        </button>
      </section>
    </header>

    <main id="main-landlord-body">
      <p v-if="message" class="report-message">{{ message }}</p>
    </main>

    <Add_ad :showModal="showModal" @close-modal="closeModal" />

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { logoutUser, generateReport } from "@/api/api.js";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";
import Add_ad from "./Add_ad.vue";

export default {
  name: "MainLandlord",
  components: {
    Add_ad,
    Head,
    Footer,
  },
  setup() {
    const router = useRouter();
    const showModal = ref(false);
    const message = ref("");
    const isReportGenerated = ref(false);
    const fileName = ref("");

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const goToAds = () => {
      router.push("/ads");
    };

    const logout = async () => {
      try {
        await logoutUser();
        router.push("/home");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Произошла ошибка при выходе. Попробуйте снова.");
      }
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

      const url = `http://localhost:8080/storage/reports/${fileName}`;

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    };

    onMounted(() => {
      window.Echo.channel("reports").listen("ReportGenerated", (event) => {
        fileName.value = event.fileName;
        message.value = event.message;
        isReportGenerated.value = true;
        downloadPDF(fileName.value);
      });
    });

    return {
      showModal,
      openModal,
      closeModal,
      goToAds,
      logout,
      handleReportAction,
      message,
      isReportGenerated,
      fileName,
    };
  },
};
</script>

<style scoped>
#add-btn-section {
  display: flex;
  gap: 5%;
  text-wrap: nowrap;
}

#add-btn-section button {
  padding: 7px 18px;
}

.report-message {
  margin: 20px;
  color: #333;
  font-size: 16px;
  text-align: center;
}
</style>
