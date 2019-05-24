<template>
  <div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
    <img :src="bubbleSvg">
    <div class="counter">{{ value }}</div>
  </div>
</template>
<script>
import { getWorldRatio } from "@/utils/gameUtils";
export default {
  props: ["type", "value", "ratio"],
  computed: {
    bubbleSvg() {
      return require("@/assets/game/" + this.type + "-bubble.svg");
    },
    bubbleStyle() {
      return {
        top: (this.ratio * 220 + 40) * getWorldRatio() + "px"
      };
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/game.scss";
.stat-bubble {
  color: white;
  text-align: center;
  position: absolute;
  z-index: 10;
  font-size: 42px;
  display: block;
  width: 60px;
  height: 60px;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

  img {
    position: absolute;
    top: -46px;
    z-index: -1;
  }

  div {
    position: relative;
    top: -42px;
  }

  @media (max-width: 1200px) {
    transform: scale(0.7);
  }

  @media (max-width: 950px) {
    transform: scale(0.5);
  }
}

$position: calc(-70px - 30 * #{$world-ratio});

.food-bubble {
  left: $position;
  transform-origin: right top;

  img {
    left: 0;
  }
}

.health-bubble {
  right: $position;
  transform-origin: left top;

  img {
    right: 0;
  }
}
</style>

