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
            <section>
              <div
                v-if="ad.materials && ad.materials.length > 0"
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
                <button @click="startChat" type="button" class="btn btn-success">
                  Розпочати чат
                </button>
                <button @click="openModalReview" type="button" class="btn btn-warning">
                  Залишити відгук
                </button>
                <button @click="openReviewsModal" type="button" class="btn btn-warning">
                  Переглянути відгуки
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
                  v-if="convenience.name === 'shower'"
                  src="../assets/img/shower_icon.png"
                  alt="Shower"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'wifi'"
                  src="../assets/img/wifi_icon.png"
                  alt="Wi-Fi"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'kitchen'"
                  src="../assets/img/cutlery_icon.png"
                  alt="kitchen"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'pets'"
                  src="../assets/img/paw_icon.png"
                  alt="pets allowed"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'conditioner'"
                  src="../assets/img/snowflake_icon.png"
                  alt="air conditioning"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'breakfast'"
                  src="../assets/img/breakfast_icon.png"
                  alt="breakfast"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'heating'"
                  src="../assets/img/heating_icon.png"
                  alt="heating"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'television'"
                  src="../assets/img/television_icon.png"
                  alt="television"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'work_place'"
                  src="../assets/img/laptop_icon.png"
                  alt="work place"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'parking'"
                  src="../assets/img/parking_icon.png"
                  alt="parking"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'washing_machine'"
                  src="../assets/img/washing_machine_icon.png"
                  alt="washing machine"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'medicine_chest'"
                  src="../assets/img/medicine_chest_icon.png"
                  alt="medicine chest"
                  class="conven-img"
                />
                <img
                  v-else-if="convenience.name === 'fire_extinguisher'"
                  src="../assets/img/fire_extinguisher_icon.png"
                  alt="fire extinguisher"
                  class="conven-img"
                />
                <div v-if="convenience.name === 'shower'">
                  <p>Душ</p>
                </div>
                <div v-else-if="convenience.name === 'wifi'">
                  <p>Wi-Fi</p>
                </div>
                <div v-else-if="convenience.name === 'kitchen'">
                  <p>Кухня</p>
                </div>
                <div v-else-if="convenience.name === 'television'">
                  <p>Телевізор</p>
                </div>
                <div v-else-if="convenience.name === 'pets'">
                  <p>Можна з тваринами</p>
                </div>
                <div v-else-if="convenience.name === 'work_place'">
                  <p>Робоче місце</p>
                </div>
                <div v-else-if="convenience.name === 'conditioner'">
                  <p>Кондиціонер</p>
                </div>
                <div v-else-if="convenience.name === 'heating'">
                  <p>Опалення</p>
                </div>
                <div v-else-if="convenience.name === 'parking'">
                  <p>Паркування</p>
                </div>
                <div v-else-if="convenience.name === 'breakfast'">
                  <p>Сніданок</p>
                </div>
                <div v-else-if="convenience.name === 'washing_machine'">
                  <p>Пральна машина</p>
                </div>
                <div v-else-if="convenience.name === 'medicine_chest'">
                  <p>Аптечка</p>
                </div>
                <div v-else-if="convenience.name === 'fire_extinguisher'">
                  <p>Вогнегасник</p>
                </div>
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
import { fetchAdById, openChat, fetchReviewsByAdId } from "@/api/api.js";
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

    const adPremTypes = [
      { value: "hotel_room", label: "Кімната у готелі" },
      { value: "flat", label: "Квартира" },
      { value: "house", label: "Будинок" },
    ];

    const getPremTypeLabel = (premType) => {
      const type = adPremTypes.find((type) => type.value === premType);
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

    const startChat = async () => {
      try {
        const chatData = await openChat(route.params.id);
        router.push(`/chat/${chatData.chat_id}`);
      } catch (error) {
        console.error("Не удалось открыть чат:", error);
      }
    };

    onMounted(() => {
      getAdDetails();
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

<style>
#ad-details-load,
#main-renter-load {
  position: absolute;
  margin-left: 40%;
}

#main-ad-details {
  display: grid;
  justify-content: flex-start;
  align-items: center;
  margin-top: -5%;
}

#reserv-btn {
  padding-left: 100%;
  width: 250%;
  gap: 18px;
}

.ad-details {
  padding: 16px;
  max-width: 800px;
  margin: 10% auto;
}

.ad-details-img {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
}

.d-flex {
  gap: 10px;
}

#conven {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.conven-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  height: 1px;
  padding: 80px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}

.conven-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.conven-img {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
  object-fit: contain;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
