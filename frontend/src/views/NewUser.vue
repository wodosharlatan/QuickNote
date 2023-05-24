<template>
  <div class="recBG_0">
    <h2>Username</h2>
    <input
      class="ui_ElementT1"
      type="text"
      placeholder=""
      v-model="username"
    /><br />
    <button
      class="ui_ElementT1 createButton"
      @click="createUser()"
      :disabled="!canSend"
    >
      Create User
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
    const username = ref();
    const canSend = computed(() => {
      return username.value && username.value.length > 2;
    });
    const createUser = async () => {
      console.log(username.value);
      const response = await getJsonServer("new-user", {
        username: username.value,
      });
      console.log(response.message);
      alert(response.message);
      router.push({ name: "Admin" });
    };
    return {
      createUser,
      username,
      canSend,
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
