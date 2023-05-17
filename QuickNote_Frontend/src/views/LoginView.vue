<template>
    <p>Login</p>
    <button @click="login">Login</button>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        const login = () => {
            const loginStore = useLoginStore();
            loginStore.loginToken = "LOGIN15165465";
            router.push({ name:"Home"});

        }
        return { login }
    }
}
</script>

<style></style>