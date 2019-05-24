<template>
  <button :style="btnStyle" :class="activedClass" @click="$emit('handle')">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    btnStyle: {
      type: Object,
      required: true
    },
    activedClass: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  appearance: none;
  outline: none;
  border: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-weight: bolder;
}
</style>

