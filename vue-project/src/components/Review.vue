<template>
  <div v-if="showModalReview" class="modal">
    <form class="review-form" @submit.prevent="submitReviewHandler">
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeModal"
      ></button>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div class="form-group">
        <div class="container text-start">
          <div class="row row-cols-2">
            <div>
              <label>Чистота</label>
              <StarRating :id="'cleanliness'" v-model="ratings.cleanliness" />
            </div>
            <div>
              <label>Робота персоналу</label>
              <StarRating :id="'staffWork'" v-model="ratings.staffWork" />
            </div>
            <div>
              <label>Розташування</label>
              <StarRating :id="'location'" v-model="ratings.location" />
            </div>
            <div>
              <label>Співвідношення ціна/якість</label>
              <StarRating :id="'valueForMoney'" v-model="ratings.valueForMoney" />
            </div>
          </div>

          <div v-if="errors.rating" class="error-message">
            {{ errors.rating }}
          </div>

          <div class="reviews">
            <section class="d-flex flex-column">
              <span>Які були плюси під час перебування ?</span>
              <input
                id="review-plus-input"
                placeholder="Напишіть плюси тут..."
                v-model="reviews.positive"
              />
            </section>
            <section class="d-flex flex-column">
              <span>Які були мінуси під час перебування ?</span>
              <input
                id="review-minus-input"
                placeholder="Напишіть мінуси тут..."
                v-model="reviews.negative"
              />
            </section>
            <section class="d-flex flex-column">
              <span>Додайте ваш відгук</span>
              <input
                id="review-input"
                placeholder="Ваш відгук..."
                v-model="reviews.comment"
              />
            </section>
          </div>
        </div>
      </div>
      <button type="submit" id="review-btn" class="btn btn-dark">Надіслати відгук</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import StarRating from "./vue_helpers/StarRating.vue";
import { submitReview } from "@/api/api.js";

export default {
  name: "Review",
  components: {
    StarRating,
  },
  props: {
    ad: {
      type: Object,
      required: true,
    },
    showModalReview: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["close-modal"],
  setup(props, { emit }) {
    const ratings = reactive({
      cleanliness: 0,
      staffWork: 0,
      location: 0,
      valueForMoney: 0,
    });

    const reviews = reactive({
      positive: "",
      negative: "",
      comment: "",
    });

    const errors = reactive({
      rating: "",
    });

    const updateRating = (key, value) => {
      ratings[key] = value;
      errors.rating = "";
    };

    const averageRating = computed(() => {
      const totalRatings = Object.values(ratings).reduce(
        (sum, rating) => sum + rating,
        0
      );
      const numberOfRatings = Object.values(ratings).filter((rating) => rating > 0)
        .length;

      return numberOfRatings > 0 ? (totalRatings / numberOfRatings).toFixed(1) : "0.0";
    });

    const resetValidationErrors = () => {
      errors.rating = "";
    };

    const closeModal = () => {
      resetValidationErrors();
      emit("close-modal");
    };

    const submitReviewHandler = async () => {
      const hasAnyRating = Object.values(ratings).some((rating) => rating > 0);

      if (!hasAnyRating) {
        errors.rating = "Будь ласка, оцініть хоча б один пункт.";
        return;
      }

      const ratingsData = { ...ratings };
      const reviewsData = { ...reviews };

      const requestData = {
        adId: props.ad.id,
        ratings: ratingsData,
        reviews: reviewsData,
        averageRating: averageRating.value,
      };

      console.log("Review Data:", requestData);

      try {
        await submitReview(props.ad.id, ratingsData, reviewsData, averageRating.value);
        closeModal();
        alert("Ваш відгук успішно надіслано!");
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Сталася помилка при надсиланні відгуку, будь ласка, спробуйте ще раз.");
      }
    };

    return {
      ratings,
      reviews,
      averageRating,
      updateRating,
      closeModal,
      submitReviewHandler,
      errors,
    };
  },
};
</script>
