<template>
  <div class="castle" :class="'player-' + index">
      <img class="building" :src="building"/>
      <img class="ground" :src="ground"/>
      <castle-banners :player="player" />
  </div>
</template>
<script>
import castleBanners from './castle-banners.vue';
export default {
  components: {
    'castle-banners': castleBanners
  },
  props: ['player', 'index'],
  computed: {
    building() {
      return require('@/assets/game/castle' + this.index + '.svg');
    },
    ground() {
      return require('@/assets/game/ground' + this.index + '.svg' ); 
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/game.scss';
.castle {
  position: absolute;
  width: 760 * $world-ratio;
  height: 890 * $world-ratio;
  margin: 0 50 * $world-ratio;
  z-index: 10;
  top: 10vh;

  .building {
    max-width: 610 * $world-ratio;
    min-width: 610 * $world-ratio;
    position: absolute;
    bottom: 285 * $world-ratio;
    left: 75 * $world-ratio;
  }

  .ground {
    max-width: 760 * $world-ratio;
    min-width: 760 * $world-ratio;
    position: absolute;
    left: 0;
  }

  &.player-0 {
    left: 0;

    .ground {
      bottom: -39 * $world-ratio;
    }
  }

  &.player-1 {
    right: 0;

    .ground {
      bottom: -70 * $world-ratio;
    }

    .banners {
      left: auto;
      right: 100 * $world-ratio;
    }
  }
}
</style>