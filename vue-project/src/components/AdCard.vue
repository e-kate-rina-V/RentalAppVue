<template>
    <div class="ad-card" @click="goToDetails">
        <img :src="`http://localhost:8080/storage/${ad.materials?.[0]?.source}` || '/placeholder.jpg'" alt="Ad image"
            class="ad-card-img" />
        <div class="ad-card-content">
            <h3>{{ ad.title }}</h3>
            <p>{{ ad.description }}</p>
            <span class="ad-card-price">{{ ad.price }} грн/ніч</span>
        </div>
    </div>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
    name: 'AdCard',
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

<style scoped>
.ad-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.ad-card:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.ad-card-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.ad-card-content {
    padding: 8px;
}

.ad-card-price {
    font-weight: bold;
    color: #007bff;
}
</style>
