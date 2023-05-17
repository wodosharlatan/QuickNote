<template>
    <div class="login">
        <p>Login</p>
        <input type="text" placeholder="Username" v-model="username" /><br>
        <input type="text" placeholder="Password" v-model="password" /><br>
        <button @click="login" :disabled="canLogin">Login</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
    setup() {
        const username = ref("");
        const password = ref("");
        const canLogin = computed(() => !(username.value != "" && password.value != ""));

        const router = useRouter()

        const login = () => {
            const loginStore = useLoginStore();
            loginStore.loginToken = "LOGIN_TEST_VALUE_6482148";
            router.push({ name: "Home" });
        }
        return { username, password, canLogin, login }
    }
}
</script>

<style></style>