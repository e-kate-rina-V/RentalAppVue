<template>
  <div class="page-container">
    <header id="header">
      <Head />
    </header>

    <div class="ad-details">
      <div v-if="!ad" class="d-flex flex-column">
        <div class="d-flex flex-row; load">
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        </div>
        <span role="status">Завантаження оголошення...</span>
      </div>

      <div v-else-if="errorMessage">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-else>
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
                <p>Shower</p>
              </div>
              <div v-else-if="convenience.name === 'wifi'">
                <p>Wi-Fi</p>
              </div>
              <div v-else-if="convenience.name === 'kitchen'">
                <p>Kitchen</p>
              </div>
              <div v-else-if="convenience.name === 'television'">
                <p>Television</p>
              </div>
              <div v-else-if="convenience.name === 'pets'">
                <p>Pets friendly</p>
              </div>
              <div v-else-if="convenience.name === 'work_place'">
                <p>Work place</p>
              </div>
              <div v-else-if="convenience.name === 'conditioner'">
                <p>Air conditioning</p>
              </div>
              <div v-else-if="convenience.name === 'heating'">
                <p>Heating</p>
              </div>
              <div v-else-if="convenience.name === 'parking'">
                <p>Parking</p>
              </div>
              <div v-else-if="convenience.name === 'breakfast'">
                <p>Breakfast</p>
              </div>
              <div v-else-if="convenience.name === 'washing_machine'">
                <p>Washing machine</p>
              </div>
              <div v-else-if="convenience.name === ''">
                <p></p>
              </div>
              <div v-else-if="convenience.name === ''">
                <p></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchAdById } from "@/api/api.js";
import Head from "./vue_helpers/Head.vue";
// import Footer from './vue_helpers/footer.vue';

export default {
  name: "AdDetails",
  components: {
    Head,
    // Footer,
  },
  setup() {
    const route = useRoute();
    const ad = ref(null);

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
      } catch (error) {
        console.error("Ошибка при загрузке данных объявления:", error);
        ad.value = null;
      }
    };

    onMounted(() => {
      getAdDetails();
    });

    return {
      ad,
      getPremTypeLabel,
      getAccomTypeLabel,
    };
  },
};
</script>

<style scoped>
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
</style>
