<template>
  <div class="ad-card" @click="goToDetails">
    <img
      :src="
        `http://localhost:8080/storage/${ad.materials?.[0]?.source}` || '/placeholder.jpg'
      "
      alt="Ad image"
      class="ad-card-img"
    />
    <div class="ad-card-content">
      <h3>{{ ad.title }}</h3>
      <span class="ad-card-price">{{ ad.price }} грн/ніч</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "AdCard",
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const goToDetails = () => {
      router.push(`/ads/${props.ad.id}`);
    };

    return {
      goToDetails,
    };
  },
};
</script>
