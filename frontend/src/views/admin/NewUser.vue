<template>
  <div class="recBG_0">
    <h2>Username</h2>
    <input
      v-model="username"
      class="ui_ElementT1"
      type="text"
      placeholder=""
      name="Username"
    /><br />
    <button
      class="ui_ElementT1 createButton"
      :disabled="!canSend"
      @click="createUser()"
      name="CreateUserButton"
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
      const response = await getJsonServer("new-user", {
        username: username.value,
      });
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
