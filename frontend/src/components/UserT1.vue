<template>
  <div class="user ui_ElementT1">
    <div class="userInfo">
      <p>{{ user.Username }}</p>
    </div>
    <div class="buttonMenu">
      <button class="ui_ElementT1 roundButton" @click="deleteUser()">🗑</button>
      <button
        v-if="!user.IsAdmin"
        class="ui_ElementT1 roundButton"
        @click="setUserAdmin()"
      >
        👤
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getJsonServer } from "@/scripts/getData.js";

export default {
  props: ["user"],
  setup(props) {
    const router = useRouter();

    const deleteUser = async () => {
      // Send request to server for deletion of a user
      const response = await getJsonServer("users/delete", {
        username: props.user.Username,
      });
      router.go({ Name: "Admin" });
    };

    const setUserAdmin = async () => {
      // Send request to server for setting user as admin
      const response = await getJsonServer("users/set-admin", {
        username: props.user.Username,
      });
      router.go({ Name: "Admin" });
    };

    return { deleteUser, setUserAdmin };
  },
};
</script>

<style scoped>
@keyframes load {
  from {
    transform: scale(0, 0);
    opacity: 0;
  }

  to {
    transform: scale(1, 1);
    opacity: 1;
  }
}

.buttonMenu {
  width: 50%;
  float: left;
  height: 30px;
  display: flex;
  flex-flow: row-reverse;
}

.userInfo {
  width: 50%;
  float: left;
  height: 30px;
}

.user {
  width: 100%;
  height: 40px;
  padding: 5px;
  background-color: white;
  animation: load 1s;
}

.roundButton {
  background-color: rgba(255, 255, 255, 0.726);
  margin-right: 10px;
  padding: 0 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
</style>
