<template>
  <div v-if="note" class="container recBG_0">
    <div :class="['noteBar', 'urgnt' + note.Urgency]">
      <h1>
        {{ urgencyText(note.Urgency) }} -
        {{ formatDate(new Date(note.DeadLine)) }}
      </h1>
    </div>
    <div class="wrapper">
      <h2>{{ note.Title }}</h2>
      <pre>{{ note.Text }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { getJsonServer } from "@/scripts/getData.js";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const formatDate = (date) => {
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    window.changePage.value = true;
    const urgencyText = (id) => {
      const urgency = ["Minor task", "Crucial task", "Top-priority task !"];
      return urgency[id - 1];
    };

    const note = ref(null);

    const fetchNote = async () => {
      const noteData = await getJsonServer("entries/" + props.id);
      if (noteData.message) {
        alert(noteData.message);
        return;
      }
      note.value = noteData;
      window.changePage.value = false;
      return;
    };

    fetchNote();
    return { note, urgencyText, formatDate };
  },
};
</script>

<style scoped>
.wrapper {
  padding: 10px;
}

.noteBar {
  opacity: 80%;
  border-radius: 10px 10px 0px 0px;
  padding: 10px;
  color: rgb(255, 255, 255);
}

.noteBar h1 {
  font-weight: 500;
}

.container {
  width: 100%;
  height: fit-content;
  padding: 0px;
  border-radius: 10px 10px 1px 1px;
}

h2 {
  font-weight: 500;
}

pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

.urgnt3 {
  background-image: linear-gradient(to bottom right, red, rgb(255, 72, 0));
}

.urgnt2 {
  background-image: linear-gradient(
    to bottom right,
    rgb(255, 187, 0),
    rgb(229, 255, 0)
  );
}

.urgnt1 {
  background-image: linear-gradient(
    to bottom right,
    rgb(134, 248, 3),
    rgb(10, 194, 4)
  );
}
</style>
