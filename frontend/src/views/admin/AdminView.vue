<template>
  <div class="recBG_0">
    <div class="menubar">
      <button
        class="ui_ElementT1 roundButton"
        @click="addUser()"
      >
        +
      </button>
    </div>
    <div
      v-if="users"
      class="users"
    >
      <UserT1
        v-for="user in users"
        :user="user"
        class="user"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import UserT1 from "@/components/UserT1.vue";
import { useRouter, useRoute } from "vue-router";
import { getJsonServer } from "@/scripts/getData.js";

export default {
  components: { UserT1 },
  setup() {
    const router = useRouter();
    const users = ref();
    const getUsers = async () => {
      users.value = await getJsonServer("users");
    };
    getUsers();

    const addUser = () => {
      router.push({ name: "New User" });
    };

    return { users, addUser };
  },
};
</script>

<style scoped>
.menubar {
  display: flex;
  flex-flow: row-reverse;
  border-width: 0px 0px 1px 0px;
  border-color: rgba(255, 255, 255, 0.76);
  border-style: solid;
  padding-bottom: 10px;
}

.roundButton {
  background-color: rgba(255, 255, 255, 0.726);
  margin-right: 10px;
  padding: 0 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.users {
  padding: 0;
  padding-top: 10px;
  margin: auto;

  /* make the in line but start adding them from left */
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: start;
  align-items: flex-start;
  gap: 10px;
}

.user {
  flex: none;
}
</style>
