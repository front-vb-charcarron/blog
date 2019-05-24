<template>
  <div class="hamburger">
    <transition>
      <div class="nav-btn iconfont icon-daohang"
        :class="{ 'nav-btn-animation': isAnimated }"
        @click="sidebarHandler"
      ></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    isAnimated() {
      return this.isCollapse;
    }
  },
  methods: {
    sidebarHandler() {
      // 不同平台 sidebar 显隐不同
      if (this.$store.getters.isDesktop) {
        this.$store.dispatch("toggleCollapse",(this.isCollapse = !this.isCollapse));
      } else {
        this.$store.dispatch("toggleHide", !this.$store.getters.isHide);
      }
    }
  }
};
</script>
<style lang="scss">
.hamburger {
  .nav-btn-animation {
    transform: rotateZ(90deg);
    margin-top: 2px;
  }

  & > .nav-btn {
    width: 16px;
    height: 16px;
    margin-right: 20px;
    transform-origin: center center;
  }

  & > .nav-btn:hover {
    color: #42b983;
    cursor: pointer;
  }
}
</style>


