<template>
  <div class="page-container">
    <header id="header">
      <Head />
      <section id="renter-head">
        <button id="exit-btn" class="btn btn-dark" type="button" @click="logout">
          Вийти
        </button>
      </section>
    </header>

    <main class="main-renter-body">
      <div v-if="isLoading" class="d-flex flex-column">
        <div id="main-renter-load">
          <div class="d-flex flex-row load">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          </div>
          <span role="status">Завантаження оголошень...</span>
        </div>
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
              Можлива кількість гостей (від меншого до більшого)
            </button>
            <button
              class="list-group-item list-group-item-action"
              @click="sortAds('guestsDesc')"
            >
              Можлива кількість гостей (від більшого до меншого)
            </button>
          </div>

          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="toggleFilterDropdown"
          >
            <img id="filter-icon" src="../assets/img/filter_icon.png" alt="filter_icon" />
          </button>

          <div
            v-if="isFilterDropdownVisible"
            class="filter-dropdown list-group shadow; dropdown"
          >
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
              <h6>Базові зручності</h6>
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
                  id="kitchen"
                  v-model="filters.conveniences.kitchen"
                />
                <label class="form-check-label" for="kitchen">Кухня</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="shower"
                  v-model="filters.conveniences.shower"
                />
                <label class="form-check-label" for="shower">Душ</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="washing-machine"
                  v-model="filters.conveniences.washing_machine"
                />
                <label class="form-check-label" for="washing-machine"
                  >Пральна машина</label
                >
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="conditioner"
                  v-model="filters.conveniences.conditioner"
                />
                <label class="form-check-label" for="conditioner">Кондиціонер</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="heating"
                  v-model="filters.conveniences.heating"
                />
                <label class="form-check-label" for="heating">Опалення</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="work-place"
                  v-model="filters.conveniences.work_place"
                />
                <label class="form-check-label" for="work-place">Робоче місце</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="television"
                  v-model="filters.conveniences.television"
                />
                <label class="form-check-label" for="television">Телевізор</label>
              </div>
            </div>
            <div class="list-group-item">
              <h6>Особливі зручності</h6>
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
                  id="breakfast"
                  v-model="filters.conveniences.breakfast"
                />
                <label class="form-check-label" for="breakfast">Сніданок</label>
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
            <div class="list-group-item">
              <h6>Безпека</h6>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="medicine-chest"
                  v-model="filters.conveniences.medicine_chest"
                />
                <label class="form-check-label" for="medicine-chest">Аптечка</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="fire-extinguisher"
                  v-model="filters.conveniences.fire_extinguisher"
                />
                <label class="form-check-label" for="fire-extinguisher"
                  >Вогнегасник</label
                >
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
      <div v-if="totalPages > 1" class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
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
      conveniences: {},
    });

    const sortOption = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);

    const getAllAds = async () => {
      try {
        isLoading.value = true;
        const response = await fetchAllAds({ page: currentPage.value });
        console.log("Fetched ads:", response);
        ads.value = response.data;
        totalPages.value = response.last_page;
      } catch (error) {
        errorMessage.value = "Ошибка при загрузке объявлений.";
      } finally {
        isLoading.value = false;
      }
    };

    const filteredAndSortedAds = computed(() => {
      let filtered = ads.value.filter((ad) => {
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

      if (sortOption.value === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption.value === "priceDesc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOption.value === "guests") {
        filtered.sort((a, b) => a.guest_count - b.guest_count);
      } else if (sortOption.value === "guestsDesc") {
        filtered.sort((a, b) => b.guest_count - a.guest_count);
      }

      return filtered;
    });

    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
        getAllAds();
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
      toggleSortDropdown();
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

    onMounted(() => {
      getAllAds();
    });

    return {
      ads,
      isLoading,
      errorMessage,
      filters,
      searchQuery,
      currentPage,
      totalPages,
      filteredAndSortedAds,
      changePage,
      toggleSortDropdown,
      toggleFilterDropdown,
      sortAds,
      logout,
      isSortDropdownVisible,
      isFilterDropdownVisible,
    };
  },
};
</script>
