<template>
  <div class="notebook">
    <aside class="side-bar">
      <button class="add" @click="addNote" :title="addButtonTitle">
        <span class="material-icons iconfont icon-jiahao"></span>
        <span>Add note</span>
      </button>
      <div class="notes">
        <template v-for="note in sortedNotes">
          <div
            :class="['note', {'selected':note === selectedNote} ]"
            @click="selectNote(note)"
            :key="note.id"
          >
            {{ note.title }}
            <span v-if="note.favorite" class="iconfont icon-shoucang-tianchong"></span>
          </div>
        </template>
      </div>
    </aside>
    <template v-if="selectedNote">
      <section class="main">
        <div class="toolbar">
          <input v-model="selectedNote.title" placeholder="Note title">
          <button @click="removeNote" title="Remove note">
            <span class="material-icons iconfont icon-lajitong"></span>
          </button>
          <button @click="favoriteNote" title="Favorite note">
            <span
              :class="[ 'material-icons', 
                        'iconfont', 
                        selectedNote.favorite ? 'icon-shoucang-tianchong' : 'icon-shoucang' ]"
            ></span>
          </button>
        </div>
        <textarea v-model="selectedNote.content"></textarea>
        <template v-if="isDesktop">
          <div class="toolbar status-bar">
            <span class="date">
              <span class="label">Created</span>
              <span class="value">{{ selectedNote.created | date }}</span>
            </span>
            <span class="lines">
              <span class="label">Lines</span>
              <span class="value">{{ linesCount }}</span>
            </span>
            <span class="words">
              <span class="label">Words</span>
              <span class="value">{{ wordsCount }}</span>
            </span>
            <span class="charactors">
              <span class="label">Charactors</span>
              <span class="value">{{ charactorsCount }}</span>
            </span>
          </div>
        </template>
      </section>
      <aside class="preview" v-html="notePreview"></aside>
    </template>
  </div>
</template>
<script>
import marked from "marked";
import moment from "moment";
export default {
  data() {
    return {
      notes: JSON.parse(localStorage.getItem("notes")) || [],
      selectedId: localStorage.getItem("selected-id") || null
    };
  },
  created() {},
  computed: {
    notePreview() {
      return this.selectedNote ? marked(this.selectedNote.content) : "";
    },
    addButtonTitle() {
      return this.notes.length + " note(s) already";
    },
    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId);
    },
    sortedNotes() {
      return this.notes
        .sort((a, b) => a.created - b.created)
        .sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1));
    },
    linesCount() {
      // 行数统计
      if (this.selectedNote) {
        // 计算换行符的个数
        return this.selectedNote.content.split(/\r\n|\r|\n/).length;
      }
    },
    wordsCount() {
      // 空格统计
      if (this.selectedNote) {
        return (
          this.selectedNote.content
            // 将换行符换成空格
            .replace(/\n/g, " ")
            // 排除开头和结尾的空格符
            .replace(/(^\s*)|(\s*$)/gi)
            // 多个重复空格换成一个
            .replace(/\s+/gi, " ")
            // 返回空格数量
            .split(" ").length
        );
      }
    },
    charactorsCount() {
      // 字符统计
      if (this.selectedNote) {
        return this.selectedNote.content.split("").length;
      }
    },
    isDesktop() {
        return this.$store.getters.isDesktop;
    }
  },
  methods: {
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: "New note " + (this.notes.length + 1),
        content: "**Hi!**This notebook is using [markdown]",
        favorite: false,
        created: time
      };

      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    },
    saveNote() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    removeNote() {
      if (this.selectedNote && confirm("Delete the note ?")) {
        const index = this.notes.indexOf(this.selectedNote);
        if (index !== -1) {
          this.notes.splice(index, 1);
        }
      }
    },
    setSelectedId() {
      localStorage.setItem("selected-id", this.selectedId);
    },
    favoriteNote() {
      this.selectedNote.favorite ^= true;
    }
  },
  watch: {
    notes: {
      handler: "saveNote",
      deep: true
    },
    selectedId: "setSelectedId",
    notePreview() {
      console.log("notePreview changed!!");
    }
  },
  filters: {
    date: val => moment(val).format("DD/MM/YY, HH:mm")
  }
};
</script>
<style lang="scss" scoped>
.notebook {
  width: 100%;
  font-family: sans-serif;
  font-size: 16px;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
  padding-top: 5px;

  .iconfont {
    padding: 0;
  }

  .material-icons {
    font-size: 24px;
    vertical-align: middle;
    margin: -3px;
    padding-bottom: 1px;
  }

  .add {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;

    span {
      display: inline-block;
    }

    span:first-of-type {
      float: left;
    }
  }

  & > * {
    float: left;
    display: flex;
    flex-direction: column;
    height: 100%;

    & > * {
      flex: auto 0 0;
    }
  }

  .note {
    padding: 16px;
    cursor: pointer;
  }

  .note:hover {
    background: #ade2ca;
  }

  .note .icon {
    float: right;
  }

  button,
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    box-sizing: border-box;
    outline: none !important;
  }

  button,
  .note.selected {
    background: #40b883;
    color: white;
  }

  button {
    border-radius: 3px;
    border: none;
    display: inline-block;
    padding: 8px 12px;
    cursor: pointer;
  }

  button:hover {
    background: #63c89b;
  }

  input {
    border: solid 2px #ade2ca;
    border-radius: 3px;
    padding: 6px 10px;
    background: #f0f9f5;
    color: #666;
  }

  input:focus {
    border-color: #40b883;
    background: white;
    color: black;
  }

  button,
  input {
    min-height: 34px;
  }

  .main,
  .preview {
    width: 40%;
    height: 100%;
    box-sizing: border-box;
  }

  .main {
    padding: 12px;
  }

  .side-bar {
    background: #f8f8f8;
    width: 20%;
    max-width: 150px;
    box-sizing: border-box;
  }

  .toolbar {
    padding: 4px;
    box-sizing: border-box;

    input {
      float: left;
      max-width: 100%;
    }

    button {
      float: left;
      margin: 0 2px 0 2px;
    }
  }

  .status-bar {
    color: #777;
    white-space: nowrap;
    .label {
      color: #bbb;
    }

    span {
      float: left;
      padding: 0 2px 0 2px;
    }
  }

  textarea {
    resize: none;
    border: none;
    box-sizing: border-box;
    margin: 0 4px;
    font-family: monospace;
  }

  textarea,
  .notes,
  .preview {
    flex: auto 1 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .preview {
    padding: 12px;
    box-sizing: border-box;
    border-left: solid 4px #f8f8f8;
  }

  .preview p:first-child {
    margin-top: 0;
  }

  a {
    color: #40b883;
  }

  h1,
  h2,
  h3 {
    margin: 10px 0 4px;
    color: #40b883;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.2em;
  }

  h4 {
    font-size: 1.1em;
    font-weight: normal;
  }
}
</style>

