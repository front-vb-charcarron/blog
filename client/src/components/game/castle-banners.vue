<template>
  <div class="banners">
    <!-- Food -->
    <img class="food-icon" src="@/assets/game/food-icon.svg">
    <bubble type="food" :value="player.food" :ratio="foodRatio"/>
    <banner-bar class="food-bar" color="#288339" :ratio="foodRatio" />
    <!-- Health -->
    <img class="health-icon" src="@/assets/game/health-icon.svg">
    <bubble type="health" :value="player.health" :ratio="healthRatio"/>
    <banner-bar class="health-bar" color="#9b2e2e" :ratio="healthRatio"/>
  </div>
</template>
<script>
import bubble from "./bubble.vue";
import bannerBar from './banner-bar.vue';
import { maxHealth, maxFood } from '@/utils/gameUtils';
export default {
  components: {
    bubble,
    'banner-bar': bannerBar
  },
  props: ["player"],
  computed: {
    foodRatio() {
      return this.player.food / maxFood;
    },
    healthRatio() {
      return this.player.health / maxHealth;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/game.scss';
.banners {
  position: absolute;
  width: 65 * $world-ratio;
  height: 260 * $world-ratio;
  left: 100 * $world-ratio;
  bottom: 390 * $world-ratio;

  > * {
    position: absolute;
    top: 0;
  }

  .food-icon,
  .health-icon {
    z-index: 2;
    max-width: 30 * $world-ratio;
    min-width: 30 * $world-ratio;
    left: 0;
  }

  .health-icon {
    left: 35 * $world-ratio;
  }

  .food-bar,
  .health-bar {
    max-width: 20 * $world-ratio;
    min-width: 20 * $world-ratio;
    margin-left: 5 * $world-ratio;
    left: 0;
  }

  .health-bar {
    left: 35 * $world-ratio;
  }
}
</style>
