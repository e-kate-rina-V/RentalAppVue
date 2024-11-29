<template>
  <div class="page-container">
    <header id="header">
      <Head />
      <section>
        <button id="exit-btn" class="btn btn-dark" type="button" @click="logout">
          Вийти
        </button>
      </section>
    </header>

    <main class="main-renter-body">
      <div v-if="isLoading" class="d-flex flex-column">
        <div class="d-flex flex-row load">
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        </div>
        <span role="status">Завантаження оголошень...</span>
      </div>

      <div v-else-if="errorMessage">{{ errorMessage }}</div>

      <div v-else-if="ads.length === 0">
        <p>Оголошення не знайдені.</p>
      </div>

      <div v-else class="ad-list row">
        <div class="sort-section">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="toggleSortDropdown"
          >
            <img id="sort-icon" src="../assets/img/sort_icon.png" alt="sort_icon" />
          </button>

          <div v-if="isSortDropdownVisible" class="sort-dropdown list-group shadow">
            <button
              class="list-group-item list-group-item-action"
              @click="sortAds('price')"
            >
              Ціна (від низької до високої)
            </button>
            <button
              class="list-group-item list-group-item-action"
              @click="sortAds('priceDesc')"
            >
              Ціна (від високої до низької)
            </button>
            <button
              class="list-group-item list-group-item-action"
              @click="sortAds('guests')"
            >
              Можлива кількість гостей (від більшого до меншого)
            </button>
            <button
              class="list-group-item list-group-item-action"
              @click="sortAds('guestsDesc')"
            >
              Можлива кількість гостей (від меншого до більшого)
            </button>
          </div>

          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="toggleFilterDropdown"
          >
            <img id="filter-icon" src="../assets/img/filter_icon.png" alt="filter_icon" />
          </button>

          <div v-if="isFilterDropdownVisible" class="filter-dropdown list-group shadow">
            <div class="list-group-item">
              <label for="roomType">Тип приміщення:</label>
              <select v-model="filters.premType" id="roomType" class="form-select">
                <option value="">Оберіть тип</option>
                <option value="flat">Квартира</option>
                <option value="house">Будинок</option>
                <option value="hotel_room">Кімната у готелі</option>
              </select>
            </div>

            <div class="list-group-item">
              <label for="placementType">Тип розміщення:</label>
              <select v-model="filters.accomType" id="placementType" class="form-select">
                <option value="">Оберіть тип</option>
                <option value="entire_room">Ціле примешкання</option>
                <option value="private_room">Приватна кімната</option>
                <option value="shared_room">Спільна кімната</option>
              </select>
            </div>

            <div class="list-group-item">
              <label for="priceRange">Ціна:</label>
              <input
                type="range"
                id="priceRange"
                v-model="filters.priceRange"
                min="0"
                max="70000"
                step="10"
                class="form-range"
              />
              <span>{{ filters.priceRange }}₴</span>
            </div>

            <div class="list-group-item">
              <label for="guestCount">Кількість гостей:</label>
              <input
                type="number"
                id="guestCount"
                v-model="filters.guestCount"
                class="form-control"
                placeholder="Введіть кількість гостей"
              />
            </div>

            <div class="list-group-item">
              <label>Удобства:</label>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="wifi"
                  v-model="filters.conveniences.wifi"
                />
                <label class="form-check-label" for="wifi">Wi-Fi</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="parking"
                  v-model="filters.conveniences.parking"
                />
                <label class="form-check-label" for="parking">Паркування</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="pets"
                  v-model="filters.conveniences.pets"
                />
                <label class="form-check-label" for="pets">Можна з тваринами</label>
              </div>
            </div>
          </div>
          <section id="search-section">
            <input
              type="search"
              id="search"
              placeholder="Почати пошук"
              v-model="searchQuery"
            />
            <img id="search-sign" src="../assets/img/search-sign.png" alt="search-sign" />
          </section>
        </div>

        <div
          class="col-12 col-md-4 mb-4 d-flex"
          v-for="ad in filteredAndSortedAds"
          :key="ad.id"
        >
          <div class="ad-card-wrapper">
            <AdCard :ad="ad" />
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { fetchAllAds, logoutUser } from "@/api/api.js";
import { useRouter } from "vue-router";
import AdCard from "./AdCard.vue";
import Head from "./vue_helpers/Head.vue";
import Footer from "./vue_helpers/Footer.vue";

