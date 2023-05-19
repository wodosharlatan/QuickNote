<script setup>
import { watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavPanel from './components/NavPanel.vue'
import Background01 from './components/Background01.vue'

const changePage = window.changePage;
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
      <div :class="{routerMain: true,changePage: changePage}">
        <RouterView/>
      </div>
      
      <div class="padding1"></div>
    </div>
  </div>
</template>

<style scoped>
.routerMain{
  transition: 500ms;
  transform: scale(1,1);
}
.changePage{
  transform: scale(0.75,0.75);
  opacity: 0;
}
.wrapper1 {
  padding-left: 20px;
  padding-right: 20px;
}
.padding1 {
  width: 100%;
  height: 20px;
}
</style>
