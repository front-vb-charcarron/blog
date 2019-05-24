<template>
  <div class="hand">
    <div class="wrapper">
        <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
          <card v-for="card of cards" :def="card.def" :key="card.uid" @play="handlePlay(card)"/>
        </transition-group>
    </div>
  </div>
</template>
<script>
import card from "@/components/game/card.vue";
export default {
  props: ["cards"],
  components: {
    card
  },
  methods: {
    handlePlay(card) {
      this.$emit('card-play', card);
    },
    handleLeaveTransitionEnd() {
      this.$emit('card-leave-end');
    }
  }
};
</script>
<style lang="scss">
.hand {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding: 12px 0;
  background: fade(black, 70%);
  background: linear-gradient(to bottom,  transparent 0%, fade(white, 40%) 100%);
  perspective: 1000px;
  // pointer-events: none;

  .cards {
    @media (max-width: 1200px) {
      transform: scale(.7);
      height: 208px;
    }
  }
}

.can-play {
  .hand {
    pointer-events: all;
  }
}

</style>
