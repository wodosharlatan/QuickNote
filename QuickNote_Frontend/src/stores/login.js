import { ref, computed, effect, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const loginToken = ref(localStorage.getItem('loginToken'));
  const loggedIn = computed(() => loginToken.value != null && loginToken.value != "null" )
  watchEffect(() => localStorage.setItem('loginToken',loginToken.value));
  function Logout() {
    loginToken.value = null;
  }
  return { loginToken, loggedIn, Logout }
})