<template>
  <div class="note" @click="viewNote(note.ID)">
    <div :class="['noteBar', 'urgnt' + note.Urgency]">
      <h3>{{ urgencyText(note.Urgency) }}</h3>
      <h3>{{ note.DeadLine }}</h3>
    </div>
    <div class="noteBottom">
      <h3>{{ shortenText(note.Title, 10) }}</h3>
      <p class="noteText">{{ shortenText(note.Text, 57) }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["note"],
  setup() {
    const router = useRouter();

    const viewNote = (id) => {
      console.log(id);
      if (isNaN(id)) {
        router.push({ name: "404" });
        return;
      }
      router.push({ name: "Note", params: { id: id } });
    };
    const urgencyText = (id) => {
      const urgency = ["Minor task", "Crucial task", "Top-priority task !"];
      return urgency[id - 1];
    };

    const shortenText = (text, len) => {
      if (text.length > len) return text.substring(0, len) + " . . .";
      return text;
    };

    return { urgencyText, shortenText, viewNote };
  },
};
</script>

<style scoped>
.noteBottom {
  padding: 10px;
}

.noteBottom h3 {
  font-size: large;
  font-weight: bold;
  overflow: hidden;
}

.noteBottom p {
  font-size: medium;
}

.note {
  min-width: 175px;
  min-height: 200px;
  max-width: 175px;
  max-height: 200px;
  width: 175px;
  height: 200px;

  background-color: #ffffffb9;
  -webkit-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.18);
  border-radius: 10px 10px 5px 5px;

  margin: 10px;
}

.noteBar {
  opacity: 80%;
  height: 3rem;
  border-radius: 10px 10px 0px 0px;
  padding: 2px;
  color: white;
  /* split the 2 divs align one to left other to right */
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* make them align vertically */
  flex-direction: row;
}

.noteBar h3 {
  margin: 10px 10px 10px 10px;
  font-size: large;
  font-weight: bold;
  overflow: hidden;
  font-size: 10px;
}

.noteText {
  overflow: hidden;
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
