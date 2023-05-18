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

/* ============================ OLD GRADIENT BACKGROUND ============================ 
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
 ============================ OLD GRADIENT BACKGROUND ============================ */

/* ============================ NEW GRADIENT BACKGROUND ============================ */
body {
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
	height: 100vh;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}


</style>
