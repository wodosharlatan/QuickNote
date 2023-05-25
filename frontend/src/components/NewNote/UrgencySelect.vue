<template>
  <div
    :class="['urgency', 'ui_ElementT1', 'urgnt' + urgency]"
    @click="changeUrgency()"
    name="UrgencyButton"
  >
    <p>
      {{ urgencyText(urgency) }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const urgencyText = (id) => {
      const urgency = ["Minor task", "Crucial task", "Top-priority task !"];
      return urgency[id - 1];
    };

    const urgency = ref(0);

    const changeUrgency = () => {
      // 1-3 limit
      if (urgency.value > 2) urgency.value = 0;
      urgency.value++;
      emit("update:modelValue", urgency.value);
    };

    changeUrgency();
    return {
      urgency,
      urgencyText,
      changeUrgency,
    };
  },
};
</script>

<style scoped>
.urgency {
  height: 35px;
  width: 100%;
  font-weight: 500;
  padding-top: calc(35px / 2);
}

.urgency p {
  text-align: center;
  color: white;
  line-height: 0;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
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
