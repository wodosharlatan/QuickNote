<template>
  <div :class="{ exiting: exiting, login: true, recBG_0: true }">
    <p class="textStyle1">Login</p>
    <input
      v-model="username"
      class="ui_ElementT1"
      type="text"
      placeholder="Username"
      name="Username"
    /><br />
    <input
      v-model="password"
      class="ui_ElementT1"
      type="password"
      placeholder="Password"
      name="Password"
    /><br />
    <button
      class="ui_ElementT1"
      :disabled="canLogin"
      @click="login"
      name="LoginButton"
    >
      Login
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login as loginToServer } from "@/scripts/login.js";
import { useLoginStore } from "@/stores/login";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const canLogin = computed(
      () => !(username.value != "" && password.value != "")
    );
    const exiting = ref(false);

    const router = useRouter();

    const login = async () => {
      const login = await loginToServer(username.value, password.value);
      if (login != "LoggedIn") {
        alert(login);
        return;
      }
      const loginStore = useLoginStore();
      exiting.value = true;
      if (loginStore.firstLogin) router.push({ name: "Change Password" });
      else router.push({ name: "Public" });
    };

    return { username, password, canLogin, login, exiting };
  },
};
</script>

<style scoped>
.exiting {
  display: block;
  transition: 1s;
  opacity: 0%;
  transform: translate(-50%, -50%) scale(0.25, 0.25) !important;
}

.ui_ElementT1:hover {
  transform: scale(1.02, 1.02);
}

.login {
  width: 275px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1, 1);
  border-radius: 30px;
}

.login button {
  margin-top: 35px;
  opacity: 90%;
  margin-bottom: 20px;
}

.login input[type="text"] {
  width: 100%;
  height: 35px;
  background-color: #d9d9d9;
  padding: 5px;
  margin-top: 10px;
}

.login input[type="password"] {
  width: 100%;
  height: 35px;
  background-color: #d9d9d9;
  padding: 5px;
  margin-top: 10px;
}

.login input[type="text"]:focus {
  outline: none;
  background-color: #ffffff;
}

.login input[type="password"]:focus {
  outline: none;
  background-color: #ffffff;
}

.login p {
  text-align: center;
}
</style>
