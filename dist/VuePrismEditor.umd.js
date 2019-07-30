(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VuePrismEditor"] = factory();
	else
		root["VuePrismEditor"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "412e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "72d6":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module Dependencies
 */

var xor = __webpack_require__("8a8d");
var props = __webpack_require__("ad9a");


/**
 * Export `Iterator`
 */

module.exports = Iterator;

/**
 * Initialize `Iterator`
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Iterator} self
 * @api public
 */

function Iterator(node, root) {
  if (!(this instanceof Iterator)) return new Iterator(node, root);
  this.node = this.start = this.peeked = node;
  this.root = root;
  this.closingTag = false;
  this._revisit = true;
  this._selects = [];
  this._rejects = [];

  if (node && this.higher(node)) {
    throw new Error('root must be a parent or ancestor to node');
  }
}

/**
 * Reset the Iterator
 *
 * @param {Node} node (optional)
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reset = function(node) {
  this.node = node || this.start;
  return this;
};

/**
 * Revisit element nodes. Defaults to `true`
 */

Iterator.prototype.revisit = function(revisit) {
  this._revisit = undefined == revisit ? true : revisit;
  return this;
};

/**
 * Jump to the opening tag
 */

Iterator.prototype.opening = function() {
  if (1 == this.node.nodeType) this.closingTag = false;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atOpening = function() {
  return !this.closingTag;
};


/**
 * Jump to the closing tag
 */

Iterator.prototype.closing = function() {
  if (1 == this.node.nodeType) this.closingTag = true;
  return this;
};

/**
 * Jump to the closing tag
 */

Iterator.prototype.atClosing = function() {
  return this.closingTag;
};

/**
 * Next node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.next = traverse('nextSibling', 'firstChild');

/**
 * Previous node
 *
 * @param {Number} type
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.previous =
Iterator.prototype.prev = traverse('previousSibling', 'lastChild');

/**
 * Make traverse function
 *
 * @param {String} dir
 * @param {String} child
 * @return {Function}
 * @api private
 */

function traverse(dir, child) {
  var next = dir == 'nextSibling';
  return function walk(expr, n, peek) {
    expr = this.compile(expr);
    n = n && n > 0 ? n : 1;
    var node = this.node;
    var closing = this.closingTag;
    var revisit = this._revisit;

    while (node) {
      if (xor(next, closing) && node[child]) {
        // element with children: <em>...</em>
        node = node[child];
        closing = !next;
      } else if (1 == node.nodeType && !node[child] && xor(next, closing)) {
        // empty element tag: <em></em>
        closing = next;
        if (!revisit) continue;
      } else if (node[dir]) {
        // element has a neighbor: ...<em></em>...
        node = node[dir];
        closing = !next;
      } else {
        // done with current layer, move up.
        node = node.parentNode;
        closing = next;
        if (!revisit) continue;
      }

      if (!node || this.higher(node, this.root)) break;

      if (expr(node) && this.selects(node, peek) && this.rejects(node, peek)) {
        if (--n) continue;
        if (!peek) this.node = node;
        this.closingTag = closing;
        return node;
      }
    }

    return null;
  };
}

/**
 * Select nodes that cause `expr(node)`
 * to be truthy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.select = function(expr) {
  expr = this.compile(expr);
  this._selects.push(expr);
  return this;
};

/**
 * Run through the selects ORing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.selects = function(node, peek) {
  var exprs = this._selects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return true;
  };

  return false;
};

/**
 * Select nodes that cause `expr(node)`
 * to be falsy
 *
 * @param {Number|String|Function} expr
 * @return {Iterator} self
 * @api public
 */

Iterator.prototype.reject = function(expr) {
  expr = this.compile(expr);
  this._rejects.push(expr);
  return this;
};

/**
 * Run through the reject expressions ANDing each
 *
 * @param {Node} node
 * @param {Boolean} peek
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.rejects = function(node, peek) {
  var exprs = this._rejects;
  var len = exprs.length;
  if (!len) return true;

  for (var i = 0; i < len; i++) {
    if (exprs[i].call(this, node, peek)) return false;
  };

  return true;
};

/**
 * Check if node is higher
 * than root.
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Boolean}
 * @api private
 */

Iterator.prototype.higher = function(node) {
  var root = this.root;
  if (!root) return false;
  node = node.parentNode;
  while (node && node != root) node = node.parentNode;
  return node != root;
};

/**
 * Compile an expression
 *
 * @param {String|Function|Number} expr
 * @return {Function}
 */

Iterator.prototype.compile = function(expr) {
  switch (typeof expr) {
    case 'number':
      return function(node) { return expr == node.nodeType; };
    case 'string':
      return new Function('node', 'return ' + props(expr, 'node.'));
    case 'function':
      return expr;
    default:
      return function() { return true; };
  }
};

/**
 * Peek in either direction
 * `n` nodes. Peek backwards
 * using negative numbers.
 *
 * @param {Number} n (optional)
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.peak =
Iterator.prototype.peek = function(expr, n) {
  if (arguments.length == 1) n = expr, expr = true;
  n = undefined == n ? 1 : n;
  if (!n) return this.node;
  else if (n > 0) return this.next(expr, n, true);
  else return this.prev(expr, Math.abs(n), true);
};

/**
 * Add a plugin
 *
 * @param {Function} fn
 * @return {Iterator}
 * @api public
 */

Iterator.prototype.use = function(fn) {
  fn(this);
  return this;
};


/***/ }),

/***/ "74a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8a8d":
/***/ (function(module, exports) {

/**
 * Expose `xor`
 */

module.exports = xor;

/**
 * XOR utility
 *
 * T T F
 * T F T
 * F T T
 * F F F
 *
 * @param {Boolean} a
 * @param {Boolean} b
 * @return {Boolean}
 */

function xor(a, b) {
  return a ^ b;
}


/***/ }),

/***/ "954e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__("cf4f");
var regexCache = {};
var all;

var charSets = {
  default: {
    '&quot;': '"',
    '&#34;': '"',

    '&apos;': '\'',
    '&#39;': '\'',

    '&amp;': '&',
    '&#38;': '&',

    '&gt;': '>',
    '&#62;': '>',

    '&lt;': '<',
    '&#60;': '<'
  },
  extras: {
    '&cent;': '¢',
    '&#162;': '¢',

    '&copy;': '©',
    '&#169;': '©',

    '&euro;': '€',
    '&#8364;': '€',

    '&pound;': '£',
    '&#163;': '£',

    '&reg;': '®',
    '&#174;': '®',

    '&yen;': '¥',
    '&#165;': '¥'
  }
};

// don't merge char sets unless "all" is explicitly called
Object.defineProperty(charSets, 'all', {
  get: function() {
    return all || (all = extend({}, charSets.default, charSets.extras));
  }
});

/**
 * Convert HTML entities to HTML characters.
 *
 * @param  {String} `str` String with HTML entities to un-escape.
 * @return {String}
 */

function unescape(str, type) {
  if (!isString(str)) return '';
  var chars = charSets[type || 'default'];
  var regex = toRegex(type, chars);
  return str.replace(regex, function(m) {
    return chars[m];
  });
}

function toRegex(type, chars) {
  if (regexCache[type]) {
    return regexCache[type];
  }
  var keys = Object.keys(chars).join('|');
  var regex = new RegExp('(?=(' + keys + '))\\1', 'g');
  regexCache[type] = regex;
  return regex;
}

/**
 * Returns true if str is a non-empty string
 */

function isString(str) {
  return str && typeof str === 'string';
}

/**
 * Expose charSets
 */

unescape.chars = charSets.default;
unescape.extras = charSets.extras;
// don't trip the "charSets" getter unless it's explicitly called
Object.defineProperty(unescape, 'all', {
  get: function() {
    return charSets.all;
  }
});

/**
 * Expose `unescape`
 */

module.exports = unescape;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ad9a":
/***/ (function(module, exports) {

/**
 * Global Names
 */

var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

/**
 * Return immediate identifiers parsed from `str`.
 *
 * @param {String} str
 * @param {String|Function} map function or prefix
 * @return {Array}
 * @api public
 */

module.exports = function(str, fn){
  var p = unique(props(str));
  if (fn && 'string' == typeof fn) fn = prefixed(fn);
  if (fn) return map(str, p, fn);
  return p;
};

/**
 * Return immediate identifiers in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function props(str) {
  return str
    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .replace(globals, '')
    .match(/[a-zA-Z_]\w*/g)
    || [];
}

/**
 * Return `str` with `props` mapped with `fn`.
 *
 * @param {String} str
 * @param {Array} props
 * @param {Function} fn
 * @return {String}
 * @api private
 */

function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
  return str.replace(re, function(_){
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~props.indexOf(_)) return _;
    return fn(_);
  });
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

