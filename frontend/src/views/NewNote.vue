<template>
  <div class="recBG_0">
    <h2>Title</h2>
    <input
      class="ui_ElementT1"
      type="text"
      placeholder=""
      v-model="title"
    /><br />
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
    <UrgencySelect v-model="urgency"></UrgencySelect>
    <h2>Deadline</h2>
    <DeadlineSelect v-model="deadline"></DeadlineSelect>
    <h2>Visibility</h2>
    <VisibilitySelect v-model="visibility"></VisibilitySelect>
    <button
      class="ui_ElementT1 createButton"
      @click="createNote()"
      :disabled="!canSend"
    >
      Create Note
    </button>
  </div>
</template>

<script>
import UrgencySelect from "@/components/NewNote/UrgencySelect.vue";
import DeadlineSelect from "@/components/NewNote/DeadlineSelect.vue";
import VisibilitySelect from "@/components/NewNote/VisibilitySelect.vue";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { getJsonServer } from "@/scripts/getData.js";

export default {
  components: { UrgencySelect, DeadlineSelect, VisibilitySelect },
  setup() {
    const router = useRouter();

    const title = ref();
    const text = ref();
    const urgency = ref();
    const deadline = ref();
    const visibility = ref();

    const canSend = computed(() => {
      return (
        title.value &&
        title.value.length > 2 &&
        text.value &&
        text.value.length > 2
      );
    });

    const createNote = async () => {
      const response = await getJsonServer("entries/new-entry", {
        title: title.value,
        text: text.value,
        urgency: urgency.value,
        deadline: deadline.value,
        ispublic: visibility.value,
      });
      alert(response.message);
      router.push({ name: "Public" });
    };

    return {
      createNote,
      canSend,
      title,
      text,
      urgency,
      deadline,
      visibility,
    };
  },
};
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

input[type="text"]:focus {
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
