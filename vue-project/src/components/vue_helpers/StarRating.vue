<template>
  <div class="star-rating">
    <div class="star-rating__wrap">
      <input class="star-rating__input" :id="'star-5-' + id" type="radio" name="rating" :value="5" @change="setRating(5)">
      <label class="star-rating__ico fa fa-star-o fa-lg" :for="'star-5-' + id" title="Отлично"></label>

      <input class="star-rating__input" :id="'star-4-' + id" type="radio" name="rating" :value="4" @change="setRating(4)">
      <label class="star-rating__ico fa fa-star-o fa-lg" :for="'star-4-' + id" title="Хорошо"></label>

      <input class="star-rating__input" :id="'star-3-' + id" type="radio" name="rating" :value="3" @change="setRating(3)">
      <label class="star-rating__ico fa fa-star-o fa-lg" :for="'star-3-' + id" title="Удовлетворительно"></label>

      <input class="star-rating__input" :id="'star-2-' + id" type="radio" name="rating" :value="2" @change="setRating(2)">
      <label class="star-rating__ico fa fa-star-o fa-lg" :for="'star-2-' + id" title="Плохо"></label>

      <input class="star-rating__input" :id="'star-1-' + id" type="radio" name="rating" :value="1" @change="setRating(1)">
      <label class="star-rating__ico fa fa-star-o fa-lg" :for="'star-1-' + id" title="Ужасно"></label>
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
    currentRating: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setRating(value) {
      this.$emit("update:rating", value);
    },
  },
};
</script>

<style scoped>
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
  color: #FFB300;
}

.star-rating__input {
  display: none;
}

.star-rating__ico:hover:before,
.star-rating__ico:hover~.star-rating__ico:before,
.star-rating__input:checked~.star-rating__ico:before {
  content: "\f005";
}
</style>