/**
 * Map with prefix `str`.
 */

function prefixed(str) {
  return function(_){
    return str + _;
  };
}


/***/ }),

/***/ "aef6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__("5ca1");
var toLength = __webpack_require__("9def");
var context = __webpack_require__("d2c8");
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__("5147")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b16a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("412e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cf4f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__("d913");

module.exports = function extend(o/*, objects*/) {
  if (!isObject(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d913":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2f8be48b-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Editor.vue?vue&type=template&id=2d93b032&
var render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"prism-editor-wrapper"},[(_vm.lineNumbers)?_c('div',{staticClass:"prism-editor__line-numbers",style:({ 'min-height': _vm.lineNumbersHeight }),attrs:{"aria-hidden":"true"}},[_c('div',{staticClass:"prism-editor__line-width-calc",staticStyle:{"height":"0px","visibility":"hidden","pointer-events":"none"}},[_vm._v("\n      999\n    ")]),_vm._l((_vm.lineNumbersCount),function(line){return _c('div',{key:line,staticClass:"prism-editor__line-number token comment"},[_vm._v("\n      "+_vm._s(line)+"\n    ")])})],2):_vm._e(),_c('pre',{ref:"pre",staticClass:"prism-editor__code",class:( _obj = {}, _obj['language-' + _vm.language] = true, _obj ),attrs:{"contenteditable":!_vm.readonly,"spellCheck":"false","autocapitalize":"off","autocomplete":"off","autocorrect":"off","data-gramm":"false"},domProps:{"innerHTML":_vm._s(_vm.content)},on:{"keydown":_vm.handleKeyDown,"keyup":_vm.handleKeyUp,"click":_vm.handleClick}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Editor.vue?vue&type=template&id=2d93b032&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.ends-with.js
var es6_string_ends_with = __webpack_require__("aef6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/escape-html/index.js
var escape_html = __webpack_require__("74a0");
var escape_html_default = /*#__PURE__*/__webpack_require__.n(escape_html);

// CONCATENATED MODULE: ./src/utils/prism.js
/* global Prism */


function wrap(code, lang, langPrism) {
  if (lang === "text") {
    code = escape_html_default()(code);
  }

  return "<code class=\"language-".concat(langPrism, "\">").concat(code, "</code>");
}

/* harmony default export */ var prism = (function (str, lang) {
  if (!lang) {
    return wrap(str, "text", "text");
  }

  lang = lang.toLowerCase();
  var rawLang = lang;

  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }

  if (lang === "md") {
    lang = "markdown";
  }

  if (lang === "ts") {
    lang = "typescript";
  }

  if (Prism.languages[lang]) {
    var code = Prism.highlight(str, Prism.languages[lang], lang);
    return wrap(code, rawLang, lang);
  }

  return wrap(str, "text", "text");
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./src/utils/normalizeHtml.js


var normalizeHtml = function normalizeHtml(html) {
  return html.replace("\n", "<br>");
};

/* harmony default export */ var utils_normalizeHtml = (normalizeHtml);
// EXTERNAL MODULE: ./node_modules/unescape/index.js
var node_modules_unescape = __webpack_require__("954e");
var unescape_default = /*#__PURE__*/__webpack_require__.n(node_modules_unescape);

// CONCATENATED MODULE: ./src/utils/htmlToPlain.js



var htmlToPlain_htmlToPlain = function htmlToPlain(html) {
  return unescape_default()(html.replace(/<br>/gm, "\n").replace(/<\/?[^>]*>/gm, ""));
};

/* harmony default export */ var utils_htmlToPlain = (htmlToPlain_htmlToPlain);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/dom-iterator/index.js
var dom_iterator = __webpack_require__("72d6");
var dom_iterator_default = /*#__PURE__*/__webpack_require__.n(dom_iterator);

// CONCATENATED MODULE: ./src/utils/selection-range.js



function position(el, pos) {
  var selection = window.getSelection();

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    indexes.commonAncestorContainer = clone.commonAncestorContainer;
    indexes.endContainer = clone.endContainer;
    indexes.startContainer = clone.startContainer;
    return indexes;
  }

  var setSelection = pos.end && pos.end !== pos.start;
  var length = 0; // eslint-disable-next-line

  var range = document.createRange();
  var it = dom_iterator_default()(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()) {
    var olen = length;
    length += next.textContent.length; // Set start point of selection

    var atLength = atStart ? length > start : length >= start;

    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);

      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    } // Set end point of selection


    if (setSelection && length >= end) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

function makeSelection(el, range) {
  var selection = window.getSelection();
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

/* harmony default export */ var selection_range = (position);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// CONCATENATED MODULE: ./src/utils/getIndent.js


var getLine = function getLine(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf("\n") + 1;
  var lineSlice = startSlice.slice(lastNewline);
  return lineSlice;
};

var indentRe = /^\s+/;
var getIndent = function getIndent(plain, cursorPos) {
  var line = getLine(plain, cursorPos);
  var matches = line.match(indentRe);

  if (matches === null) {
    return "";
  }

  return matches[0] || "";
};
var deindentSpacesRe = /^(\t| {2})* {2}$/;
var getDeindentLevel = function getDeindentLevel(plain, cursorPos) {
  var line = getLine(plain, cursorPos);

  if (!deindentSpacesRe.test(line)) {
    return 0; // Doesn't match regex, so normal behaviour can apply
  } // The line contains only whitespace indentation
  // thus two characters must be deleted


  return 2;
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Editor.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var Editorvue_type_script_lang_js_ = ({
  model: {
    prop: "code",
    event: "change"
  },
  props: {
    emitEvents: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: "js"
    },
    lineNumbers: {
      type: Boolean,
      default: false
    },
    autoStyleLineNumbers: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      undoStack: [],
      selection: undefined,
      lineNumbersHeight: "20px",
      undoOffset: 0,
      undoTimestamp: 0,
      lastPos: 0,
      codeData: "",
      composing: false
    };
  },
  watch: {
    code: {
      immediate: true,
      handler: function handler(newVal) {
        if (!newVal) {
          this.codeData = "";
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
    content: function content() {
      return prism(this.codeData, this.language);
    },
    lineNumbersCount: function lineNumbersCount() {
      var totalLines = this.codeData.split(/\r\n|\n/).length; // TODO: Find a better way of doing this - ignore last line break (os spesific etc.)

      if (this.codeData.endsWith("\n")) {
        totalLines--;
      }

      return totalLines;
    }
  },
  updated: function updated() {
    if (this.selection) {
      selection_range(this.$refs.pre, this.selection);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.recordChange(this.getPlain());
    this.undoTimestamp = 0; // Reset timestamp

    this.styleLineNumbers();

    var onPaste = function onPaste(e) {
      e.preventDefault();
      var currentCursorPos = selection_range(_this3.$refs.pre); // get text representation of clipboard

      var text = (e.originalEvent || e).clipboardData.getData("Text"); // insert text manually

      document.execCommand("insertHTML", false, escape_html_default()(text));
      var newCursorPos = currentCursorPos.end + text.length;
      _this3.selection = {
        start: newCursorPos,
        end: newCursorPos
      };

      var plain = _this3.getPlain();

      _this3.recordChange(plain, _this3.selection);

      _this3.updateContent(plain);

      _this3.setLineNumbersHeight();
    };

    var $pre = this.$refs.pre;
    $pre.addEventListener("paste", onPaste);
    this.$once("hook:beforeDestroy", function () {
      $pre.removeEventListener("paste", onPaste);
    });
    $pre.addEventListener("compositionstart", function () {
      _this3.composing = true;
    });
    $pre.addEventListener("compositionend", function () {
      // for canceling input.
      _this3.composing = false;
    });
  },
  methods: {
    setLineNumbersHeight: function setLineNumbersHeight() {
      this.lineNumbersHeight = getComputedStyle(this.$refs.pre).height;
    },
    styleLineNumbers: function styleLineNumbers() {
      if (!this.lineNumbers || !this.autoStyleLineNumbers) return;
      var $editor = this.$refs.pre;
      var $lineNumbers = this.$el.querySelector(".prism-editor__line-numbers");
      var editorStyles = window.getComputedStyle($editor);
      this.$nextTick(function () {
        var btlr = "border-top-left-radius";
        var bblr = "border-bottom-left-radius";
        $lineNumbers.style[btlr] = editorStyles[btlr];
        $lineNumbers.style[bblr] = editorStyles[bblr];
        $editor.style[btlr] = 0;
        $editor.style[bblr] = 0;
        var stylesList = ["background-color", "margin-top", "padding-top", "font-family", "font-size", "line-height"];
        stylesList.forEach(function (style) {
          $lineNumbers.style[style] = editorStyles[style];
        });
        $lineNumbers.style["margin-bottom"] = "-" + editorStyles["padding-top"];
      });
    },
    handleClick: function handleClick(evt) {
      if (this.emitEvents) {
        this.$emit("editorClick", evt);
      }

      this.undoTimestamp = 0; // Reset timestamp

      this.selection = selection_range(this.$refs.pre);
    },
    getPlain: function getPlain() {
      if (this._innerHTML === this.$refs.pre.innerHTML) {
        return this._plain;
      }

      var plain = utils_htmlToPlain(utils_normalizeHtml(this.$refs.pre.innerHTML));
      this._innerHTML = this.$refs.pre.innerHTML;
      this._plain = plain;
      return this._plain;
    },
    recordChange: function recordChange(plain, selection) {
      if (plain === this.undoStack[this.undoStack.length - 1]) {
        return;
      }

      if (this.undoOffset > 0) {
        this.undoStack = this.undoStack.slice(0, -this.undoOffset);
        this.undoOffset = 0;
      }

      var timestamp = Date.now();
      var record = {
        plain: plain,
        selection: selection
      }; // Overwrite last record if threshold is not crossed

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
    updateContent: function updateContent(plain) {
      this.$emit("change", plain);
    },
    restoreStackState: function restoreStackState(offset) {
      var _this$undoStack = this.undoStack[this.undoStack.length - 1 - offset],
          plain = _this$undoStack.plain,
          selection = _this$undoStack.selection;
      this.selection = selection;
      this.undoOffset = offset;
      this.updateContent(plain);
    },
    undo: function undo() {
      var offset = this.undoOffset + 1;

      if (offset >= this.undoStack.length) {
        return;
      }

      this.restoreStackState(offset);
    },
    redo: function redo() {
      var offset = this.undoOffset - 1;

      if (offset < 0) {
        return;
      }

      this.restoreStackState(offset);
    },
    handleKeyDown: function handleKeyDown(evt) {
      if (this.emitEvents) {
        this.$emit("keydown", evt);
      }

      if (evt.keyCode === 9 && !this.ignoreTabKey) {
        document.execCommand("insertHTML", false, "  ");
        evt.preventDefault();
      } else if (evt.keyCode === 8) {
        // Backspace Key
        var _selectionRange = selection_range(this.$refs.pre),
            cursorPos = _selectionRange.start,
            cursorEndPos = _selectionRange.end;

        if (cursorPos !== cursorEndPos) {
          return; // Bail on selections
        }

        var deindent = getDeindentLevel(this.$refs.pre.innerText, cursorPos);

        if (deindent <= 0) {
          return; // Bail when deindent level defaults to 0
        } // Delete chars `deindent` times


        for (var i = 0; i < deindent; i++) {
          document.execCommand("delete", false);
        }

        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        var _selectionRange2 = selection_range(this.$refs.pre),
            _cursorPos = _selectionRange2.start;

        var indentation = getIndent(this.$refs.pre.innerText, _cursorPos); // https://stackoverflow.com/questions/35585421
        // add a space and remove it. it works :/

        document.execCommand("insertHTML", false, "\n " + indentation);
        document.execCommand("delete", false);
        evt.preventDefault();
      } else if ( // Undo / Redo
      evt.keyCode === 90 && evt.metaKey !== evt.ctrlKey && !evt.altKey) {
        if (evt.shiftKey) {
          this.redo();
        } else {
          this.undo();
        }

        evt.preventDefault();
      }
    },
    handleKeyUp: function handleKeyUp(evt) {
      var keyupCode = evt.which;

      if (this.composing) {
        if (keyupCode === 13) {
          // finish inputting via IM.
          this.composing = false;
        } else {
          // now inputting words using IM.
          // must not update view.
          return;
        }
      }

      if (this.emitEvents) {
        this.$emit("keyup", evt);
      }

      if (evt.keyCode === 91 || // left cmd
      evt.keyCode === 93 || // right cmd
      evt.ctrlKey || evt.metaKey) {
        return;
      } // Enter key


      if (evt.keyCode === 13) {
        this.undoTimestamp = 0;
      }

      this.selection = selection_range(this.$refs.pre);

      if (evt.keyCode !== 37 && // left
      evt.keyCode !== 38 && // up
      evt.keyCode !== 39 && // right
      evt.keyCode !== 40 // down
      ) {
          var plain = this.getPlain();
          this.recordChange(plain, this.selection);
          this.updateContent(plain);
        } else {
        this.undoTimestamp = 0;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Editor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Editorvue_type_script_lang_js_ = (Editorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Editor.vue?vue&type=style&index=0&lang=css&
var Editorvue_type_style_index_0_lang_css_ = __webpack_require__("b16a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/Editor.vue






/* normalize component */

var component = normalizeComponent(
  components_Editorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Editor = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (Editor);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=VuePrismEditor.umd.js.map