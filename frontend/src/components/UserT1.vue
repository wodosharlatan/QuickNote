<template>
  <div class="user ui_ElementT1">
    <div class="userInfo">
      <p>{{ user.Username }}</p>
    </div>
    <div class="buttonMenu">
      <button @click="deleteUser()" class="ui_ElementT1 roundButton">
        🗑
      </button>
      <button v-if="!user.IsAdmin" @click="setUserAdmin()" class="ui_ElementT1 roundButton">
        👤
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { deleteJsonServer, getJsonServer } from '@/scripts/getData.js'

export default {
  props: ['user'],
  setup(props) {
    const router = useRouter()

    const deleteUser = async () => {
      console.log(await deleteJsonServer("users",{ username: props.user.Username}));
      router.go({ Name: 'Admin'})
    }

    const setUserAdmin = async () => {
      console.log(await getJsonServer("users/set_admin",{ username: props.user.Username}));
      router.go({ Name: 'Admin'})
    }

    return { deleteUser, setUserAdmin }
  }
}
</script>

<style scoped>
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
