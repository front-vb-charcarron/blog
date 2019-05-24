<template>
  <aside
    class="side-bar"
    :class="{
      'mobile': !isDesktop , 
      'desktop': isDesktop ,
      'slide-in': isHide
    }"
  >
    <el-menu
      :router="true"
      :collapse="isCollapse"
      :default-active="routeDetail.path"
      :unique-opened="true"
      v-menu
    >
      <template v-for="(route) in navRoutes">
        <el-submenu :index="route.path" :key="route.path" v-if="route.children">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span slot="title">{{ route.meta.name }}</span>
          </template>
          <el-menu-item
            :index="subRoute.path"
            v-for="(subRoute) in route.children"
            :key="subRoute.path"
            @click="collapse"
          >{{ subRoute.meta.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="route.path" :key="route.path" @click="collapse" v-else>
          <i :class="route.meta.icon"></i>
          <span slot="title">{{ route.meta.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>
<script>
import resize from "./resize";
import { mapGetters } from "vuex";
import "@/styles/index.scss";

export default {
  mixins: [resize],
  computed: {
    navRoutes() {
      return this.$router.options.routes[1].children;
    },
    ...mapGetters(["isDesktop", "isCollapse", "isHide", "routeDetail"])
  },
  directives: {
    menu: {
      // 解决 el-menu 缩小的卡顿。
      bind(el) {
        el.style.transition = "all 0s";
      }
    }
  },
  methods: {
    collapse() {
      console.log("collapse");
      this.$store.dispatch("toggleHide", false);
    }
  }
};
</script>
<style lang="scss">
.side-bar {
  height: 100%;
}

.desktop {
  height: 100%;
  position: relative;
}

.mobile {
  height: 100%;
  position: absolute;
  z-index: 131;
  transform: translateX(-100%);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in {
  transform: translateX(0%);
}
</style>
