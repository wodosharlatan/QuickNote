<template>
  <div class="recBG_0">
    <h2>Title</h2>
    <input class="ui_ElementT1" type="text" placeholder="" v-model="text" /><br />
    <h2>Text</h2>
    <textarea
      class="ui_ElementT1"
      type="text"
      placeholder=""
      v-model="text"
      oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
    ></textarea
    ><br />
    <h2>Urgency</h2>
    <UrgencySelect></UrgencySelect>
    <h2>Deadline</h2>
    <DeadlineSelect></DeadlineSelect>
    <h2>Visibility</h2>
    <VisibilitySelect></VisibilitySelect>
    <button class="ui_ElementT1 createButton">Create Note</button>
  </div>
</template>

<script>
import UrgencySelect from '@/components/NewNote/UrgencySelect.vue'
import DeadlineSelect from '@/components/NewNote/DeadlineSelect.vue'
import VisibilitySelect from '@/components/NewNote/VisibilitySelect.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'

export default {
  components: { UrgencySelect, DeadlineSelect, VisibilitySelect },
  setup() {
    return {}
  }
}
</script>
<style scoped>
.createButton {
  margin-top: 20px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h2 {
  user-select: none;
}

input[type='text']:focus {
  outline: none;
}

textarea {
  resize: none;
  max-height: 500px;
  transition: 0s;
}

textarea:focus {
  outline: none;
}
</style>
