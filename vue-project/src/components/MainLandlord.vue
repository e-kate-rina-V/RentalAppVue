<template>
  <div class="page-container">
    <header id="header">
      <Head />
    </header>

    <main id="main-landlord-body">
      <section id="add-btn-section">
        <button @click="openModal" class="btn btn-dark" type="button">
          Розмістити оголошення
        </button>
        <button @click="goToAds" class="btn btn-dark" type="button">
          Мої оголошення
        </button>
        <button class="btn btn-dark" type="button" @click="logout">Вийти</button>
        <button class="btn btn-dark" type="button" @click="handleReportAction">
          Згенерувати звіт
        </button>
        <p v-if="message" class="report-message">{{ message }}</p>
        <span
          >*Ви можете згенерувати та завантажити звіт з отриманого прибутку за поточний
          місяць</span
        >
      </section>
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
        message.value = "Звіт генерується...";
      } catch (error) {
        message.value = "Помилка при генерації звіту";
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
  display: grid;
  gap: 10%;
  text-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

#add-btn-section button {
  padding: 7px 18px;
  width: 50%;
}

.report-message {
  margin-left: 100px;
  color: #333;
  text-align: center;
  font-size: 16px;
}
</style>
