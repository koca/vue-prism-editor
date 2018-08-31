<template>
  <div class="prism-editor-wrapper">
    <div class="prism-editor__content-wrapper">
      <div class="prism-editor__line-numbers-wrapper" v-if="showLineNumbers">
        <code class="prism-editor__line-numbers">
          <span v-for="line in lineNumbers" :key="line">{{line}}</span>
        </code>
      </div>
      <div :class="{['language-'+language]: true}" class="prism-editor__code-wrapper">
        <pre
          class="prism-editor__code"
          ref="pre"
          v-html="content"
          :contenteditable="readOnly"
          @keydown="handleKeyDown"
          @keyup="handleKeyUp"
          @click="handleClick"
          spellCheck="false"
          >
          </pre>
        </div>
    </div>
  </div>
</template>

<script>
import prism from "../utils/prism";
import escapeHtml from "escape-html";
import normalizeHtml from "../utils/normalizeHtml.js";
import htmlToPlain from "../utils/htmlToPlain.js";
import selectionRange from "../utils/selection-range.js";
import { getIndent, getDeindentLevel } from "../utils/getIndent";
export default {
  props: {
    emitEvents: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: "js"
    },
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      undoStack: [],
      selection: undefined,
      undoOffset: 0,
      undoTimestamp: 0,
      lastPos: 0,
      codeData: ""
    };
  },
  watch: {
    code: {
      immediate: true,
      handler(newVal) {
        this.codeData = newVal;
      }
    }
  },
  computed: {
    content() {
      return prism(this.codeData, this.language);
    },
    lineNumbers() {
      let totalLines = this.codeData.split(/\r\n|\n/).length;
      // ignore last line break (os spesific etc.)
      if (this.codeData.endsWith("\n")) {
        totalLines--;
      }
      return totalLines;
    }
  },
  updated() {
    if (this.selection) {
      selectionRange(this.$refs.pre, this.selection);
    }
  },
  mounted() {
    this.recordChange(this.getPlain());

    this.undoTimestamp = 0; // Reset timestamp

    const stopPasting = e => {
      e.preventDefault();
      // get text representation of clipboard
      var text = e.clipboardData.getData("Text");

      // insert text manually
      document.execCommand("insertHTML", false, escapeHtml(text));

      this.codeData = this.getPlain();
    };

    document
      .querySelector("pre[contenteditable]")
      .addEventListener("paste", stopPasting);

    ///
  },

  methods: {
    handleClick(evt) {
      if (this.emitEvents) {
        this.$emit("click", evt);
      }
      this.undoTimestamp = 0; // Reset timestamp
      this.selection = selectionRange(this.$refs.pre);
    },

    getPlain() {
      if (this._innerHTML === this.$refs.pre.innerHTML) {
        return this._plain;
      }
      const plain = htmlToPlain(normalizeHtml(this.$refs.pre.innerHTML));
      this._innerHTML = this.$refs.pre.innerHTML;
      this._plain = plain;

      return this._plain;
    },
    recordChange(plain, selection) {
      if (plain === this.undoStack[this.undoStack.length - 1]) {
        return;
      }

      if (this.undoOffset > 0) {
        this.undoStack = this.undoStack.slice(0, -this.undoOffset);
        this.undoOffset = 0;
      }

      const timestamp = Date.now();
      const record = { plain, selection };

      // Overwrite last record if threshold is not crossed
      if (timestamp - this.undoTimestamp < 3000) {
        this.undoStack[this.undoStack.length - 1] = record;
      } else {
        this.undoStack.push(record);

        if (this.undoStack.length > 50) {
          this.undoStack.shift();
        }
      }

      this.undoTimestamp = timestamp;
    },
    updateContent(plain) {
      this.$nextTick(() => {
        this.codeData = plain;
      });
      if (this.emitEvents) {
        this.$emit("change", plain);
      }
    },
    restoreStackState(offset) {
      const { plain, selection } = this.undoStack[
        this.undoStack.length - 1 - offset
      ];

      this.selection = selection;
      this.undoOffset = offset;
      this.updateContent(plain);
    },
    undo() {
      const offset = this.undoOffset + 1;
      if (offset >= this.undoStack.length) {
        return;
      }

      this.restoreStackState(offset);
    },
    redo() {
      const offset = this.undoOffset - 1;
      if (offset < 0) {
        return;
      }

      this.restoreStackState(offset);
    },
    handleKeyDown(evt) {
      if (this.emitEvents) {
        this.$emit("keydown", evt);
      }

      if (evt.keyCode === 9 && !this.ignoreTabKey) {
        document.execCommand("insertHTML", false, "  ");
        evt.preventDefault();
      } else if (evt.keyCode === 8) {
        // Backspace Key
        const { start: cursorPos, end: cursorEndPos } = selectionRange(
          this.$refs.pre
        );
        if (cursorPos !== cursorEndPos) {
          return; // Bail on selections
        }

        const deindent = getDeindentLevel(this.$refs.pre.innerText, cursorPos);
        if (deindent <= 0) {
          return; // Bail when deindent level defaults to 0
        }

        // Delete chars `deindent` times
        for (let i = 0; i < deindent; i++) {
          document.execCommand("delete", false);
        }

        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        const { start: cursorPos } = selectionRange(this.$refs.pre);
        const indentation = getIndent(this.$refs.pre.innerText, cursorPos);
        document.execCommand("insertHTML", false, "\n" + indentation);
        evt.preventDefault();
      } else if (
        // Undo / Redo
        evt.keyCode === 90 &&
        evt.metaKey !== evt.ctrlKey &&
        !evt.altKey
      ) {
        if (evt.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }

        evt.preventDefault();
      }
    },
    handleKeyUp(evt) {
      if (this.emitEvents) {
        this.$emit("keyup", evt);
      }
      if (
        evt.keyCode === 91 || // left cmd
        evt.keyCode === 93 || // right cmd
        evt.ctrlKey ||
        evt.metaKey
      ) {
        return;
      }

      // Enter key
      if (evt.keyCode === 13) {
        this.undoTimestamp = 0;
      }

      this.selection = selectionRange(this.$refs.pre);

      if (
        evt.keyCode !== 37 && // left
        evt.keyCode !== 38 && // up
        evt.keyCode !== 39 && // right
        evt.keyCode !== 40 // down
      ) {
        const plain = this.getPlain();

        this.recordChange(plain, this.selection);
        this.updateContent(plain);
      } else {
        this.undoTimestamp = 0;
      }
    }
  }
};
</script>


<style>
.prism-editor-wrapper pre,
.prism-editor-wrapper code {
  font-family: inherit;
  font-size: 12px;
  line-height: 20px !important;
}
.prism-editor-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  background: #292929;
  color: #ffffff;
  overflow: auto;
  tab-size: 1.5em;
  -moz-tab-size: 1.5em;
}
.prism-editor__content-wrapper {
  overflow: auto;
  display: flex;
  height: 100%;
  width: 100%;
}
pre.prism-editor__code {
  background: #292929;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 0;
}
pre.prism-editor__code:focus {
  outline: none;
}
.prism-editor__code-wrapper {
  flex: 1;
}
.prism-editor__line-numbers {
  white-space: pre;
  display: flex;
  flex-direction: column;
  color: #727680;
  margin-right: 1.5em;
  text-align: right;
}
.prism-editor__line-numbers > span {
  width: 50px;
}
</style>
