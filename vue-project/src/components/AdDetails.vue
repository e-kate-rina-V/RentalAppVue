<template>
  <div class="page-container">
    <header id="header">
      <Head />
    </header>

    <main id="main-ad-details">
      <div class="ad-details">
        <div v-if="!ad" class="d-flex flex-column">
          <div id="ad-details-load">
            <div class="d-flex flex-row; load">
              <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            </div>
            <span role="status">Завантаження оголошення...</span>
          </div>
        </div>

        <div v-else-if="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-else>
          <div class="d-flex flex-row">
            <section id="carousel-container">
              <div
                v-if="ad.materials && ad.materials.length"
                id="adCarousel"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-indicators">
                  <button
                    v-for="(material, index) in ad.materials"
                    :key="'indicator-' + index"
                    :data-bs-target="'#adCarousel'"
                    :data-bs-slide-to="index"
                    :class="{ active: index === 0 }"
                    aria-label="'Slide ' + (index + 1)"
                  ></button>
                </div>

                <div class="carousel-inner">
                  <div
                    v-for="(material, index) in ad.materials"
                    :key="'slide-' + index"
                    :class="['carousel-item', { active: index === 0 }]"
                  >
                    <img
                      :src="`http://localhost:8080/storage/${material.source}`"
                      :alt="'Image ' + (index + 1)"
                      class="d-block w-100 ad-details-img"
                    />
                  </div>
                </div>

                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#adCarousel"
                  data-bs-slide="prev"
                >
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#adCarousel"
                  data-bs-slide="next"
                >
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <p v-else>Зображення для цього оголошення відсутні</p>
            </section>

            <section>
              <div id="reserv-btn" class="d-flex flex-column">
                <button @click="openModal" type="button" class="btn btn-dark">
                  Забронювати
                </button>
                <button @click="openModalReview" type="button" class="btn btn-warning">
                  Залишити відгук
                </button>
                <button @click="openReviewsModal" type="button" class="btn btn-secondary">
                  Переглянути відгуки
                </button>
                <button @click="startChat" type="button" class="btn btn-success">
                  Розпочати чат
                </button>
                <button @click="openMyChats" type="button" class="btn btn-danger">
                  Мої чати
                </button>
              </div>
            </section>
          </div>

          <div class="d-flex flex-column">
            <h1 v-if="ad.title">{{ ad.title }}</h1>
            <span v-else></span>

            <div class="d-flex flex-row">
              <p>Гості: {{ ad.guest_count }}</p>
              <span>·</span>

              <p>{{ getPremTypeLabel(ad.prem_type) }}</p>

              <span>·</span>
              <p>{{ getAccomTypeLabel(ad.accom_type) }}</p>
            </div>

            <h1>Ціна: {{ ad.price }} грн/ніч</h1>

            <div v-if="averageRating !== null">
              <h3>Середній рейтинг: {{ averageRating.toFixed(1) }} ⭐</h3>
            </div>
            <span v-else>Немає відгуків для цього оголошення</span>

            <p v-if="ad.description">Опис: {{ ad.description }}</p>
            <span v-else></span>

            <p>Зручності для гостей</p>

            <section id="conven" class="conven-grid">
              <div
                v-for="(convenience, index) in ad.conveniences"
                :key="index"
                class="conven-card"
              >
                <img
                  :src="'../src/assets/img/' + convenience.name + '_icon.png'"
                  :alt="convenience.name"
                  class="conven-img"
                />
                <div v-html="calculateConvenience(convenience)"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <Footer />

    <Reservation :showModal="showModal" :ad="ad" @close-modal="closeModal" />

    <Review :showModalReview="showModalReview" :ad="ad" @close-modal="closeModalReview" />

    <div v-if="showReviewsModal" class="modal-overlay" @click.self="closeReviewsModal">
      <div class="modal-content">
        <ReviewList :adId="ad.id" @close="closeReviewsModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchAdById, openChat, fetchReviewsByAdId, fetchUserChats } from "@/api/api.js";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";
