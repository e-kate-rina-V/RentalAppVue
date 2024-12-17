<template>
  <div class="star-rating">
    <div class="star-rating__wrap">
      <template v-for="value in 5" :key="'star-' + value">
        <input
          class="star-rating__input"
          :id="'star-' + (6 - value) + '-' + id"
          type="radio"
          :name="'rating-' + id"
          :value="6 - value"
          @change="setRating(6 - value)"
          :checked="modelValue === 6 - value"
        />
        <label
          class="star-rating__ico fa fa-star-o fa-lg"
          :for="'star-' + (6 - value) + '-' + id"
          :title="getTitle(6 - value)"
        ></label>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const setRating = (value) => {
      emit("update:modelValue", value);
    };

    const getTitle = (value) => {
      const titles = ["Ужасно", "Плохо", "Удовлетворительно", "Хорошо", "Отлично"];
      return titles[value - 1] || "";
    };

    return {
      setRating,
      getTitle,
    };
  },
};
</script>

<style>
.star-rating {
  font-size: 0;
}

.star-rating__wrap {
  display: inline-block;
  font-size: 1rem;
}

.star-rating__ico {
  padding-left: 2px;
  cursor: pointer;
  color: #ffb300;
}

.star-rating__input {
  display: none;
}

.star-rating__ico:hover:before,
.star-rating__ico:hover ~ .star-rating__ico:before,
.star-rating__input:checked ~ .star-rating__ico:before {
  content: "\f005";
}
</style>
