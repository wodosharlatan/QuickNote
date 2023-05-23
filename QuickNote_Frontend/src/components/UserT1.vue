<template>
    <div class="user ui_ElementT1">
        <div class="userInfo">
            <p>{{ user.username + " " + user.isAdmin }}</p>
        </div>
        <div class="buttonMenu">
            <button @click="$router.push({ name: 'New Note' })" class="ui_ElementT1 roundButton">+</button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: ['user'],
    setup() {
        const router = useRouter();

        return {}
    }
}
</script>
  
<style scoped>
.buttonMenu {
    width: 50%;
    float: left;
    height: 30px;
    display:flex;
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
  