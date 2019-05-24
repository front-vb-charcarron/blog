<template>
  <div class="article-editor">
    <el-row class="mg-l-15" :gutter="10">
      <el-col :span="6">
        <BaseInput placeholder="Title" @handleInput="setTitle"/>
      </el-col>
      <el-col :span="6">
        <BaseInput placeholder="Description" @handleInput="setDescription"/>
      </el-col>
    </el-row>
    <Upload class="mg-l-15 mg-t-15" @imageResource="getImageUrl"/>
    <mavon-editor :value="value" class="article-editor" @save="save" :toolbars="markdownOption"/>
    <div class="clearfix">
      <BaseButton :btnStyle="submitStyle" class="submit-btn" @handle="submit">Submit</BaseButton>
    </div>
  </div>
</template>
<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import Upload from "@/components/Upload.vue";

export default {
  data() {
    return {
      value: "start edit !",
      article: {},
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      submitStyle: {
        width: "100px",
        height: "40px",
        background: "#3e5368",
        borderRadius: "2px",
        color: "#42b983",
        lineHeight: "40px",
        float: "right",
        cursor: "pointer",
        marginRight: '10px',
        marginBottom: '10px'
      },
      submitActivedClass: 'submit-btn'
    };
  },
  components: {
    BaseInput,
    BaseButton,
    Upload
  },
  methods: {
    save(value, render) {
      this.article.render = render;
    },
    setTitle(title) {
      this.article.title = title;
    },
    setDescription(description) {
      this.article.description = description;
    },
    getImageUrl(base64Image) {
      this.article.banner = base64Image;
    },
    addArticle() {
      this.$store.dispatch("addArticle", this.article);
    },
    submit() {
      console.log('submit!!!');
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/index.scss";

.article-editor {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;

  & .v-note-wrapper {
    width: 100%;
    height: calc(100% - 15px);
  }

  & .v-note-wrapper .v-note-op.shadow,
  & .v-note-wrapper .v-note-panel.shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  .v-note-wrapper .v-note-op .v-left-item .op-icon:hover,
  .v-note-wrapper .v-note-op .v-right-item .op-icon:hover {
    color: $theme-color1;
  }

  .mg-l-15 {
    margin-left: 15px !important;
  }

  .mg-t-15 {
    margin-top: 15px;
  }

  .submit-btn:active {
    background: #42b983 !important;
    color: #3e5368 !important;
  }
}
</style>

