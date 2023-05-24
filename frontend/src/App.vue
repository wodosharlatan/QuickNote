<script setup>
import { RouterView } from "vue-router";
import NavPanel from "@/components/NavPanel.vue";
import Background01 from "@/components/Background01.vue";

const changePage = window.changePage;
</script>

<template>
  <Background01 />
  <div class="wrapper1">
    <div class="wrapper2">
      <div class="padding1"></div>
      <div v-if="$route.name != 'Login' && $route.name != 'Change Password'">
        <NavPanel />
      </div>
      <div class="padding1"></div>
      <div :class="{ routerMain: true, changePage: changePage }">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.routerMain {
  transition: 500ms;
  transform: scale(1, 1);
  height: calc(100vh - 65px - 40px);
  width: 100%;
}

.changePage {
  transform: scale(0.75, 0.75);
  opacity: 0;
}

.wrapper2 {
  min-height: 100vh;
}

.wrapper1 {
  padding-left: 20px;
  padding-right: 20px;
}

.padding1 {
  width: 100%;
  height: 20px;
}

@media only screen and (max-width: 600px) {
  .routerMain {
    height: calc(100vh - 100px - 40px);
  }
}
</style>
