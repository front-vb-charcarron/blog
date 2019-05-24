<template>
  <div class="overlay" @click="handleClick">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      console.log('overlay click');
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss">
.overlay {
  z-index: 51;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-align: center;

  .big {
    font-size: 72px;
  }

  .card {
    margin: 32px auto 0;
    pointer-events: none;
  }
}
</style>

