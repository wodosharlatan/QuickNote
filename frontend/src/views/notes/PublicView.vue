<template>
  <div class="recBG_0">
    <div class="menubar">
      <button
        class="ui_ElementT1 roundButton"
        @click="$router.push({ name: 'New Note' })"
        name="NewNoteButton"
      >
        +
      </button>
    </div>
    <div v-if="notes" class="notes" name="NoteView">
      <NoteT1 v-for="note in notes" :note="note" class="note" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "@/stores/login";
import NoteT1 from "@/components/NoteT1.vue";
import { getJsonServer } from "@/scripts/getData.js";

export default {
  components: { NoteT1 },
  setup() {
    const notes = ref(null);
    // Get public notes from server
    const getNotes = async () => {
      notes.value = await getJsonServer("entries");
    };
    getNotes();

    return { notes };
  },
};
</script>

<style scoped>
.recBG_0 {
  transition: 1s;
}
.menubar {
  display: flex;
  flex-flow: row-reverse;
  border-width: 0px 0px 1px 0px;
  border-color: rgba(255, 255, 255, 0.76);
  border-style: solid;
  padding-bottom: 10px;
}

.roundButton {
  background-color: rgba(255, 255, 255, 0.726);
  margin-right: 10px;
  padding: 0 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.notes {
  padding: 0;
  margin: auto;

  /* make the in line but start adding them from left */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.note {
  flex: none;
}
</style>
