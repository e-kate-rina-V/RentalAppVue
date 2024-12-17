<template>
  <div>
    <div v-if="showModal" class="modal">
      <div class="card-choice">
        <div v-if="awaitingEmailVerification" class="verify-email">
          <h2>Подтвердите ваш email</h2>
          <p>Мы отправили письмо на адрес {{ formData.email }}.</p>
          <p>
            Пожалуйста, проверьте почту и перейдите по ссылке для завершения регистрации.
          </p>
          <button @click="resendVerificationEmail" class="btn btn-primary">
            Отправить письмо повторно
          </button>
          <p v-if="resendSuccess" class="success-message">Письмо успешно отправлено!</p>
          <p v-if="resendError" class="error-message">
            {{ resendError }}
          </p>
          <button @click="closeModal" class="btn btn-secondary">Закрыть</button>
        </div>

        <div v-if="registrationSuccess" class="success-message">
          <h2>Регистрация успешна!</h2>
          <p>
            Мы отправили письмо на адрес {{ formData.email }}. Пожалуйста, подтвердите ваш
            email.
          </p>
          <button @click="closeModal" class="btn btn-primary">Закрыть</button>
        </div>

        <form
          v-if="!awaitingEmailVerification && !showForm && !isLoginMode"
          class="modal-content"
          @submit.prevent="selectRole"
        >
          <div id="choice-form">
            <div class="container text-center">
              <div class="d-flex justify-content-around">
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="closeModal"
                ></button>
              </div>
              <h2>Оберіть роль</h2>
            </div>
            <div class="btn-gr" role="group">
              <div class="d-flex flex-column align-items-center; role-btn">
                <img
                  class="conven-img"
                  src="../assets/img/renter_icon.png"
                  alt="renter_icon"
                />
                <button class="btn btn-dark" type="button" @click="selectRole('renter')">
                  Орендатор
                </button>
              </div>
              <div class="d-flex flex-column align-items-center; role-btn">
                <img
                  class="conven-img"
                  src="../assets/img/landlord_icon.png"
                  alt="landlord_icon"
                />
                <button
                  class="btn btn-dark"
                  type="button"
                  @click="selectRole('landlord')"
                >
                  Орендодавець
                </button>
              </div>
            </div>
            <p @click="switchMode" class="switch-mode">I already have an account</p>
          </div>
        </form>

        <form
          v-if="!awaitingEmailVerification && showForm && !isLoginMode"
          id="register-form"
          class="card"
          @submit.prevent="submitRegistrationForm"
        >
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
          <h2>Registration</h2>
          <p>Your choice: {{ role }}</p>
          <div>
            <label for="name">Name:</label>
            <input
              class="form-control"
              type="text"
              id="name"
              v-model="formData.name"
              required
            />
            <span v-if="validationErrors.name" class="error">{{
              validationErrors.name[0]
            }}</span>

            <label for="email">Email:</label>
            <input
              class="form-control"
              type="email"
              id="email"
              v-model="formData.email"
              required
            />
            <span v-if="validationErrors.email" class="error">{{
              validationErrors.email[0]
            }}</span>

            <label for="password">Password:</label>
            <input
              class="form-control"
              type="password"
              id="password"
              v-model="formData.password"
              required
            />
            <span v-if="validationErrors.password" class="error">{{
              validationErrors.password[0]
            }}</span>

            <label for="confirm_password">Confirm password:</label>
            <input
              class="form-control"
              type="password"
              id="confirm_password"
              v-model="formData.password_confirmation"
              required
            />
            <span v-if="validationErrors.password_confirmation" class="error">{{
              validationErrors.password_confirmation[0]
            }}</span>

            <div class="btn-gr" id="save-btn-gr">
              <button class="btn btn-success" type="submit">Register</button>
              <button class="btn btn-danger" type="button" @click="closeModal">
                Cancel
              </button>
            </div>
          </div>
          <p @click="switchMode" class="switch-mode">I already have an account</p>
        </form>

        <form
          v-if="!awaitingEmailVerification && isLoginMode"
          id="login-form"
          class="card"
          @submit.prevent="submitLoginForm"
        >
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
          <h2>Authorization</h2>
          <div>
            <label for="email">Email:</label>
            <input
              class="form-control"
              type="email"
              id="email"
              v-model="loginData.email"
              required
            />
            <span v-if="validationErrors.email" class="error">{{
              validationErrors.email[0]
            }}</span>

            <label for="password">Password:</label>
            <input
              class="form-control"
              type="password"
              id="password"
              v-model="loginData.password"
              required
            />
            <span v-if="validationErrors.auth" class="error">{{
              validationErrors.auth[0]
            }}</span>

            <div class="btn-gr" id="save-btn-gr">
              <button class="btn btn-success" type="submit">Login</button>
              <button class="btn btn-danger" type="button" @click="closeModal">
                Cancel
              </button>
            </div>
          </div>
          <p @click="switchMode" class="switch-mode">I want to register</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser, loginUser, resendVerification } from "../api/api.js";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../validation/auth_validation.js";

