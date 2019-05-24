<template>
  <div class="header">
    <el-header
      :class="['index-header', 'flex', { 'hearder-zIndex': $store.getters.isDesktop }]"
      @hook:created="elHeaderCreated"
      @hook:updated="elHeaderUpdated"
    >
      <div class="head-portrait">
        <img src="@/assets/logo.png">
      </div>

      <Hamburger/>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(route, index) in breadcrumbInfos.matched"
          :to="{ path: route.path }"
          :key="index"
        >{{ route.meta.name }}
      
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
  </div>
</template>
<script>
import Hamburger from "@/components/sidebar/Hamburger.vue";
export default {
  components: {
    Hamburger
  },
  computed: {
    breadcrumbInfos() {
      return this.$store.getters.routeDetail;
    }
  },
  methods: {
    elHeaderUpdated() {
      console.log("el-header updated!");
    },
    elHeaderCreated() {
      console.log("el-header created!");
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/index.scss';

.header {
  position: relative;

  .index-header {
    width: 100%;
    box-shadow: 1px 1px 8px #ccc;
    padding-top: 20px;
    position: relative;
  }

  .flex {
    display: flex;
  }

  .hearder-zIndex {
    z-index: 120;
  }

  .head-portrait {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-top: -15px;
    margin-left: -10px;
    margin-right: 20px;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(1, 0.5, 0.8, 1);

    img {
      width: 100%;
      height: 100%;
      transform: scale(0.7);
      transition: transform 0.4s cubic-bezier(1, 0.5, 0.8, 1);
      cursor: pointer;
    }

    img:hover {
      transform: scale(1);
    }
  }

  .head-portrait:hover {
    box-shadow: 1px 1px 3px #ccc;
  }
}
</style>

