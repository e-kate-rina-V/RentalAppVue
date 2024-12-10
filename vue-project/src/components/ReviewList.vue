<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <div class="reviews-list">
    <h3>Відгуки</h3>
    <div v-if="reviews.length === 0">
      <p>Відгуки відсутні для цього оголошення.</p>
    </div>
    <ul v-else>
      <li v-for="review in reviews" :key="review.id">
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
    </ul>
    <button @click="$emit('close')">Закрити</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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

    const fetchReviews = async () => {
      try {
        const response = await fetchReviewsByAdId(props.adId);
        console.log("Ответ API:", response);
        reviews.value = response;
      } catch (error) {
        console.error("Ошибка:", error);
        errorMessage.value = "Не вдалося отримати відгуки.";
      }
    };

    const getRatingStars = (rating) => {
      return Math.round(rating);
    };

    const getEmptyStars = (rating) => {
      return 5 - Math.round(rating);
    };

    onMounted(() => {
      fetchReviews();
    });

    return {
      reviews,
      errorMessage,
      getRatingStars,
      getEmptyStars,
    };
  },
};
</script>

<style>
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
</style>
