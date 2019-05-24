<template>
  <div class="base-input">
      <input type="text" 
      @focus="handleFocus" 
      @blur="handleBlur"
      @input="handleInput"
      :placeholder="placeholder">
      <div class="line" :class="{ 'input-focus': isFocus }"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: "",
      isFocus: false
    };
  },
  props: ['placeholder'],
  methods: {
    handleFocus() {
      return (this.isFocus = true);
    },
    handleBlur() {
      return (this.isFocus = false);
    },
    handleInput(e) {
      this.$emit('handleInput', e.target.value);
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/index.scss";

.base-input {
  width: 100%;
  overflow: hidden;
  position: relative;

  & label {
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 100%;
    display: block;
  }

  & input {
    border: 0;
    border-bottom: 1px solid $theme-color2;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: $theme-color3;
  }

  & input:focus {
    outline: none;
    caret-color: $theme-color1;
  }

  & ::-webkit-input-placeholder {
    font-size: 16px;
    color: $theme-color2;
  }

  & input:focus {
    &::-webkit-input-placeholder {
      color: $theme-color1;
    }
  }

  & .line {
    width: 100%;
    height: 3px;
    background: $theme-color1;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scale(0);
    transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .input-focus {
    transform: scale(1);
  }
}
</style>
