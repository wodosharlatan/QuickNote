<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavPanel from './components/NavPanel.vue'
import Background01 from './components/Background01.vue'
</script>

<template>
  <Background01 />
  <div class="wrapper1">
    <div class="wrapper2">
      <div class="padding1"></div>
      <div v-if="$route.name != 'Login'">
        <NavPanel />
      </div>
      <div class="padding1"></div>
      <RouterView />
      <div class="padding1"></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper1 {
  padding-left: 20px;
  padding-right: 20px;
}
.padding1 {
  width: 100%;
  height: 20px;
}
</style>
