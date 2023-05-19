<template>
  <div class="navigation recBG_0">
    <p class="textStyle1">QuickNote</p>
    <div class="menubar-container">
      <div class="menubar">
        <button @click="goTo('Admin')" class="ui_ElementT1">Admin</button>
        <button @click="goTo('Private')" class="ui_ElementT1">Private</button>
        <button @click="goTo('Public')" class="ui_ElementT1">Public</button>
        <button @click="logout" class="ui_ElementT1 logoutButton">↲</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { onMounted } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const logout = () => {
      const loginStore = useLoginStore()
      loginStore.Logout()
      router.push({ name: 'Login' })
    }

    const goTo = (page) => {
      router.push({ name: page })
    }

    onMounted(() => {
      //ADD ANIMATION EFFECT
    })

    return { logout, goTo }
  }
  
  
}
</script>

<style scoped>
.navigation {
  height: 4rem;
  padding: 5px;
  /* Center childrend divs one to the left one to the right */
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}


.navigation p {
    margin-left: 20px;
}


.menubar-container {
  width: 50%;
  height: 100%;
  /* Center childrend divs one to the left one to the right */
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.menubar {
  /* put children divs in line and make them equaly width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.menubar button {
  background-color: rgba(255, 255, 255, 0.726);
  /* add space between buttons */
  margin-right: 10px;
  padding: 0 10px;
}

.logoutButton {
  background-color: rgba(255, 255, 255, 0.726);
  margin-right: 10px;
  padding: 0 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}



</style>
