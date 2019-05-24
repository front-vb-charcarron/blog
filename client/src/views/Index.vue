<template>
  <div class="index-container">
    <section class="inner">
      <transition name="fade">
        <Sidebar/>
      </transition>
      <div class="main">
        <HeaderBar class="headerbar" :class="{ 'header-hidden': isHidden }"/>
        <div class="container" @scroll="handleScrolling($event)" :class="{ 'top-0': isHidden }">
          <transition name="fade" mode="in-out">
            <router-view/>
          </transition>
        </div>
      </div>
    </section>
    <transition name="mask-effect">
      <div class="mask" v-if="isDesktop ? !isDesktop : isHide" @click="handleMask"></div>
    </transition>
  </div>
</template>
<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Mouse from "@/components/Mouse.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { mapGetters } from "vuex";
import "@/iconfont/iconfont.css";
import "@/styles/transition.css";

let lastScrollingVal = 0;

export default {
  data() {
    return {
      title: "",
      isHidden: false
    };
  },
  components: {
    Sidebar,
    HeaderBar
  },
  computed: {
    ...mapGetters(["isDesktop", "isHide"])
  },
  methods: {
    handleMask() {
      this.$store.dispatch("toggleHide", false);
    },
    handleScrolling(e) {
      const isOver =  ((e.target.scrollTop - lastScrollingVal) > 0);
      this.isHidden = isOver ? 1 : 0;
      lastScrollingVal = e.target.scrollTop;
    }
  }
};
</script>

<style lang="scss">
.index-container {
  height: 100%;

  .inner {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .headerbar {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .header-hidden {
    transform: translateY(-100%);
  }

  .main .top-0 {
    top: 0;
  }

  .main {
    width: 100%;
    position: relative;
  }

  .container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 60px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0;
    margin: 0;
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    z-index: 10;
  }
  
  & .iconfont {
    padding: 0 5px 0 0;
    float: left;
  }

  & .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
  }

  .mask-effect-enter-active {
    transition: opacity 0.3s ease;
  }
  .mask-effect-leave-active {
    transition: opacity 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
}
</style>

