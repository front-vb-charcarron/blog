<template>
  <div class="cloud" :class="'cloud-' + type" :style="style">
    <img :src="cloudSvg" @load="initPosition">
  </div>
</template>
<script>
import TWEEN from "@/utils/Tween";
export default {
  data() {
    return {
      cloudAnimationDurations: {
        min: 10000,
        max: 50000
      },
      style: {
        transform: "none",
        zIndex: 0
      }
    };
  },
  props: ["type"],
  computed: {
    cloudSvg() {
      return require("@/assets/game/cloud" + this.type + ".svg");
    }
  },
  mounted() {
    // 以负值延迟开始动画
    // 动画在中途开始
    this.startAnimation(-Math.random() * this.cloudAnimationDurations.min);
  },
  methods: {
    initPosition() {
      const width = this.$el.clientWidth;
      this.setPosition(-width, 0);
    },
    setPosition(left, top) {
      this.style.transform = `translate(${left}px, ${top}px)`;
    },
    startAnimation(delay = 0) {
      // 获取元素高度
      const width = this.$el.clientWidth;
      const { max, min } = this.cloudAnimationDurations;
      // 时长
      const animationDurations = Math.random() * (max - min) + min;
      // 越快层级越高
      this.style.zIndex = Math.round(max - animationDurations);
      // 高度随机
      const top = Math.random() * (window.innerHeight * 0.3);

      const vm = this;

      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerWidth }, animationDurations)
        .delay(delay)
        .onUpdate(function() {
          vm.setPosition(this.value, top);
        })
        .onComplete(() => {
          // 随机延迟
          this.startAnimation(Math.random() * 10000);
        })
        .start();
    }
  }
};
</script>
<style>
.cloud {
  position: absolute;
}
</style>
