<template>
    <p>Home</p>
    <button @click="logout">Logout</button>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        const logout = () => {
            const loginStore = useLoginStore();
            loginStore.Logout();
            router.push({ name:"Login"});
        }

        const gologin = () => {
            router.push({ name:"Login"});
        }
        return { logout, gologin }
    }
}
</script>

<style></style>