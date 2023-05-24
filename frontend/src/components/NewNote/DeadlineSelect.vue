<template>
  <div :class="['deadline', 'ui_ElementT1']">
    <input
      v-model="day"
      type="text"
      :placeholder="curDate.getDate()"
      @focusout="checkDate()"
    >
    <input
      v-model="month"
      type="text"
      :placeholder="curDate.getMonth() + 1"
      @focusout="checkDate()"
    >
    <input
      v-model="year"
      type="text"
      :placeholder="curDate.getFullYear()"
      @focusout="checkDate()"
    >
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const curDate = new Date();
    const day = ref();
    const month = ref();
    const year = ref();

    const checkDate = () => {
      const chk1 = checkYear();
      const chk2 = checkMonth();
      const chk3 = checkDay();
      emit("update:modelValue", `${day.value}.${month.value}.${year.value}`);
    };

    const checkDay = () => {
      if (isNaN(day.value)) {
        day.value = curDate.getDate();
        return false;
      }
      const daysInMonth = new Date(year.value, month.value, 0).getDate();
      if (day.value < 1 || day.value > daysInMonth) {
        day.value = curDate.getDate();
        return false;
      }
      return true;
    };

    const checkMonth = () => {
      if (isNaN(month.value)) {
        month.value = curDate.getMonth() + 1;
        return false;
      }
      if (month.value < 1 || month.value > 12) {
        month.value = curDate.getMonth() + 1;
        return false;
      }
      return true;
    };

    const checkYear = () => {
      if (isNaN(year.value)) {
        year.value = curDate.getFullYear();
        return false;
      }
      if (year.value < curDate.getFullYear()) {
        year.value = curDate.getFullYear();
        return false;
      }
      return true;
    };

    checkDate();
    return {
      curDate,
      checkDate,
      day,
      month,
      year,
    };
  },
};
</script>

<style scoped>
.deadline {
  height: 35px;
  width: 100%;
  font-weight: 500;
  background-color: white;
  display: flex;
}

input {
  border-radius: 0px;
  border-width: 0px;
  background-color: transparent;
  border: none;
  width: 100%;
  text-align: center;
}

input[type="text"]:focus {
  outline: none;
}
</style>
