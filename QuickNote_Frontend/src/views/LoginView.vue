<template>
  <div :class="{ exiting: exiting, login: true, recBG_0: true }">
    <p class="textStyle1">Login</p>
    <input class="ui_ElementT1" type="text" placeholder="Username" v-model="username" /><br />
    <input class="ui_ElementT1" type="password" placeholder="Password" v-model="password" /><br />
    <button class="ui_ElementT1" @click="login" :disabled="canLogin">Login</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const canLogin = computed(() => !(username.value != '' && password.value != ''))
    const exiting = ref(false)

    const router = useRouter()

    const login = async () => {
      if (!(await loginToServer(username.value, password.value))) return
      exiting.value = true
      setTimeout(() => {
        router.push({ name: 'Public' })
      }, 1000)
    }

    //tombos4
    //6t1uewa3
    async function loginToServer(username, password) {
      if (!window.useBackend) {
        const loginStore = useLoginStore()
        loginStore.loginToken = 'TESTTOKEN456454'
        return true
      }
      const responseServer = await fetch('http://' + window.backendServer + '/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await responseServer.json()

      if (response.message) {
        alert(response.message)
        return false
      }
      if (!response.token || response.token.length != 22) {
        alert('Server ERROR!!!')
        return false
      }
      console.log(response)
      const loginStore = useLoginStore()
      loginStore.loginToken = response.token
      return true
    }
    return { username, password, canLogin, login, exiting }
  }
}
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
  position: absolute;
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

.login input[type='text'] {
  width: 100%;
  height: 35px;
  background-color: #d9d9d9;
  padding: 5px;
  margin-top: 10px;
}

.login input[type='password'] {
  width: 100%;
  height: 35px;
  background-color: #d9d9d9;
  padding: 5px;
  margin-top: 10px;
}

.login input[type='text']:focus {
  outline: none;
  background-color: #ffffff;
}

.login input[type='password']:focus {
  outline: none;
  background-color: #ffffff;
}

.login p {
  text-align: center;
}
</style>