export default {
  name: "MainFooter",
  components: {
    AdCard,
    Head,
    Footer,
  },
  setup() {
    const router = useRouter();
    const ads = ref([]);
    const isLoading = ref(true);
    const errorMessage = ref("");
    const searchQuery = ref("");
    const isSortDropdownVisible = ref(false);
    const isFilterDropdownVisible = ref(false);

    const filters = ref({
      premType: "",
      accomType: "",
      priceRange: 10000,
      guestCount: "",
      conveniences: {
        wifi: false,
        parking: false,
        pets: false,
      },
    });

    const sortOption = ref(null);

    const getAllAds = async () => {
      try {
        isLoading.value = true;
        ads.value = await fetchAllAds();
        console.log("Fetched ads:", ads.value);
      } catch (error) {
        errorMessage.value = "Ошибка при загрузке объявлений.";
      } finally {
        isLoading.value = false;
      }
    };

    const filteredAds = computed(() => {
      return ads.value.filter((ad) => {
        const matchesPremType =
          !filters.value.premType || ad.prem_type === filters.value.premType;

        const matchesAccomType =
          !filters.value.accomType || ad.accom_type === filters.value.accomType;

        const matchesPrice = ad.price <= filters.value.priceRange;

        const matchesGuestCount =
          !filters.value.guestCount || ad.guest_count >= filters.value.guestCount;

        const matchesConveniences = Object.keys(filters.value.conveniences).every(
          (key) => {
            if (filters.value.conveniences[key]) {
              return ad.conveniences.some((convenience) => convenience.name === key);
            }
            return true;
          }
        );

        const matchesSearchQuery =
          !searchQuery.value ||
          ad.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          (ad.description &&
            ad.description.toLowerCase().includes(searchQuery.value.toLowerCase()));

        return (
          matchesPremType &&
          matchesAccomType &&
          matchesPrice &&
          matchesGuestCount &&
          matchesConveniences &&
          matchesSearchQuery
        );
      });
    });

    const sortedAds = computed(() => {
      let sorted = [...filteredAds.value];
      if (sortOption.value === "price") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption.value === "priceDesc") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortOption.value === "guests") {
        sorted.sort((a, b) => a.guest_count - b.guest_count);
      } else if (sortOption.value === "guestsDesc") {
        sorted.sort((a, b) => b.guest_count - a.guest_count);
      }
      return sorted;
    });

    const filteredAndSortedAds = computed(() => {
      return sortedAds.value;
    });

    const logout = async () => {
      try {
        await logoutUser();
        router.push("/home");
      } catch (error) {
        alert("Произошла ошибка при выходе. Попробуйте снова.");
      }
    };

    const toggleSortDropdown = () => {
      isSortDropdownVisible.value = !isSortDropdownVisible.value;
    };

    const toggleFilterDropdown = () => {
      isFilterDropdownVisible.value = !isFilterDropdownVisible.value;
    };

    const sortAds = (option) => {
      sortOption.value = option;
      isSortDropdownVisible.value = false;
    };

    onMounted(() => {
      getAllAds();
    });

    return {
      ads,
      isLoading,
      errorMessage,
      searchQuery,
      filters,
      filteredAds,
      sortedAds,
      filteredAndSortedAds,
      isSortDropdownVisible,
      isFilterDropdownVisible,
      logout,
      toggleSortDropdown,
      toggleFilterDropdown,
      sortAds,
    };
  },
};
</script>

<style scoped>
.main-renter-body {
  margin: 5% auto;
}

.ad-list img {
  width: 30px;
  height: 30px;
}

.ad-list button {
  border: none;
  outline: none;
  background-color: white;
}

.sort-section {
  position: relative;
  margin-bottom: 10px;
}

.sort-dropdown {
  position: absolute;
  background-color: white;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  padding: 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.sort-dropdown .list-group-item {
  padding: 12px 20px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ddd;
  text-align: left;
  border-radius: 8px;
}

.sort-dropdown .list-group-item:hover {
  background-color: #f8f9fa;
}

.sort-dropdown .list-group-item:focus {
  background-color: #f8f9fa;
  box-shadow: none;
}

#search {
  height: 30px;
  padding: 5px;
}

.ad-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1%;
}

.ad-card-wrapper {
  width: 100%;
  min-width: 200px;
  flex: 1 0 500px;
  box-sizing: border-box;
}

.ad-card-wrapper {
  max-width: 400px;
}

#exit-btn {
  padding: 5px 20px;
}
</style>
