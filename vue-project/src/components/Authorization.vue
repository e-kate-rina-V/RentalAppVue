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

        <form v-if="showForm && !isLoginMode" id="register-form" class="card" @submit.prevent="submitRegistrationForm">
          <h2>Registration</h2>
          <p>Your choice: {{ role }}</p>
          <div>
            <label for="name">Name:</label>
            <input class="form-control" type="text" id="name" v-model="formData.name" required />
            <span v-if="validationErrors.name" class="error">{{ validationErrors.name[0] }}</span>

            <label for="email">Email:</label>
            <input class="form-control" type="email" id="email" v-model="formData.email" required />
            <span v-if="validationErrors.email" class="error">{{ validationErrors.email[0] }}</span>

            <label for="password">Password:</label>
            <input class="form-control" type="password" id="password" v-model="formData.password" required />
            <span v-if="validationErrors.password" class="error">{{ validationErrors.password[0] }}</span>

            <label for="confirm_password">Confirm password:</label>
            <input class="form-control" type="password" id="confirm_password" v-model="formData.password_confirmation"
              required />
            <span v-if="validationErrors.password_confirmation" class="error">{{
              validationErrors.password_confirmation[0] }}</span>

            <div class="btn-gr" id="save-btn-gr">
              <button class="btn btn-success" type="submit">Register</button>
              <button class="btn btn-danger" type="button" @click="closeModal">Cancel</button>
            </div>
          </div>
          <p @click="switchMode" class="switch-mode">I already have an account</p>
        </form>

        <form v-if="isLoginMode" id="login-form" class="card" @submit.prevent="submitLoginForm">
          <h2>Authorization</h2>
          <div>
            <label for="email">Email:</label>
            <input class="form-control" type="email" id="email" v-model="loginData.email" required />
            <span v-if="validationErrors.email" class="error">{{ validationErrors.email[0] }}</span>

            <label for="password">Password:</label>
            <input class="form-control" type="password" id="password" v-model="loginData.password" required />

            <span v-if="validationErrors.auth" class="error">{{ validationErrors.auth[0] }}</span>

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
import { validateName, validateEmail, validatePassword } from '../validation/validation.js';

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

    const validationErrors = ref({});

    const resetForm = () => {
      formData.value = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
      };
      loginData.value = {
        email: '',
        password: '',
      };
      validationErrors.value = {};
    };

    const closeModal = () => {
      resetForm();
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

    const handleValidationErrors = (error) => {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors || {};
      } else {
        console.error('Error:', error.message || error);
      }
    };

    const submitRegistrationForm = async () => {
      validationErrors.value = {};

      const nameError = validateName(formData.value.name);
      const emailError = validateEmail(formData.value.email);
      const passwordError = validatePassword(
        formData.value.password,
        formData.value.password_confirmation
      );

      if (nameError) validationErrors.value.name = [nameError];
      if (emailError) validationErrors.value.email = [emailError];
      if (passwordError) validationErrors.value.password = [passwordError];

      if (Object.keys(validationErrors.value).length > 0) {
        return;
      }

      try {
        await api.post('/users/register', formData.value);
        alert('Registration was successful');
        closeModal();
      } catch (error) {
        handleValidationErrors(error);
      }
    };

    const submitLoginForm = async () => {
      validationErrors.value = {};

      const emailError = validateEmail(loginData.value.email);

      if (emailError) validationErrors.value.email = [emailError];

      if (Object.keys(validationErrors.value).length > 0) {
        return;
      }

      try {
        const response = await api.post('/users/login', loginData.value);
        alert('You have successfully logged in');
        closeModal();
      } catch (error) {
        console.error('Error during authorization:', error);
        if (error.response) {
          if (error.response.status === 401) {
            validationErrors.value.auth = ['Incorrect email or password'];
          } else if (error.response.status === 422) {
            console.error('Validation errors:', error.response.data.errors);
          } else {
            console.error('Error during authorization:', error.response);
          }
        } else {
          console.error('Error during authorization:', error.message);
        }
      }
    };

    return {
      showForm,
      isLoginMode,
      role,
      formData,
      loginData,
      validationErrors,
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
  width: 25rem;
  height: 35rem;
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

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}
</style>
