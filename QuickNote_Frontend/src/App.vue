<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavPanel from "./components/NavPanel.vue"

</script>

<template>
  <div class="background">

  </div>
  <div v-if="$route.name != 'Login'">
    <NavPanel />
  </div>
  <RouterView />
</template>

<style>
.background {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #6D9ACF;
  background-image: linear-gradient(to bottom right, #7daadf, #4a6f99);
  width: 100%;
  height: 100%;
  z-index: -1;
}

</style>
