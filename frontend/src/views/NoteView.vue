<template>
  <div class="container recBG_0" v-if="note">
    <div :class="['noteBar', 'urgnt' + note.urgent]">
      <h1>{{ urgencyText(note.urgent) }} - {{ note.date }}</h1>
    </div>
    <div class="wrapper">
      <h2>{{ note.title }} - {{ note.id }}</h2>
      <pre>{{ note.text }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "@/stores/login";

export default {
  props: ["id"],
  setup(props) {
    window.changePage.value = true;
    const urgencyText = (id) => {
      const urgency = ["Minor task", "Crucial task", "Top-priority task !"];
      return urgency[id - 1];
    };

    const note = ref(null);

    const fetchNote = async () => {
      if (!window.useBackend) {
        const noteData = {
          id: props.id,
          urgent: 3,
          date: "2.5.2025",
          title: "SomeTextAAA544",
          text: "Lorem Impsum LONG TEXT \nfsdgsdfgdfg\nfsdgsdfgdfg\nfsdgsdfgdfg sdfgsdfgsdfg",
        };
        //Test delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        note.value = noteData;
        window.changePage.value = false;
        return;
      }
    };

    fetchNote();
    return { note, urgencyText };
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
  height: 100%;
  padding: 0px;
  border-radius: 10px 10px 1px 1px;
}

h2 {
  font-weight: 500;
}

pre {
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
