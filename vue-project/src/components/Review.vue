<template>
  <div v-if="showModalReview" class="modal">
    <form class="review-form">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>


      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="form-group">
        <div class="container text-start">
          <div class="row row-cols-2">
            <div>
              <label>Чистота</label>
              <StarRating />
            </div>
            <div>
              <label>Робота персоналу</label>
              <StarRating />
            </div>
            <div>
              <label>Розташування</label>
              <StarRating />
            </div>
            <div>
              <label>Співвідношення ціна/якість</label>
              <StarRating />
            </div>
          </div>
          <div class="reviews">
            <section class="d-flex flex-column">
              <span>Які були плюси під час перебування ?</span>
              <input id="review-plus-input" placeholder="Напишіть плюси тут...">
            </section>
            <section class="d-flex flex-column">
              <span>Які були мінуси під час перебування ?</span>
              <input id="review-minus-input" placeholder="Напишіть мінуси тут...">
            </section>
            <section class="d-flex flex-column">
              <span>Додайте ваш відгук</span>
              <input id="review-input" placeholder="Ваш відгук...">
            </section>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import StarRating from "./vue_helpers/StarRating.vue";

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

    const closeModal = () => {
      emit("close-modal");
    };

    return {
      closeModal,
    };
  },
};
</script>

<style>
.reviews {
  margin-top: 5%;
}

.reviews input {
  width: 65%;
}

.review-form {
  width: 38%;
}

.review-form .btn-close {
  margin-left: 95%;
}
</style>