export default {
  name: "Authorization",
  props: {
    showModal: Boolean,
  },
  emits: ["close-modal"],
  setup(props, { emit }) {
    const router = useRouter();
    const showForm = ref(false);
    const isLoginMode = ref(false);
    const awaitingEmailVerification = ref(false);
    const resendSuccess = ref(false);
    const resendError = ref("");
    const registrationSuccess = ref(false);
    const role = ref("");
    const formData = ref({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "",
    });

    const loginData = ref({
      email: "",
      password: "",
    });

    const validationErrors = ref({});

    const resetForm = () => {
      formData.value = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
      };
      loginData.value = {
        email: "",
        password: "",
      };
      validationErrors.value = {};
      awaitingEmailVerification.value = false;
      registrationSuccess.value = false;
      resendSuccess.value = false;
      resendError.value = "";
    };

    const closeModal = () => {
      resetForm();
      emit("close-modal");
    };

    const selectRole = (selectedRole) => {
      formData.value.role = selectedRole;
      role.value = selectedRole;
      showForm.value = true;
    };

    const switchMode = () => {
      isLoginMode.value = !isLoginMode.value;
      validationErrors.value = {};
    };

    const submitRegistrationForm = async () => {
      validationErrors.value = {};

      const nameError = validateName(formData.value.name);
      const emailError = validateEmail(formData.value.email);
      const passwordError = validatePassword(
        formData.value.password,
        formData.value.password_confirmation
      );

      if (nameError) {
        validationErrors.value.name = [nameError];
      }
      if (emailError) {
        validationErrors.value.email = [emailError];
      }
      if (passwordError) {
        validationErrors.value.password_confirmation = [passwordError];
      }

      if (Object.keys(validationErrors.value).length > 0) {
        return;
      }

      try {
        const response = await registerUser(formData.value);

        console.log("Registration response:", response);

        alert("Registration was successful! We have sent a letter to your email.");
        closeModal();

        if (response && response.message === "Verification email sent") {
          awaitingEmailVerification.value = true;
          registrationSuccess.value = true;
        } else {
          throw new Error("Unexpected server response");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        if (error.response && error.response.status === 422) {
          validationErrors.value = error.response.data.errors || {};
        } else {
          validationErrors.value.auth = [
            "An unexpected error occurred. Please try again later.",
          ];
        }
      }
    };

    const resendVerificationEmail = async () => {
      resendSuccess.value = false;
      resendError.value = "";

      try {
        await resendVerification();
        resendSuccess.value = true;
      } catch (error) {
        console.error("Error resending verification email:", error);
        resendError.value = "Failed to resend verification email. Please try again.";
      }
    };

    const submitLoginForm = async () => {
      validationErrors.value = {};

      if (!loginData.value.email || !loginData.value.password) {
        validationErrors.value.auth = ["Email and password are required"];
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginData.value.email)) {
        validationErrors.value.email = ["Please enter a valid email address"];
        return;
      }

      try {
        const response = await loginUser(loginData.value);
        const user = response.user;

        const userRole = user.role;

        console.log("Login API Response:", response);

        if (response && response.role) {
          const userRole = response.role;

          if (userRole === "renter") {
            router.push("/renter");
          } else if (userRole === "landlord") {
            router.push("/landlord");
          } else {
            console.error("Unexpected user role:", userRole);
          }
        } else {
          console.error("Role not found in the response:", response);
        }

        closeModal();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          validationErrors.value.auth = [error.response.data.error];
        } else {
          validationErrors.value.auth = [
            "An unexpected error occurred. Please try again later.",
          ];
        }
      }
    };

    return {
      showForm,
      isLoginMode,
      awaitingEmailVerification,
      registrationSuccess,
      resendSuccess,
      resendError,
      role,
      formData,
      loginData,
      validationErrors,
      closeModal,
      selectRole,
      switchMode,
      submitRegistrationForm,
      submitLoginForm,
      resendVerificationEmail,
    };
  },
};
</script>
