(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.PrismEditor = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  var global = typeof self !== undefined ? self : this;

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var KEYCODE_ENTER = 13;
  var KEYCODE_TAB = 9;
  var KEYCODE_BACKSPACE = 8;
  var KEYCODE_Y = 89;
  var KEYCODE_Z = 90;
  var KEYCODE_M = 77;
  var KEYCODE_ESCAPE = 27;
  var BRACKET_PAIRS = {
    '(': ')',
    '{': '}',
    '[': ']',
    '"': '"',
    "'": "'"
  };
  var HISTORY_LIMIT = 100;
  var HISTORY_TIME_GAP = 3000;
  var isWindows = 'navigator' in global && /*#__PURE__*/ /Win/i.test(navigator.platform);
  var isMacLike = 'navigator' in global && /*#__PURE__*/ /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  var PrismEditor = /*#__PURE__*/Vue.extend({
    props: {
      lineNumbers: {
        type: Boolean,
        "default": false
      },
      autoStyleLineNumbers: {
        type: Boolean,
        "default": true
      },
      readonly: {
        type: Boolean,
        "default": false
      },
      value: {
        type: String,
        "default": ''
      },
      highlight: {
        type: Function,
        required: true
      },
      tabSize: {
        type: Number,
        "default": 2
      },
      insertSpaces: {
        type: Boolean,
        "default": true
      },
      ignoreTabKey: {
        type: Boolean,
        "default": false
      },
      placeholder: {
        type: String,
        "default": ''
      }
    },
    data: function data() {
      return {
        capture: true,
        history: {
          stack: [],
          offset: -1
        },
        lineNumbersHeight: '20px',
        codeData: ''
      };
    },
    watch: {
      value: {
        immediate: true,
        handler: function handler(newVal) {
          if (!newVal) {
            this.codeData = '';
          } else {
            this.codeData = newVal;
          }
        }
      },
      content: {
        immediate: true,
        handler: function handler() {
          var _this = this;

          if (this.lineNumbers) {
            this.$nextTick(function () {
              _this.setLineNumbersHeight();
            });
          }
        }
      },
      lineNumbers: function lineNumbers() {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.styleLineNumbers();

          _this2.setLineNumbersHeight();
        });
      }
    },
    computed: {
      isEmpty: function isEmpty() {
        return this.codeData.length === 0;
      },
      content: function content() {
        var result = this.highlight(this.codeData) + '<br />'; // todo: VNode support?

        return result;
      },
      lineNumbersCount: function lineNumbersCount() {
        var totalLines = this.codeData.split(/\r\n|\n/).length;
        return totalLines;
      }
    },
    mounted: function mounted() {
      this._recordCurrentState();

      this.styleLineNumbers();
    },
    methods: {
      setLineNumbersHeight: function setLineNumbersHeight() {
        this.lineNumbersHeight = getComputedStyle(this.$refs.pre).height;
      },
      styleLineNumbers: function styleLineNumbers() {
        if (!this.lineNumbers || !this.autoStyleLineNumbers) return;
        var $editor = this.$refs.pre;
        var $lineNumbers = this.$el.querySelector('.prism-editor__line-numbers');
        var editorStyles = window.getComputedStyle($editor);
        this.$nextTick(function () {
          var btlr = 'border-top-left-radius';
          var bblr = 'border-bottom-left-radius';
          if (!$lineNumbers) return;
          $lineNumbers.style[btlr] = editorStyles[btlr];
          $lineNumbers.style[bblr] = editorStyles[bblr];
          $editor.style[btlr] = '0';
          $editor.style[bblr] = '0';
          var stylesList = ['background-color', 'margin-top', 'padding-top', 'font-family', 'font-size', 'line-height'];
          stylesList.forEach(function (style) {
            $lineNumbers.style[style] = editorStyles[style];
          });
          $lineNumbers.style['margin-bottom'] = '-' + editorStyles['padding-top'];
        });
      },
      _recordCurrentState: function _recordCurrentState() {
        var input = this.$refs.textarea;
        if (!input) return; // Save current state of the input

        var value = input.value,
            selectionStart = input.selectionStart,
            selectionEnd = input.selectionEnd;

        this._recordChange({
          value: value,
          selectionStart: selectionStart,
          selectionEnd: selectionEnd
        });
      },
      _getLines: function _getLines(text, position) {
        return text.substring(0, position).split('\n');
      },
      _recordStateIfChange: function _recordStateIfChange() {
        if (this.history.stack[this.history.offset].value != this.codeData) {
          this._recordChange({
            value: this.codeData,
            selectionStart: this.codeData.length,
            selectionEnd: this.codeData.length
          });
        }
      },
      _applyEdits: function _applyEdits(record) {
        // Save last selection state
        var input = this.$refs.textarea;
        var last = this.history.stack[this.history.offset];

        if (last && input) {
          this.history.stack[this.history.offset] = _extends({}, last, {
            selectionStart: input.selectionStart,
            selectionEnd: input.selectionEnd
          });
        } // Save the changes


        this._recordChange(record);

        this._updateInput(record);
      },
      _recordChange: function _recordChange(record, overwrite) {
        if (overwrite === void 0) {
          overwrite = false;
        }

        var _this$history = this.history,
            stack = _this$history.stack,
            offset = _this$history.offset;

        if (stack.length && offset > -1) {
          // When something updates, drop the redo operations
          this.history.stack = stack.slice(0, offset + 1); // Limit the number of operations to 100

          var count = this.history.stack.length;

          if (count > HISTORY_LIMIT) {
            var extras = count - HISTORY_LIMIT;
            this.history.stack = stack.slice(extras, count);
            this.history.offset = Math.max(this.history.offset - extras, 0);
          }
        }

        var timestamp = Date.now();

        if (overwrite) {
          var last = this.history.stack[this.history.offset];

          if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
            var _this$_getLines$pop, _this$_getLines$pop2;

            // A previous entry exists and was in short interval
            // Match the last word in the line
            var re = /[^a-z0-9]([a-z0-9]+)$/i; // Get the previous line

            var previous = (_this$_getLines$pop = this._getLines(last.value, last.selectionStart).pop()) === null || _this$_getLines$pop === void 0 ? void 0 : _this$_getLines$pop.match(re); // Get the current line

            var current = (_this$_getLines$pop2 = this._getLines(record.value, record.selectionStart).pop()) === null || _this$_getLines$pop2 === void 0 ? void 0 : _this$_getLines$pop2.match(re);

            if (previous && current && current[1].startsWith(previous[1])) {
              // The last word of the previous line and current line match
              // Overwrite previous entry so that undo will remove whole word
              this.history.stack[this.history.offset] = _extends({}, record, {
                timestamp: timestamp
              });
              return;
            }
          }
        } // Add the new operation to the stack


        this.history.stack.push(_extends({}, record, {
          timestamp: timestamp
        }));
        this.history.offset++;
      },
      _updateInput: function _updateInput(record) {
        var input = this.$refs.textarea;
        if (!input) return; // Update values and selection state

        input.value = record.value;
        input.selectionStart = record.selectionStart;
        input.selectionEnd = record.selectionEnd;
        this.$emit('input', record.value); // this.props.onValueChange(record.value);
      },
      handleChange: function handleChange(e) {
        var _e$target = e.target,
            value = _e$target.value,
            selectionStart = _e$target.selectionStart,
            selectionEnd = _e$target.selectionEnd;

        this._recordChange({
          value: value,
          selectionStart: selectionStart,
          selectionEnd: selectionEnd
        }, true);

        this.$emit('input', value); // this.props.onValueChange(value);
      },
      _undoEdit: function _undoEdit() {
        var _this$history2 = this.history,
            stack = _this$history2.stack,
            offset = _this$history2.offset; // Get the previous edit

        var record = stack[offset - 1];

        if (record) {
          // Apply the changes and update the offset
          this._updateInput(record);

          this.history.offset = Math.max(offset - 1, 0);
        }
      },
      _redoEdit: function _redoEdit() {
        var _this$history3 = this.history,
            stack = _this$history3.stack,
            offset = _this$history3.offset; // Get the next edit

        var record = stack[offset + 1];

        if (record) {
          // Apply the changes and update the offset
          this._updateInput(record);

          this.history.offset = Math.min(offset + 1, stack.length - 1);
        }
      },
      handleKeyDown: function handleKeyDown(e) {
        // console.log(navigator.platform);
        var tabSize = this.tabSize,
            insertSpaces = this.insertSpaces,
            ignoreTabKey = this.ignoreTabKey;

        if (this.$listeners.keydown) {
          // onKeyDown(e);
          this.$emit('keydown', e);

          if (e.defaultPrevented) {
            return;
          }
        }

        if (e.keyCode === KEYCODE_ESCAPE) {
          e.target.blur();
          this.$emit('blur', e);
        }

        var _e$target2 = e.target,
            value = _e$target2.value,
            selectionStart = _e$target2.selectionStart,
            selectionEnd = _e$target2.selectionEnd;
        var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);

        if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && this.capture) {
          // Prevent focus change
          e.preventDefault();

          if (e.shiftKey) {
            // Unindent selected lines
            var linesBeforeCaret = this._getLines(value, selectionStart);

            var startLine = linesBeforeCaret.length - 1;
            var endLine = this._getLines(value, selectionEnd).length - 1;
            var nextValue = value.split('\n').map(function (line, i) {
              if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
                return line.substring(tabCharacter.length);
              }

              return line;
            }).join('\n');

            if (value !== nextValue) {
              var startLineText = linesBeforeCaret[startLine];

              this._applyEdits({
                value: nextValue,
                // Move the start cursor if first line in selection was modified
                // It was modified only if it started with a tab
                selectionStart: startLineText.startsWith(tabCharacter) ? selectionStart - tabCharacter.length : selectionStart,
                // Move the end cursor by total number of characters removed
                selectionEnd: selectionEnd - (value.length - nextValue.length)
              });
            }
          } else if (selectionStart !== selectionEnd) {
            // Indent selected lines
            var _linesBeforeCaret = this._getLines(value, selectionStart);

            var _startLine = _linesBeforeCaret.length - 1;

            var _endLine = this._getLines(value, selectionEnd).length - 1;

            var _startLineText = _linesBeforeCaret[_startLine];

            this._applyEdits({
              value: value.split('\n').map(function (line, i) {
                if (i >= _startLine && i <= _endLine) {
                  return tabCharacter + line;
                }

                return line;
              }).join('\n'),
              // Move the start cursor by number of characters added in first line of selection
              // Don't move it if it there was no text before cursor
              selectionStart: /\S/.test(_startLineText) ? selectionStart + tabCharacter.length : selectionStart,
              // Move the end cursor by total number of characters added
              selectionEnd: selectionEnd + tabCharacter.length * (_endLine - _startLine + 1)
            });
          } else {
            var updatedSelection = selectionStart + tabCharacter.length;

            this._applyEdits({
              // Insert tab character at caret
              value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
              // Update caret position
              selectionStart: updatedSelection,
              selectionEnd: updatedSelection
            });
          }
        } else if (e.keyCode === KEYCODE_BACKSPACE) {
          var hasSelection = selectionStart !== selectionEnd;
          var textBeforeCaret = value.substring(0, selectionStart);

          if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
            // Prevent default delete behaviour
            e.preventDefault();

            var _updatedSelection = selectionStart - tabCharacter.length;

            this._applyEdits({
              // Remove tab character at caret
              value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
              // Update caret position
              selectionStart: _updatedSelection,
              selectionEnd: _updatedSelection
            });
          }
        } else if (e.keyCode === KEYCODE_ENTER) {
          // Ignore selections
          if (selectionStart === selectionEnd) {
            // Get the current line
            var line = this._getLines(value, selectionStart).pop();

            var matches = line === null || line === void 0 ? void 0 : line.match(/^\s+/);

            if (matches && matches[0]) {
              e.preventDefault(); // Preserve indentation on inserting a new line

              var indent = '\n' + matches[0];

              var _updatedSelection2 = selectionStart + indent.length;

              this._applyEdits({
                // Insert indentation character at caret
                value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
                // Update caret position
                selectionStart: _updatedSelection2,
                selectionEnd: _updatedSelection2
              });
            }
          }
        } else if (BRACKET_PAIRS[e.key]) {
          // If text is selected, wrap them in the characters
          if (selectionStart !== selectionEnd) {
            e.preventDefault();

            this._applyEdits({
              value: value.substring(0, selectionStart) + e.key + value.substring(selectionStart, selectionEnd) + BRACKET_PAIRS[e.key] + value.substring(selectionEnd),
              // Update caret position
              selectionStart: selectionStart + 1,
              selectionEnd: selectionEnd + 1
            });
          }
        } else if ((isMacLike ? // Trigger undo with ⌘+Z on Mac
        e.metaKey && e.keyCode === KEYCODE_Z : // Trigger undo with Ctrl+Z on other platforms
        e.ctrlKey && e.keyCode === KEYCODE_Z) && !e.shiftKey && !e.altKey) {
          e.preventDefault();

          this._undoEdit();
        } else if ((isMacLike ? // Trigger redo with ⌘+Shift+Z on Mac
        e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey : isWindows ? // Trigger redo with Ctrl+Y on Windows
        e.ctrlKey && e.keyCode === KEYCODE_Y : // Trigger redo with Ctrl+Shift+Z on other platforms
        e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) && !e.altKey) {
          e.preventDefault();

          this._redoEdit();
        } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
          e.preventDefault(); // Toggle capturing tab key so users can focus away

          this.capture = !this.capture;
        }
      }
    },
    render: function render(h) {
      var _this3 = this;

      var lineNumberWidthCalculator = h('div', {
        attrs: {
          "class": 'prism-editor__line-width-calc',
          style: 'height: 0px; visibility: hidden; pointer-events: none;'
        }
      }, '999');
      var lineNumbers = h('div', {
        staticClass: 'prism-editor__line-numbers',
        style: {
          'min-height': this.lineNumbersHeight
        },
        attrs: {
          'aria-hidden': 'true'
        }
      }, [lineNumberWidthCalculator, Array.from(Array(this.lineNumbersCount).keys()).map(function (_, index) {
        return h('div', {
          attrs: {
            "class": 'prism-editor__line-number token comment'
          }
        }, "" + ++index);
      })]);
      var textarea = h('textarea', {
        ref: 'textarea',
        on: {
          input: this.handleChange,
          keydown: this.handleKeyDown,
          click: function click($event) {
            _this3.$emit('click', $event);
          },
          keyup: function keyup($event) {
            _this3.$emit('keyup', $event);
          },
          focus: function focus($event) {
            _this3._recordStateIfChange();

            _this3.$emit('focus', $event);
          },
          blur: function blur($event) {
            _this3.$emit('blur', $event);
          }
        },
        staticClass: 'prism-editor__textarea',
        "class": {
          'prism-editor__textarea--empty': this.isEmpty
        },
        attrs: {
          spellCheck: 'false',
          autocapitalize: 'off',
          autocomplete: 'off',
          autocorrect: 'off',
          'data-gramm': 'false',
          placeholder: this.placeholder,
          'data-testid': 'textarea',
          readonly: this.readonly
        },
        domProps: {
          value: this.codeData
        }
      });
      var preview = h('pre', {
        ref: 'pre',
        staticClass: 'prism-editor__editor',
        attrs: {
          'data-testid': 'preview'
        },
        domProps: {
          innerHTML: this.content
        }
      });
      var editorContainer = h('div', {
        staticClass: 'prism-editor__container'
      }, [textarea, preview]);
      return h('div', {
        staticClass: 'prism-editor-wrapper'
      }, [this.lineNumbers && lineNumbers, editorContainer]);
    }
  });

  exports.PrismEditor = PrismEditor;

  Object.defineProperty(exports, '__esModule', { value: true });

  let GlobalVue = null
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
  }
  if (GlobalVue) {
    GlobalVue.component("PrismEditor", PrismEditor)
  }

})));
//# sourceMappingURL=prismeditor.umd.development.js.map
