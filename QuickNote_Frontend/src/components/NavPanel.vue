<template>
    <div class="navigation recBG_0">
        <p class="textStyle1">QuickNote</p>
        <div class="menubar">
            <button @click="goTo('Admin')" class="ui_ElementT1">Admin</button>
            <div class="divider recBG_0"></div>
            <button @click="goTo('Private')" class="ui_ElementT1">Private</button>
            <button @click="goTo('Public')" class="ui_ElementT1">Public</button>
            <button @click="logout" class="ui_ElementT1"> ↲ </button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
    setup() {
        const router = useRouter();
        const logout = () => {
            const loginStore = useLoginStore();
            loginStore.Logout();
            router.push({ name: "Login" });
        }

        const goTo = (page) => {
            router.push({ name: page });
        }

        return { logout, goTo }
    }
}
</script>

<style scoped>
.navigation {
    height: 50px;
    padding: 5px;
}

.navigation p {
    float: left;
    line-height: 30px;
}

.menubar {
    float: right;
    display: flex;
    flex-flow: row;
    gap: 5px;
}

.divider {
    box-sizing: border-box;
    height: 100%;
    width: 5px;
}

.menubar button {
    background-color: rgba(255, 255, 255, 0.726);
}
</style>