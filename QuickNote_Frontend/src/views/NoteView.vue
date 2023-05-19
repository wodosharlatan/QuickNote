<template>
  <div class="container">
    
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
  props: ["id"],
  setup() {
    return {}
  }
}
</script>

<style>
.container{
  width: 100%;
  height: auto;
  background-color: black;
}
</style>
