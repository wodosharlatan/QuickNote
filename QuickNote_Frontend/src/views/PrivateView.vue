<template>
  <div class="recBG_0 note_container">
    <div class="notes">
      <NoteT1 :note="note" v-for="note in testNotes" class="note" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginStore } from '../stores/login'
import NoteT1 from '../components/NoteT1.vue'

export default {
  components: { NoteT1 },
  setup() {
    const testNotes = [
      {
        id:256,
        urgent: 3,
        date: '2.5.2025',
        title: 'SomeTextAAA544',
        text: 'Lorem Impsum'
      }
    ]

    return { testNotes }
  }
}
</script>

<style scoped>
.recBG_0 {
  background-color: #a195c594;
  height: 100%;
}
.notes {
  padding: 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.note {
  flex: none;
}
</style>
