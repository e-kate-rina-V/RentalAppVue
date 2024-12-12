<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <main id="main-review-list">
    <div class="reviews-list">
      <h3>Відгуки</h3>
      <div v-if="isLoading" class="d-flex flex-column">
        <div class="d-flex flex-row; load">
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        </div>
        <span role="status">Завантаження відгуків...</span>
      </div>
      <div v-else-if="reviews.length === 0">
        <p>Відгуки відсутні для цього оголошення.</p>
      </div>
      <ul v-else>
        <div class="row row-cols-2" id="reviews">
          <li v-for="review in paginatedReviews" :key="review.id">
            <h4>{{ review.user_name }}</h4>
            <div class="rating">
              <span
                v-for="star in getRatingStars(review.average_rating)"
                :key="star"
                class="fa fa-star"
              ></span>
              <span
                v-for="emptyStar in getEmptyStars(review.average_rating)"
                :key="emptyStar"
                class="fa fa-star-o"
              ></span>
            </div>
            <p><strong>Оцінка:</strong> {{ review.average_rating }}</p>
            <p><strong>Коментар:</strong> {{ review.comment }}</p>
            <p><strong>Плюси:</strong> {{ review.positive }}</p>
            <p><strong>Мінуси:</strong> {{ review.negative }}</p>
          </li>
        </div>
      </ul>

      <div class="pagination-reviews">
        <button
          :disabled="currentPage === 1"
          @click="previousPage"
          class="btn btn-secondary"
        >
          Попередня
        </button>
        <span>Сторінка {{ currentPage }} з {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="btn btn-secondary"
        >
          Наступна
        </button>
      </div>

      <button @click="$emit('close')" id="reviews-close-btn" class="btn btn-secondary">
        Закрити
      </button>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { fetchReviewsByAdId } from "@/api/api.js";
import StarRating from "./vue_helpers/StarRating.vue";

export default {
  props: {
    adId: {
      type: Number,
      required: true,
    },
  },
  components: {
    StarRating,
  },
  setup(props) {
    const reviews = ref([]);
    const errorMessage = ref(null);
    const isLoading = ref(true);
    const currentPage = ref(1);
    const reviewsPerPage = 2;

    const fetchReviews = async () => {
      try {
        isLoading.value = true;
        const response = await fetchReviewsByAdId(props.adId);
        console.log("Ответ API:", response);
        reviews.value = response;
      } catch (error) {
        console.error("Ошибка:", error);
        errorMessage.value = "Не вдалося отримати відгуки.";
      } finally {
        isLoading.value = false;
      }
    };

    const getRatingStars = (rating) => {
      return Math.round(rating);
    };

    const getEmptyStars = (rating) => {
      return 5 - Math.round(rating);
    };

    const totalPages = computed(() => {
      return Math.ceil(reviews.value.length / reviewsPerPage);
    });

    const paginatedReviews = computed(() => {
      const start = (currentPage.value - 1) * reviewsPerPage;
      const end = start + reviewsPerPage;
      return reviews.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(() => {
      fetchReviews();
    });

    return {
      isLoading,
      reviews,
      errorMessage,
      getRatingStars,
      getEmptyStars,
      currentPage,
      totalPages,
      paginatedReviews,
      nextPage,
      previousPage,
    };
  },
};
</script>

<style>
.pagination-reviews {
  display: flex;
  gap: 3%;
  text-wrap: nowrap;
  align-items: center;
  margin-top: 1rem;
}
#main-review-list {
  display: grid;
  justify-content: flex-start;
}

.reviews-list {
  padding: 1rem;
}

.reviews-list ul {
  list-style-type: none;
  line-height: 0.5;
}

.rating {
  font-size: 20px;
  color: gold;
}

.fa-star {
  color: gold;
}

.fa-star-o {
  color: lightgray;
}

#reviews {
  text-wrap: nowrap;
}

#reviews-close-btn {
  margin-top: 2%;
}
</style>
