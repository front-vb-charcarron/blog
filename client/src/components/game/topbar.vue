<template>
  <div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name }}</div>
    <div class="turn-counter">
      <img class="arrow" src="@/assets/game/turn.svg">
      <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name }}</div>
  </div>
</template>
<script>
export default {
    props: ['players', 'currentPlayerIndex', 'turn']
};
</script>
<style lang="scss">
@import '@/styles/game.scss';
@mixin h-box {
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    flex: auto 0 0;
  }
}
.top-bar {
  background: $primary;
  color: white;
  font-size: 42px;
  @include h-box;
  padding: 12px;
  position: relative;
  z-index: 100;
  font-family: 'Signika Negative',sans-serif;

  .player {
    flex: 100% 1 1;
    text-align: center;
    transition: all 0.3s;
  }

  .turn-counter {
    position: relative;
    width: 250px;

    .arrow {
      max-width: 250px;
      top: -72px;
      left: 50%;
      margin-left: -125px;
      position: absolute;
      transition: transform 1.5s $ease-in-out;
    }

    .turn {
      color: $primary;
      text-align: center;
      position: relative;
      z-index: 1;
    }
  }

  &.player-0 {
    .turn-counter {
      .arrow {
        transform: rotate(180deg);
      }
    }

    .player.p1 {
      opacity: 0.75;
      transform: scale(0.9);
    }
  }

  &.player-1 {
    .player.p0 {
      opacity: 0.75;
      transform: scale(0.9);
    }
  }

  @media (max-width: 1200px) {
    font-size: 32px;

    .turn-counter {
      position: relative;
      width: 200px;

      .arrow {
        max-width: 200px;
        top: -58px;
      }
    }
  }
}
</style>

