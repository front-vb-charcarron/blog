<template>
  <div class="player-result" :class="result">
    <span class="name">{{ player.name }}</span> is
    <span class="result">{{ result }}</span>
  </div>
</template>
<script>
export default {
  props: ["player"],
  computed: {
    result() {
      return this.player.dead ? "defeated" : "victorious";
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/game.scss';
.player-result {
  margin: 42px 0;
  padding: 32px;
//   background: fade(white, 75%);

  &.victorious {
    span {
      color: $victorious;
    }
  }

  &.defeated {
    span {
      color: $defeated;
    }
  }
}
</style>

