<template>
    <div class="recBG_0">
      <h2>New password</h2>
      <input
        class="ui_ElementT1"
        type="password"
        placeholder=""
        v-model="password"
      /><br />
      <button class="ui_ElementT1 createButton" @click="changePass()" :disabled="!canSend">
        Change Password
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { getJsonServer } from "@/scripts/getData.js";
  
  export default {
    components: {},
    setup() {
      const router = useRouter();
      const password = ref();
      const canSend = computed(() => {
      return password.value && password.value.length > 2;
    });
      const changePass = async () => {
        const response = await getJsonServer("tokens/change-password", {
          password: password.value,
        });
        console.log(response.message);
        alert(response.message);
        router.push({ name: "Public" });
      };
      return {
        changePass,
        password,
        canSend
      };
    },
  };
  </script>
  <style scoped>
  .createButton {
    margin-top: 20px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  h2 {
    user-select: none;
  }
  
  input[type="text"]:focus {
    outline: none;
  }
  </style>
  