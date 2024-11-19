<template>
  <div>
    <div v-if="showModal" class="modal">
      <div class="card-choice">
        <form v-if="!showForm && !isLoginMode" class="modal-content" @submit.prevent="selectRole">
          <div id="choice-form">
            <h2>Оберіть роль</h2>
            <div class="btn-gr" role="group">
              <button class="btn btn-dark" type="button" @click="selectRole('renter')">Орендатор</button>
              <button class="btn btn-dark" type="button" @click="selectRole('landlord')">Орендодавець</button>
            </div>
            <p @click="switchMode" class="switch-mode">I already have an account</p>
          </div>
        </form>

        <form v-if="showForm && !isLoginMode" class="card" @submit.prevent="submitRegistrationForm">
          <h2>Registration</h2>
          <p>Your choice: {{ role }}</p>
          <div>
            <label for="name">Name:</label>
            <input class="form-control" type="text" id="name" v-model="formData.name" required />

            <label for="email">Email:</label>
            <input class="form-control" type="email" id="email" v-model="formData.email" required />

            <label for="password">Password:</label>
            <input class="form-control" type="password" id="password" v-model="formData.password" required />

            <label for="confirm_password">Confirm password:</label>
            <input class="form-control" type="password" id="confirm_password" v-model="formData.password_confirmation"
              required />

            <div class="btn-gr" id="save-btn-gr">
              <button class="btn btn-success" type="submit">Register</button>
              <button class="btn btn-danger" type="button" @click="closeModal">Cancel</button>
            </div>
          </div>
          <p @click="switchMode" class="switch-mode">I already have an account</p>
        </form>

        <form v-if="isLoginMode" class="card" @submit.prevent="submitLoginForm">
          <h2>Authorization</h2>
          <div>
            <label for="email">Email:</label>
            <input class="form-control" type="email" id="email" v-model="loginData.email" required />

            <label for="password">Password:</label>
            <input class="form-control" type="password" id="password" v-model="loginData.password" required />

            <div class="btn-gr" id="save-btn-gr">
              <button class="btn btn-success" type="submit">Login</button>
              <button class="btn btn-danger" type="button" @click="closeModal">Cancel</button>
            </div>
          </div>
          <p @click="switchMode" class="switch-mode">I want to register</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../api/api.js';

export default {
  name: 'Authorization',
  props: {
    showModal: Boolean,
  },
  emits: ['close-modal'],
  setup(props, { emit }) {
    const showForm = ref(false);
    const isLoginMode = ref(false);
    const role = ref('');
    const formData = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: '',
    });

    const loginData = ref({
      email: '',
      password: '',
    });

    const closeModal = () => {
      emit('close-modal');
    };

    const switchMode = () => {
      isLoginMode.value = !isLoginMode.value;
      showForm.value = false;
    };

    const selectRole = (selectedRole) => {
      formData.value.role = selectedRole;
      role.value = selectedRole;
      showForm.value = true; 
    };

    const submitRegistrationForm = async () => {
      try {
        await api.post('/users/register', formData.value);
        alert('Пользователь успешно зарегистрирован');
        closeModal();
      } catch (error) {
        alert('Ошибка при регистрации пользователя');
        console.error(error);
      }
    };

    const submitLoginForm = async () => {
      try {
        await api.post('/users/login', loginData.value);
        alert('Вы успешно вошли в систему');
        closeModal();
      } catch (error) {
        alert('Ошибка при авторизации');
        console.error(error);
      }
    };

    return {
      showForm,
      isLoginMode,
      role,
      formData,
      loginData,
      closeModal,
      switchMode,
      selectRole,
      submitRegistrationForm,
      submitLoginForm,
    };
  },
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
  height: 30rem;
  align-items: center;
  justify-content: center;
}

#save-btn-gr {
  padding-top: 5%;
}

.switch-mode {
  margin-top: 5%;
  text-decoration: underline;
  cursor: pointer;
}
</style>
