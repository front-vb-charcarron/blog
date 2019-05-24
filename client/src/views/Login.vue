<template>
  <div class="login-container">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="login">
      <el-row :gutter="10">
        <el-col :xs="20" :sm="10" :md="10" :lg="10" :offset="offset">
          <h3>account:{{account | accountFilter}}</h3>
          <el-input
            v-model="account"
            placeholder="please enter account"
            v-input-theme
            size="medium"
          ></el-input>
          <h3>password:{{password | passwordFilter}}</h3>
          <el-input
            v-model="password"
            placeholder="please enter password"
            v-input-theme
            size="medium"
            :type="typeSwitch"
          >
            <i
              class="iconfont icon-yanjing-copy eye"
              slot="suffix"
              @mousedown="handleIconDown"
              @mouseup="handleIconUp"
            ></i>
          </el-input>
          <BaseButton
            :btnStyle="loginBtnStyle"
            :activedClass="loginActivedClass"
            @handle="handleLogin"
          >Login</BaseButton>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { isMobile } from "@/utils/isMobile";
import BaseButton from "@/components/BaseButton.vue";
export default {
  data() {
    return {
      account: "",
      password: "",
      redirect: "",
      typeSwitch: "password",
      offset: 7,
      loginBtnStyle: {
        width: "100px",
        height: "40px",
        background: "#3e5368",
        borderRadius: "2px",
        color: "#42b983",
        lineHeight: "40px",
        float: "right",
        cursor: "pointer"
      },
      loginActivedClass: "login-btn"
    };
  },
  components: {
    BaseButton
  },
  beforeMount() {
    if (isMobile()) {
      this.offset = 2;
    }
  },
  directives: {
    "input-theme": {
      bind(el) {
        el.querySelector("input").style.background = "#3e5368";
        el.querySelector("input").style.color = "#4ac08e";
      }
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
        console.log(route);
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      if (!this.account || !this.password) return;
      this.$store
        .dispatch("requestToken", {
          name: this.account.trim().replace(/\b/g, ""),
          password: this.password.trim().replace(/\b/g, "")
        })
        .then(() => {
          console.log("JUMP", this.redirect);
          this.$router.replace(this.redirect);
        });
    },
    handleIconDown() {
      this.typeSwitch = "text";
    },
    handleIconUp() {
      this.typeSwitch = "password";
    }
  },
  filters: {
    accountFilter(val) {
      return val.toString().toUpperCase();
    },
    passwordFilter(val) {
      return val.replace(/\d|\w/g, "*");
    }
  }
};
</script>
<style lang="scss">
.login {
  width: 100%;

  .login-btn:active {
    background: #42b983 !important;
    color: #3e5368 !important;
  }

  h3 {
    text-transform: uppercase;
    text-align: left;
  }

  input::-webkit-input-placeholder {
    color: #42b983;
  }

  input:focus {
    border-color: #42b983;
    border-width: 2px;
  }

  .eye {
    line-height: 36px;
    cursor: pointer;
  }
}
</style>