import Reservation from "./Reservation.vue";
import Review from "./Review.vue";
import ReviewList from "./ReviewList.vue";

export default {
  name: "AdDetails",
  components: {
    Head,
    Footer,
    Reservation,
    Review,
    ReviewList,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const ad = ref(null);
    const reviews = ref([]);
    const errorMessage = ref(null);

    const chatId = route.params.id;

    const adPremTypes = computed(() => [
      { value: "hotel_room", label: "Кімната у готелі" },
      { value: "flat", label: "Квартира" },
      { value: "house", label: "Будинок" },
    ]);

    const getPremTypeLabel = (premType) => {
      const type = adPremTypes.value.find((type) => type.value === premType);
      return type ? type.label : "Невідомий тип";
    };

    const adAccomTypes = [
      { value: "entire_place", label: "Ціле помешкання" },
      { value: "private_room", label: "Особиста кімната у помешканні" },
      { value: "shared_room", label: "Спільна кімната" },
    ];

    const getAccomTypeLabel = (accomType) => {
      const type = adAccomTypes.find((type) => type.value === accomType);
      return type ? type.label : "Невідомий тип примешкання";
    };

    const calculateConvenience = (convenience) => {
      const conveniencesMapping = {
        shower: "Душ",
        wifi: "Wi-Fi",
        kitchen: "Кухня",
        television: "Телевізор",
        pets: "Можна з тваринами",
        work_place: "Робоче місце",
        conditioner: "Кондиціонер",
        heating: "Опалення",
        parking: "Паркування",
        breakfast: "Сніданок",
        washing_machine: "Пральна машина",
        medicine_chest: "Аптечка",
        fire_extinguisher: "Вогнегасник",
      };

      const label = conveniencesMapping[convenience.name] || "Невідомо";
      return `<p>${label}</p>`;
    };

    const getAdDetails = async () => {
      try {
        ad.value = await fetchAdById(route.params.id);
        fetchReviews();
      } catch (error) {
        console.error("Ошибка при загрузке данных объявления:", error);
        ad.value = null;
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetchReviewsByAdId(route.params.id);
        reviews.value = response;
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
        errorMessage.value = "Не вдалося отримати відгуки.";
      }
    };

    const averageRating = computed(() => {
      if (reviews.value.length === 0) return null;
      const totalRating = reviews.value.reduce(
        (sum, review) => sum + review.average_rating,
        0
      );
      return totalRating / reviews.value.length;
    });

    const getUserChats = async () => {
      try {
        const response = await fetchUserChats(userId);
        chats.value = response;
      } catch (error) {
        console.error("Ошибка при загрузке чатов пользователя:", error);
      }
    };

    const startChat = async () => {
      try {
        const chatData = await openChat(route.params.id);
        router.push(`/chat/${chatData.chat_id}`);
      } catch (error) {
        console.error("Не удалось открыть чат:", error);
      }
    };

    const openMyChats = () => {
      router.push("/chats");
    };

    onMounted(() => {
      getAdDetails();
      getUserChats();
    });

    const showModal = ref(false);
    const showModalReview = ref(false);

    const openModal = () => {
      showModal.value = true;
    };

    const openModalReview = () => {
      showModalReview.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const closeModalReview = () => {
      showModalReview.value = false;
    };

    const showReviewsModal = ref(false);

    const openReviewsModal = () => {
      showReviewsModal.value = true;
    };

    const closeReviewsModal = () => {
      showReviewsModal.value = false;
    };

    return {
      ad,
      getPremTypeLabel,
      getAccomTypeLabel,
      calculateConvenience,
      openMyChats,
      startChat,
      openModal,
      closeModal,
      showModal,
      showModalReview,
      showReviewsModal,
      openModalReview,
      closeModalReview,
      openReviewsModal,
      closeReviewsModal,
      reviews,
      averageRating,
    };
  },
};
</script>
