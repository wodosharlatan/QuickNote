<template>
  <div class="recBG_0">
    <div class="menubar">
      <button
        @click="$router.push({ name: 'New Note' })"
        class="ui_ElementT1 roundButton"
      >
        +
      </button>
    </div>
    <div class="notes">
      <NoteT1 :note="note" v-for="note in testNotes" class="note" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "../stores/login";
import NoteT1 from "@/components/NoteT1.vue";

export default {
  components: { NoteT1 },
  setup() {
    const testNotes = [
      {
        urgent: 3,
        date: "2.5.2025",
        title: "Tex1sdfhsdfhsdf",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 2,
        date: "19.5.2023",
        title: "Tex1",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 3,
        date: "6.8.2028",
        title: "Tex3",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 2,
        date: "2.5.2025",
        title: "Tex1sdfhsdfhsdf",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 2,
        date: "19.5.2023",
        title: "Tex1",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 1,
        date: "6.8.2028",
        title: "Tex3",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 1,
        date: "2.5.2025",
        title: "Tex1sdfhsdfhsdf",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 2,
        date: "19.5.2023",
        title: "Tex1",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        urgent: 3,
        date: "6.8.2028",
        title: "Tex3",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent id justo in neque elementum ultrices. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aenean vel massa quis mauris vehicula lacinia. Donec vitae arcu. Et harum quidem rerum facilis est et expedita distinctio. Nulla non arcu lacinia neque faucibus fringilla. Duis pulvinar. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quisque porta. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ];

    return { testNotes };
  },
};
</script>

<style scoped>
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
