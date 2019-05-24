<template>
  <div class="card-game" :class="cssClass">
    <topbar :players="players" :current-player-index="currentPlayerIndex" :turn="turn"/>
    <div class="world">
      <castle v-for="(player, index) in players" :player="player" :index="index" :key="index"></castle>
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" :key="index"/>
      </div>
    </div>
    <transition name="hand">
      <hand
        :cards="currentHand"
        v-if="!activeOverlay"
        @card-play="playCard"
        @card-leave-end="applyCard"
      />
    </transition>
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay"></div>
    </transition>
    <transition name="zoom">
      <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
        <component
          :is="'overlay-content-' +  activeOverlay "
          :player="currentPlayer"
          :players="players"
          :opponent="currentOpponent"
        ></component>
      </overlay>
    </transition>
  </div>
</template>
<script>
import topbar from "@/components/game/topbar.vue";
import hand from "@/components/game/hand.vue";
import overlay from "@/components/game/overlay.vue";
import gameOver from "@/components/game/overlay-game-over.vue";
import lastPlay from "@/components/game/overlay-last-play.vue";
import playerTurn from "@/components/game/overlay-player-turn.vue";
import castle from "@/components/game/castle.vue";
import cloud from "@/components/game/cloud.vue";

import "@/styles/transition.css";
import TWEEN from "@/utils/Tween";

import {
  getWorldRatio,
  state,
  drawInitialHand,
  playCard,
  applyCard,
  overlayCloseHandler
} from "@/utils/gameUtils";

export default {
  data() {
    return state;
  },
  components: {
    topbar,
    hand,
    overlay,
    "overlay-content-game-over": gameOver,
    "overlay-content-last-play": lastPlay,
    "overlay-content-player-turn": playerTurn,
    castle,
    cloud
  },
  computed: {
    cssClass() {
      return this.canPlay;
    }
  },
  created() {
    this.players.forEach(drawInitialHand);
  },
  beforeMount() {
    const self = this;
    window.addEventListener("resize", function() {
      self.worldRatio = getWorldRatio();
    });
  },
  mounted() {
    this.activeOverlay = "player-turn";
    // Tween.js 旗帜动画
    requestAnimationFrame(animate);
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
  },
  methods: {
    playCard,
    applyCard,
    handleOverlayClose() {
      overlayCloseHandler[this.activeOverlay]();
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/game.scss";
.card-game {
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: "Signika Negative", sans-serif;
  background: $bg;
  font-size: 22px;
  user-select: none;

  .overlay-background,
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .overlay-background {
    background: rgba(255, 255, 255, 0.7);
    z-index: 50;
  }

  .world {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .clouds {
    position: relative;
    z-index: 5;
  }

  &.can-play {
    .hand {
      pointer-events: all;
    }
  }
}
</style>

