import { ref, computed, effect, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", () => {
  //Global variable for login token
  const loginToken = ref(localStorage.getItem("loginToken"));
  const admin = ref(localStorage.getItem("admin"));
  const firstLogin = ref();
  //Computed variable for loggedIn
  const loggedIn = computed(
    () => loginToken.value != null && loginToken.value != "null"
  );
  //Store to local storage if loginToken changes
  watchEffect(() => localStorage.setItem("loginToken", loginToken.value));
  watchEffect(() => localStorage.setItem("admin", admin.value));

  function Logout() {
    loginToken.value = null;
  }
  return { loginToken, admin, firstLogin, loggedIn, Logout };
});
