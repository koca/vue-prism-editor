<template>
  <div class="prism-editor-wrapper">
    <div class="prism-editor__line-numbers" aria-hidden="true" v-if="lineNumbers" :style="{'min-height': lineNumbersHeight}">
      <div class="prism-editor__line-width-calc" style="height: 0px; visibility: hidden; pointer-events: none;">999</div>
      <div class="prism-editor__line-number token comment" v-for="line in lineNumbersCount" :key="line">{{line}}</div>
    </div>
    <pre
      class="prism-editor__code"
      :class="{['language-'+language]: true}"
      ref="pre"
      v-html="content"
      :contenteditable="readOnly"
      @keydown="handleKeyDown"
      @keyup="handleKeyUp"
      @click="handleClick"
      spellCheck="false"
      ></pre>
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
    lineNumbers: {
      type: Boolean,
      default: true
    },
    autoStyleLineNumbers: {
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
      lineNumbersHeight: "20px",
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
    },
    content: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.lineNumbersHeight = getComputedStyle(this.$refs.pre).height;
        });
      }
    }
  },
  computed: {
    content() {
      return prism(this.codeData, this.language);
    },
    lineNumbersCount() {
      let totalLines = this.codeData.split(/\r\n|\n/).length;
      // TOOO: Find a better way of doing this - ignore last line break (os spesific etc.)
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
    if (this.lineNumbers && this.autoStyleLineNumbers) {
      this.styleLineNumbers();
    }
    const onPaste = e => {
      e.preventDefault();
      const currentCursorPos = selectionRange(this.$refs.pre);

      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData("Text");
      // insert text manually
      document.execCommand("insertHTML", false, escapeHtml(text));

      const newCursorPos = currentCursorPos.end + text.length;
      this.selection = { start: newCursorPos, end: newCursorPos };

      this.codeData = this.getPlain();
      this.recordChange(this.codeData, this.selection);
    };
    const $pre = this.$refs.pre;
    $pre.addEventListener("paste", onPaste);
    this.$once("hook:beforeDestroy", () => {
      $pre.removeEventListener("paste", onPaste);
    });
  },

  methods: {
    styleLineNumbers() {
      const $editor = this.$refs.pre;
      const $lineNumbers = this.$el.querySelector(
        ".prism-editor__line-numbers"
      );
      const editorStyles = window.getComputedStyle($editor);

      this.$nextTick(() => {
        const btlr = "border-top-left-radius";
        const bblr = "border-bottom-left-radius";
        $lineNumbers.style[btlr] = editorStyles[btlr];
        $lineNumbers.style[bblr] = editorStyles[bblr];
        $editor.style[btlr] = 0;
        $editor.style[bblr] = 0;

        const stylesList = [
          "background-color",
          "margin-top",
          "padding-top",
          "font-family",
          "font-size",
          "line-height"
        ];
        stylesList.forEach(style => {
          $lineNumbers.style[style] = editorStyles[style];
        });
      }, 0);
    },
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

        // https://stackoverflow.com/questions/35585421
        // add a space and remove it. it works :/
        document.execCommand("insertHTML", false, "\n " + indentation);
        document.execCommand("delete", false);

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
  line-height: inherit;
}
.prism-editor-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;

  overflow: auto;
  tab-size: 1.5em;
  -moz-tab-size: 1.5em;
  font-family: monospace;
}
.prism-editor__line-numbers {
  left: 0px;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  /*min-height: 3347px; */
  padding-top: 4px;
}
.prism-editor__line-number {
  color: #999;
  box-sizing: border-box;
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  white-space: nowrap;
}

pre.prism-editor__code {
  margin: 0px;
  flex-grow: 2;
  min-height: 100%;
  box-sizing: border-box;
  line-height: inherit;
  font-family: inherit;
  padding: 4px 2px 4px 4px;
  tab-size: 4;
  -moz-tab-size: 4;
  outline: none;
}
pre.prism-editor__code:focus {
  outline: none;
}
</style>
