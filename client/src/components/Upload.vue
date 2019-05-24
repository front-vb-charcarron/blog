<template>
  <div class="upload clearfix">
    <div class="img-upload" ref="upload">
      <div class="before-upload" v-if="!isDisplayed">
        <i class="el-icon-plus"></i>
        <input type="file" @change="handleImage">
      </div>
      <div class="after-upload" v-else>
        <div class="upload-mask">
          <i class="el-icon-delete" @click="handleRemove"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

let uploadImage = {};

export default {
  data() {
    return {
      isDisplayed: false
    };
  },
  methods: {
    handleImage(e) {
      const reader = new FileReader();
      const self = this;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        self.$nextTick(() => {
          let img = new Image();
          uploadImage = img;
          img.src = reader.result;
          this.$emit("imageResource", uploadImage.src);
          this.$refs.upload.appendChild(img);
          this.isDisplayed ^= true;
        });
      };
    },
    handleRemove() {
      uploadImage.remove();
      this.isDisplayed ^= true;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/index.scss";
@mixin icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  z-index: -1;
}

.upload {
  .img-upload {
    min-width: 148px;
    max-width: 100%;
    min-height: 148px;
    float: left;
    display: inline-block;
    border: 1px dashed #c0ccda;
    position: relative;
  }

  .pd {
    padding: 74px;
  }
}

.before-upload {
  & > input[type="file"] {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  & > input[type="file"]:hover {
    cursor: pointer;
  }

  & > .el-icon-plus {
    @include icon;
  }
}

.img-upload:hover {
  border: 1px dashed $theme-color1;
  cursor: pointer;

  & .el-icon-plus {
    color: $theme-color1;
  }

  & .after-upload .upload-mask {
    display: block;
  }
}

.after-upload {
  .upload-mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    display: none;
  }

  .el-icon-delete {
    @include icon;
    color: white;
  }

  & > img {
    width: 100%;
    height: auto;
    border: 0;
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
