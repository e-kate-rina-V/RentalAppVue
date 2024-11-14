<template>
  <div>
    <div v-if="showModal" class="modal">
      <div class="card-choice">
        <form v-if="!showForm" class="modal-content" @submit.prevent="selectRole">
          <div id="choice-form">
            <h2>Оберіть роль</h2>
            <div class="btn-gr" role="group">
              <button class="btn btn-dark" type="button" @click="selectRole('renter')">Орендатор</button>
              <button class="btn btn-dark" type="button" @click="selectRole('landlord')">Орендодавець</button>
            </div>
            <a>I already have an account</a>
          </div>
        </form>

        <form v-if="showForm" class="card" @submit.prevent="submitForm">
          <p>Ви обрали: {{ role }}</p>
          <div>
            <label for="name">Name:</label>
            <input class="form-control" type="text" v-model="formData.name" required />

            <label for="email">Email:</label>
            <input class="form-control" type="email" v-model="formData.email" required />

            <label for="password">Password:</label>
            <input class="form-control" type="password" v-model="formData.password" required />
            <div id="save-btn-gr" class="btn-gr" role="group">
              <button class="btn btn-success" type="submit">Save</button>
              <button class="btn btn-danger" type="button" @click="closeModal">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineProps, defineEmits } from 'vue';
import api from '../api/api.js';

export default {
  name: 'Authorization',
  props: {
    showModal: Boolean
  },
  emits: ['close-modal'],
  setup(props, { emit }) {
    const showForm = ref(false);
    const role = ref('');
    const formData = ref({
      name: '',
      email: '',
      password: '',
      role: ''
    });

    const closeModal = () => {
      emit('close-modal');
    };

    const selectRole = (selectedRole) => {
      formData.value.role = selectedRole;
      role.value = selectedRole;
      showForm.value = true;
    };

    const submitForm = async () => {
      try {
        await api.post('/users/store', formData.value);
        alert('Пользователь успешно создан');
        closeModal();
      } catch (error) {
        alert('Ошибка при создании пользователя');
        console.error(error);
      }
    };

    return {
      showForm,
      formData,
      role,
      closeModal,
      selectRole,
      submitForm
    };
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

#choice-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#choice-form a {
  cursor: pointer;
}

.card .btn-gr,
.card-choice .btn-gr {
  display: inline-flex;
  gap: 5%;
}

.card {
  width: 20rem;
  height: 20rem;
  align-items: center;
  justify-content: center;
}

#save-btn-gr {
  padding-top: 5%;
}
</style>
