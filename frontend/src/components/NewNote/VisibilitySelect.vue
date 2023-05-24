<template>
  <div :class="['visibility', 'ui_ElementT1']" @click="changeVisibility()">
    <p>
      {{ visibilityText() }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props,{ emit }) {
    const visibility = ref(true);
    const visibilityText = () => {
      if (visibility.value) return "Public 👁";
      return "Private";
    };

    const changeVisibility = () => {
      visibility.value = !visibility.value;
      emit('update:modelValue',visibility.value);
    };
    emit('update:modelValue',visibility.value);
    return {
      visibilityText,
      changeVisibility,
    };
  },
};
</script>

<style scoped>
.visibility {
  height: 35px;
  width: 100%;
  font-weight: 500;
  padding-top: calc(35px / 2);
}

.visibility p {
  text-align: center;
  color: white;
  line-height: 0;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
