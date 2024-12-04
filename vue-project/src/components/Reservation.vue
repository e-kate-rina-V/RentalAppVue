<template>
  <div v-if="showModal" class="modal">
    <form class="reserv-form" @submit.prevent="submitReservation">
      <div class="container text-start">
        <div class="d-flex flex-row">
          <h3 v-if="ad">₴ {{ ad.price }} ніч</h3>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>

        <div class="date-picker">
          <div class="row row-cols-2">
            <div class="d-flex flex-column">
              <label for="arrival-date">Прибуття</label>
              <flatpickr v-model="formData.arrival_date" placeholder="Оберіть дату" />
            </div>
            <div class="d-flex flex-column">
              <label for="departure-date">Виїзд</label>
              <flatpickr v-model="formData.depart_date" placeholder="Оберіть дату" />
            </div>
          </div>
        </div>

        <div class="guest-controls">
          <label>Гості</label>
          <div class="row row-cols-2">
            <section>
              <h6>Дорослі</h6>
              <p>Вік: від 13 років</p>
              <div id="guest_controls" class="d-flex flex-row">
                <button class="guest-btn" type="button" @click="changeGuestCount('guestAdultCount', 'decrease')">
                  −
                </button>
                <span class="guest-value">{{ formData.guestAdultCount }}</span>
                <button class="guest-btn" type="button" @click="changeGuestCount('guestAdultCount', 'increase')">
                  +
                </button>
              </div>
            </section>
            <section>
              <h6>Діти</h6>
              <p>Вік: від 2 до 12 років</p>
              <div id="guest_controls" class="d-flex align-items-center">
                <button class="guest-btn" type="button" @click="changeGuestCount('guestChildrenCount', 'decrease')">
                  −
                </button>
                <span class="guest-value">{{ formData.guestChildrenCount }}</span>
                <button class="guest-btn" type="button" @click="changeGuestCount('guestChildrenCount', 'increase')">
                  +
                </button>
              </div>
            </section>
            <section>
              <h6>Немовля</h6>
              <p>Вік: до 2 років</p>
              <div id="guest_controls" class="d-flex align-items-center">
                <button class="guest-btn" type="button" @click="changeGuestCount('guestBabyCount', 'decrease')">
                  −
                </button>
                <span class="guest-value">{{ formData.guestBabyCount }}</span>
                <button class="guest-btn" type="button" @click="changeGuestCount('guestBabyCount', 'increase')">
                  +
                </button>
              </div>
            </section>
            <section>
              <h6>Домашні тварини</h6>
              <div v-if="ad.conveniences && ad.conveniences.some(c => c.name === 'pets')">
                <div id="guest_controls" class="d-flex align-items-center">
                  <button class="guest-btn" type="button" @click="changeGuestCount('guestPets', 'decrease')"
                    :disabled="formData.guestPets === 0">
                    −
                  </button>
                  <span class="guest-value">{{ formData.guestPets }}</span>
                  <button class="guest-btn" type="button" @click="changeGuestCount('guestPets', 'increase')">
                    +
                  </button>
                </div>
              </div>
              <div v-else>
                <p>Домашні тварини не дозволені</p>
              </div>
            </section>
          </div>
        </div>

        <div id="price-sum">
          <h3 v-if="ad">
            ₴ {{ ad.price }} ніч x {{ calculateNights }} ночей = {{ totalCost }}₴
          </h3>
        </div>
        <button type="submit" class="btn btn-primary">Забронювати</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import flatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { reserveAd } from "@/api/api.js";

export default {
  name: "Reservation",
  components: { flatpickr },
  props: {
    ad: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-modal"],
  setup(props, { emit }) {
    const formData = reactive({
      arrival_date: null,
      depart_date: null,
      nights_num: 0,
      guestAdultCount: 1,
      guestChildrenCount: 0,
      guestBabyCount: 0,
      guestPets: 0,
    });

    const calculateNights = computed(() => {
      if (formData.arrival_date && formData.depart_date) {
        const startDate = new Date(formData.arrival_date);
        const endDate = new Date(formData.depart_date);
        const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return nights > 0 ? nights : 0;
      }
      return 0;
    });

    watch(
      () => calculateNights.value,
      (newNights) => {
        formData.nights_num = newNights;
      }
    );

    const totalCost = computed(() => {
      return props.ad && props.ad.price && formData.nights_num > 0
        ? props.ad.price * formData.nights_num
        : 0;
    });

    const changeGuestCount = (guestType, action) => {
      if (action === "increase") {
        formData[guestType]++;
      } else if (action === "decrease") {
        if (guestType === "guestAdultCount" && formData[guestType] === 1) return; 
        if (formData[guestType] > 0) formData[guestType]--;
      }
    };


    const closeModal = () => {
      emit("close-modal");
    };

    const submitReservation = async () => {

      if (!formData.arrival_date || !formData.depart_date || formData.nights_num <= 0) {
        alert("Пожалуйста, выберите корректные даты.");
        return;
    }

      const payload = {
        arrival_date: formData.arrival_date,
        depart_date: formData.depart_date,
        nights_num: formData.nights_num,
        guestAdultCount: formData.guestAdultCount,
        guestChildrenCount: formData.guestChildrenCount,
        guestBabyCount: formData.guestBabyCount,
        guestPets: formData.guestPets,
        ad_id: props.ad.id,
        total_cost: totalCost.value
      };
      try {
        const response = await reserveAd(payload);
        console.log("Reservation success:", response.data);
        closeModal();
        alert("Бронирование успешно создано!");
      } catch (error) {
        console.error("Reservation failed:", error);
        alert("Не удалось создать бронирование. Попробуйте еще раз.");
      }
    };

    return {
      formData,
      calculateNights,
      totalCost,
      closeModal,
      changeGuestCount,
      submitReservation,
    };
  },
};
</script>

<style>
.guest-controls p {
  margin-bottom: 3%;
}

.guest-controls h6 {
  margin-top: 20px;
}

#price-sum h3 {
  margin-top: 2%;
}

.reserv-form,
.review-form {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

.date-picker {
  margin-bottom: 20px;
}

.guest-btn {
  background-color: #ddd;
  border: none;
  padding: 1px 5px;
  border-radius: 4px;
  cursor: pointer;
}

.guest-btn:hover {
  background-color: #ccc;
}

#guest_controls {
  gap: 2%;
}

.btn-close {
  margin-left: 70%;
}
</style>
