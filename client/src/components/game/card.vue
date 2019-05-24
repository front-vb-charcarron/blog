<template>
  <div class="card" :class="'type-' + def.type" @click="play">
    <div class="title">{{ def.title }}</div>
    <img class="separator" src="@/assets/game/card-separator.svg">
    <div class="description">
      <div v-html="def.description"></div>
    </div>
    <div class="note">
      <div v-html="def.note"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["def"],
  methods: {
    play() {
      this.$emit("play");
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/game.scss";

.card {
  width: 200px;
  height: 260px;
  background: grey;
  color: white;
  padding: 12px;
  box-sizing: border-box;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  cursor: pointer;
  position: relative;
  top: 0;
  margin: 0 6px;
  transition: all .3s;

  .title,
  .separator {
    flex: auto 0 0;
  }

  .title {
    font-size: 22px;
    margin-bottom: 12px;
  }

  .separator {
    width: 155px;
    height: 13px;
    margin: auto;
  }

  .description {
    flex: auto 1 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;

    span {
      display: inline-block;
    }

    .keyword {
      img {
        opacity: 0.75;
        margin-left: -2px;
        width: 14px;
        height: 21px;
        vertical-align: sub;
      }
    }
  }

  .note {
    // color: fade(white, 80%);
    font-size: 16px;
    font-style: italic;
  }

  &:hover {
    top: -20px;
  }

  &.type-attack {
    background: $card-attack;

    &:hover {
      background: #c62323;
    }
  }

  &.type-special {
    background: $card-special;

    &:hover {
      background: #9623c6;
    }
  }

  &.type-support {
    background: $card-support;

    &:hover {
      background: #238dc6;
    }
  }
}
</style>                                               
