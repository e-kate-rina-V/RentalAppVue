<template>
  <div v-if="showModal" class="modal">
    <div class="card-choice-prem-load">
      <form v-if="currentStep === 1" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Яке помешкання ви пропонуєте?</h2>
          <section class="conven-prem-load">
            <button
              type="button"
              class="conven-card-prem-load"
              @click="selectMode('house')"
            >
              <img
                class="conven-img"
                src="../assets/img/house_icon.png"
                alt="house_icon"
              />
              <p>Будинок</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              @click="selectMode('flat')"
            >
              <img class="conven-img" src="../assets/img/flat_icon.png" alt="flat_icon" />
              <p>Квартира</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              @click="selectMode('hotel_room')"
            >
              <img
                class="conven-img"
                src="../assets/img/hotel_icon.png"
                alt="hotel_icon"
              />
              <p>Кімната у готелі</p>
            </button>
          </section>
        </div>
      </form>

      <form v-if="currentStep === 2" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Оберіть тип помешкання:</h2>
          <div class="btn-gr-room" role="group">
            <button
              class="btn btn-dark"
              type="button"
              @click="selectType('entire_place')"
            >
              Ціле помешкання
            </button>
            <button
              class="btn btn-dark"
              type="button"
              @click="selectType('private_room')"
            >
              Кімната
            </button>
            <button class="btn btn-dark" type="button" @click="selectType('shared_room')">
              Спільна кімната
            </button>
          </div>
        </div>
      </form>

      <form v-if="currentStep === 3" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Оберіть кількість гостей</h2>
          <div class="guest-counter">
            <span class="guest-label">Гості</span>
            <div class="guest-controls">
              <button class="guest-btn" type="button" @click="decrease">−</button>
              <span class="guest-value">{{ formData.guestCount }}</span>
              <button class="guest-btn" type="button" @click="increase">+</button>
            </div>
          </div>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>

          <button
            id="cont-btn"
            class="btn btn-dark"
            type="button"
            @click="selectGuestCount(formData.guestCount)"
          >
            Далі
          </button>
        </div>
      </form>

      <form v-if="currentStep === 4" class="modal-content-prem-load-conven">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Оберіть зручності</h2>
          <section class="conven-prem-load">
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('kitchen') }"
              @click="toggleConven('kitchen')"
            >
              <img
                class="conven-img"
                src="../assets/img/kitchen_icon.png"
                alt="kitchen_icon"
              />
              <p>Кухня</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('wifi') }"
              @click="toggleConven('wifi')"
            >
              <img class="conven-img" src="../assets/img/wifi_icon.png" alt="wifi_icon" />
              <p>Wi-Fi</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('pets') }"
              @click="toggleConven('pets')"
            >
              <img class="conven-img" src="../assets/img/pets_icon.png" alt="pets_icon" />
              <p>Можна з тваринами</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('work_place') }"
              @click="toggleConven('work_place')"
            >
              <img
                class="conven-img"
                src="../assets/img/work_place_icon.png"
                alt="work_place_icon"
              />
              <p>Робоче місце</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('parking') }"
              @click="toggleConven('parking')"
            >
              <img
                class="conven-img"
                src="../assets/img/parking_icon.png"
                alt="parking_icon"
              />
              <p>Паркінг</p>
            </button>

            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('conditioner') }"
              @click="toggleConven('conditioner')"
            >
              <img
                class="conven-img"
                src="../assets/img/conditioner_icon.png"
                alt="conditioner_icon"
              />
              <p>Кондиціонування</p>
            </button>

            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('heating') }"
              @click="toggleConven('heating')"
            >
              <img
                class="conven-img"
                src="../assets/img/heating_icon.png"
                alt="heating_icon"
              />
              <p>Опалення</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('breakfast') }"
              @click="toggleConven('breakfast')"
            >
              <img
                class="conven-img"
                src="../assets/img/breakfast_icon.png"
                alt="breakfast_icon"
              />
              <p>Сніданки</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('shower') }"
              @click="toggleConven('shower')"
            >
              <img
                class="conven-img"
                src="../assets/img/shower_icon.png"
                alt="shower_icon"
              />
              <p>Душ</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('washing_machine') }"
              @click="toggleConven('washing_machine')"
            >
              <img
                class="conven-img"
                src="../assets/img/washing_machine_icon.png"
                alt="washing_machine_icon"
              />
              <p>Пральна машина</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('television') }"
              @click="toggleConven('television')"
            >
              <img
                class="conven-img"
                src="../assets/img/television_icon.png"
                alt="television_icon"
              />
              <p>Телевізор</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('medicine_chest') }"
              @click="toggleConven('medicine_chest')"
            >
              <img
                class="conven-img"
                src="../assets/img/medicine_chest_icon.png"
                alt="medicine_chest_icon"
              />
              <p>Аптечка</p>
            </button>
            <button
              type="button"
              class="conven-card-prem-load"
              :class="{ active: isConvenSelected('fire_extinguisher') }"
              @click="toggleConven('fire_extinguisher')"
            >
              <img
                class="conven-img"
                src="../assets/img/fire_extinguisher_icon.png"
                alt="fire_extinguisher_icon"
              />
              <p>Вогнегасник</p>
            </button>
          </section>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>

          <button id="cont-btn" class="btn btn-dark" type="button" @click="nextStep">
            Далі
          </button>
        </div>
      </form>

      <form v-if="currentStep === 5" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Додайте опис вашого приміщення</h2>
          <div>
            <textarea
              id="description-input"
              name="description"
              v-model="formData.description"
              placeholder="Введіть опис тут..."
            ></textarea>
          </div>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>

          <button id="cont-btn" class="btn btn-dark" type="button" @click="nextStep">
            Далі
          </button>
        </div>
      </form>

      <form v-if="currentStep === 6" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Додайте титульну назву та адресу</h2>
          <span id="title-span"
            >Наприклад: двоповерховий будинок у центрі міста, Київ</span
          >
          <textarea
            id="title-input"
            name="title"
            type="text"
            v-model="formData.title"
            placeholder="Введіть титульну назву тут..."
          ></textarea>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>

          <button id="cont-btn" class="btn btn-dark" type="button" @click="nextStep">
            Далі
          </button>
        </div>
      </form>

      <form v-if="currentStep === 7" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Укажіть ціну за одну ніч (у гривнях)</h2>
          <div>
            <input name="price" type="number" min="1" v-model="formData.price" />
          </div>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>

          <button id="cont-btn" class="btn btn-dark" type="button" @click="nextStep">
            Далі
          </button>
        </div>
      </form>

      <form v-if="currentStep === 8" class="modal-content-prem-load">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        ></button>
        <div id="choice-form">
          <h2>Завантажте декілька фото</h2>
          <div id="photo-download">
            <div>
              <input type="file" multiple @change="handleFileUpload" />
            </div>
            <span>(не менше 2-х)</span>
          </div>
          <div v-if="errors[currentStep]" class="error-message">
            {{ errors[currentStep] }}
          </div>
          <button id="cont-btn" class="btn btn-dark" type="button" @click="submitForm">
            Завершити
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { registerAd } from "@/api/api.js";
import {
  validateAccommodationType,
  validateAccommodationMode,
  validateGuestCount,
  validateConveniences,
  validateDescription,
  validateTitle,
  validatePrice,
  validateFiles,
} from "../validation/ad_validation.js";

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal"],
  setup(_, { emit }) {
    const currentStep = ref(1);
    const errors = reactive({});

    const closeModal = () => {
      emit("close-modal");
    };

    const formData = reactive({
      title: "",
      description: "",
      premType: "",
      accomType: "",
      guestCount: 1,
      price: null,
      conveniences: [],
      materials: [],
    });

    const validateCurrentStep = () => {
      let error = null;
      switch (currentStep.value) {
        case 1:
          error = validateAccommodationMode(formData.premType);
          break;
        case 2:
          error = validateAccommodationType(formData.accomType);
          break;
        case 3:
          error = validateGuestCount(formData.guestCount);
          break;
        case 4:
          error = validateConveniences(formData.conveniences);
          break;
        case 5:
          error = validateDescription(formData.description);
          break;
        case 6:
          error = validateTitle(formData.title);
          break;
        case 7:
          error = validatePrice(formData.price);
          break;
        case 8:
          error = validateFiles(formData.materials);
          break;
        default:
          error = null;
      }
      errors[currentStep.value] = error;
      return !error;
    };

    const nextStep = () => {
      if (validateCurrentStep()) {
        currentStep.value++;
      }
    };

    const selectGuestCount = (count) => {
      formData.guestCount = count;
      nextStep();
    };

    const selectMode = (mode) => {
      formData.premType = mode;
      nextStep();
    };

    const selectType = (type) => {
      formData.accomType = type;
      nextStep();
    };

    const isConvenSelected = (conven) => {
      return formData.conveniences.includes(conven);
    };

    const toggleConven = (conven) => {
      const index = formData.conveniences.indexOf(conven);
      if (index === -1) {
        formData.conveniences.push(conven);
      } else {
        formData.conveniences.splice(index, 1);
      }
    };

    const handleFileUpload = (event) => {
      formData.materials = Array.from(event.target.files);
    };

    const submitForm = async () => {
      if (!validateCurrentStep()) {
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("prem_type", formData.premType);
      formDataToSend.append("accom_type", formData.accomType);
      formDataToSend.append("guest_count", formData.guestCount);
      formDataToSend.append("price", formData.price);

      formData.conveniences.forEach((conven, index) => {
        formDataToSend.append(`conven[${index}]`, conven);
      });

      if (Array.isArray(formData.materials)) {
        formData.materials.forEach((file, index) => {
          formDataToSend.append(`materials[${index}]`, file);
        });
      } else {
        console.error("Materials is not an array");
      }

      try {
        const response = await registerAd(formDataToSend);
        alert(response.message);
      } catch (error) {
        console.error(error);
        alert(error.message || "Ошибка при отправке данных");
      }
    };

    return {
      closeModal,
      currentStep,
      formData,
      errors,
      isConvenSelected,
      toggleConven,
      selectMode,
      selectType,
      increase: () => formData.guestCount++,
      decrease: () => formData.guestCount > 1 && formData.guestCount--,
      selectGuestCount,
      handleFileUpload,
      nextStep,
      submitForm,
    };
  },
};
</script>
