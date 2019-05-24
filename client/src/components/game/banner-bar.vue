<template>
  <svg viewBox="0 0 20 260">
    <path :d="`m 0,0 20,0 0,${ height } -10,-10 -10,10 z`" :style="`fill:${ color };stroke:none;`"></path>
  </svg>
</template>
<script>
import TWEEN from "@/utils/Tween";

export default {
  data() {
    return {
      height: 0
    };
  },
  props: ["color", "ratio"],
  created() {
    this.height = this.targetHeight;
  },
  computed: {
    targetHeight() {
      return 220 * this.ratio + 40;
    }
  },
  watch: {
    targetHeight(newValue, oldValue) {
      const self = this;
      new TWEEN.Tween({ value: oldValue })
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ value: newValue }, 500)
        .onUpdate(function() {
          self.height = this.value.toFixed(0);
        })
        .start();
    }
  }
};
</script>
<style>
</style>
