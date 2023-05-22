<template>
    <input class="ui_ElementT1" type="text" placeholder="" v-model="text" /><br />
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    setup() {
      return {}
    }
  }
  </script>
  
  <style scoped>
input{
    
}

input[type='text']:focus {
  outline: none;
}
</style>
  