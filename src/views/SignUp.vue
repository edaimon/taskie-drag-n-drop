<template>
  <div
    class="sizeContainer flex justify-center items-center box-border color-dark-blue"
  >
    <!-- SIGN IN FORM -->
    <div
      v-if="switchForm === false"
      class="sizeContainer flex flex-col bg-stone-100 justify-around min-w-fit"
    >
      <!-- PONER AQUI EL FALSE SE MOSTRARA EL FORM DEL SIGNIN -->
      <div class="sizeContainerForm flex flex-col justify-center">
        <h2 class="m-5 text-center text-5xl font-bold textColor">
          WELCOME TO TASKIE!
        </h2>
        <p v-if="userStore.signIn(error) == error"> Error: {{ userStore.signIn }}</p>
        <form
          action="submit"
          @submit.prevent="login()"
          class="flex flex-col justify-evenly items-center h-1/3"
        >
        <div class=" w-11/12 flex justify-evenly items-center relative">
          <input
            type="text"
            v-model="email"
            placeholder=" "
            class="inputFocus bg-stone-100 w-1/2 border-2 border-blue-200 rounded-lg text-center pt-1 pb-1 placeholder-gray-900 h-14"
          />
          <p class="phtransform">Enter your email</p>
        </div>
        <div class="w-11/12 flex justify-evenly items-center relative">
          <input
            type="password"
            v-model="password"
            name="password"
            placeholder=" "
            class="inputFocus bg-stone-100 w-1/2 border-2 border-blue-200 rounded-lg text-center pt-1 pb-1 placeholder-gray-900 h-14"
          />
          <p class="phtransform">Enter your password</p>
          </div>
          <div class="flex justify-center pt-5">
            <button
              class="loginBtt rounded-lg w-64 h-16 text-center text-white font-bold shadow-xl"
            >
              LOGIN!
            </button>
          </div>
        </form>
        <div class="flex justify-center pt-5">
          <p>Don't have an account?</p>
          <button
            @click="(switchImage = !switchImage), (switchForm = !switchForm)"
            class="textHover font-bold pl-5"
          >
            Register!
          </button>
        </div>
      </div>
    </div>

    <!-- SIGN UP FORM -->

    <div
      v-if="switchForm === true"
      class="sizeContainer flex flex-col items-end bg-stone-100 min-w-fit"
    >
      <!--PONER QUE SI LA VARIABLE SE CONVIERTE EN TRU SE MUESTRA ESTA -->
      <div class="sizeContainerForm flex flex-col justify-center">
        <h2 class="m-5 text-center text-5xl font-bold textColor">
          CREATE AN ACCOUNT
        </h2>
        <form
          action="sumbit"
          @submit.prevent="register()"
          class="flex flex-col justify-evenly items-center h-1/3"
        >
        <div class=" w-11/12 flex justify-evenly items-center relative">
          <input
            type="text"
            v-model="emailRegister"
            placeholder=" "
            class="inputFocus bg-stone-100 w-1/2 border-2 border-blue-200 rounded-lg text-center pt-1 pb-1 placeholder-gray-900 h-14"
          />
          <p class="phtransform">Enter your email</p>
        </div>
        <div class="w-11/12 flex justify-evenly items-center relative">
          <input
            type="password"
            v-model="passwordRegister"
            name="password"
            placeholder=" "
            class="inputFocus bg-stone-100 w-1/2 border-2 border-blue-200 rounded-lg text-center pt-1 pb-1 placeholder-gray-900 h-14"
          />
          <p class="phtransform">Enter your password</p>
          </div>

          <div class="flex justify-center pt-5">
            <button
              class="loginBtt rounded-lg w-64 h-16 text-center text-white font-bold shadow-xl"
            >
              REGISTER!
            </button>
          </div>
        </form>
        <div class="flex justify-center pt-5">
          <p>Already a user?</p>
          <button
            @click="(switchImage = !switchImage), (switchForm = !switchForm)"
            class="textHover font-bold pl-5"
          >
            Login!
          </button>
        </div>
      </div>
    </div>

    <div
      class="imgPosition shadow-2xl"
      :class="{ imgPositionSwitch: switchImage }"
    >
      <img
        src="../img/presentation.jpg"
        alt="img_presentation"
        class="imgSize"
      />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import userStore from "../stores/user";

export default {
  computed: {
    ...mapStores(userStore),
  },

  data() {
    return {
      email: null,
      password: null,
      emailRegister: null,
      passwordRegister: null,
      switchImage: false,
      switchForm: false,
    };
  },

  methods: {
    async register() {
      const signUp = await this.userStore.signUp(this.emailRegister, this.passwordRegister);
      alert((MessageEvent = "Confirm your email, please."));
      if (signUp === 1) {
        this.switchImage = false;
        this.switchForm = false;
      }
    },
    async login() {
      const signInConfirm = await this.userStore.signIn(
        this.email,
        this.password
      );

      if (signInConfirm === 0) {
        this.$router.push("Dashboard");
      }
    },
    signOut() {
      this.userStore.signOut();
    },
  },
};
</script>

<style>
.imgPosition {
  position: absolute;
  right: 0;
  transition: transform 0.6s;
  z-index: 2;
  width: 50vw;
}

.imgPositionSwitch {
  transform: translateX(-100%);
}

.sizeContainer {
  height: 90vh;
  width: 100vw;
  z-index: 1;
}

.sizeContainerForm {
  height: 90vh;
  width: 50vw;
}

.imgSize {
  height: 90vh;
  object-fit: cover;
}
/*
.itemSize{
    width: 100%;
} */

.loginBtt {
  background-color: #219ebc;
}

.loginBtt:hover {
  background-color: white;
  color: #023047;
  border-width: 2px;
  border-color: #fb8500;
}

.inputFocus:focus {
  outline: none !important;
  border: 3px solid #fb8500;
}

input:not(:placeholder-show) + .inputFocus:focus{
    border: 3px solid #8ecae6;
}

.textHover:hover {
  color: #fb8500;
}

.phtransform{
    position:absolute;
    top:10;
    pointer-events: none;
    transition: .3s;
}

input:focus ~ p{
    transform: translateY(-28px);
    background-color: rgb(245 245 244);
    padding: 0 5px 0 5px;
    color: #fb8500;
}

input:not(:placeholder-shown) + .phtransform{
    transform: translateY(-28px);
    background-color: rgb(245 245 244);
    padding: 0 5px 0 5px;
    color: #8ecae6;
}

</style>
