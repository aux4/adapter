#!/usr/bin/env node
'use strict';

var require$$0$1 = require('util');
var require$$0 = require('os');
var require$$0$3 = require('stream');
var require$$0$2 = require('crypto');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var executable$1 = {};

var lib = {exports: {}};

var colors = {exports: {}};

var styles = {exports: {}};

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var hasRequiredStyles;

function requireStyles () {
	if (hasRequiredStyles) return styles.exports;
	hasRequiredStyles = 1;
	(function (module) {
		var styles = {};
		module['exports'] = styles;

		var codes = {
		  reset: [0, 0],

		  bold: [1, 22],
		  dim: [2, 22],
		  italic: [3, 23],
		  underline: [4, 24],
		  inverse: [7, 27],
		  hidden: [8, 28],
		  strikethrough: [9, 29],

		  black: [30, 39],
		  red: [31, 39],
		  green: [32, 39],
		  yellow: [33, 39],
		  blue: [34, 39],
		  magenta: [35, 39],
		  cyan: [36, 39],
		  white: [37, 39],
		  gray: [90, 39],
		  grey: [90, 39],

		  brightRed: [91, 39],
		  brightGreen: [92, 39],
		  brightYellow: [93, 39],
		  brightBlue: [94, 39],
		  brightMagenta: [95, 39],
		  brightCyan: [96, 39],
		  brightWhite: [97, 39],

		  bgBlack: [40, 49],
		  bgRed: [41, 49],
		  bgGreen: [42, 49],
		  bgYellow: [43, 49],
		  bgBlue: [44, 49],
		  bgMagenta: [45, 49],
		  bgCyan: [46, 49],
		  bgWhite: [47, 49],
		  bgGray: [100, 49],
		  bgGrey: [100, 49],

		  bgBrightRed: [101, 49],
		  bgBrightGreen: [102, 49],
		  bgBrightYellow: [103, 49],
		  bgBrightBlue: [104, 49],
		  bgBrightMagenta: [105, 49],
		  bgBrightCyan: [106, 49],
		  bgBrightWhite: [107, 49],

		  // legacy styles for colors pre v1.0.0
		  blackBG: [40, 49],
		  redBG: [41, 49],
		  greenBG: [42, 49],
		  yellowBG: [43, 49],
		  blueBG: [44, 49],
		  magentaBG: [45, 49],
		  cyanBG: [46, 49],
		  whiteBG: [47, 49],

		};

		Object.keys(codes).forEach(function(key) {
		  var val = codes[key];
		  var style = styles[key] = [];
		  style.open = '\u001b[' + val[0] + 'm';
		  style.close = '\u001b[' + val[1] + 'm';
		}); 
	} (styles));
	return styles.exports;
}

/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = function(flag, argv) {
	  argv = argv || process.argv;

	  var terminatorPos = argv.indexOf('--');
	  var prefix = /^-{1,2}/.test(flag) ? '' : '--';
	  var pos = argv.indexOf(prefix + flag);

	  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
	};
	return hasFlag;
}

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var supportsColors;
var hasRequiredSupportsColors;

function requireSupportsColors () {
	if (hasRequiredSupportsColors) return supportsColors;
	hasRequiredSupportsColors = 1;

	var os = require$$0;
	var hasFlag = requireHasFlag();

	var env = process.env;

	var forceColor = void 0;
	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
	  forceColor = false;
	} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')
	           || hasFlag('color=always')) {
	  forceColor = true;
	}
	if ('FORCE_COLOR' in env) {
	  forceColor = env.FORCE_COLOR.length === 0
	    || parseInt(env.FORCE_COLOR, 10) !== 0;
	}

	function translateLevel(level) {
	  if (level === 0) {
	    return false;
	  }

	  return {
	    level: level,
	    hasBasic: true,
	    has256: level >= 2,
	    has16m: level >= 3,
	  };
	}

	function supportsColor(stream) {
	  if (forceColor === false) {
	    return 0;
	  }

	  if (hasFlag('color=16m') || hasFlag('color=full')
	      || hasFlag('color=truecolor')) {
	    return 3;
	  }

	  if (hasFlag('color=256')) {
	    return 2;
	  }

	  if (stream && !stream.isTTY && forceColor !== true) {
	    return 0;
	  }

	  var min = forceColor ? 1 : 0;

	  if (process.platform === 'win32') {
	    // Node.js 7.5.0 is the first version of Node.js to include a patch to
	    // libuv that enables 256 color output on Windows. Anything earlier and it
	    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
	    // release, and Node.js 7 is not. Windows 10 build 10586 is the first
	    // Windows release that supports 256 colors. Windows 10 build 14931 is the
	    // first release that supports 16m/TrueColor.
	    var osRelease = os.release().split('.');
	    if (Number(process.versions.node.split('.')[0]) >= 8
	        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
	      return Number(osRelease[2]) >= 14931 ? 3 : 2;
	    }

	    return 1;
	  }

	  if ('CI' in env) {
	    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
	      return sign in env;
	    }) || env.CI_NAME === 'codeship') {
	      return 1;
	    }

	    return min;
	  }

	  if ('TEAMCITY_VERSION' in env) {
	    return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
	    );
	  }

	  if ('TERM_PROGRAM' in env) {
	    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

	    switch (env.TERM_PROGRAM) {
	      case 'iTerm.app':
	        return version >= 3 ? 3 : 2;
	      case 'Hyper':
	        return 3;
	      case 'Apple_Terminal':
	        return 2;
	      // No default
	    }
	  }

	  if (/-256(color)?$/i.test(env.TERM)) {
	    return 2;
	  }

	  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
	    return 1;
	  }

	  if ('COLORTERM' in env) {
	    return 1;
	  }

	  if (env.TERM === 'dumb') {
	    return min;
	  }

	  return min;
	}

	function getSupportLevel(stream) {
	  var level = supportsColor(stream);
	  return translateLevel(level);
	}

	supportsColors = {
	  supportsColor: getSupportLevel,
	  stdout: getSupportLevel(process.stdout),
	  stderr: getSupportLevel(process.stderr),
	};
	return supportsColors;
}

var trap = {exports: {}};

var hasRequiredTrap;

function requireTrap () {
	if (hasRequiredTrap) return trap.exports;
	hasRequiredTrap = 1;
	(function (module) {
		module['exports'] = function runTheTrap(text, options) {
		  var result = '';
		  text = text || 'Run the trap, drop the bass';
		  text = text.split('');
		  var trap = {
		    a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
		    b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
		    c: ['\u00a9', '\u023b', '\u03fe'],
		    d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
		    e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc',
		      '\u0a6c'],
		    f: ['\u04fa'],
		    g: ['\u0262'],
		    h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
		    i: ['\u0f0f'],
		    j: ['\u0134'],
		    k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
		    l: ['\u0139'],
		    m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
		    n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
		    o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd',
		      '\u06dd', '\u0e4f'],
		    p: ['\u01f7', '\u048e'],
		    q: ['\u09cd'],
		    r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
		    s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
		    t: ['\u0141', '\u0166', '\u0373'],
		    u: ['\u01b1', '\u054d'],
		    v: ['\u05d8'],
		    w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
		    x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
		    y: ['\u00a5', '\u04b0', '\u04cb'],
		    z: ['\u01b5', '\u0240'],
		  };
		  text.forEach(function(c) {
		    c = c.toLowerCase();
		    var chars = trap[c] || [' '];
		    var rand = Math.floor(Math.random() * chars.length);
		    if (typeof trap[c] !== 'undefined') {
		      result += trap[c][rand];
		    } else {
		      result += c;
		    }
		  });
		  return result;
		}; 
	} (trap));
	return trap.exports;
}

var zalgo = {exports: {}};

var hasRequiredZalgo;

function requireZalgo () {
	if (hasRequiredZalgo) return zalgo.exports;
	hasRequiredZalgo = 1;
	(function (module) {
		// please no
		module['exports'] = function zalgo(text, options) {
		  text = text || '   he is here   ';
		  var soul = {
		    'up': [
		      '̍', '̎', '̄', '̅',
		      '̿', '̑', '̆', '̐',
		      '͒', '͗', '͑', '̇',
		      '̈', '̊', '͂', '̓',
		      '̈', '͊', '͋', '͌',
		      '̃', '̂', '̌', '͐',
		      '̀', '́', '̋', '̏',
		      '̒', '̓', '̔', '̽',
		      '̉', 'ͣ', 'ͤ', 'ͥ',
		      'ͦ', 'ͧ', 'ͨ', 'ͩ',
		      'ͪ', 'ͫ', 'ͬ', 'ͭ',
		      'ͮ', 'ͯ', '̾', '͛',
		      '͆', '̚',
		    ],
		    'down': [
		      '̖', '̗', '̘', '̙',
		      '̜', '̝', '̞', '̟',
		      '̠', '̤', '̥', '̦',
		      '̩', '̪', '̫', '̬',
		      '̭', '̮', '̯', '̰',
		      '̱', '̲', '̳', '̹',
		      '̺', '̻', '̼', 'ͅ',
		      '͇', '͈', '͉', '͍',
		      '͎', '͓', '͔', '͕',
		      '͖', '͙', '͚', '̣',
		    ],
		    'mid': [
		      '̕', '̛', '̀', '́',
		      '͘', '̡', '̢', '̧',
		      '̨', '̴', '̵', '̶',
		      '͜', '͝', '͞',
		      '͟', '͠', '͢', '̸',
		      '̷', '͡', ' ҉',
		    ],
		  };
		  var all = [].concat(soul.up, soul.down, soul.mid);

		  function randomNumber(range) {
		    var r = Math.floor(Math.random() * range);
		    return r;
		  }

		  function isChar(character) {
		    var bool = false;
		    all.filter(function(i) {
		      bool = (i === character);
		    });
		    return bool;
		  }


		  function heComes(text, options) {
		    var result = '';
		    var counts;
		    var l;
		    options = options || {};
		    options['up'] =
		      typeof options['up'] !== 'undefined' ? options['up'] : true;
		    options['mid'] =
		      typeof options['mid'] !== 'undefined' ? options['mid'] : true;
		    options['down'] =
		      typeof options['down'] !== 'undefined' ? options['down'] : true;
		    options['size'] =
		      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
		    text = text.split('');
		    for (l in text) {
		      if (isChar(l)) {
		        continue;
		      }
		      result = result + text[l];
		      counts = {'up': 0, 'down': 0, 'mid': 0};
		      switch (options.size) {
		        case 'mini':
		          counts.up = randomNumber(8);
		          counts.mid = randomNumber(2);
		          counts.down = randomNumber(8);
		          break;
		        case 'maxi':
		          counts.up = randomNumber(16) + 3;
		          counts.mid = randomNumber(4) + 1;
		          counts.down = randomNumber(64) + 3;
		          break;
		        default:
		          counts.up = randomNumber(8) + 1;
		          counts.mid = randomNumber(6) / 2;
		          counts.down = randomNumber(8) + 1;
		          break;
		      }

		      var arr = ['up', 'mid', 'down'];
		      for (var d in arr) {
		        var index = arr[d];
		        for (var i = 0; i <= counts[index]; i++) {
		          if (options[index]) {
		            result = result + soul[index][randomNumber(soul[index].length)];
		          }
		        }
		      }
		    }
		    return result;
		  }
		  // don't summon him
		  return heComes(text, options);
		}; 
	} (zalgo));
	return zalgo.exports;
}

var america = {exports: {}};

var hasRequiredAmerica;

function requireAmerica () {
	if (hasRequiredAmerica) return america.exports;
	hasRequiredAmerica = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  return function(letter, i, exploded) {
		    if (letter === ' ') return letter;
		    switch (i%3) {
		      case 0: return colors.red(letter);
		      case 1: return colors.white(letter);
		      case 2: return colors.blue(letter);
		    }
		  };
		}; 
	} (america));
	return america.exports;
}

var zebra = {exports: {}};

var hasRequiredZebra;

function requireZebra () {
	if (hasRequiredZebra) return zebra.exports;
	hasRequiredZebra = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  return function(letter, i, exploded) {
		    return i % 2 === 0 ? letter : colors.inverse(letter);
		  };
		}; 
	} (zebra));
	return zebra.exports;
}

var rainbow = {exports: {}};

var hasRequiredRainbow;

function requireRainbow () {
	if (hasRequiredRainbow) return rainbow.exports;
	hasRequiredRainbow = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  // RoY G BiV
		  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
		  return function(letter, i, exploded) {
		    if (letter === ' ') {
		      return letter;
		    } else {
		      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
		    }
		  };
		}; 
	} (rainbow));
	return rainbow.exports;
}

var random = {exports: {}};

var hasRequiredRandom;

function requireRandom () {
	if (hasRequiredRandom) return random.exports;
	hasRequiredRandom = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
		    'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
		    'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
		  return function(letter, i, exploded) {
		    return letter === ' ' ? letter :
		      colors[
		          available[Math.round(Math.random() * (available.length - 2))]
		      ](letter);
		  };
		}; 
	} (random));
	return random.exports;
}

/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var hasRequiredColors;

function requireColors () {
	if (hasRequiredColors) return colors.exports;
	hasRequiredColors = 1;
	(function (module) {
		var colors = {};
		module['exports'] = colors;

		colors.themes = {};

		var util = require$$0$1;
		var ansiStyles = colors.styles = requireStyles();
		var defineProps = Object.defineProperties;
		var newLineRegex = new RegExp(/[\r\n]+/g);

		colors.supportsColor = requireSupportsColors().supportsColor;

		if (typeof colors.enabled === 'undefined') {
		  colors.enabled = colors.supportsColor() !== false;
		}

		colors.enable = function() {
		  colors.enabled = true;
		};

		colors.disable = function() {
		  colors.enabled = false;
		};

		colors.stripColors = colors.strip = function(str) {
		  return ('' + str).replace(/\x1B\[\d+m/g, '');
		};

		// eslint-disable-next-line no-unused-vars
		colors.stylize = function stylize(str, style) {
		  if (!colors.enabled) {
		    return str+'';
		  }

		  var styleMap = ansiStyles[style];

		  // Stylize should work for non-ANSI styles, too
		  if(!styleMap && style in colors){
		    // Style maps like trap operate as functions on strings;
		    // they don't have properties like open or close.
		    return colors[style](str);
		  }

		  return styleMap.open + str + styleMap.close;
		};

		var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
		var escapeStringRegexp = function(str) {
		  if (typeof str !== 'string') {
		    throw new TypeError('Expected a string');
		  }
		  return str.replace(matchOperatorsRe, '\\$&');
		};

		function build(_styles) {
		  var builder = function builder() {
		    return applyStyle.apply(builder, arguments);
		  };
		  builder._styles = _styles;
		  // __proto__ is used because we must return a function, but there is
		  // no way to create a function with a different prototype.
		  builder.__proto__ = proto;
		  return builder;
		}

		var styles = (function() {
		  var ret = {};
		  ansiStyles.grey = ansiStyles.gray;
		  Object.keys(ansiStyles).forEach(function(key) {
		    ansiStyles[key].closeRe =
		      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
		    ret[key] = {
		      get: function() {
		        return build(this._styles.concat(key));
		      },
		    };
		  });
		  return ret;
		})();

		var proto = defineProps(function colors() {}, styles);

		function applyStyle() {
		  var args = Array.prototype.slice.call(arguments);

		  var str = args.map(function(arg) {
		    // Use weak equality check so we can colorize null/undefined in safe mode
		    if (arg != null && arg.constructor === String) {
		      return arg;
		    } else {
		      return util.inspect(arg);
		    }
		  }).join(' ');

		  if (!colors.enabled || !str) {
		    return str;
		  }

		  var newLinesPresent = str.indexOf('\n') != -1;

		  var nestedStyles = this._styles;

		  var i = nestedStyles.length;
		  while (i--) {
		    var code = ansiStyles[nestedStyles[i]];
		    str = code.open + str.replace(code.closeRe, code.open) + code.close;
		    if (newLinesPresent) {
		      str = str.replace(newLineRegex, function(match) {
		        return code.close + match + code.open;
		      });
		    }
		  }

		  return str;
		}

		colors.setTheme = function(theme) {
		  if (typeof theme === 'string') {
		    console.log('colors.setTheme now only accepts an object, not a string.  ' +
		      'If you are trying to set a theme from a file, it is now your (the ' +
		      'caller\'s) responsibility to require the file.  The old syntax ' +
		      'looked like colors.setTheme(__dirname + ' +
		      '\'/../themes/generic-logging.js\'); The new syntax looks like '+
		      'colors.setTheme(require(__dirname + ' +
		      '\'/../themes/generic-logging.js\'));');
		    return;
		  }
		  for (var style in theme) {
		    (function(style) {
		      colors[style] = function(str) {
		        if (typeof theme[style] === 'object') {
		          var out = str;
		          for (var i in theme[style]) {
		            out = colors[theme[style][i]](out);
		          }
		          return out;
		        }
		        return colors[theme[style]](str);
		      };
		    })(style);
		  }
		};

		function init() {
		  var ret = {};
		  Object.keys(styles).forEach(function(name) {
		    ret[name] = {
		      get: function() {
		        return build([name]);
		      },
		    };
		  });
		  return ret;
		}

		var sequencer = function sequencer(map, str) {
		  var exploded = str.split('');
		  exploded = exploded.map(map);
		  return exploded.join('');
		};

		// custom formatter methods
		colors.trap = requireTrap();
		colors.zalgo = requireZalgo();

		// maps
		colors.maps = {};
		colors.maps.america = requireAmerica()(colors);
		colors.maps.zebra = requireZebra()(colors);
		colors.maps.rainbow = requireRainbow()(colors);
		colors.maps.random = requireRandom()(colors);

		for (var map in colors.maps) {
		  (function(map) {
		    colors[map] = function(str) {
		      return sequencer(colors.maps[map], str);
		    };
		  })(map);
		}

		defineProps(colors, init()); 
	} (colors));
	return colors.exports;
}

var extendStringPrototype = {exports: {}};

var hasRequiredExtendStringPrototype;

function requireExtendStringPrototype () {
	if (hasRequiredExtendStringPrototype) return extendStringPrototype.exports;
	hasRequiredExtendStringPrototype = 1;
	(function (module) {
		var colors = requireColors();

		module['exports'] = function() {
		  //
		  // Extends prototype of native string object to allow for "foo".red syntax
		  //
		  var addProperty = function(color, func) {
		    String.prototype.__defineGetter__(color, func);
		  };

		  addProperty('strip', function() {
		    return colors.strip(this);
		  });

		  addProperty('stripColors', function() {
		    return colors.strip(this);
		  });

		  addProperty('trap', function() {
		    return colors.trap(this);
		  });

		  addProperty('zalgo', function() {
		    return colors.zalgo(this);
		  });

		  addProperty('zebra', function() {
		    return colors.zebra(this);
		  });

		  addProperty('rainbow', function() {
		    return colors.rainbow(this);
		  });

		  addProperty('random', function() {
		    return colors.random(this);
		  });

		  addProperty('america', function() {
		    return colors.america(this);
		  });

		  //
		  // Iterate through all default styles and colors
		  //
		  var x = Object.keys(colors.styles);
		  x.forEach(function(style) {
		    addProperty(style, function() {
		      return colors.stylize(this, style);
		    });
		  });

		  function applyTheme(theme) {
		    //
		    // Remark: This is a list of methods that exist
		    // on String that you should not overwrite.
		    //
		    var stringPrototypeBlacklist = [
		      '__defineGetter__', '__defineSetter__', '__lookupGetter__',
		      '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty',
		      'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString',
		      'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length',
		      'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice',
		      'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
		      'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight',
		    ];

		    Object.keys(theme).forEach(function(prop) {
		      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
		        console.log('warn: '.red + ('String.prototype' + prop).magenta +
		          ' is probably something you don\'t want to override.  ' +
		          'Ignoring style name');
		      } else {
		        if (typeof(theme[prop]) === 'string') {
		          colors[prop] = colors[theme[prop]];
		          addProperty(prop, function() {
		            return colors[prop](this);
		          });
		        } else {
		          var themePropApplicator = function(str) {
		            var ret = str || this;
		            for (var t = 0; t < theme[prop].length; t++) {
		              ret = colors[theme[prop][t]](ret);
		            }
		            return ret;
		          };
		          addProperty(prop, themePropApplicator);
		          colors[prop] = function(str) {
		            return themePropApplicator(str);
		          };
		        }
		      }
		    });
		  }

		  colors.setTheme = function(theme) {
		    if (typeof theme === 'string') {
		      console.log('colors.setTheme now only accepts an object, not a string. ' +
		        'If you are trying to set a theme from a file, it is now your (the ' +
		        'caller\'s) responsibility to require the file.  The old syntax ' +
		        'looked like colors.setTheme(__dirname + ' +
		        '\'/../themes/generic-logging.js\'); The new syntax looks like '+
		        'colors.setTheme(require(__dirname + ' +
		        '\'/../themes/generic-logging.js\'));');
		      return;
		    } else {
		      applyTheme(theme);
		    }
		  };
		}; 
	} (extendStringPrototype));
	return extendStringPrototype.exports;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib.exports;
	hasRequiredLib = 1;
	(function (module) {
		var colors = requireColors();
		module['exports'] = colors;

		// Remark: By default, colors will add style properties to String.prototype.
		//
		// If you don't wish to extend String.prototype, you can do this instead and
		// native String will not be touched:
		//
		//   var colors = require('colors/safe);
		//   colors.red("foo")
		//
		//
		requireExtendStringPrototype()(); 
	} (lib));
	return lib.exports;
}

var ExpressionProcessor_1;
var hasRequiredExpressionProcessor;

function requireExpressionProcessor () {
	if (hasRequiredExpressionProcessor) return ExpressionProcessor_1;
	hasRequiredExpressionProcessor = 1;
	class ExpressionProcessor {
	  constructor() {
	    this.processors = [];
	  }

	  register(processor) {
	    this.processors.push(processor);
	  }

	  async evaluate(expression, object) {
	    const processor = this.processors.find(processor => processor.canHandle(expression));
	    if (!processor) {
	      throw new Error(`Cannot execute expression: ${expression}`);
	    }
	    return await processor.execute(expression, object);
	  }
	}

	ExpressionProcessor_1 = ExpressionProcessor;
	return ExpressionProcessor_1;
}

var cjs$1 = {};

var max = {};

var hasRequiredMax;

function requireMax () {
	if (hasRequiredMax) return max;
	hasRequiredMax = 1;
	Object.defineProperty(max, "__esModule", { value: true });
	max.default = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
	return max;
}

var nil = {};

var hasRequiredNil;

function requireNil () {
	if (hasRequiredNil) return nil;
	hasRequiredNil = 1;
	Object.defineProperty(nil, "__esModule", { value: true });
	nil.default = '00000000-0000-0000-0000-000000000000';
	return nil;
}

var parse = {};

var validate = {};

var regex = {};

var hasRequiredRegex;

function requireRegex () {
	if (hasRequiredRegex) return regex;
	hasRequiredRegex = 1;
	Object.defineProperty(regex, "__esModule", { value: true });
	regex.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
	return regex;
}

var hasRequiredValidate;

function requireValidate () {
	if (hasRequiredValidate) return validate;
	hasRequiredValidate = 1;
	Object.defineProperty(validate, "__esModule", { value: true });
	const regex_js_1 = requireRegex();
	function validate$1(uuid) {
	    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
	}
	validate.default = validate$1;
	return validate;
}

var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse;
	hasRequiredParse = 1;
	Object.defineProperty(parse, "__esModule", { value: true });
	const validate_js_1 = requireValidate();
	function parse$1(uuid) {
	    if (!(0, validate_js_1.default)(uuid)) {
	        throw TypeError('Invalid UUID');
	    }
	    let v;
	    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff, (v / 0x100000000) & 0xff, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
	}
	parse.default = parse$1;
	return parse;
}

var stringify = {};

var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify;
	hasRequiredStringify = 1;
	Object.defineProperty(stringify, "__esModule", { value: true });
	stringify.unsafeStringify = void 0;
	const validate_js_1 = requireValidate();
	const byteToHex = [];
	for (let i = 0; i < 256; ++i) {
	    byteToHex.push((i + 0x100).toString(16).slice(1));
	}
	function unsafeStringify(arr, offset = 0) {
	    return (byteToHex[arr[offset + 0]] +
	        byteToHex[arr[offset + 1]] +
	        byteToHex[arr[offset + 2]] +
	        byteToHex[arr[offset + 3]] +
	        '-' +
	        byteToHex[arr[offset + 4]] +
	        byteToHex[arr[offset + 5]] +
	        '-' +
	        byteToHex[arr[offset + 6]] +
	        byteToHex[arr[offset + 7]] +
	        '-' +
	        byteToHex[arr[offset + 8]] +
	        byteToHex[arr[offset + 9]] +
	        '-' +
	        byteToHex[arr[offset + 10]] +
	        byteToHex[arr[offset + 11]] +
	        byteToHex[arr[offset + 12]] +
	        byteToHex[arr[offset + 13]] +
	        byteToHex[arr[offset + 14]] +
	        byteToHex[arr[offset + 15]]).toLowerCase();
	}
	stringify.unsafeStringify = unsafeStringify;
	function stringify$1(arr, offset = 0) {
	    const uuid = unsafeStringify(arr, offset);
	    if (!(0, validate_js_1.default)(uuid)) {
	        throw TypeError('Stringified UUID is invalid');
	    }
	    return uuid;
	}
	stringify.default = stringify$1;
	return stringify;
}

var v1 = {};

var rng = {};

var hasRequiredRng;

function requireRng () {
	if (hasRequiredRng) return rng;
	hasRequiredRng = 1;
	Object.defineProperty(rng, "__esModule", { value: true });
	const crypto_1 = require$$0$2;
	const rnds8Pool = new Uint8Array(256);
	let poolPtr = rnds8Pool.length;
	function rng$1() {
	    if (poolPtr > rnds8Pool.length - 16) {
	        (0, crypto_1.randomFillSync)(rnds8Pool);
	        poolPtr = 0;
	    }
	    return rnds8Pool.slice(poolPtr, (poolPtr += 16));
	}
	rng.default = rng$1;
	return rng;
}

var hasRequiredV1;

function requireV1 () {
	if (hasRequiredV1) return v1;
	hasRequiredV1 = 1;
	Object.defineProperty(v1, "__esModule", { value: true });
	v1.updateV1State = void 0;
	const rng_js_1 = requireRng();
	const stringify_js_1 = requireStringify();
	const _state = {};
	function v1$1(options, buf, offset) {
	    let bytes;
	    const isV6 = options?._v6 ?? false;
	    if (options) {
	        const optionsKeys = Object.keys(options);
	        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
	            options = undefined;
	        }
	    }
	    if (options) {
	        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
	    }
	    else {
	        const now = Date.now();
	        const rnds = (0, rng_js_1.default)();
	        updateV1State(_state, now, rnds);
	        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
	    }
	    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
	}
	function updateV1State(state, now, rnds) {
	    state.msecs ??= -Infinity;
	    state.nsecs ??= 0;
	    if (now === state.msecs) {
	        state.nsecs++;
	        if (state.nsecs >= 10000) {
	            state.node = undefined;
	            state.nsecs = 0;
	        }
	    }
	    else if (now > state.msecs) {
	        state.nsecs = 0;
	    }
	    else if (now < state.msecs) {
	        state.node = undefined;
	    }
	    if (!state.node) {
	        state.node = rnds.slice(10, 16);
	        state.node[0] |= 0x01;
	        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
	    }
	    state.msecs = now;
	    return state;
	}
	v1.updateV1State = updateV1State;
	function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
	    if (rnds.length < 16) {
	        throw new Error('Random bytes length must be >= 16');
	    }
	    if (!buf) {
	        buf = new Uint8Array(16);
	        offset = 0;
	    }
	    else {
	        if (offset < 0 || offset + 16 > buf.length) {
	            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
	        }
	    }
	    msecs ??= Date.now();
	    nsecs ??= 0;
	    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
	    node ??= rnds.slice(10, 16);
	    msecs += 12219292800000;
	    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	    buf[offset++] = (tl >>> 24) & 0xff;
	    buf[offset++] = (tl >>> 16) & 0xff;
	    buf[offset++] = (tl >>> 8) & 0xff;
	    buf[offset++] = tl & 0xff;
	    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
	    buf[offset++] = (tmh >>> 8) & 0xff;
	    buf[offset++] = tmh & 0xff;
	    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
	    buf[offset++] = (tmh >>> 16) & 0xff;
	    buf[offset++] = (clockseq >>> 8) | 0x80;
	    buf[offset++] = clockseq & 0xff;
	    for (let n = 0; n < 6; ++n) {
	        buf[offset++] = node[n];
	    }
	    return buf;
	}
	v1.default = v1$1;
	return v1;
}

var v1ToV6 = {};

var hasRequiredV1ToV6;

function requireV1ToV6 () {
	if (hasRequiredV1ToV6) return v1ToV6;
	hasRequiredV1ToV6 = 1;
	Object.defineProperty(v1ToV6, "__esModule", { value: true });
	const parse_js_1 = requireParse();
	const stringify_js_1 = requireStringify();
	function v1ToV6$1(uuid) {
	    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
	    const v6Bytes = _v1ToV6(v1Bytes);
	    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
	}
	v1ToV6.default = v1ToV6$1;
	function _v1ToV6(v1Bytes) {
	    return Uint8Array.of(((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f), ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4), ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4), ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4), ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4), ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4), 0x60 | (v1Bytes[2] & 0x0f), v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
	}
	return v1ToV6;
}

var v3 = {};

var md5 = {};

var hasRequiredMd5;

function requireMd5 () {
	if (hasRequiredMd5) return md5;
	hasRequiredMd5 = 1;
	Object.defineProperty(md5, "__esModule", { value: true });
	const crypto_1 = require$$0$2;
	function md5$1(bytes) {
	    if (Array.isArray(bytes)) {
	        bytes = Buffer.from(bytes);
	    }
	    else if (typeof bytes === 'string') {
	        bytes = Buffer.from(bytes, 'utf8');
	    }
	    return (0, crypto_1.createHash)('md5').update(bytes).digest();
	}
	md5.default = md5$1;
	return md5;
}

var v35 = {};

var hasRequiredV35;

function requireV35 () {
	if (hasRequiredV35) return v35;
	hasRequiredV35 = 1;
	Object.defineProperty(v35, "__esModule", { value: true });
	v35.URL = v35.DNS = v35.stringToBytes = void 0;
	const parse_js_1 = requireParse();
	const stringify_js_1 = requireStringify();
	function stringToBytes(str) {
	    str = unescape(encodeURIComponent(str));
	    const bytes = new Uint8Array(str.length);
	    for (let i = 0; i < str.length; ++i) {
	        bytes[i] = str.charCodeAt(i);
	    }
	    return bytes;
	}
	v35.stringToBytes = stringToBytes;
	v35.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
	v35.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
	function v35$1(version, hash, value, namespace, buf, offset) {
	    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
	    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
	    if (typeof namespace === 'string') {
	        namespace = (0, parse_js_1.default)(namespace);
	    }
	    if (namespace?.length !== 16) {
	        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
	    }
	    let bytes = new Uint8Array(16 + valueBytes.length);
	    bytes.set(namespaceBytes);
	    bytes.set(valueBytes, namespaceBytes.length);
	    bytes = hash(bytes);
	    bytes[6] = (bytes[6] & 0x0f) | version;
	    bytes[8] = (bytes[8] & 0x3f) | 0x80;
	    if (buf) {
	        offset = offset || 0;
	        for (let i = 0; i < 16; ++i) {
	            buf[offset + i] = bytes[i];
	        }
	        return buf;
	    }
	    return (0, stringify_js_1.unsafeStringify)(bytes);
	}
	v35.default = v35$1;
	return v35;
}

var hasRequiredV3;

function requireV3 () {
	if (hasRequiredV3) return v3;
	hasRequiredV3 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.URL = exports.DNS = void 0;
		const md5_js_1 = requireMd5();
		const v35_js_1 = requireV35();
		var v35_js_2 = requireV35();
		Object.defineProperty(exports, "DNS", { enumerable: true, get: function () { return v35_js_2.DNS; } });
		Object.defineProperty(exports, "URL", { enumerable: true, get: function () { return v35_js_2.URL; } });
		function v3(value, namespace, buf, offset) {
		    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
		}
		v3.DNS = v35_js_1.DNS;
		v3.URL = v35_js_1.URL;
		exports.default = v3; 
	} (v3));
	return v3;
}

var v4 = {};

var native = {};

var hasRequiredNative;

function requireNative () {
	if (hasRequiredNative) return native;
	hasRequiredNative = 1;
	Object.defineProperty(native, "__esModule", { value: true });
	const crypto_1 = require$$0$2;
	native.default = { randomUUID: crypto_1.randomUUID };
	return native;
}

var hasRequiredV4;

function requireV4 () {
	if (hasRequiredV4) return v4;
	hasRequiredV4 = 1;
	Object.defineProperty(v4, "__esModule", { value: true });
	const native_js_1 = requireNative();
	const rng_js_1 = requireRng();
	const stringify_js_1 = requireStringify();
	function v4$1(options, buf, offset) {
	    if (native_js_1.default.randomUUID && !buf && !options) {
	        return native_js_1.default.randomUUID();
	    }
	    options = options || {};
	    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
	    if (rnds.length < 16) {
	        throw new Error('Random bytes length must be >= 16');
	    }
	    rnds[6] = (rnds[6] & 0x0f) | 0x40;
	    rnds[8] = (rnds[8] & 0x3f) | 0x80;
	    if (buf) {
	        offset = offset || 0;
	        if (offset < 0 || offset + 16 > buf.length) {
	            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
	        }
	        for (let i = 0; i < 16; ++i) {
	            buf[offset + i] = rnds[i];
	        }
	        return buf;
	    }
	    return (0, stringify_js_1.unsafeStringify)(rnds);
	}
	v4.default = v4$1;
	return v4;
}

var v5 = {};

var sha1 = {};

var hasRequiredSha1;

function requireSha1 () {
	if (hasRequiredSha1) return sha1;
	hasRequiredSha1 = 1;
	Object.defineProperty(sha1, "__esModule", { value: true });
	const crypto_1 = require$$0$2;
	function sha1$1(bytes) {
	    if (Array.isArray(bytes)) {
	        bytes = Buffer.from(bytes);
	    }
	    else if (typeof bytes === 'string') {
	        bytes = Buffer.from(bytes, 'utf8');
	    }
	    return (0, crypto_1.createHash)('sha1').update(bytes).digest();
	}
	sha1.default = sha1$1;
	return sha1;
}

var hasRequiredV5;

function requireV5 () {
	if (hasRequiredV5) return v5;
	hasRequiredV5 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.URL = exports.DNS = void 0;
		const sha1_js_1 = requireSha1();
		const v35_js_1 = requireV35();
		var v35_js_2 = requireV35();
		Object.defineProperty(exports, "DNS", { enumerable: true, get: function () { return v35_js_2.DNS; } });
		Object.defineProperty(exports, "URL", { enumerable: true, get: function () { return v35_js_2.URL; } });
		function v5(value, namespace, buf, offset) {
		    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
		}
		v5.DNS = v35_js_1.DNS;
		v5.URL = v35_js_1.URL;
		exports.default = v5; 
	} (v5));
	return v5;
}

var v6 = {};

var hasRequiredV6;

function requireV6 () {
	if (hasRequiredV6) return v6;
	hasRequiredV6 = 1;
	Object.defineProperty(v6, "__esModule", { value: true });
	const stringify_js_1 = requireStringify();
	const v1_js_1 = requireV1();
	const v1ToV6_js_1 = requireV1ToV6();
	function v6$1(options, buf, offset) {
	    options ??= {};
	    offset ??= 0;
	    let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
	    bytes = (0, v1ToV6_js_1.default)(bytes);
	    if (buf) {
	        for (let i = 0; i < 16; i++) {
	            buf[offset + i] = bytes[i];
	        }
	        return buf;
	    }
	    return (0, stringify_js_1.unsafeStringify)(bytes);
	}
	v6.default = v6$1;
	return v6;
}

var v6ToV1 = {};

var hasRequiredV6ToV1;

function requireV6ToV1 () {
	if (hasRequiredV6ToV1) return v6ToV1;
	hasRequiredV6ToV1 = 1;
	Object.defineProperty(v6ToV1, "__esModule", { value: true });
	const parse_js_1 = requireParse();
	const stringify_js_1 = requireStringify();
	function v6ToV1$1(uuid) {
	    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
	    const v1Bytes = _v6ToV1(v6Bytes);
	    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
	}
	v6ToV1.default = v6ToV1$1;
	function _v6ToV1(v6Bytes) {
	    return Uint8Array.of(((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f), ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4), ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f), v6Bytes[7], ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4), ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4), 0x10 | ((v6Bytes[0] & 0xf0) >> 4), ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4), v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
	}
	return v6ToV1;
}

var v7 = {};

var hasRequiredV7;

function requireV7 () {
	if (hasRequiredV7) return v7;
	hasRequiredV7 = 1;
	Object.defineProperty(v7, "__esModule", { value: true });
	v7.updateV7State = void 0;
	const rng_js_1 = requireRng();
	const stringify_js_1 = requireStringify();
	const _state = {};
	function v7$1(options, buf, offset) {
	    let bytes;
	    if (options) {
	        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
	    }
	    else {
	        const now = Date.now();
	        const rnds = (0, rng_js_1.default)();
	        updateV7State(_state, now, rnds);
	        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
	    }
	    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
	}
	function updateV7State(state, now, rnds) {
	    state.msecs ??= -Infinity;
	    state.seq ??= 0;
	    if (now > state.msecs) {
	        state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
	        state.msecs = now;
	    }
	    else {
	        state.seq = (state.seq + 1) | 0;
	        if (state.seq === 0) {
	            state.msecs++;
	        }
	    }
	    return state;
	}
	v7.updateV7State = updateV7State;
	function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
	    if (rnds.length < 16) {
	        throw new Error('Random bytes length must be >= 16');
	    }
	    if (!buf) {
	        buf = new Uint8Array(16);
	        offset = 0;
	    }
	    else {
	        if (offset < 0 || offset + 16 > buf.length) {
	            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
	        }
	    }
	    msecs ??= Date.now();
	    seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
	    buf[offset++] = (msecs / 0x10000000000) & 0xff;
	    buf[offset++] = (msecs / 0x100000000) & 0xff;
	    buf[offset++] = (msecs / 0x1000000) & 0xff;
	    buf[offset++] = (msecs / 0x10000) & 0xff;
	    buf[offset++] = (msecs / 0x100) & 0xff;
	    buf[offset++] = msecs & 0xff;
	    buf[offset++] = 0x70 | ((seq >>> 28) & 0x0f);
	    buf[offset++] = (seq >>> 20) & 0xff;
	    buf[offset++] = 0x80 | ((seq >>> 14) & 0x3f);
	    buf[offset++] = (seq >>> 6) & 0xff;
	    buf[offset++] = ((seq << 2) & 0xff) | (rnds[10] & 0x03);
	    buf[offset++] = rnds[11];
	    buf[offset++] = rnds[12];
	    buf[offset++] = rnds[13];
	    buf[offset++] = rnds[14];
	    buf[offset++] = rnds[15];
	    return buf;
	}
	v7.default = v7$1;
	return v7;
}

var version = {};

var hasRequiredVersion;

function requireVersion () {
	if (hasRequiredVersion) return version;
	hasRequiredVersion = 1;
	Object.defineProperty(version, "__esModule", { value: true });
	const validate_js_1 = requireValidate();
	function version$1(uuid) {
	    if (!(0, validate_js_1.default)(uuid)) {
	        throw TypeError('Invalid UUID');
	    }
	    return parseInt(uuid.slice(14, 15), 16);
	}
	version.default = version$1;
	return version;
}

var hasRequiredCjs$1;

function requireCjs$1 () {
	if (hasRequiredCjs$1) return cjs$1;
	hasRequiredCjs$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
		var max_js_1 = requireMax();
		Object.defineProperty(exports, "MAX", { enumerable: true, get: function () { return max_js_1.default; } });
		var nil_js_1 = requireNil();
		Object.defineProperty(exports, "NIL", { enumerable: true, get: function () { return nil_js_1.default; } });
		var parse_js_1 = requireParse();
		Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_js_1.default; } });
		var stringify_js_1 = requireStringify();
		Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return stringify_js_1.default; } });
		var v1_js_1 = requireV1();
		Object.defineProperty(exports, "v1", { enumerable: true, get: function () { return v1_js_1.default; } });
		var v1ToV6_js_1 = requireV1ToV6();
		Object.defineProperty(exports, "v1ToV6", { enumerable: true, get: function () { return v1ToV6_js_1.default; } });
		var v3_js_1 = requireV3();
		Object.defineProperty(exports, "v3", { enumerable: true, get: function () { return v3_js_1.default; } });
		var v4_js_1 = requireV4();
		Object.defineProperty(exports, "v4", { enumerable: true, get: function () { return v4_js_1.default; } });
		var v5_js_1 = requireV5();
		Object.defineProperty(exports, "v5", { enumerable: true, get: function () { return v5_js_1.default; } });
		var v6_js_1 = requireV6();
		Object.defineProperty(exports, "v6", { enumerable: true, get: function () { return v6_js_1.default; } });
		var v6ToV1_js_1 = requireV6ToV1();
		Object.defineProperty(exports, "v6ToV1", { enumerable: true, get: function () { return v6ToV1_js_1.default; } });
		var v7_js_1 = requireV7();
		Object.defineProperty(exports, "v7", { enumerable: true, get: function () { return v7_js_1.default; } });
		var validate_js_1 = requireValidate();
		Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return validate_js_1.default; } });
		var version_js_1 = requireVersion();
		Object.defineProperty(exports, "version", { enumerable: true, get: function () { return version_js_1.default; } }); 
	} (cjs$1));
	return cjs$1;
}

var UuidExpression_1;
var hasRequiredUuidExpression;

function requireUuidExpression () {
	if (hasRequiredUuidExpression) return UuidExpression_1;
	hasRequiredUuidExpression = 1;
	const { v4: uuid } = /*@__PURE__*/ requireCjs$1();

	class UuidExpression {
	  canHandle(expression) {
	    return expression === "uuid()";
	  }

	  async execute() {
	    return uuid();
	  }
	}

	UuidExpression_1 = UuidExpression;
	return UuidExpression_1;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var moment$1 = {exports: {}};

var moment = moment$1.exports;

var hasRequiredMoment;

function requireMoment () {
	if (hasRequiredMoment) return moment$1.exports;
	hasRequiredMoment = 1;
	(function (module, exports) {
(function (global, factory) {
		    module.exports = factory() ;
		}(moment, (function () {
		    var hookCallback;

		    function hooks() {
		        return hookCallback.apply(null, arguments);
		    }

		    // This is done to register the method called with moment()
		    // without creating circular dependencies.
		    function setHookCallback(callback) {
		        hookCallback = callback;
		    }

		    function isArray(input) {
		        return (
		            input instanceof Array ||
		            Object.prototype.toString.call(input) === '[object Array]'
		        );
		    }

		    function isObject(input) {
		        // IE8 will treat undefined and null as object if it wasn't for
		        // input != null
		        return (
		            input != null &&
		            Object.prototype.toString.call(input) === '[object Object]'
		        );
		    }

		    function hasOwnProp(a, b) {
		        return Object.prototype.hasOwnProperty.call(a, b);
		    }

		    function isObjectEmpty(obj) {
		        if (Object.getOwnPropertyNames) {
		            return Object.getOwnPropertyNames(obj).length === 0;
		        } else {
		            var k;
		            for (k in obj) {
		                if (hasOwnProp(obj, k)) {
		                    return false;
		                }
		            }
		            return true;
		        }
		    }

		    function isUndefined(input) {
		        return input === void 0;
		    }

		    function isNumber(input) {
		        return (
		            typeof input === 'number' ||
		            Object.prototype.toString.call(input) === '[object Number]'
		        );
		    }

		    function isDate(input) {
		        return (
		            input instanceof Date ||
		            Object.prototype.toString.call(input) === '[object Date]'
		        );
		    }

		    function map(arr, fn) {
		        var res = [],
		            i,
		            arrLen = arr.length;
		        for (i = 0; i < arrLen; ++i) {
		            res.push(fn(arr[i], i));
		        }
		        return res;
		    }

		    function extend(a, b) {
		        for (var i in b) {
		            if (hasOwnProp(b, i)) {
		                a[i] = b[i];
		            }
		        }

		        if (hasOwnProp(b, 'toString')) {
		            a.toString = b.toString;
		        }

		        if (hasOwnProp(b, 'valueOf')) {
		            a.valueOf = b.valueOf;
		        }

		        return a;
		    }

		    function createUTC(input, format, locale, strict) {
		        return createLocalOrUTC(input, format, locale, strict, true).utc();
		    }

		    function defaultParsingFlags() {
		        // We need to deep clone this object.
		        return {
		            empty: false,
		            unusedTokens: [],
		            unusedInput: [],
		            overflow: -2,
		            charsLeftOver: 0,
		            nullInput: false,
		            invalidEra: null,
		            invalidMonth: null,
		            invalidFormat: false,
		            userInvalidated: false,
		            iso: false,
		            parsedDateParts: [],
		            era: null,
		            meridiem: null,
		            rfc2822: false,
		            weekdayMismatch: false,
		        };
		    }

		    function getParsingFlags(m) {
		        if (m._pf == null) {
		            m._pf = defaultParsingFlags();
		        }
		        return m._pf;
		    }

		    var some;
		    if (Array.prototype.some) {
		        some = Array.prototype.some;
		    } else {
		        some = function (fun) {
		            var t = Object(this),
		                len = t.length >>> 0,
		                i;

		            for (i = 0; i < len; i++) {
		                if (i in t && fun.call(this, t[i], i, t)) {
		                    return true;
		                }
		            }

		            return false;
		        };
		    }

		    function isValid(m) {
		        var flags = null,
		            parsedParts = false,
		            isNowValid = m._d && !isNaN(m._d.getTime());
		        if (isNowValid) {
		            flags = getParsingFlags(m);
		            parsedParts = some.call(flags.parsedDateParts, function (i) {
		                return i != null;
		            });
		            isNowValid =
		                flags.overflow < 0 &&
		                !flags.empty &&
		                !flags.invalidEra &&
		                !flags.invalidMonth &&
		                !flags.invalidWeekday &&
		                !flags.weekdayMismatch &&
		                !flags.nullInput &&
		                !flags.invalidFormat &&
		                !flags.userInvalidated &&
		                (!flags.meridiem || (flags.meridiem && parsedParts));
		            if (m._strict) {
		                isNowValid =
		                    isNowValid &&
		                    flags.charsLeftOver === 0 &&
		                    flags.unusedTokens.length === 0 &&
		                    flags.bigHour === undefined;
		            }
		        }
		        if (Object.isFrozen == null || !Object.isFrozen(m)) {
		            m._isValid = isNowValid;
		        } else {
		            return isNowValid;
		        }
		        return m._isValid;
		    }

		    function createInvalid(flags) {
		        var m = createUTC(NaN);
		        if (flags != null) {
		            extend(getParsingFlags(m), flags);
		        } else {
		            getParsingFlags(m).userInvalidated = true;
		        }

		        return m;
		    }

		    // Plugins that add properties should also add the key here (null value),
		    // so we can properly clone ourselves.
		    var momentProperties = (hooks.momentProperties = []),
		        updateInProgress = false;

		    function copyConfig(to, from) {
		        var i,
		            prop,
		            val,
		            momentPropertiesLen = momentProperties.length;

		        if (!isUndefined(from._isAMomentObject)) {
		            to._isAMomentObject = from._isAMomentObject;
		        }
		        if (!isUndefined(from._i)) {
		            to._i = from._i;
		        }
		        if (!isUndefined(from._f)) {
		            to._f = from._f;
		        }
		        if (!isUndefined(from._l)) {
		            to._l = from._l;
		        }
		        if (!isUndefined(from._strict)) {
		            to._strict = from._strict;
		        }
		        if (!isUndefined(from._tzm)) {
		            to._tzm = from._tzm;
		        }
		        if (!isUndefined(from._isUTC)) {
		            to._isUTC = from._isUTC;
		        }
		        if (!isUndefined(from._offset)) {
		            to._offset = from._offset;
		        }
		        if (!isUndefined(from._pf)) {
		            to._pf = getParsingFlags(from);
		        }
		        if (!isUndefined(from._locale)) {
		            to._locale = from._locale;
		        }

		        if (momentPropertiesLen > 0) {
		            for (i = 0; i < momentPropertiesLen; i++) {
		                prop = momentProperties[i];
		                val = from[prop];
		                if (!isUndefined(val)) {
		                    to[prop] = val;
		                }
		            }
		        }

		        return to;
		    }

		    // Moment prototype object
		    function Moment(config) {
		        copyConfig(this, config);
		        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
		        if (!this.isValid()) {
		            this._d = new Date(NaN);
		        }
		        // Prevent infinite loop in case updateOffset creates new moment
		        // objects.
		        if (updateInProgress === false) {
		            updateInProgress = true;
		            hooks.updateOffset(this);
		            updateInProgress = false;
		        }
		    }

		    function isMoment(obj) {
		        return (
		            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
		        );
		    }

		    function warn(msg) {
		        if (
		            hooks.suppressDeprecationWarnings === false &&
		            typeof console !== 'undefined' &&
		            console.warn
		        ) {
		            console.warn('Deprecation warning: ' + msg);
		        }
		    }

		    function deprecate(msg, fn) {
		        var firstTime = true;

		        return extend(function () {
		            if (hooks.deprecationHandler != null) {
		                hooks.deprecationHandler(null, msg);
		            }
		            if (firstTime) {
		                var args = [],
		                    arg,
		                    i,
		                    key,
		                    argLen = arguments.length;
		                for (i = 0; i < argLen; i++) {
		                    arg = '';
		                    if (typeof arguments[i] === 'object') {
		                        arg += '\n[' + i + '] ';
		                        for (key in arguments[0]) {
		                            if (hasOwnProp(arguments[0], key)) {
		                                arg += key + ': ' + arguments[0][key] + ', ';
		                            }
		                        }
		                        arg = arg.slice(0, -2); // Remove trailing comma and space
		                    } else {
		                        arg = arguments[i];
		                    }
		                    args.push(arg);
		                }
		                warn(
		                    msg +
		                        '\nArguments: ' +
		                        Array.prototype.slice.call(args).join('') +
		                        '\n' +
		                        new Error().stack
		                );
		                firstTime = false;
		            }
		            return fn.apply(this, arguments);
		        }, fn);
		    }

		    var deprecations = {};

		    function deprecateSimple(name, msg) {
		        if (hooks.deprecationHandler != null) {
		            hooks.deprecationHandler(name, msg);
		        }
		        if (!deprecations[name]) {
		            warn(msg);
		            deprecations[name] = true;
		        }
		    }

		    hooks.suppressDeprecationWarnings = false;
		    hooks.deprecationHandler = null;

		    function isFunction(input) {
		        return (
		            (typeof Function !== 'undefined' && input instanceof Function) ||
		            Object.prototype.toString.call(input) === '[object Function]'
		        );
		    }

		    function set(config) {
		        var prop, i;
		        for (i in config) {
		            if (hasOwnProp(config, i)) {
		                prop = config[i];
		                if (isFunction(prop)) {
		                    this[i] = prop;
		                } else {
		                    this['_' + i] = prop;
		                }
		            }
		        }
		        this._config = config;
		        // Lenient ordinal parsing accepts just a number in addition to
		        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
		        // TODO: Remove "ordinalParse" fallback in next major release.
		        this._dayOfMonthOrdinalParseLenient = new RegExp(
		            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
		                '|' +
		                /\d{1,2}/.source
		        );
		    }

		    function mergeConfigs(parentConfig, childConfig) {
		        var res = extend({}, parentConfig),
		            prop;
		        for (prop in childConfig) {
		            if (hasOwnProp(childConfig, prop)) {
		                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
		                    res[prop] = {};
		                    extend(res[prop], parentConfig[prop]);
		                    extend(res[prop], childConfig[prop]);
		                } else if (childConfig[prop] != null) {
		                    res[prop] = childConfig[prop];
		                } else {
		                    delete res[prop];
		                }
		            }
		        }
		        for (prop in parentConfig) {
		            if (
		                hasOwnProp(parentConfig, prop) &&
		                !hasOwnProp(childConfig, prop) &&
		                isObject(parentConfig[prop])
		            ) {
		                // make sure changes to properties don't modify parent config
		                res[prop] = extend({}, res[prop]);
		            }
		        }
		        return res;
		    }

		    function Locale(config) {
		        if (config != null) {
		            this.set(config);
		        }
		    }

		    var keys;

		    if (Object.keys) {
		        keys = Object.keys;
		    } else {
		        keys = function (obj) {
		            var i,
		                res = [];
		            for (i in obj) {
		                if (hasOwnProp(obj, i)) {
		                    res.push(i);
		                }
		            }
		            return res;
		        };
		    }

		    var defaultCalendar = {
		        sameDay: '[Today at] LT',
		        nextDay: '[Tomorrow at] LT',
		        nextWeek: 'dddd [at] LT',
		        lastDay: '[Yesterday at] LT',
		        lastWeek: '[Last] dddd [at] LT',
		        sameElse: 'L',
		    };

		    function calendar(key, mom, now) {
		        var output = this._calendar[key] || this._calendar['sameElse'];
		        return isFunction(output) ? output.call(mom, now) : output;
		    }

		    function zeroFill(number, targetLength, forceSign) {
		        var absNumber = '' + Math.abs(number),
		            zerosToFill = targetLength - absNumber.length,
		            sign = number >= 0;
		        return (
		            (sign ? (forceSign ? '+' : '') : '-') +
		            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
		            absNumber
		        );
		    }

		    var formattingTokens =
		            /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
		        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
		        formatFunctions = {},
		        formatTokenFunctions = {};

		    // token:    'M'
		    // padded:   ['MM', 2]
		    // ordinal:  'Mo'
		    // callback: function () { this.month() + 1 }
		    function addFormatToken(token, padded, ordinal, callback) {
		        var func = callback;
		        if (typeof callback === 'string') {
		            func = function () {
		                return this[callback]();
		            };
		        }
		        if (token) {
		            formatTokenFunctions[token] = func;
		        }
		        if (padded) {
		            formatTokenFunctions[padded[0]] = function () {
		                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
		            };
		        }
		        if (ordinal) {
		            formatTokenFunctions[ordinal] = function () {
		                return this.localeData().ordinal(
		                    func.apply(this, arguments),
		                    token
		                );
		            };
		        }
		    }

		    function removeFormattingTokens(input) {
		        if (input.match(/\[[\s\S]/)) {
		            return input.replace(/^\[|\]$/g, '');
		        }
		        return input.replace(/\\/g, '');
		    }

		    function makeFormatFunction(format) {
		        var array = format.match(formattingTokens),
		            i,
		            length;

		        for (i = 0, length = array.length; i < length; i++) {
		            if (formatTokenFunctions[array[i]]) {
		                array[i] = formatTokenFunctions[array[i]];
		            } else {
		                array[i] = removeFormattingTokens(array[i]);
		            }
		        }

		        return function (mom) {
		            var output = '',
		                i;
		            for (i = 0; i < length; i++) {
		                output += isFunction(array[i])
		                    ? array[i].call(mom, format)
		                    : array[i];
		            }
		            return output;
		        };
		    }

		    // format date using native date object
		    function formatMoment(m, format) {
		        if (!m.isValid()) {
		            return m.localeData().invalidDate();
		        }

		        format = expandFormat(format, m.localeData());
		        formatFunctions[format] =
		            formatFunctions[format] || makeFormatFunction(format);

		        return formatFunctions[format](m);
		    }

		    function expandFormat(format, locale) {
		        var i = 5;

		        function replaceLongDateFormatTokens(input) {
		            return locale.longDateFormat(input) || input;
		        }

		        localFormattingTokens.lastIndex = 0;
		        while (i >= 0 && localFormattingTokens.test(format)) {
		            format = format.replace(
		                localFormattingTokens,
		                replaceLongDateFormatTokens
		            );
		            localFormattingTokens.lastIndex = 0;
		            i -= 1;
		        }

		        return format;
		    }

		    var defaultLongDateFormat = {
		        LTS: 'h:mm:ss A',
		        LT: 'h:mm A',
		        L: 'MM/DD/YYYY',
		        LL: 'MMMM D, YYYY',
		        LLL: 'MMMM D, YYYY h:mm A',
		        LLLL: 'dddd, MMMM D, YYYY h:mm A',
		    };

		    function longDateFormat(key) {
		        var format = this._longDateFormat[key],
		            formatUpper = this._longDateFormat[key.toUpperCase()];

		        if (format || !formatUpper) {
		            return format;
		        }

		        this._longDateFormat[key] = formatUpper
		            .match(formattingTokens)
		            .map(function (tok) {
		                if (
		                    tok === 'MMMM' ||
		                    tok === 'MM' ||
		                    tok === 'DD' ||
		                    tok === 'dddd'
		                ) {
		                    return tok.slice(1);
		                }
		                return tok;
		            })
		            .join('');

		        return this._longDateFormat[key];
		    }

		    var defaultInvalidDate = 'Invalid date';

		    function invalidDate() {
		        return this._invalidDate;
		    }

		    var defaultOrdinal = '%d',
		        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

		    function ordinal(number) {
		        return this._ordinal.replace('%d', number);
		    }

		    var defaultRelativeTime = {
		        future: 'in %s',
		        past: '%s ago',
		        s: 'a few seconds',
		        ss: '%d seconds',
		        m: 'a minute',
		        mm: '%d minutes',
		        h: 'an hour',
		        hh: '%d hours',
		        d: 'a day',
		        dd: '%d days',
		        w: 'a week',
		        ww: '%d weeks',
		        M: 'a month',
		        MM: '%d months',
		        y: 'a year',
		        yy: '%d years',
		    };

		    function relativeTime(number, withoutSuffix, string, isFuture) {
		        var output = this._relativeTime[string];
		        return isFunction(output)
		            ? output(number, withoutSuffix, string, isFuture)
		            : output.replace(/%d/i, number);
		    }

		    function pastFuture(diff, output) {
		        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
		        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
		    }

		    var aliases = {
		        D: 'date',
		        dates: 'date',
		        date: 'date',
		        d: 'day',
		        days: 'day',
		        day: 'day',
		        e: 'weekday',
		        weekdays: 'weekday',
		        weekday: 'weekday',
		        E: 'isoWeekday',
		        isoweekdays: 'isoWeekday',
		        isoweekday: 'isoWeekday',
		        DDD: 'dayOfYear',
		        dayofyears: 'dayOfYear',
		        dayofyear: 'dayOfYear',
		        h: 'hour',
		        hours: 'hour',
		        hour: 'hour',
		        ms: 'millisecond',
		        milliseconds: 'millisecond',
		        millisecond: 'millisecond',
		        m: 'minute',
		        minutes: 'minute',
		        minute: 'minute',
		        M: 'month',
		        months: 'month',
		        month: 'month',
		        Q: 'quarter',
		        quarters: 'quarter',
		        quarter: 'quarter',
		        s: 'second',
		        seconds: 'second',
		        second: 'second',
		        gg: 'weekYear',
		        weekyears: 'weekYear',
		        weekyear: 'weekYear',
		        GG: 'isoWeekYear',
		        isoweekyears: 'isoWeekYear',
		        isoweekyear: 'isoWeekYear',
		        w: 'week',
		        weeks: 'week',
		        week: 'week',
		        W: 'isoWeek',
		        isoweeks: 'isoWeek',
		        isoweek: 'isoWeek',
		        y: 'year',
		        years: 'year',
		        year: 'year',
		    };

		    function normalizeUnits(units) {
		        return typeof units === 'string'
		            ? aliases[units] || aliases[units.toLowerCase()]
		            : undefined;
		    }

		    function normalizeObjectUnits(inputObject) {
		        var normalizedInput = {},
		            normalizedProp,
		            prop;

		        for (prop in inputObject) {
		            if (hasOwnProp(inputObject, prop)) {
		                normalizedProp = normalizeUnits(prop);
		                if (normalizedProp) {
		                    normalizedInput[normalizedProp] = inputObject[prop];
		                }
		            }
		        }

		        return normalizedInput;
		    }

		    var priorities = {
		        date: 9,
		        day: 11,
		        weekday: 11,
		        isoWeekday: 11,
		        dayOfYear: 4,
		        hour: 13,
		        millisecond: 16,
		        minute: 14,
		        month: 8,
		        quarter: 7,
		        second: 15,
		        weekYear: 1,
		        isoWeekYear: 1,
		        week: 5,
		        isoWeek: 5,
		        year: 1,
		    };

		    function getPrioritizedUnits(unitsObj) {
		        var units = [],
		            u;
		        for (u in unitsObj) {
		            if (hasOwnProp(unitsObj, u)) {
		                units.push({ unit: u, priority: priorities[u] });
		            }
		        }
		        units.sort(function (a, b) {
		            return a.priority - b.priority;
		        });
		        return units;
		    }

		    var match1 = /\d/, //       0 - 9
		        match2 = /\d\d/, //      00 - 99
		        match3 = /\d{3}/, //     000 - 999
		        match4 = /\d{4}/, //    0000 - 9999
		        match6 = /[+-]?\d{6}/, // -999999 - 999999
		        match1to2 = /\d\d?/, //       0 - 99
		        match3to4 = /\d\d\d\d?/, //     999 - 9999
		        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
		        match1to3 = /\d{1,3}/, //       0 - 999
		        match1to4 = /\d{1,4}/, //       0 - 9999
		        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
		        matchUnsigned = /\d+/, //       0 - inf
		        matchSigned = /[+-]?\d+/, //    -inf - inf
		        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
		        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
		        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
		        // any word (or two) characters or numbers including two/three word month in arabic.
		        // includes scottish gaelic two word and hyphenated months
		        matchWord =
		            /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
		        match1to2NoLeadingZero = /^[1-9]\d?/, //         1-99
		        match1to2HasZero = /^([1-9]\d|\d)/, //           0-99
		        regexes;

		    regexes = {};

		    function addRegexToken(token, regex, strictRegex) {
		        regexes[token] = isFunction(regex)
		            ? regex
		            : function (isStrict, localeData) {
		                  return isStrict && strictRegex ? strictRegex : regex;
		              };
		    }

		    function getParseRegexForToken(token, config) {
		        if (!hasOwnProp(regexes, token)) {
		            return new RegExp(unescapeFormat(token));
		        }

		        return regexes[token](config._strict, config._locale);
		    }

		    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
		    function unescapeFormat(s) {
		        return regexEscape(
		            s
		                .replace('\\', '')
		                .replace(
		                    /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
		                    function (matched, p1, p2, p3, p4) {
		                        return p1 || p2 || p3 || p4;
		                    }
		                )
		        );
		    }

		    function regexEscape(s) {
		        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		    }

		    function absFloor(number) {
		        if (number < 0) {
		            // -0 -> 0
		            return Math.ceil(number) || 0;
		        } else {
		            return Math.floor(number);
		        }
		    }

		    function toInt(argumentForCoercion) {
		        var coercedNumber = +argumentForCoercion,
		            value = 0;

		        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
		            value = absFloor(coercedNumber);
		        }

		        return value;
		    }

		    var tokens = {};

		    function addParseToken(token, callback) {
		        var i,
		            func = callback,
		            tokenLen;
		        if (typeof token === 'string') {
		            token = [token];
		        }
		        if (isNumber(callback)) {
		            func = function (input, array) {
		                array[callback] = toInt(input);
		            };
		        }
		        tokenLen = token.length;
		        for (i = 0; i < tokenLen; i++) {
		            tokens[token[i]] = func;
		        }
		    }

		    function addWeekParseToken(token, callback) {
		        addParseToken(token, function (input, array, config, token) {
		            config._w = config._w || {};
		            callback(input, config._w, config, token);
		        });
		    }

		    function addTimeToArrayFromToken(token, input, config) {
		        if (input != null && hasOwnProp(tokens, token)) {
		            tokens[token](input, config._a, config, token);
		        }
		    }

		    function isLeapYear(year) {
		        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		    }

		    var YEAR = 0,
		        MONTH = 1,
		        DATE = 2,
		        HOUR = 3,
		        MINUTE = 4,
		        SECOND = 5,
		        MILLISECOND = 6,
		        WEEK = 7,
		        WEEKDAY = 8;

		    // FORMATTING

		    addFormatToken('Y', 0, 0, function () {
		        var y = this.year();
		        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
		    });

		    addFormatToken(0, ['YY', 2], 0, function () {
		        return this.year() % 100;
		    });

		    addFormatToken(0, ['YYYY', 4], 0, 'year');
		    addFormatToken(0, ['YYYYY', 5], 0, 'year');
		    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

		    // PARSING

		    addRegexToken('Y', matchSigned);
		    addRegexToken('YY', match1to2, match2);
		    addRegexToken('YYYY', match1to4, match4);
		    addRegexToken('YYYYY', match1to6, match6);
		    addRegexToken('YYYYYY', match1to6, match6);

		    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
		    addParseToken('YYYY', function (input, array) {
		        array[YEAR] =
		            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
		    });
		    addParseToken('YY', function (input, array) {
		        array[YEAR] = hooks.parseTwoDigitYear(input);
		    });
		    addParseToken('Y', function (input, array) {
		        array[YEAR] = parseInt(input, 10);
		    });

		    // HELPERS

		    function daysInYear(year) {
		        return isLeapYear(year) ? 366 : 365;
		    }

		    // HOOKS

		    hooks.parseTwoDigitYear = function (input) {
		        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
		    };

		    // MOMENTS

		    var getSetYear = makeGetSet('FullYear', true);

		    function getIsLeapYear() {
		        return isLeapYear(this.year());
		    }

		    function makeGetSet(unit, keepTime) {
		        return function (value) {
		            if (value != null) {
		                set$1(this, unit, value);
		                hooks.updateOffset(this, keepTime);
		                return this;
		            } else {
		                return get(this, unit);
		            }
		        };
		    }

		    function get(mom, unit) {
		        if (!mom.isValid()) {
		            return NaN;
		        }

		        var d = mom._d,
		            isUTC = mom._isUTC;

		        switch (unit) {
		            case 'Milliseconds':
		                return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
		            case 'Seconds':
		                return isUTC ? d.getUTCSeconds() : d.getSeconds();
		            case 'Minutes':
		                return isUTC ? d.getUTCMinutes() : d.getMinutes();
		            case 'Hours':
		                return isUTC ? d.getUTCHours() : d.getHours();
		            case 'Date':
		                return isUTC ? d.getUTCDate() : d.getDate();
		            case 'Day':
		                return isUTC ? d.getUTCDay() : d.getDay();
		            case 'Month':
		                return isUTC ? d.getUTCMonth() : d.getMonth();
		            case 'FullYear':
		                return isUTC ? d.getUTCFullYear() : d.getFullYear();
		            default:
		                return NaN; // Just in case
		        }
		    }

		    function set$1(mom, unit, value) {
		        var d, isUTC, year, month, date;

		        if (!mom.isValid() || isNaN(value)) {
		            return;
		        }

		        d = mom._d;
		        isUTC = mom._isUTC;

		        switch (unit) {
		            case 'Milliseconds':
		                return void (isUTC
		                    ? d.setUTCMilliseconds(value)
		                    : d.setMilliseconds(value));
		            case 'Seconds':
		                return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
		            case 'Minutes':
		                return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
		            case 'Hours':
		                return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
		            case 'Date':
		                return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
		            // case 'Day': // Not real
		            //    return void (isUTC ? d.setUTCDay(value) : d.setDay(value));
		            // case 'Month': // Not used because we need to pass two variables
		            //     return void (isUTC ? d.setUTCMonth(value) : d.setMonth(value));
		            case 'FullYear':
		                break; // See below ...
		            default:
		                return; // Just in case
		        }

		        year = value;
		        month = mom.month();
		        date = mom.date();
		        date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
		        void (isUTC
		            ? d.setUTCFullYear(year, month, date)
		            : d.setFullYear(year, month, date));
		    }

		    // MOMENTS

		    function stringGet(units) {
		        units = normalizeUnits(units);
		        if (isFunction(this[units])) {
		            return this[units]();
		        }
		        return this;
		    }

		    function stringSet(units, value) {
		        if (typeof units === 'object') {
		            units = normalizeObjectUnits(units);
		            var prioritized = getPrioritizedUnits(units),
		                i,
		                prioritizedLen = prioritized.length;
		            for (i = 0; i < prioritizedLen; i++) {
		                this[prioritized[i].unit](units[prioritized[i].unit]);
		            }
		        } else {
		            units = normalizeUnits(units);
		            if (isFunction(this[units])) {
		                return this[units](value);
		            }
		        }
		        return this;
		    }

		    function mod(n, x) {
		        return ((n % x) + x) % x;
		    }

		    var indexOf;

		    if (Array.prototype.indexOf) {
		        indexOf = Array.prototype.indexOf;
		    } else {
		        indexOf = function (o) {
		            // I know
		            var i;
		            for (i = 0; i < this.length; ++i) {
		                if (this[i] === o) {
		                    return i;
		                }
		            }
		            return -1;
		        };
		    }

		    function daysInMonth(year, month) {
		        if (isNaN(year) || isNaN(month)) {
		            return NaN;
		        }
		        var modMonth = mod(month, 12);
		        year += (month - modMonth) / 12;
		        return modMonth === 1
		            ? isLeapYear(year)
		                ? 29
		                : 28
		            : 31 - ((modMonth % 7) % 2);
		    }

		    // FORMATTING

		    addFormatToken('M', ['MM', 2], 'Mo', function () {
		        return this.month() + 1;
		    });

		    addFormatToken('MMM', 0, 0, function (format) {
		        return this.localeData().monthsShort(this, format);
		    });

		    addFormatToken('MMMM', 0, 0, function (format) {
		        return this.localeData().months(this, format);
		    });

		    // PARSING

		    addRegexToken('M', match1to2, match1to2NoLeadingZero);
		    addRegexToken('MM', match1to2, match2);
		    addRegexToken('MMM', function (isStrict, locale) {
		        return locale.monthsShortRegex(isStrict);
		    });
		    addRegexToken('MMMM', function (isStrict, locale) {
		        return locale.monthsRegex(isStrict);
		    });

		    addParseToken(['M', 'MM'], function (input, array) {
		        array[MONTH] = toInt(input) - 1;
		    });

		    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
		        var month = config._locale.monthsParse(input, token, config._strict);
		        // if we didn't find a month name, mark the date as invalid.
		        if (month != null) {
		            array[MONTH] = month;
		        } else {
		            getParsingFlags(config).invalidMonth = input;
		        }
		    });

		    // LOCALES

		    var defaultLocaleMonths =
		            'January_February_March_April_May_June_July_August_September_October_November_December'.split(
		                '_'
		            ),
		        defaultLocaleMonthsShort =
		            'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
		        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
		        defaultMonthsShortRegex = matchWord,
		        defaultMonthsRegex = matchWord;

		    function localeMonths(m, format) {
		        if (!m) {
		            return isArray(this._months)
		                ? this._months
		                : this._months['standalone'];
		        }
		        return isArray(this._months)
		            ? this._months[m.month()]
		            : this._months[
		                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
		                      ? 'format'
		                      : 'standalone'
		              ][m.month()];
		    }

		    function localeMonthsShort(m, format) {
		        if (!m) {
		            return isArray(this._monthsShort)
		                ? this._monthsShort
		                : this._monthsShort['standalone'];
		        }
		        return isArray(this._monthsShort)
		            ? this._monthsShort[m.month()]
		            : this._monthsShort[
		                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
		              ][m.month()];
		    }

		    function handleStrictParse(monthName, format, strict) {
		        var i,
		            ii,
		            mom,
		            llc = monthName.toLocaleLowerCase();
		        if (!this._monthsParse) {
		            // this is not used
		            this._monthsParse = [];
		            this._longMonthsParse = [];
		            this._shortMonthsParse = [];
		            for (i = 0; i < 12; ++i) {
		                mom = createUTC([2000, i]);
		                this._shortMonthsParse[i] = this.monthsShort(
		                    mom,
		                    ''
		                ).toLocaleLowerCase();
		                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
		            }
		        }

		        if (strict) {
		            if (format === 'MMM') {
		                ii = indexOf.call(this._shortMonthsParse, llc);
		                return ii !== -1 ? ii : null;
		            } else {
		                ii = indexOf.call(this._longMonthsParse, llc);
		                return ii !== -1 ? ii : null;
		            }
		        } else {
		            if (format === 'MMM') {
		                ii = indexOf.call(this._shortMonthsParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._longMonthsParse, llc);
		                return ii !== -1 ? ii : null;
		            } else {
		                ii = indexOf.call(this._longMonthsParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._shortMonthsParse, llc);
		                return ii !== -1 ? ii : null;
		            }
		        }
		    }

		    function localeMonthsParse(monthName, format, strict) {
		        var i, mom, regex;

		        if (this._monthsParseExact) {
		            return handleStrictParse.call(this, monthName, format, strict);
		        }

		        if (!this._monthsParse) {
		            this._monthsParse = [];
		            this._longMonthsParse = [];
		            this._shortMonthsParse = [];
		        }

		        // TODO: add sorting
		        // Sorting makes sure if one month (or abbr) is a prefix of another
		        // see sorting in computeMonthsParse
		        for (i = 0; i < 12; i++) {
		            // make the regex if we don't have it already
		            mom = createUTC([2000, i]);
		            if (strict && !this._longMonthsParse[i]) {
		                this._longMonthsParse[i] = new RegExp(
		                    '^' + this.months(mom, '').replace('.', '') + '$',
		                    'i'
		                );
		                this._shortMonthsParse[i] = new RegExp(
		                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
		                    'i'
		                );
		            }
		            if (!strict && !this._monthsParse[i]) {
		                regex =
		                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
		                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
		            }
		            // test the regex
		            if (
		                strict &&
		                format === 'MMMM' &&
		                this._longMonthsParse[i].test(monthName)
		            ) {
		                return i;
		            } else if (
		                strict &&
		                format === 'MMM' &&
		                this._shortMonthsParse[i].test(monthName)
		            ) {
		                return i;
		            } else if (!strict && this._monthsParse[i].test(monthName)) {
		                return i;
		            }
		        }
		    }

		    // MOMENTS

		    function setMonth(mom, value) {
		        if (!mom.isValid()) {
		            // No op
		            return mom;
		        }

		        if (typeof value === 'string') {
		            if (/^\d+$/.test(value)) {
		                value = toInt(value);
		            } else {
		                value = mom.localeData().monthsParse(value);
		                // TODO: Another silent failure?
		                if (!isNumber(value)) {
		                    return mom;
		                }
		            }
		        }

		        var month = value,
		            date = mom.date();

		        date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
		        void (mom._isUTC
		            ? mom._d.setUTCMonth(month, date)
		            : mom._d.setMonth(month, date));
		        return mom;
		    }

		    function getSetMonth(value) {
		        if (value != null) {
		            setMonth(this, value);
		            hooks.updateOffset(this, true);
		            return this;
		        } else {
		            return get(this, 'Month');
		        }
		    }

		    function getDaysInMonth() {
		        return daysInMonth(this.year(), this.month());
		    }

		    function monthsShortRegex(isStrict) {
		        if (this._monthsParseExact) {
		            if (!hasOwnProp(this, '_monthsRegex')) {
		                computeMonthsParse.call(this);
		            }
		            if (isStrict) {
		                return this._monthsShortStrictRegex;
		            } else {
		                return this._monthsShortRegex;
		            }
		        } else {
		            if (!hasOwnProp(this, '_monthsShortRegex')) {
		                this._monthsShortRegex = defaultMonthsShortRegex;
		            }
		            return this._monthsShortStrictRegex && isStrict
		                ? this._monthsShortStrictRegex
		                : this._monthsShortRegex;
		        }
		    }

		    function monthsRegex(isStrict) {
		        if (this._monthsParseExact) {
		            if (!hasOwnProp(this, '_monthsRegex')) {
		                computeMonthsParse.call(this);
		            }
		            if (isStrict) {
		                return this._monthsStrictRegex;
		            } else {
		                return this._monthsRegex;
		            }
		        } else {
		            if (!hasOwnProp(this, '_monthsRegex')) {
		                this._monthsRegex = defaultMonthsRegex;
		            }
		            return this._monthsStrictRegex && isStrict
		                ? this._monthsStrictRegex
		                : this._monthsRegex;
		        }
		    }

		    function computeMonthsParse() {
		        function cmpLenRev(a, b) {
		            return b.length - a.length;
		        }

		        var shortPieces = [],
		            longPieces = [],
		            mixedPieces = [],
		            i,
		            mom,
		            shortP,
		            longP;
		        for (i = 0; i < 12; i++) {
		            // make the regex if we don't have it already
		            mom = createUTC([2000, i]);
		            shortP = regexEscape(this.monthsShort(mom, ''));
		            longP = regexEscape(this.months(mom, ''));
		            shortPieces.push(shortP);
		            longPieces.push(longP);
		            mixedPieces.push(longP);
		            mixedPieces.push(shortP);
		        }
		        // Sorting makes sure if one month (or abbr) is a prefix of another it
		        // will match the longer piece.
		        shortPieces.sort(cmpLenRev);
		        longPieces.sort(cmpLenRev);
		        mixedPieces.sort(cmpLenRev);

		        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
		        this._monthsShortRegex = this._monthsRegex;
		        this._monthsStrictRegex = new RegExp(
		            '^(' + longPieces.join('|') + ')',
		            'i'
		        );
		        this._monthsShortStrictRegex = new RegExp(
		            '^(' + shortPieces.join('|') + ')',
		            'i'
		        );
		    }

		    function createDate(y, m, d, h, M, s, ms) {
		        // can't just apply() to create a date:
		        // https://stackoverflow.com/q/181348
		        var date;
		        // the date constructor remaps years 0-99 to 1900-1999
		        if (y < 100 && y >= 0) {
		            // preserve leap years using a full 400 year cycle, then reset
		            date = new Date(y + 400, m, d, h, M, s, ms);
		            if (isFinite(date.getFullYear())) {
		                date.setFullYear(y);
		            }
		        } else {
		            date = new Date(y, m, d, h, M, s, ms);
		        }

		        return date;
		    }

		    function createUTCDate(y) {
		        var date, args;
		        // the Date.UTC function remaps years 0-99 to 1900-1999
		        if (y < 100 && y >= 0) {
		            args = Array.prototype.slice.call(arguments);
		            // preserve leap years using a full 400 year cycle, then reset
		            args[0] = y + 400;
		            date = new Date(Date.UTC.apply(null, args));
		            if (isFinite(date.getUTCFullYear())) {
		                date.setUTCFullYear(y);
		            }
		        } else {
		            date = new Date(Date.UTC.apply(null, arguments));
		        }

		        return date;
		    }

		    // start-of-first-week - start-of-year
		    function firstWeekOffset(year, dow, doy) {
		        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
		            fwd = 7 + dow - doy,
		            // first-week day local weekday -- which local weekday is fwd
		            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

		        return -fwdlw + fwd - 1;
		    }

		    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
		    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
		        var localWeekday = (7 + weekday - dow) % 7,
		            weekOffset = firstWeekOffset(year, dow, doy),
		            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
		            resYear,
		            resDayOfYear;

		        if (dayOfYear <= 0) {
		            resYear = year - 1;
		            resDayOfYear = daysInYear(resYear) + dayOfYear;
		        } else if (dayOfYear > daysInYear(year)) {
		            resYear = year + 1;
		            resDayOfYear = dayOfYear - daysInYear(year);
		        } else {
		            resYear = year;
		            resDayOfYear = dayOfYear;
		        }

		        return {
		            year: resYear,
		            dayOfYear: resDayOfYear,
		        };
		    }

		    function weekOfYear(mom, dow, doy) {
		        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
		            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
		            resWeek,
		            resYear;

		        if (week < 1) {
		            resYear = mom.year() - 1;
		            resWeek = week + weeksInYear(resYear, dow, doy);
		        } else if (week > weeksInYear(mom.year(), dow, doy)) {
		            resWeek = week - weeksInYear(mom.year(), dow, doy);
		            resYear = mom.year() + 1;
		        } else {
		            resYear = mom.year();
		            resWeek = week;
		        }

		        return {
		            week: resWeek,
		            year: resYear,
		        };
		    }

		    function weeksInYear(year, dow, doy) {
		        var weekOffset = firstWeekOffset(year, dow, doy),
		            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
		        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
		    }

		    // FORMATTING

		    addFormatToken('w', ['ww', 2], 'wo', 'week');
		    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

		    // PARSING

		    addRegexToken('w', match1to2, match1to2NoLeadingZero);
		    addRegexToken('ww', match1to2, match2);
		    addRegexToken('W', match1to2, match1to2NoLeadingZero);
		    addRegexToken('WW', match1to2, match2);

		    addWeekParseToken(
		        ['w', 'ww', 'W', 'WW'],
		        function (input, week, config, token) {
		            week[token.substr(0, 1)] = toInt(input);
		        }
		    );

		    // HELPERS

		    // LOCALES

		    function localeWeek(mom) {
		        return weekOfYear(mom, this._week.dow, this._week.doy).week;
		    }

		    var defaultLocaleWeek = {
		        dow: 0, // Sunday is the first day of the week.
		        doy: 6, // The week that contains Jan 6th is the first week of the year.
		    };

		    function localeFirstDayOfWeek() {
		        return this._week.dow;
		    }

		    function localeFirstDayOfYear() {
		        return this._week.doy;
		    }

		    // MOMENTS

		    function getSetWeek(input) {
		        var week = this.localeData().week(this);
		        return input == null ? week : this.add((input - week) * 7, 'd');
		    }

		    function getSetISOWeek(input) {
		        var week = weekOfYear(this, 1, 4).week;
		        return input == null ? week : this.add((input - week) * 7, 'd');
		    }

		    // FORMATTING

		    addFormatToken('d', 0, 'do', 'day');

		    addFormatToken('dd', 0, 0, function (format) {
		        return this.localeData().weekdaysMin(this, format);
		    });

		    addFormatToken('ddd', 0, 0, function (format) {
		        return this.localeData().weekdaysShort(this, format);
		    });

		    addFormatToken('dddd', 0, 0, function (format) {
		        return this.localeData().weekdays(this, format);
		    });

		    addFormatToken('e', 0, 0, 'weekday');
		    addFormatToken('E', 0, 0, 'isoWeekday');

		    // PARSING

		    addRegexToken('d', match1to2);
		    addRegexToken('e', match1to2);
		    addRegexToken('E', match1to2);
		    addRegexToken('dd', function (isStrict, locale) {
		        return locale.weekdaysMinRegex(isStrict);
		    });
		    addRegexToken('ddd', function (isStrict, locale) {
		        return locale.weekdaysShortRegex(isStrict);
		    });
		    addRegexToken('dddd', function (isStrict, locale) {
		        return locale.weekdaysRegex(isStrict);
		    });

		    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
		        var weekday = config._locale.weekdaysParse(input, token, config._strict);
		        // if we didn't get a weekday name, mark the date as invalid
		        if (weekday != null) {
		            week.d = weekday;
		        } else {
		            getParsingFlags(config).invalidWeekday = input;
		        }
		    });

		    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
		        week[token] = toInt(input);
		    });

		    // HELPERS

		    function parseWeekday(input, locale) {
		        if (typeof input !== 'string') {
		            return input;
		        }

		        if (!isNaN(input)) {
		            return parseInt(input, 10);
		        }

		        input = locale.weekdaysParse(input);
		        if (typeof input === 'number') {
		            return input;
		        }

		        return null;
		    }

		    function parseIsoWeekday(input, locale) {
		        if (typeof input === 'string') {
		            return locale.weekdaysParse(input) % 7 || 7;
		        }
		        return isNaN(input) ? null : input;
		    }

		    // LOCALES
		    function shiftWeekdays(ws, n) {
		        return ws.slice(n, 7).concat(ws.slice(0, n));
		    }

		    var defaultLocaleWeekdays =
		            'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
		        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
		        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
		        defaultWeekdaysRegex = matchWord,
		        defaultWeekdaysShortRegex = matchWord,
		        defaultWeekdaysMinRegex = matchWord;

		    function localeWeekdays(m, format) {
		        var weekdays = isArray(this._weekdays)
		            ? this._weekdays
		            : this._weekdays[
		                  m && m !== true && this._weekdays.isFormat.test(format)
		                      ? 'format'
		                      : 'standalone'
		              ];
		        return m === true
		            ? shiftWeekdays(weekdays, this._week.dow)
		            : m
		              ? weekdays[m.day()]
		              : weekdays;
		    }

		    function localeWeekdaysShort(m) {
		        return m === true
		            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
		            : m
		              ? this._weekdaysShort[m.day()]
		              : this._weekdaysShort;
		    }

		    function localeWeekdaysMin(m) {
		        return m === true
		            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
		            : m
		              ? this._weekdaysMin[m.day()]
		              : this._weekdaysMin;
		    }

		    function handleStrictParse$1(weekdayName, format, strict) {
		        var i,
		            ii,
		            mom,
		            llc = weekdayName.toLocaleLowerCase();
		        if (!this._weekdaysParse) {
		            this._weekdaysParse = [];
		            this._shortWeekdaysParse = [];
		            this._minWeekdaysParse = [];

		            for (i = 0; i < 7; ++i) {
		                mom = createUTC([2000, 1]).day(i);
		                this._minWeekdaysParse[i] = this.weekdaysMin(
		                    mom,
		                    ''
		                ).toLocaleLowerCase();
		                this._shortWeekdaysParse[i] = this.weekdaysShort(
		                    mom,
		                    ''
		                ).toLocaleLowerCase();
		                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
		            }
		        }

		        if (strict) {
		            if (format === 'dddd') {
		                ii = indexOf.call(this._weekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            } else if (format === 'ddd') {
		                ii = indexOf.call(this._shortWeekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            } else {
		                ii = indexOf.call(this._minWeekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            }
		        } else {
		            if (format === 'dddd') {
		                ii = indexOf.call(this._weekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._shortWeekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._minWeekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            } else if (format === 'ddd') {
		                ii = indexOf.call(this._shortWeekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._weekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._minWeekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            } else {
		                ii = indexOf.call(this._minWeekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._weekdaysParse, llc);
		                if (ii !== -1) {
		                    return ii;
		                }
		                ii = indexOf.call(this._shortWeekdaysParse, llc);
		                return ii !== -1 ? ii : null;
		            }
		        }
		    }

		    function localeWeekdaysParse(weekdayName, format, strict) {
		        var i, mom, regex;

		        if (this._weekdaysParseExact) {
		            return handleStrictParse$1.call(this, weekdayName, format, strict);
		        }

		        if (!this._weekdaysParse) {
		            this._weekdaysParse = [];
		            this._minWeekdaysParse = [];
		            this._shortWeekdaysParse = [];
		            this._fullWeekdaysParse = [];
		        }

		        for (i = 0; i < 7; i++) {
		            // make the regex if we don't have it already

		            mom = createUTC([2000, 1]).day(i);
		            if (strict && !this._fullWeekdaysParse[i]) {
		                this._fullWeekdaysParse[i] = new RegExp(
		                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
		                    'i'
		                );
		                this._shortWeekdaysParse[i] = new RegExp(
		                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
		                    'i'
		                );
		                this._minWeekdaysParse[i] = new RegExp(
		                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
		                    'i'
		                );
		            }
		            if (!this._weekdaysParse[i]) {
		                regex =
		                    '^' +
		                    this.weekdays(mom, '') +
		                    '|^' +
		                    this.weekdaysShort(mom, '') +
		                    '|^' +
		                    this.weekdaysMin(mom, '');
		                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
		            }
		            // test the regex
		            if (
		                strict &&
		                format === 'dddd' &&
		                this._fullWeekdaysParse[i].test(weekdayName)
		            ) {
		                return i;
		            } else if (
		                strict &&
		                format === 'ddd' &&
		                this._shortWeekdaysParse[i].test(weekdayName)
		            ) {
		                return i;
		            } else if (
		                strict &&
		                format === 'dd' &&
		                this._minWeekdaysParse[i].test(weekdayName)
		            ) {
		                return i;
		            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
		                return i;
		            }
		        }
		    }

		    // MOMENTS

		    function getSetDayOfWeek(input) {
		        if (!this.isValid()) {
		            return input != null ? this : NaN;
		        }

		        var day = get(this, 'Day');
		        if (input != null) {
		            input = parseWeekday(input, this.localeData());
		            return this.add(input - day, 'd');
		        } else {
		            return day;
		        }
		    }

		    function getSetLocaleDayOfWeek(input) {
		        if (!this.isValid()) {
		            return input != null ? this : NaN;
		        }
		        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
		        return input == null ? weekday : this.add(input - weekday, 'd');
		    }

		    function getSetISODayOfWeek(input) {
		        if (!this.isValid()) {
		            return input != null ? this : NaN;
		        }

		        // behaves the same as moment#day except
		        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
		        // as a setter, sunday should belong to the previous week.

		        if (input != null) {
		            var weekday = parseIsoWeekday(input, this.localeData());
		            return this.day(this.day() % 7 ? weekday : weekday - 7);
		        } else {
		            return this.day() || 7;
		        }
		    }

		    function weekdaysRegex(isStrict) {
		        if (this._weekdaysParseExact) {
		            if (!hasOwnProp(this, '_weekdaysRegex')) {
		                computeWeekdaysParse.call(this);
		            }
		            if (isStrict) {
		                return this._weekdaysStrictRegex;
		            } else {
		                return this._weekdaysRegex;
		            }
		        } else {
		            if (!hasOwnProp(this, '_weekdaysRegex')) {
		                this._weekdaysRegex = defaultWeekdaysRegex;
		            }
		            return this._weekdaysStrictRegex && isStrict
		                ? this._weekdaysStrictRegex
		                : this._weekdaysRegex;
		        }
		    }

		    function weekdaysShortRegex(isStrict) {
		        if (this._weekdaysParseExact) {
		            if (!hasOwnProp(this, '_weekdaysRegex')) {
		                computeWeekdaysParse.call(this);
		            }
		            if (isStrict) {
		                return this._weekdaysShortStrictRegex;
		            } else {
		                return this._weekdaysShortRegex;
		            }
		        } else {
		            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
		                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
		            }
		            return this._weekdaysShortStrictRegex && isStrict
		                ? this._weekdaysShortStrictRegex
		                : this._weekdaysShortRegex;
		        }
		    }

		    function weekdaysMinRegex(isStrict) {
		        if (this._weekdaysParseExact) {
		            if (!hasOwnProp(this, '_weekdaysRegex')) {
		                computeWeekdaysParse.call(this);
		            }
		            if (isStrict) {
		                return this._weekdaysMinStrictRegex;
		            } else {
		                return this._weekdaysMinRegex;
		            }
		        } else {
		            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
		                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
		            }
		            return this._weekdaysMinStrictRegex && isStrict
		                ? this._weekdaysMinStrictRegex
		                : this._weekdaysMinRegex;
		        }
		    }

		    function computeWeekdaysParse() {
		        function cmpLenRev(a, b) {
		            return b.length - a.length;
		        }

		        var minPieces = [],
		            shortPieces = [],
		            longPieces = [],
		            mixedPieces = [],
		            i,
		            mom,
		            minp,
		            shortp,
		            longp;
		        for (i = 0; i < 7; i++) {
		            // make the regex if we don't have it already
		            mom = createUTC([2000, 1]).day(i);
		            minp = regexEscape(this.weekdaysMin(mom, ''));
		            shortp = regexEscape(this.weekdaysShort(mom, ''));
		            longp = regexEscape(this.weekdays(mom, ''));
		            minPieces.push(minp);
		            shortPieces.push(shortp);
		            longPieces.push(longp);
		            mixedPieces.push(minp);
		            mixedPieces.push(shortp);
		            mixedPieces.push(longp);
		        }
		        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
		        // will match the longer piece.
		        minPieces.sort(cmpLenRev);
		        shortPieces.sort(cmpLenRev);
		        longPieces.sort(cmpLenRev);
		        mixedPieces.sort(cmpLenRev);

		        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
		        this._weekdaysShortRegex = this._weekdaysRegex;
		        this._weekdaysMinRegex = this._weekdaysRegex;

		        this._weekdaysStrictRegex = new RegExp(
		            '^(' + longPieces.join('|') + ')',
		            'i'
		        );
		        this._weekdaysShortStrictRegex = new RegExp(
		            '^(' + shortPieces.join('|') + ')',
		            'i'
		        );
		        this._weekdaysMinStrictRegex = new RegExp(
		            '^(' + minPieces.join('|') + ')',
		            'i'
		        );
		    }

		    // FORMATTING

		    function hFormat() {
		        return this.hours() % 12 || 12;
		    }

		    function kFormat() {
		        return this.hours() || 24;
		    }

		    addFormatToken('H', ['HH', 2], 0, 'hour');
		    addFormatToken('h', ['hh', 2], 0, hFormat);
		    addFormatToken('k', ['kk', 2], 0, kFormat);

		    addFormatToken('hmm', 0, 0, function () {
		        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
		    });

		    addFormatToken('hmmss', 0, 0, function () {
		        return (
		            '' +
		            hFormat.apply(this) +
		            zeroFill(this.minutes(), 2) +
		            zeroFill(this.seconds(), 2)
		        );
		    });

		    addFormatToken('Hmm', 0, 0, function () {
		        return '' + this.hours() + zeroFill(this.minutes(), 2);
		    });

		    addFormatToken('Hmmss', 0, 0, function () {
		        return (
		            '' +
		            this.hours() +
		            zeroFill(this.minutes(), 2) +
		            zeroFill(this.seconds(), 2)
		        );
		    });

		    function meridiem(token, lowercase) {
		        addFormatToken(token, 0, 0, function () {
		            return this.localeData().meridiem(
		                this.hours(),
		                this.minutes(),
		                lowercase
		            );
		        });
		    }

		    meridiem('a', true);
		    meridiem('A', false);

		    // PARSING

		    function matchMeridiem(isStrict, locale) {
		        return locale._meridiemParse;
		    }

		    addRegexToken('a', matchMeridiem);
		    addRegexToken('A', matchMeridiem);
		    addRegexToken('H', match1to2, match1to2HasZero);
		    addRegexToken('h', match1to2, match1to2NoLeadingZero);
		    addRegexToken('k', match1to2, match1to2NoLeadingZero);
		    addRegexToken('HH', match1to2, match2);
		    addRegexToken('hh', match1to2, match2);
		    addRegexToken('kk', match1to2, match2);

		    addRegexToken('hmm', match3to4);
		    addRegexToken('hmmss', match5to6);
		    addRegexToken('Hmm', match3to4);
		    addRegexToken('Hmmss', match5to6);

		    addParseToken(['H', 'HH'], HOUR);
		    addParseToken(['k', 'kk'], function (input, array, config) {
		        var kInput = toInt(input);
		        array[HOUR] = kInput === 24 ? 0 : kInput;
		    });
		    addParseToken(['a', 'A'], function (input, array, config) {
		        config._isPm = config._locale.isPM(input);
		        config._meridiem = input;
		    });
		    addParseToken(['h', 'hh'], function (input, array, config) {
		        array[HOUR] = toInt(input);
		        getParsingFlags(config).bigHour = true;
		    });
		    addParseToken('hmm', function (input, array, config) {
		        var pos = input.length - 2;
		        array[HOUR] = toInt(input.substr(0, pos));
		        array[MINUTE] = toInt(input.substr(pos));
		        getParsingFlags(config).bigHour = true;
		    });
		    addParseToken('hmmss', function (input, array, config) {
		        var pos1 = input.length - 4,
		            pos2 = input.length - 2;
		        array[HOUR] = toInt(input.substr(0, pos1));
		        array[MINUTE] = toInt(input.substr(pos1, 2));
		        array[SECOND] = toInt(input.substr(pos2));
		        getParsingFlags(config).bigHour = true;
		    });
		    addParseToken('Hmm', function (input, array, config) {
		        var pos = input.length - 2;
		        array[HOUR] = toInt(input.substr(0, pos));
		        array[MINUTE] = toInt(input.substr(pos));
		    });
		    addParseToken('Hmmss', function (input, array, config) {
		        var pos1 = input.length - 4,
		            pos2 = input.length - 2;
		        array[HOUR] = toInt(input.substr(0, pos1));
		        array[MINUTE] = toInt(input.substr(pos1, 2));
		        array[SECOND] = toInt(input.substr(pos2));
		    });

		    // LOCALES

		    function localeIsPM(input) {
		        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
		        // Using charAt should be more compatible.
		        return (input + '').toLowerCase().charAt(0) === 'p';
		    }

		    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
		        // Setting the hour should keep the time, because the user explicitly
		        // specified which hour they want. So trying to maintain the same hour (in
		        // a new timezone) makes sense. Adding/subtracting hours does not follow
		        // this rule.
		        getSetHour = makeGetSet('Hours', true);

		    function localeMeridiem(hours, minutes, isLower) {
		        if (hours > 11) {
		            return isLower ? 'pm' : 'PM';
		        } else {
		            return isLower ? 'am' : 'AM';
		        }
		    }

		    var baseConfig = {
		        calendar: defaultCalendar,
		        longDateFormat: defaultLongDateFormat,
		        invalidDate: defaultInvalidDate,
		        ordinal: defaultOrdinal,
		        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
		        relativeTime: defaultRelativeTime,

		        months: defaultLocaleMonths,
		        monthsShort: defaultLocaleMonthsShort,

		        week: defaultLocaleWeek,

		        weekdays: defaultLocaleWeekdays,
		        weekdaysMin: defaultLocaleWeekdaysMin,
		        weekdaysShort: defaultLocaleWeekdaysShort,

		        meridiemParse: defaultLocaleMeridiemParse,
		    };

		    // internal storage for locale config files
		    var locales = {},
		        localeFamilies = {},
		        globalLocale;

		    function commonPrefix(arr1, arr2) {
		        var i,
		            minl = Math.min(arr1.length, arr2.length);
		        for (i = 0; i < minl; i += 1) {
		            if (arr1[i] !== arr2[i]) {
		                return i;
		            }
		        }
		        return minl;
		    }

		    function normalizeLocale(key) {
		        return key ? key.toLowerCase().replace('_', '-') : key;
		    }

		    // pick the locale from the array
		    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
		    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
		    function chooseLocale(names) {
		        var i = 0,
		            j,
		            next,
		            locale,
		            split;

		        while (i < names.length) {
		            split = normalizeLocale(names[i]).split('-');
		            j = split.length;
		            next = normalizeLocale(names[i + 1]);
		            next = next ? next.split('-') : null;
		            while (j > 0) {
		                locale = loadLocale(split.slice(0, j).join('-'));
		                if (locale) {
		                    return locale;
		                }
		                if (
		                    next &&
		                    next.length >= j &&
		                    commonPrefix(split, next) >= j - 1
		                ) {
		                    //the next array item is better than a shallower substring of this one
		                    break;
		                }
		                j--;
		            }
		            i++;
		        }
		        return globalLocale;
		    }

		    function isLocaleNameSane(name) {
		        // Prevent names that look like filesystem paths, i.e contain '/' or '\'
		        // Ensure name is available and function returns boolean
		        return !!(name && name.match('^[^/\\\\]*$'));
		    }

		    function loadLocale(name) {
		        var oldLocale = null,
		            aliasedRequire;
		        // TODO: Find a better way to register and load all the locales in Node
		        if (
		            locales[name] === undefined &&
		            'object' !== 'undefined' &&
		            module &&
		            module.exports &&
		            isLocaleNameSane(name)
		        ) {
		            try {
		                oldLocale = globalLocale._abbr;
		                aliasedRequire = commonjsRequire;
		                aliasedRequire('./locale/' + name);
		                getSetGlobalLocale(oldLocale);
		            } catch (e) {
		                // mark as not found to avoid repeating expensive file require call causing high CPU
		                // when trying to find en-US, en_US, en-us for every format call
		                locales[name] = null; // null means not found
		            }
		        }
		        return locales[name];
		    }

		    // This function will load locale and then set the global locale.  If
		    // no arguments are passed in, it will simply return the current global
		    // locale key.
		    function getSetGlobalLocale(key, values) {
		        var data;
		        if (key) {
		            if (isUndefined(values)) {
		                data = getLocale(key);
		            } else {
		                data = defineLocale(key, values);
		            }

		            if (data) {
		                // moment.duration._locale = moment._locale = data;
		                globalLocale = data;
		            } else {
		                if (typeof console !== 'undefined' && console.warn) {
		                    //warn user if arguments are passed but the locale could not be set
		                    console.warn(
		                        'Locale ' + key + ' not found. Did you forget to load it?'
		                    );
		                }
		            }
		        }

		        return globalLocale._abbr;
		    }

		    function defineLocale(name, config) {
		        if (config !== null) {
		            var locale,
		                parentConfig = baseConfig;
		            config.abbr = name;
		            if (locales[name] != null) {
		                deprecateSimple(
		                    'defineLocaleOverride',
		                    'use moment.updateLocale(localeName, config) to change ' +
		                        'an existing locale. moment.defineLocale(localeName, ' +
		                        'config) should only be used for creating a new locale ' +
		                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
		                );
		                parentConfig = locales[name]._config;
		            } else if (config.parentLocale != null) {
		                if (locales[config.parentLocale] != null) {
		                    parentConfig = locales[config.parentLocale]._config;
		                } else {
		                    locale = loadLocale(config.parentLocale);
		                    if (locale != null) {
		                        parentConfig = locale._config;
		                    } else {
		                        if (!localeFamilies[config.parentLocale]) {
		                            localeFamilies[config.parentLocale] = [];
		                        }
		                        localeFamilies[config.parentLocale].push({
		                            name: name,
		                            config: config,
		                        });
		                        return null;
		                    }
		                }
		            }
		            locales[name] = new Locale(mergeConfigs(parentConfig, config));

		            if (localeFamilies[name]) {
		                localeFamilies[name].forEach(function (x) {
		                    defineLocale(x.name, x.config);
		                });
		            }

		            // backwards compat for now: also set the locale
		            // make sure we set the locale AFTER all child locales have been
		            // created, so we won't end up with the child locale set.
		            getSetGlobalLocale(name);

		            return locales[name];
		        } else {
		            // useful for testing
		            delete locales[name];
		            return null;
		        }
		    }

		    function updateLocale(name, config) {
		        if (config != null) {
		            var locale,
		                tmpLocale,
		                parentConfig = baseConfig;

		            if (locales[name] != null && locales[name].parentLocale != null) {
		                // Update existing child locale in-place to avoid memory-leaks
		                locales[name].set(mergeConfigs(locales[name]._config, config));
		            } else {
		                // MERGE
		                tmpLocale = loadLocale(name);
		                if (tmpLocale != null) {
		                    parentConfig = tmpLocale._config;
		                }
		                config = mergeConfigs(parentConfig, config);
		                if (tmpLocale == null) {
		                    // updateLocale is called for creating a new locale
		                    // Set abbr so it will have a name (getters return
		                    // undefined otherwise).
		                    config.abbr = name;
		                }
		                locale = new Locale(config);
		                locale.parentLocale = locales[name];
		                locales[name] = locale;
		            }

		            // backwards compat for now: also set the locale
		            getSetGlobalLocale(name);
		        } else {
		            // pass null for config to unupdate, useful for tests
		            if (locales[name] != null) {
		                if (locales[name].parentLocale != null) {
		                    locales[name] = locales[name].parentLocale;
		                    if (name === getSetGlobalLocale()) {
		                        getSetGlobalLocale(name);
		                    }
		                } else if (locales[name] != null) {
		                    delete locales[name];
		                }
		            }
		        }
		        return locales[name];
		    }

		    // returns locale data
		    function getLocale(key) {
		        var locale;

		        if (key && key._locale && key._locale._abbr) {
		            key = key._locale._abbr;
		        }

		        if (!key) {
		            return globalLocale;
		        }

		        if (!isArray(key)) {
		            //short-circuit everything else
		            locale = loadLocale(key);
		            if (locale) {
		                return locale;
		            }
		            key = [key];
		        }

		        return chooseLocale(key);
		    }

		    function listLocales() {
		        return keys(locales);
		    }

		    function checkOverflow(m) {
		        var overflow,
		            a = m._a;

		        if (a && getParsingFlags(m).overflow === -2) {
		            overflow =
		                a[MONTH] < 0 || a[MONTH] > 11
		                    ? MONTH
		                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
		                      ? DATE
		                      : a[HOUR] < 0 ||
		                          a[HOUR] > 24 ||
		                          (a[HOUR] === 24 &&
		                              (a[MINUTE] !== 0 ||
		                                  a[SECOND] !== 0 ||
		                                  a[MILLISECOND] !== 0))
		                        ? HOUR
		                        : a[MINUTE] < 0 || a[MINUTE] > 59
		                          ? MINUTE
		                          : a[SECOND] < 0 || a[SECOND] > 59
		                            ? SECOND
		                            : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
		                              ? MILLISECOND
		                              : -1;

		            if (
		                getParsingFlags(m)._overflowDayOfYear &&
		                (overflow < YEAR || overflow > DATE)
		            ) {
		                overflow = DATE;
		            }
		            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
		                overflow = WEEK;
		            }
		            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
		                overflow = WEEKDAY;
		            }

		            getParsingFlags(m).overflow = overflow;
		        }

		        return m;
		    }

		    // iso 8601 regex
		    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
		    var extendedIsoRegex =
		            /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		        basicIsoRegex =
		            /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
		        isoDates = [
		            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
		            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
		            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
		            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
		            ['YYYY-DDD', /\d{4}-\d{3}/],
		            ['YYYY-MM', /\d{4}-\d\d/, false],
		            ['YYYYYYMMDD', /[+-]\d{10}/],
		            ['YYYYMMDD', /\d{8}/],
		            ['GGGG[W]WWE', /\d{4}W\d{3}/],
		            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
		            ['YYYYDDD', /\d{7}/],
		            ['YYYYMM', /\d{6}/, false],
		            ['YYYY', /\d{4}/, false],
		        ],
		        // iso time formats and regexes
		        isoTimes = [
		            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
		            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
		            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
		            ['HH:mm', /\d\d:\d\d/],
		            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
		            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
		            ['HHmmss', /\d\d\d\d\d\d/],
		            ['HHmm', /\d\d\d\d/],
		            ['HH', /\d\d/],
		        ],
		        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
		        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
		        rfc2822 =
		            /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
		        obsOffsets = {
		            UT: 0,
		            GMT: 0,
		            EDT: -4 * 60,
		            EST: -5 * 60,
		            CDT: -5 * 60,
		            CST: -6 * 60,
		            MDT: -6 * 60,
		            MST: -7 * 60,
		            PDT: -7 * 60,
		            PST: -8 * 60,
		        };

		    // date from iso format
		    function configFromISO(config) {
		        var i,
		            l,
		            string = config._i,
		            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
		            allowTime,
		            dateFormat,
		            timeFormat,
		            tzFormat,
		            isoDatesLen = isoDates.length,
		            isoTimesLen = isoTimes.length;

		        if (match) {
		            getParsingFlags(config).iso = true;
		            for (i = 0, l = isoDatesLen; i < l; i++) {
		                if (isoDates[i][1].exec(match[1])) {
		                    dateFormat = isoDates[i][0];
		                    allowTime = isoDates[i][2] !== false;
		                    break;
		                }
		            }
		            if (dateFormat == null) {
		                config._isValid = false;
		                return;
		            }
		            if (match[3]) {
		                for (i = 0, l = isoTimesLen; i < l; i++) {
		                    if (isoTimes[i][1].exec(match[3])) {
		                        // match[2] should be 'T' or space
		                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
		                        break;
		                    }
		                }
		                if (timeFormat == null) {
		                    config._isValid = false;
		                    return;
		                }
		            }
		            if (!allowTime && timeFormat != null) {
		                config._isValid = false;
		                return;
		            }
		            if (match[4]) {
		                if (tzRegex.exec(match[4])) {
		                    tzFormat = 'Z';
		                } else {
		                    config._isValid = false;
		                    return;
		                }
		            }
		            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
		            configFromStringAndFormat(config);
		        } else {
		            config._isValid = false;
		        }
		    }

		    function extractFromRFC2822Strings(
		        yearStr,
		        monthStr,
		        dayStr,
		        hourStr,
		        minuteStr,
		        secondStr
		    ) {
		        var result = [
		            untruncateYear(yearStr),
		            defaultLocaleMonthsShort.indexOf(monthStr),
		            parseInt(dayStr, 10),
		            parseInt(hourStr, 10),
		            parseInt(minuteStr, 10),
		        ];

		        if (secondStr) {
		            result.push(parseInt(secondStr, 10));
		        }

		        return result;
		    }

		    function untruncateYear(yearStr) {
		        var year = parseInt(yearStr, 10);
		        if (year <= 49) {
		            return 2000 + year;
		        } else if (year <= 999) {
		            return 1900 + year;
		        }
		        return year;
		    }

		    function preprocessRFC2822(s) {
		        // Remove comments and folding whitespace and replace multiple-spaces with a single space
		        return s
		            .replace(/\([^()]*\)|[\n\t]/g, ' ')
		            .replace(/(\s\s+)/g, ' ')
		            .replace(/^\s\s*/, '')
		            .replace(/\s\s*$/, '');
		    }

		    function checkWeekday(weekdayStr, parsedInput, config) {
		        if (weekdayStr) {
		            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
		            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
		                weekdayActual = new Date(
		                    parsedInput[0],
		                    parsedInput[1],
		                    parsedInput[2]
		                ).getDay();
		            if (weekdayProvided !== weekdayActual) {
		                getParsingFlags(config).weekdayMismatch = true;
		                config._isValid = false;
		                return false;
		            }
		        }
		        return true;
		    }

		    function calculateOffset(obsOffset, militaryOffset, numOffset) {
		        if (obsOffset) {
		            return obsOffsets[obsOffset];
		        } else if (militaryOffset) {
		            // the only allowed military tz is Z
		            return 0;
		        } else {
		            var hm = parseInt(numOffset, 10),
		                m = hm % 100,
		                h = (hm - m) / 100;
		            return h * 60 + m;
		        }
		    }

		    // date and time from ref 2822 format
		    function configFromRFC2822(config) {
		        var match = rfc2822.exec(preprocessRFC2822(config._i)),
		            parsedArray;
		        if (match) {
		            parsedArray = extractFromRFC2822Strings(
		                match[4],
		                match[3],
		                match[2],
		                match[5],
		                match[6],
		                match[7]
		            );
		            if (!checkWeekday(match[1], parsedArray, config)) {
		                return;
		            }

		            config._a = parsedArray;
		            config._tzm = calculateOffset(match[8], match[9], match[10]);

		            config._d = createUTCDate.apply(null, config._a);
		            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

		            getParsingFlags(config).rfc2822 = true;
		        } else {
		            config._isValid = false;
		        }
		    }

		    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
		    function configFromString(config) {
		        var matched = aspNetJsonRegex.exec(config._i);
		        if (matched !== null) {
		            config._d = new Date(+matched[1]);
		            return;
		        }

		        configFromISO(config);
		        if (config._isValid === false) {
		            delete config._isValid;
		        } else {
		            return;
		        }

		        configFromRFC2822(config);
		        if (config._isValid === false) {
		            delete config._isValid;
		        } else {
		            return;
		        }

		        if (config._strict) {
		            config._isValid = false;
		        } else {
		            // Final attempt, use Input Fallback
		            hooks.createFromInputFallback(config);
		        }
		    }

		    hooks.createFromInputFallback = deprecate(
		        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
		            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
		            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
		        function (config) {
		            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
		        }
		    );

		    // Pick the first defined of two or three arguments.
		    function defaults(a, b, c) {
		        if (a != null) {
		            return a;
		        }
		        if (b != null) {
		            return b;
		        }
		        return c;
		    }

		    function currentDateArray(config) {
		        // hooks is actually the exported moment object
		        var nowValue = new Date(hooks.now());
		        if (config._useUTC) {
		            return [
		                nowValue.getUTCFullYear(),
		                nowValue.getUTCMonth(),
		                nowValue.getUTCDate(),
		            ];
		        }
		        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
		    }

		    // convert an array to a date.
		    // the array should mirror the parameters below
		    // note: all values past the year are optional and will default to the lowest possible value.
		    // [year, month, day , hour, minute, second, millisecond]
		    function configFromArray(config) {
		        var i,
		            date,
		            input = [],
		            currentDate,
		            expectedWeekday,
		            yearToUse;

		        if (config._d) {
		            return;
		        }

		        currentDate = currentDateArray(config);

		        //compute day of the year from weeks and weekdays
		        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
		            dayOfYearFromWeekInfo(config);
		        }

		        //if the day of the year is set, figure out what it is
		        if (config._dayOfYear != null) {
		            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

		            if (
		                config._dayOfYear > daysInYear(yearToUse) ||
		                config._dayOfYear === 0
		            ) {
		                getParsingFlags(config)._overflowDayOfYear = true;
		            }

		            date = createUTCDate(yearToUse, 0, config._dayOfYear);
		            config._a[MONTH] = date.getUTCMonth();
		            config._a[DATE] = date.getUTCDate();
		        }

		        // Default to current date.
		        // * if no year, month, day of month are given, default to today
		        // * if day of month is given, default month and year
		        // * if month is given, default only year
		        // * if year is given, don't default anything
		        for (i = 0; i < 3 && config._a[i] == null; ++i) {
		            config._a[i] = input[i] = currentDate[i];
		        }

		        // Zero out whatever was not defaulted, including time
		        for (; i < 7; i++) {
		            config._a[i] = input[i] =
		                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
		        }

		        // Check for 24:00:00.000
		        if (
		            config._a[HOUR] === 24 &&
		            config._a[MINUTE] === 0 &&
		            config._a[SECOND] === 0 &&
		            config._a[MILLISECOND] === 0
		        ) {
		            config._nextDay = true;
		            config._a[HOUR] = 0;
		        }

		        config._d = (config._useUTC ? createUTCDate : createDate).apply(
		            null,
		            input
		        );
		        expectedWeekday = config._useUTC
		            ? config._d.getUTCDay()
		            : config._d.getDay();

		        // Apply timezone offset from input. The actual utcOffset can be changed
		        // with parseZone.
		        if (config._tzm != null) {
		            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
		        }

		        if (config._nextDay) {
		            config._a[HOUR] = 24;
		        }

		        // check for mismatching day of week
		        if (
		            config._w &&
		            typeof config._w.d !== 'undefined' &&
		            config._w.d !== expectedWeekday
		        ) {
		            getParsingFlags(config).weekdayMismatch = true;
		        }
		    }

		    function dayOfYearFromWeekInfo(config) {
		        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

		        w = config._w;
		        if (w.GG != null || w.W != null || w.E != null) {
		            dow = 1;
		            doy = 4;

		            // TODO: We need to take the current isoWeekYear, but that depends on
		            // how we interpret now (local, utc, fixed offset). So create
		            // a now version of current config (take local/utc/offset flags, and
		            // create now).
		            weekYear = defaults(
		                w.GG,
		                config._a[YEAR],
		                weekOfYear(createLocal(), 1, 4).year
		            );
		            week = defaults(w.W, 1);
		            weekday = defaults(w.E, 1);
		            if (weekday < 1 || weekday > 7) {
		                weekdayOverflow = true;
		            }
		        } else {
		            dow = config._locale._week.dow;
		            doy = config._locale._week.doy;

		            curWeek = weekOfYear(createLocal(), dow, doy);

		            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

		            // Default to current week.
		            week = defaults(w.w, curWeek.week);

		            if (w.d != null) {
		                // weekday -- low day numbers are considered next week
		                weekday = w.d;
		                if (weekday < 0 || weekday > 6) {
		                    weekdayOverflow = true;
		                }
		            } else if (w.e != null) {
		                // local weekday -- counting starts from beginning of week
		                weekday = w.e + dow;
		                if (w.e < 0 || w.e > 6) {
		                    weekdayOverflow = true;
		                }
		            } else {
		                // default to beginning of week
		                weekday = dow;
		            }
		        }
		        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
		            getParsingFlags(config)._overflowWeeks = true;
		        } else if (weekdayOverflow != null) {
		            getParsingFlags(config)._overflowWeekday = true;
		        } else {
		            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
		            config._a[YEAR] = temp.year;
		            config._dayOfYear = temp.dayOfYear;
		        }
		    }

		    // constant that refers to the ISO standard
		    hooks.ISO_8601 = function () {};

		    // constant that refers to the RFC 2822 form
		    hooks.RFC_2822 = function () {};

		    // date from string and format string
		    function configFromStringAndFormat(config) {
		        // TODO: Move this to another part of the creation flow to prevent circular deps
		        if (config._f === hooks.ISO_8601) {
		            configFromISO(config);
		            return;
		        }
		        if (config._f === hooks.RFC_2822) {
		            configFromRFC2822(config);
		            return;
		        }
		        config._a = [];
		        getParsingFlags(config).empty = true;

		        // This array is used to make a Date, either with `new Date` or `Date.UTC`
		        var string = '' + config._i,
		            i,
		            parsedInput,
		            tokens,
		            token,
		            skipped,
		            stringLength = string.length,
		            totalParsedInputLength = 0,
		            era,
		            tokenLen;

		        tokens =
		            expandFormat(config._f, config._locale).match(formattingTokens) || [];
		        tokenLen = tokens.length;
		        for (i = 0; i < tokenLen; i++) {
		            token = tokens[i];
		            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
		                [])[0];
		            if (parsedInput) {
		                skipped = string.substr(0, string.indexOf(parsedInput));
		                if (skipped.length > 0) {
		                    getParsingFlags(config).unusedInput.push(skipped);
		                }
		                string = string.slice(
		                    string.indexOf(parsedInput) + parsedInput.length
		                );
		                totalParsedInputLength += parsedInput.length;
		            }
		            // don't parse if it's not a known token
		            if (formatTokenFunctions[token]) {
		                if (parsedInput) {
		                    getParsingFlags(config).empty = false;
		                } else {
		                    getParsingFlags(config).unusedTokens.push(token);
		                }
		                addTimeToArrayFromToken(token, parsedInput, config);
		            } else if (config._strict && !parsedInput) {
		                getParsingFlags(config).unusedTokens.push(token);
		            }
		        }

		        // add remaining unparsed input length to the string
		        getParsingFlags(config).charsLeftOver =
		            stringLength - totalParsedInputLength;
		        if (string.length > 0) {
		            getParsingFlags(config).unusedInput.push(string);
		        }

		        // clear _12h flag if hour is <= 12
		        if (
		            config._a[HOUR] <= 12 &&
		            getParsingFlags(config).bigHour === true &&
		            config._a[HOUR] > 0
		        ) {
		            getParsingFlags(config).bigHour = undefined;
		        }

		        getParsingFlags(config).parsedDateParts = config._a.slice(0);
		        getParsingFlags(config).meridiem = config._meridiem;
		        // handle meridiem
		        config._a[HOUR] = meridiemFixWrap(
		            config._locale,
		            config._a[HOUR],
		            config._meridiem
		        );

		        // handle era
		        era = getParsingFlags(config).era;
		        if (era !== null) {
		            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
		        }

		        configFromArray(config);
		        checkOverflow(config);
		    }

		    function meridiemFixWrap(locale, hour, meridiem) {
		        var isPm;

		        if (meridiem == null) {
		            // nothing to do
		            return hour;
		        }
		        if (locale.meridiemHour != null) {
		            return locale.meridiemHour(hour, meridiem);
		        } else if (locale.isPM != null) {
		            // Fallback
		            isPm = locale.isPM(meridiem);
		            if (isPm && hour < 12) {
		                hour += 12;
		            }
		            if (!isPm && hour === 12) {
		                hour = 0;
		            }
		            return hour;
		        } else {
		            // this is not supposed to happen
		            return hour;
		        }
		    }

		    // date from string and array of format strings
		    function configFromStringAndArray(config) {
		        var tempConfig,
		            bestMoment,
		            scoreToBeat,
		            i,
		            currentScore,
		            validFormatFound,
		            bestFormatIsValid = false,
		            configfLen = config._f.length;

		        if (configfLen === 0) {
		            getParsingFlags(config).invalidFormat = true;
		            config._d = new Date(NaN);
		            return;
		        }

		        for (i = 0; i < configfLen; i++) {
		            currentScore = 0;
		            validFormatFound = false;
		            tempConfig = copyConfig({}, config);
		            if (config._useUTC != null) {
		                tempConfig._useUTC = config._useUTC;
		            }
		            tempConfig._f = config._f[i];
		            configFromStringAndFormat(tempConfig);

		            if (isValid(tempConfig)) {
		                validFormatFound = true;
		            }

		            // if there is any input that was not parsed add a penalty for that format
		            currentScore += getParsingFlags(tempConfig).charsLeftOver;

		            //or tokens
		            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

		            getParsingFlags(tempConfig).score = currentScore;

		            if (!bestFormatIsValid) {
		                if (
		                    scoreToBeat == null ||
		                    currentScore < scoreToBeat ||
		                    validFormatFound
		                ) {
		                    scoreToBeat = currentScore;
		                    bestMoment = tempConfig;
		                    if (validFormatFound) {
		                        bestFormatIsValid = true;
		                    }
		                }
		            } else {
		                if (currentScore < scoreToBeat) {
		                    scoreToBeat = currentScore;
		                    bestMoment = tempConfig;
		                }
		            }
		        }

		        extend(config, bestMoment || tempConfig);
		    }

		    function configFromObject(config) {
		        if (config._d) {
		            return;
		        }

		        var i = normalizeObjectUnits(config._i),
		            dayOrDate = i.day === undefined ? i.date : i.day;
		        config._a = map(
		            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
		            function (obj) {
		                return obj && parseInt(obj, 10);
		            }
		        );

		        configFromArray(config);
		    }

		    function createFromConfig(config) {
		        var res = new Moment(checkOverflow(prepareConfig(config)));
		        if (res._nextDay) {
		            // Adding is smart enough around DST
		            res.add(1, 'd');
		            res._nextDay = undefined;
		        }

		        return res;
		    }

		    function prepareConfig(config) {
		        var input = config._i,
		            format = config._f;

		        config._locale = config._locale || getLocale(config._l);

		        if (input === null || (format === undefined && input === '')) {
		            return createInvalid({ nullInput: true });
		        }

		        if (typeof input === 'string') {
		            config._i = input = config._locale.preparse(input);
		        }

		        if (isMoment(input)) {
		            return new Moment(checkOverflow(input));
		        } else if (isDate(input)) {
		            config._d = input;
		        } else if (isArray(format)) {
		            configFromStringAndArray(config);
		        } else if (format) {
		            configFromStringAndFormat(config);
		        } else {
		            configFromInput(config);
		        }

		        if (!isValid(config)) {
		            config._d = null;
		        }

		        return config;
		    }

		    function configFromInput(config) {
		        var input = config._i;
		        if (isUndefined(input)) {
		            config._d = new Date(hooks.now());
		        } else if (isDate(input)) {
		            config._d = new Date(input.valueOf());
		        } else if (typeof input === 'string') {
		            configFromString(config);
		        } else if (isArray(input)) {
		            config._a = map(input.slice(0), function (obj) {
		                return parseInt(obj, 10);
		            });
		            configFromArray(config);
		        } else if (isObject(input)) {
		            configFromObject(config);
		        } else if (isNumber(input)) {
		            // from milliseconds
		            config._d = new Date(input);
		        } else {
		            hooks.createFromInputFallback(config);
		        }
		    }

		    function createLocalOrUTC(input, format, locale, strict, isUTC) {
		        var c = {};

		        if (format === true || format === false) {
		            strict = format;
		            format = undefined;
		        }

		        if (locale === true || locale === false) {
		            strict = locale;
		            locale = undefined;
		        }

		        if (
		            (isObject(input) && isObjectEmpty(input)) ||
		            (isArray(input) && input.length === 0)
		        ) {
		            input = undefined;
		        }
		        // object construction must be done this way.
		        // https://github.com/moment/moment/issues/1423
		        c._isAMomentObject = true;
		        c._useUTC = c._isUTC = isUTC;
		        c._l = locale;
		        c._i = input;
		        c._f = format;
		        c._strict = strict;

		        return createFromConfig(c);
		    }

		    function createLocal(input, format, locale, strict) {
		        return createLocalOrUTC(input, format, locale, strict, false);
		    }

		    var prototypeMin = deprecate(
		            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
		            function () {
		                var other = createLocal.apply(null, arguments);
		                if (this.isValid() && other.isValid()) {
		                    return other < this ? this : other;
		                } else {
		                    return createInvalid();
		                }
		            }
		        ),
		        prototypeMax = deprecate(
		            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
		            function () {
		                var other = createLocal.apply(null, arguments);
		                if (this.isValid() && other.isValid()) {
		                    return other > this ? this : other;
		                } else {
		                    return createInvalid();
		                }
		            }
		        );

		    // Pick a moment m from moments so that m[fn](other) is true for all
		    // other. This relies on the function fn to be transitive.
		    //
		    // moments should either be an array of moment objects or an array, whose
		    // first element is an array of moment objects.
		    function pickBy(fn, moments) {
		        var res, i;
		        if (moments.length === 1 && isArray(moments[0])) {
		            moments = moments[0];
		        }
		        if (!moments.length) {
		            return createLocal();
		        }
		        res = moments[0];
		        for (i = 1; i < moments.length; ++i) {
		            if (!moments[i].isValid() || moments[i][fn](res)) {
		                res = moments[i];
		            }
		        }
		        return res;
		    }

		    // TODO: Use [].sort instead?
		    function min() {
		        var args = [].slice.call(arguments, 0);

		        return pickBy('isBefore', args);
		    }

		    function max() {
		        var args = [].slice.call(arguments, 0);

		        return pickBy('isAfter', args);
		    }

		    var now = function () {
		        return Date.now ? Date.now() : +new Date();
		    };

		    var ordering = [
		        'year',
		        'quarter',
		        'month',
		        'week',
		        'day',
		        'hour',
		        'minute',
		        'second',
		        'millisecond',
		    ];

		    function isDurationValid(m) {
		        var key,
		            unitHasDecimal = false,
		            i,
		            orderLen = ordering.length;
		        for (key in m) {
		            if (
		                hasOwnProp(m, key) &&
		                !(
		                    indexOf.call(ordering, key) !== -1 &&
		                    (m[key] == null || !isNaN(m[key]))
		                )
		            ) {
		                return false;
		            }
		        }

		        for (i = 0; i < orderLen; ++i) {
		            if (m[ordering[i]]) {
		                if (unitHasDecimal) {
		                    return false; // only allow non-integers for smallest unit
		                }
		                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
		                    unitHasDecimal = true;
		                }
		            }
		        }

		        return true;
		    }

		    function isValid$1() {
		        return this._isValid;
		    }

		    function createInvalid$1() {
		        return createDuration(NaN);
		    }

		    function Duration(duration) {
		        var normalizedInput = normalizeObjectUnits(duration),
		            years = normalizedInput.year || 0,
		            quarters = normalizedInput.quarter || 0,
		            months = normalizedInput.month || 0,
		            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
		            days = normalizedInput.day || 0,
		            hours = normalizedInput.hour || 0,
		            minutes = normalizedInput.minute || 0,
		            seconds = normalizedInput.second || 0,
		            milliseconds = normalizedInput.millisecond || 0;

		        this._isValid = isDurationValid(normalizedInput);

		        // representation for dateAddRemove
		        this._milliseconds =
		            +milliseconds +
		            seconds * 1e3 + // 1000
		            minutes * 6e4 + // 1000 * 60
		            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
		        // Because of dateAddRemove treats 24 hours as different from a
		        // day when working around DST, we need to store them separately
		        this._days = +days + weeks * 7;
		        // It is impossible to translate months into days without knowing
		        // which months you are are talking about, so we have to store
		        // it separately.
		        this._months = +months + quarters * 3 + years * 12;

		        this._data = {};

		        this._locale = getLocale();

		        this._bubble();
		    }

		    function isDuration(obj) {
		        return obj instanceof Duration;
		    }

		    function absRound(number) {
		        if (number < 0) {
		            return Math.round(-1 * number) * -1;
		        } else {
		            return Math.round(number);
		        }
		    }

		    // compare two arrays, return the number of differences
		    function compareArrays(array1, array2, dontConvert) {
		        var len = Math.min(array1.length, array2.length),
		            lengthDiff = Math.abs(array1.length - array2.length),
		            diffs = 0,
		            i;
		        for (i = 0; i < len; i++) {
		            if (
		                (toInt(array1[i]) !== toInt(array2[i]))
		            ) {
		                diffs++;
		            }
		        }
		        return diffs + lengthDiff;
		    }

		    // FORMATTING

		    function offset(token, separator) {
		        addFormatToken(token, 0, 0, function () {
		            var offset = this.utcOffset(),
		                sign = '+';
		            if (offset < 0) {
		                offset = -offset;
		                sign = '-';
		            }
		            return (
		                sign +
		                zeroFill(~~(offset / 60), 2) +
		                separator +
		                zeroFill(~~offset % 60, 2)
		            );
		        });
		    }

		    offset('Z', ':');
		    offset('ZZ', '');

		    // PARSING

		    addRegexToken('Z', matchShortOffset);
		    addRegexToken('ZZ', matchShortOffset);
		    addParseToken(['Z', 'ZZ'], function (input, array, config) {
		        config._useUTC = true;
		        config._tzm = offsetFromString(matchShortOffset, input);
		    });

		    // HELPERS

		    // timezone chunker
		    // '+10:00' > ['10',  '00']
		    // '-1530'  > ['-15', '30']
		    var chunkOffset = /([\+\-]|\d\d)/gi;

		    function offsetFromString(matcher, string) {
		        var matches = (string || '').match(matcher),
		            chunk,
		            parts,
		            minutes;

		        if (matches === null) {
		            return null;
		        }

		        chunk = matches[matches.length - 1] || [];
		        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
		        minutes = +(parts[1] * 60) + toInt(parts[2]);

		        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
		    }

		    // Return a moment from input, that is local/utc/zone equivalent to model.
		    function cloneWithOffset(input, model) {
		        var res, diff;
		        if (model._isUTC) {
		            res = model.clone();
		            diff =
		                (isMoment(input) || isDate(input)
		                    ? input.valueOf()
		                    : createLocal(input).valueOf()) - res.valueOf();
		            // Use low-level api, because this fn is low-level api.
		            res._d.setTime(res._d.valueOf() + diff);
		            hooks.updateOffset(res, false);
		            return res;
		        } else {
		            return createLocal(input).local();
		        }
		    }

		    function getDateOffset(m) {
		        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
		        // https://github.com/moment/moment/pull/1871
		        return -Math.round(m._d.getTimezoneOffset());
		    }

		    // HOOKS

		    // This function will be called whenever a moment is mutated.
		    // It is intended to keep the offset in sync with the timezone.
		    hooks.updateOffset = function () {};

		    // MOMENTS

		    // keepLocalTime = true means only change the timezone, without
		    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
		    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
		    // +0200, so we adjust the time as needed, to be valid.
		    //
		    // Keeping the time actually adds/subtracts (one hour)
		    // from the actual represented time. That is why we call updateOffset
		    // a second time. In case it wants us to change the offset again
		    // _changeInProgress == true case, then we have to adjust, because
		    // there is no such time in the given timezone.
		    function getSetOffset(input, keepLocalTime, keepMinutes) {
		        var offset = this._offset || 0,
		            localAdjust;
		        if (!this.isValid()) {
		            return input != null ? this : NaN;
		        }
		        if (input != null) {
		            if (typeof input === 'string') {
		                input = offsetFromString(matchShortOffset, input);
		                if (input === null) {
		                    return this;
		                }
		            } else if (Math.abs(input) < 16 && !keepMinutes) {
		                input = input * 60;
		            }
		            if (!this._isUTC && keepLocalTime) {
		                localAdjust = getDateOffset(this);
		            }
		            this._offset = input;
		            this._isUTC = true;
		            if (localAdjust != null) {
		                this.add(localAdjust, 'm');
		            }
		            if (offset !== input) {
		                if (!keepLocalTime || this._changeInProgress) {
		                    addSubtract(
		                        this,
		                        createDuration(input - offset, 'm'),
		                        1,
		                        false
		                    );
		                } else if (!this._changeInProgress) {
		                    this._changeInProgress = true;
		                    hooks.updateOffset(this, true);
		                    this._changeInProgress = null;
		                }
		            }
		            return this;
		        } else {
		            return this._isUTC ? offset : getDateOffset(this);
		        }
		    }

		    function getSetZone(input, keepLocalTime) {
		        if (input != null) {
		            if (typeof input !== 'string') {
		                input = -input;
		            }

		            this.utcOffset(input, keepLocalTime);

		            return this;
		        } else {
		            return -this.utcOffset();
		        }
		    }

		    function setOffsetToUTC(keepLocalTime) {
		        return this.utcOffset(0, keepLocalTime);
		    }

		    function setOffsetToLocal(keepLocalTime) {
		        if (this._isUTC) {
		            this.utcOffset(0, keepLocalTime);
		            this._isUTC = false;

		            if (keepLocalTime) {
		                this.subtract(getDateOffset(this), 'm');
		            }
		        }
		        return this;
		    }

		    function setOffsetToParsedOffset() {
		        if (this._tzm != null) {
		            this.utcOffset(this._tzm, false, true);
		        } else if (typeof this._i === 'string') {
		            var tZone = offsetFromString(matchOffset, this._i);
		            if (tZone != null) {
		                this.utcOffset(tZone);
		            } else {
		                this.utcOffset(0, true);
		            }
		        }
		        return this;
		    }

		    function hasAlignedHourOffset(input) {
		        if (!this.isValid()) {
		            return false;
		        }
		        input = input ? createLocal(input).utcOffset() : 0;

		        return (this.utcOffset() - input) % 60 === 0;
		    }

		    function isDaylightSavingTime() {
		        return (
		            this.utcOffset() > this.clone().month(0).utcOffset() ||
		            this.utcOffset() > this.clone().month(5).utcOffset()
		        );
		    }

		    function isDaylightSavingTimeShifted() {
		        if (!isUndefined(this._isDSTShifted)) {
		            return this._isDSTShifted;
		        }

		        var c = {},
		            other;

		        copyConfig(c, this);
		        c = prepareConfig(c);

		        if (c._a) {
		            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
		            this._isDSTShifted =
		                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
		        } else {
		            this._isDSTShifted = false;
		        }

		        return this._isDSTShifted;
		    }

		    function isLocal() {
		        return this.isValid() ? !this._isUTC : false;
		    }

		    function isUtcOffset() {
		        return this.isValid() ? this._isUTC : false;
		    }

		    function isUtc() {
		        return this.isValid() ? this._isUTC && this._offset === 0 : false;
		    }

		    // ASP.NET json date format regex
		    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
		        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
		        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
		        // and further modified to allow for strings containing both week and day
		        isoRegex =
		            /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

		    function createDuration(input, key) {
		        var duration = input,
		            // matching against regexp is expensive, do it on demand
		            match = null,
		            sign,
		            ret,
		            diffRes;

		        if (isDuration(input)) {
		            duration = {
		                ms: input._milliseconds,
		                d: input._days,
		                M: input._months,
		            };
		        } else if (isNumber(input) || !isNaN(+input)) {
		            duration = {};
		            if (key) {
		                duration[key] = +input;
		            } else {
		                duration.milliseconds = +input;
		            }
		        } else if ((match = aspNetRegex.exec(input))) {
		            sign = match[1] === '-' ? -1 : 1;
		            duration = {
		                y: 0,
		                d: toInt(match[DATE]) * sign,
		                h: toInt(match[HOUR]) * sign,
		                m: toInt(match[MINUTE]) * sign,
		                s: toInt(match[SECOND]) * sign,
		                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
		            };
		        } else if ((match = isoRegex.exec(input))) {
		            sign = match[1] === '-' ? -1 : 1;
		            duration = {
		                y: parseIso(match[2], sign),
		                M: parseIso(match[3], sign),
		                w: parseIso(match[4], sign),
		                d: parseIso(match[5], sign),
		                h: parseIso(match[6], sign),
		                m: parseIso(match[7], sign),
		                s: parseIso(match[8], sign),
		            };
		        } else if (duration == null) {
		            // checks for null or undefined
		            duration = {};
		        } else if (
		            typeof duration === 'object' &&
		            ('from' in duration || 'to' in duration)
		        ) {
		            diffRes = momentsDifference(
		                createLocal(duration.from),
		                createLocal(duration.to)
		            );

		            duration = {};
		            duration.ms = diffRes.milliseconds;
		            duration.M = diffRes.months;
		        }

		        ret = new Duration(duration);

		        if (isDuration(input) && hasOwnProp(input, '_locale')) {
		            ret._locale = input._locale;
		        }

		        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
		            ret._isValid = input._isValid;
		        }

		        return ret;
		    }

		    createDuration.fn = Duration.prototype;
		    createDuration.invalid = createInvalid$1;

		    function parseIso(inp, sign) {
		        // We'd normally use ~~inp for this, but unfortunately it also
		        // converts floats to ints.
		        // inp may be undefined, so careful calling replace on it.
		        var res = inp && parseFloat(inp.replace(',', '.'));
		        // apply sign while we're at it
		        return (isNaN(res) ? 0 : res) * sign;
		    }

		    function positiveMomentsDifference(base, other) {
		        var res = {};

		        res.months =
		            other.month() - base.month() + (other.year() - base.year()) * 12;
		        if (base.clone().add(res.months, 'M').isAfter(other)) {
		            --res.months;
		        }

		        res.milliseconds = +other - +base.clone().add(res.months, 'M');

		        return res;
		    }

		    function momentsDifference(base, other) {
		        var res;
		        if (!(base.isValid() && other.isValid())) {
		            return { milliseconds: 0, months: 0 };
		        }

		        other = cloneWithOffset(other, base);
		        if (base.isBefore(other)) {
		            res = positiveMomentsDifference(base, other);
		        } else {
		            res = positiveMomentsDifference(other, base);
		            res.milliseconds = -res.milliseconds;
		            res.months = -res.months;
		        }

		        return res;
		    }

		    // TODO: remove 'name' arg after deprecation is removed
		    function createAdder(direction, name) {
		        return function (val, period) {
		            var dur, tmp;
		            //invert the arguments, but complain about it
		            if (period !== null && !isNaN(+period)) {
		                deprecateSimple(
		                    name,
		                    'moment().' +
		                        name +
		                        '(period, number) is deprecated. Please use moment().' +
		                        name +
		                        '(number, period). ' +
		                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
		                );
		                tmp = val;
		                val = period;
		                period = tmp;
		            }

		            dur = createDuration(val, period);
		            addSubtract(this, dur, direction);
		            return this;
		        };
		    }

		    function addSubtract(mom, duration, isAdding, updateOffset) {
		        var milliseconds = duration._milliseconds,
		            days = absRound(duration._days),
		            months = absRound(duration._months);

		        if (!mom.isValid()) {
		            // No op
		            return;
		        }

		        updateOffset = updateOffset == null ? true : updateOffset;

		        if (months) {
		            setMonth(mom, get(mom, 'Month') + months * isAdding);
		        }
		        if (days) {
		            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
		        }
		        if (milliseconds) {
		            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
		        }
		        if (updateOffset) {
		            hooks.updateOffset(mom, days || months);
		        }
		    }

		    var add = createAdder(1, 'add'),
		        subtract = createAdder(-1, 'subtract');

		    function isString(input) {
		        return typeof input === 'string' || input instanceof String;
		    }

		    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
		    function isMomentInput(input) {
		        return (
		            isMoment(input) ||
		            isDate(input) ||
		            isString(input) ||
		            isNumber(input) ||
		            isNumberOrStringArray(input) ||
		            isMomentInputObject(input) ||
		            input === null ||
		            input === undefined
		        );
		    }

		    function isMomentInputObject(input) {
		        var objectTest = isObject(input) && !isObjectEmpty(input),
		            propertyTest = false,
		            properties = [
		                'years',
		                'year',
		                'y',
		                'months',
		                'month',
		                'M',
		                'days',
		                'day',
		                'd',
		                'dates',
		                'date',
		                'D',
		                'hours',
		                'hour',
		                'h',
		                'minutes',
		                'minute',
		                'm',
		                'seconds',
		                'second',
		                's',
		                'milliseconds',
		                'millisecond',
		                'ms',
		            ],
		            i,
		            property,
		            propertyLen = properties.length;

		        for (i = 0; i < propertyLen; i += 1) {
		            property = properties[i];
		            propertyTest = propertyTest || hasOwnProp(input, property);
		        }

		        return objectTest && propertyTest;
		    }

		    function isNumberOrStringArray(input) {
		        var arrayTest = isArray(input),
		            dataTypeTest = false;
		        if (arrayTest) {
		            dataTypeTest =
		                input.filter(function (item) {
		                    return !isNumber(item) && isString(input);
		                }).length === 0;
		        }
		        return arrayTest && dataTypeTest;
		    }

		    function isCalendarSpec(input) {
		        var objectTest = isObject(input) && !isObjectEmpty(input),
		            propertyTest = false,
		            properties = [
		                'sameDay',
		                'nextDay',
		                'lastDay',
		                'nextWeek',
		                'lastWeek',
		                'sameElse',
		            ],
		            i,
		            property;

		        for (i = 0; i < properties.length; i += 1) {
		            property = properties[i];
		            propertyTest = propertyTest || hasOwnProp(input, property);
		        }

		        return objectTest && propertyTest;
		    }

		    function getCalendarFormat(myMoment, now) {
		        var diff = myMoment.diff(now, 'days', true);
		        return diff < -6
		            ? 'sameElse'
		            : diff < -1
		              ? 'lastWeek'
		              : diff < 0
		                ? 'lastDay'
		                : diff < 1
		                  ? 'sameDay'
		                  : diff < 2
		                    ? 'nextDay'
		                    : diff < 7
		                      ? 'nextWeek'
		                      : 'sameElse';
		    }

		    function calendar$1(time, formats) {
		        // Support for single parameter, formats only overload to the calendar function
		        if (arguments.length === 1) {
		            if (!arguments[0]) {
		                time = undefined;
		                formats = undefined;
		            } else if (isMomentInput(arguments[0])) {
		                time = arguments[0];
		                formats = undefined;
		            } else if (isCalendarSpec(arguments[0])) {
		                formats = arguments[0];
		                time = undefined;
		            }
		        }
		        // We want to compare the start of today, vs this.
		        // Getting start-of-today depends on whether we're local/utc/offset or not.
		        var now = time || createLocal(),
		            sod = cloneWithOffset(now, this).startOf('day'),
		            format = hooks.calendarFormat(this, sod) || 'sameElse',
		            output =
		                formats &&
		                (isFunction(formats[format])
		                    ? formats[format].call(this, now)
		                    : formats[format]);

		        return this.format(
		            output || this.localeData().calendar(format, this, createLocal(now))
		        );
		    }

		    function clone() {
		        return new Moment(this);
		    }

		    function isAfter(input, units) {
		        var localInput = isMoment(input) ? input : createLocal(input);
		        if (!(this.isValid() && localInput.isValid())) {
		            return false;
		        }
		        units = normalizeUnits(units) || 'millisecond';
		        if (units === 'millisecond') {
		            return this.valueOf() > localInput.valueOf();
		        } else {
		            return localInput.valueOf() < this.clone().startOf(units).valueOf();
		        }
		    }

		    function isBefore(input, units) {
		        var localInput = isMoment(input) ? input : createLocal(input);
		        if (!(this.isValid() && localInput.isValid())) {
		            return false;
		        }
		        units = normalizeUnits(units) || 'millisecond';
		        if (units === 'millisecond') {
		            return this.valueOf() < localInput.valueOf();
		        } else {
		            return this.clone().endOf(units).valueOf() < localInput.valueOf();
		        }
		    }

		    function isBetween(from, to, units, inclusivity) {
		        var localFrom = isMoment(from) ? from : createLocal(from),
		            localTo = isMoment(to) ? to : createLocal(to);
		        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
		            return false;
		        }
		        inclusivity = inclusivity || '()';
		        return (
		            (inclusivity[0] === '('
		                ? this.isAfter(localFrom, units)
		                : !this.isBefore(localFrom, units)) &&
		            (inclusivity[1] === ')'
		                ? this.isBefore(localTo, units)
		                : !this.isAfter(localTo, units))
		        );
		    }

		    function isSame(input, units) {
		        var localInput = isMoment(input) ? input : createLocal(input),
		            inputMs;
		        if (!(this.isValid() && localInput.isValid())) {
		            return false;
		        }
		        units = normalizeUnits(units) || 'millisecond';
		        if (units === 'millisecond') {
		            return this.valueOf() === localInput.valueOf();
		        } else {
		            inputMs = localInput.valueOf();
		            return (
		                this.clone().startOf(units).valueOf() <= inputMs &&
		                inputMs <= this.clone().endOf(units).valueOf()
		            );
		        }
		    }

		    function isSameOrAfter(input, units) {
		        return this.isSame(input, units) || this.isAfter(input, units);
		    }

		    function isSameOrBefore(input, units) {
		        return this.isSame(input, units) || this.isBefore(input, units);
		    }

		    function diff(input, units, asFloat) {
		        var that, zoneDelta, output;

		        if (!this.isValid()) {
		            return NaN;
		        }

		        that = cloneWithOffset(input, this);

		        if (!that.isValid()) {
		            return NaN;
		        }

		        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

		        units = normalizeUnits(units);

		        switch (units) {
		            case 'year':
		                output = monthDiff(this, that) / 12;
		                break;
		            case 'month':
		                output = monthDiff(this, that);
		                break;
		            case 'quarter':
		                output = monthDiff(this, that) / 3;
		                break;
		            case 'second':
		                output = (this - that) / 1e3;
		                break; // 1000
		            case 'minute':
		                output = (this - that) / 6e4;
		                break; // 1000 * 60
		            case 'hour':
		                output = (this - that) / 36e5;
		                break; // 1000 * 60 * 60
		            case 'day':
		                output = (this - that - zoneDelta) / 864e5;
		                break; // 1000 * 60 * 60 * 24, negate dst
		            case 'week':
		                output = (this - that - zoneDelta) / 6048e5;
		                break; // 1000 * 60 * 60 * 24 * 7, negate dst
		            default:
		                output = this - that;
		        }

		        return asFloat ? output : absFloor(output);
		    }

		    function monthDiff(a, b) {
		        if (a.date() < b.date()) {
		            // end-of-month calculations work correct when the start month has more
		            // days than the end month.
		            return -monthDiff(b, a);
		        }
		        // difference in months
		        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
		            // b is in (anchor - 1 month, anchor + 1 month)
		            anchor = a.clone().add(wholeMonthDiff, 'months'),
		            anchor2,
		            adjust;

		        if (b - anchor < 0) {
		            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
		            // linear across the month
		            adjust = (b - anchor) / (anchor - anchor2);
		        } else {
		            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
		            // linear across the month
		            adjust = (b - anchor) / (anchor2 - anchor);
		        }

		        //check for negative zero, return zero if negative zero
		        return -(wholeMonthDiff + adjust) || 0;
		    }

		    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
		    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

		    function toString() {
		        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
		    }

		    function toISOString(keepOffset) {
		        if (!this.isValid()) {
		            return null;
		        }
		        var utc = keepOffset !== true,
		            m = utc ? this.clone().utc() : this;
		        if (m.year() < 0 || m.year() > 9999) {
		            return formatMoment(
		                m,
		                utc
		                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
		                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
		            );
		        }
		        if (isFunction(Date.prototype.toISOString)) {
		            // native implementation is ~50x faster, use it when we can
		            if (utc) {
		                return this.toDate().toISOString();
		            } else {
		                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
		                    .toISOString()
		                    .replace('Z', formatMoment(m, 'Z'));
		            }
		        }
		        return formatMoment(
		            m,
		            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
		        );
		    }

		    /**
		     * Return a human readable representation of a moment that can
		     * also be evaluated to get a new moment which is the same
		     *
		     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
		     */
		    function inspect() {
		        if (!this.isValid()) {
		            return 'moment.invalid(/* ' + this._i + ' */)';
		        }
		        var func = 'moment',
		            zone = '',
		            prefix,
		            year,
		            datetime,
		            suffix;
		        if (!this.isLocal()) {
		            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
		            zone = 'Z';
		        }
		        prefix = '[' + func + '("]';
		        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
		        datetime = '-MM-DD[T]HH:mm:ss.SSS';
		        suffix = zone + '[")]';

		        return this.format(prefix + year + datetime + suffix);
		    }

		    function format(inputString) {
		        if (!inputString) {
		            inputString = this.isUtc()
		                ? hooks.defaultFormatUtc
		                : hooks.defaultFormat;
		        }
		        var output = formatMoment(this, inputString);
		        return this.localeData().postformat(output);
		    }

		    function from(time, withoutSuffix) {
		        if (
		            this.isValid() &&
		            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
		        ) {
		            return createDuration({ to: this, from: time })
		                .locale(this.locale())
		                .humanize(!withoutSuffix);
		        } else {
		            return this.localeData().invalidDate();
		        }
		    }

		    function fromNow(withoutSuffix) {
		        return this.from(createLocal(), withoutSuffix);
		    }

		    function to(time, withoutSuffix) {
		        if (
		            this.isValid() &&
		            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
		        ) {
		            return createDuration({ from: this, to: time })
		                .locale(this.locale())
		                .humanize(!withoutSuffix);
		        } else {
		            return this.localeData().invalidDate();
		        }
		    }

		    function toNow(withoutSuffix) {
		        return this.to(createLocal(), withoutSuffix);
		    }

		    // If passed a locale key, it will set the locale for this
		    // instance.  Otherwise, it will return the locale configuration
		    // variables for this instance.
		    function locale(key) {
		        var newLocaleData;

		        if (key === undefined) {
		            return this._locale._abbr;
		        } else {
		            newLocaleData = getLocale(key);
		            if (newLocaleData != null) {
		                this._locale = newLocaleData;
		            }
		            return this;
		        }
		    }

		    var lang = deprecate(
		        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
		        function (key) {
		            if (key === undefined) {
		                return this.localeData();
		            } else {
		                return this.locale(key);
		            }
		        }
		    );

		    function localeData() {
		        return this._locale;
		    }

		    var MS_PER_SECOND = 1000,
		        MS_PER_MINUTE = 60 * MS_PER_SECOND,
		        MS_PER_HOUR = 60 * MS_PER_MINUTE,
		        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

		    // actual modulo - handles negative numbers (for dates before 1970):
		    function mod$1(dividend, divisor) {
		        return ((dividend % divisor) + divisor) % divisor;
		    }

		    function localStartOfDate(y, m, d) {
		        // the date constructor remaps years 0-99 to 1900-1999
		        if (y < 100 && y >= 0) {
		            // preserve leap years using a full 400 year cycle, then reset
		            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
		        } else {
		            return new Date(y, m, d).valueOf();
		        }
		    }

		    function utcStartOfDate(y, m, d) {
		        // Date.UTC remaps years 0-99 to 1900-1999
		        if (y < 100 && y >= 0) {
		            // preserve leap years using a full 400 year cycle, then reset
		            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
		        } else {
		            return Date.UTC(y, m, d);
		        }
		    }

		    function startOf(units) {
		        var time, startOfDate;
		        units = normalizeUnits(units);
		        if (units === undefined || units === 'millisecond' || !this.isValid()) {
		            return this;
		        }

		        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

		        switch (units) {
		            case 'year':
		                time = startOfDate(this.year(), 0, 1);
		                break;
		            case 'quarter':
		                time = startOfDate(
		                    this.year(),
		                    this.month() - (this.month() % 3),
		                    1
		                );
		                break;
		            case 'month':
		                time = startOfDate(this.year(), this.month(), 1);
		                break;
		            case 'week':
		                time = startOfDate(
		                    this.year(),
		                    this.month(),
		                    this.date() - this.weekday()
		                );
		                break;
		            case 'isoWeek':
		                time = startOfDate(
		                    this.year(),
		                    this.month(),
		                    this.date() - (this.isoWeekday() - 1)
		                );
		                break;
		            case 'day':
		            case 'date':
		                time = startOfDate(this.year(), this.month(), this.date());
		                break;
		            case 'hour':
		                time = this._d.valueOf();
		                time -= mod$1(
		                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
		                    MS_PER_HOUR
		                );
		                break;
		            case 'minute':
		                time = this._d.valueOf();
		                time -= mod$1(time, MS_PER_MINUTE);
		                break;
		            case 'second':
		                time = this._d.valueOf();
		                time -= mod$1(time, MS_PER_SECOND);
		                break;
		        }

		        this._d.setTime(time);
		        hooks.updateOffset(this, true);
		        return this;
		    }

		    function endOf(units) {
		        var time, startOfDate;
		        units = normalizeUnits(units);
		        if (units === undefined || units === 'millisecond' || !this.isValid()) {
		            return this;
		        }

		        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

		        switch (units) {
		            case 'year':
		                time = startOfDate(this.year() + 1, 0, 1) - 1;
		                break;
		            case 'quarter':
		                time =
		                    startOfDate(
		                        this.year(),
		                        this.month() - (this.month() % 3) + 3,
		                        1
		                    ) - 1;
		                break;
		            case 'month':
		                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
		                break;
		            case 'week':
		                time =
		                    startOfDate(
		                        this.year(),
		                        this.month(),
		                        this.date() - this.weekday() + 7
		                    ) - 1;
		                break;
		            case 'isoWeek':
		                time =
		                    startOfDate(
		                        this.year(),
		                        this.month(),
		                        this.date() - (this.isoWeekday() - 1) + 7
		                    ) - 1;
		                break;
		            case 'day':
		            case 'date':
		                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
		                break;
		            case 'hour':
		                time = this._d.valueOf();
		                time +=
		                    MS_PER_HOUR -
		                    mod$1(
		                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
		                        MS_PER_HOUR
		                    ) -
		                    1;
		                break;
		            case 'minute':
		                time = this._d.valueOf();
		                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
		                break;
		            case 'second':
		                time = this._d.valueOf();
		                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
		                break;
		        }

		        this._d.setTime(time);
		        hooks.updateOffset(this, true);
		        return this;
		    }

		    function valueOf() {
		        return this._d.valueOf() - (this._offset || 0) * 60000;
		    }

		    function unix() {
		        return Math.floor(this.valueOf() / 1000);
		    }

		    function toDate() {
		        return new Date(this.valueOf());
		    }

		    function toArray() {
		        var m = this;
		        return [
		            m.year(),
		            m.month(),
		            m.date(),
		            m.hour(),
		            m.minute(),
		            m.second(),
		            m.millisecond(),
		        ];
		    }

		    function toObject() {
		        var m = this;
		        return {
		            years: m.year(),
		            months: m.month(),
		            date: m.date(),
		            hours: m.hours(),
		            minutes: m.minutes(),
		            seconds: m.seconds(),
		            milliseconds: m.milliseconds(),
		        };
		    }

		    function toJSON() {
		        // new Date(NaN).toJSON() === null
		        return this.isValid() ? this.toISOString() : null;
		    }

		    function isValid$2() {
		        return isValid(this);
		    }

		    function parsingFlags() {
		        return extend({}, getParsingFlags(this));
		    }

		    function invalidAt() {
		        return getParsingFlags(this).overflow;
		    }

		    function creationData() {
		        return {
		            input: this._i,
		            format: this._f,
		            locale: this._locale,
		            isUTC: this._isUTC,
		            strict: this._strict,
		        };
		    }

		    addFormatToken('N', 0, 0, 'eraAbbr');
		    addFormatToken('NN', 0, 0, 'eraAbbr');
		    addFormatToken('NNN', 0, 0, 'eraAbbr');
		    addFormatToken('NNNN', 0, 0, 'eraName');
		    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

		    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
		    addFormatToken('y', ['yy', 2], 0, 'eraYear');
		    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
		    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

		    addRegexToken('N', matchEraAbbr);
		    addRegexToken('NN', matchEraAbbr);
		    addRegexToken('NNN', matchEraAbbr);
		    addRegexToken('NNNN', matchEraName);
		    addRegexToken('NNNNN', matchEraNarrow);

		    addParseToken(
		        ['N', 'NN', 'NNN', 'NNNN', 'NNNNN'],
		        function (input, array, config, token) {
		            var era = config._locale.erasParse(input, token, config._strict);
		            if (era) {
		                getParsingFlags(config).era = era;
		            } else {
		                getParsingFlags(config).invalidEra = input;
		            }
		        }
		    );

		    addRegexToken('y', matchUnsigned);
		    addRegexToken('yy', matchUnsigned);
		    addRegexToken('yyy', matchUnsigned);
		    addRegexToken('yyyy', matchUnsigned);
		    addRegexToken('yo', matchEraYearOrdinal);

		    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
		    addParseToken(['yo'], function (input, array, config, token) {
		        var match;
		        if (config._locale._eraYearOrdinalRegex) {
		            match = input.match(config._locale._eraYearOrdinalRegex);
		        }

		        if (config._locale.eraYearOrdinalParse) {
		            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
		        } else {
		            array[YEAR] = parseInt(input, 10);
		        }
		    });

		    function localeEras(m, format) {
		        var i,
		            l,
		            date,
		            eras = this._eras || getLocale('en')._eras;
		        for (i = 0, l = eras.length; i < l; ++i) {
		            switch (typeof eras[i].since) {
		                case 'string':
		                    // truncate time
		                    date = hooks(eras[i].since).startOf('day');
		                    eras[i].since = date.valueOf();
		                    break;
		            }

		            switch (typeof eras[i].until) {
		                case 'undefined':
		                    eras[i].until = +Infinity;
		                    break;
		                case 'string':
		                    // truncate time
		                    date = hooks(eras[i].until).startOf('day').valueOf();
		                    eras[i].until = date.valueOf();
		                    break;
		            }
		        }
		        return eras;
		    }

		    function localeErasParse(eraName, format, strict) {
		        var i,
		            l,
		            eras = this.eras(),
		            name,
		            abbr,
		            narrow;
		        eraName = eraName.toUpperCase();

		        for (i = 0, l = eras.length; i < l; ++i) {
		            name = eras[i].name.toUpperCase();
		            abbr = eras[i].abbr.toUpperCase();
		            narrow = eras[i].narrow.toUpperCase();

		            if (strict) {
		                switch (format) {
		                    case 'N':
		                    case 'NN':
		                    case 'NNN':
		                        if (abbr === eraName) {
		                            return eras[i];
		                        }
		                        break;

		                    case 'NNNN':
		                        if (name === eraName) {
		                            return eras[i];
		                        }
		                        break;

		                    case 'NNNNN':
		                        if (narrow === eraName) {
		                            return eras[i];
		                        }
		                        break;
		                }
		            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
		                return eras[i];
		            }
		        }
		    }

		    function localeErasConvertYear(era, year) {
		        var dir = era.since <= era.until ? 1 : -1;
		        if (year === undefined) {
		            return hooks(era.since).year();
		        } else {
		            return hooks(era.since).year() + (year - era.offset) * dir;
		        }
		    }

		    function getEraName() {
		        var i,
		            l,
		            val,
		            eras = this.localeData().eras();
		        for (i = 0, l = eras.length; i < l; ++i) {
		            // truncate time
		            val = this.clone().startOf('day').valueOf();

		            if (eras[i].since <= val && val <= eras[i].until) {
		                return eras[i].name;
		            }
		            if (eras[i].until <= val && val <= eras[i].since) {
		                return eras[i].name;
		            }
		        }

		        return '';
		    }

		    function getEraNarrow() {
		        var i,
		            l,
		            val,
		            eras = this.localeData().eras();
		        for (i = 0, l = eras.length; i < l; ++i) {
		            // truncate time
		            val = this.clone().startOf('day').valueOf();

		            if (eras[i].since <= val && val <= eras[i].until) {
		                return eras[i].narrow;
		            }
		            if (eras[i].until <= val && val <= eras[i].since) {
		                return eras[i].narrow;
		            }
		        }

		        return '';
		    }

		    function getEraAbbr() {
		        var i,
		            l,
		            val,
		            eras = this.localeData().eras();
		        for (i = 0, l = eras.length; i < l; ++i) {
		            // truncate time
		            val = this.clone().startOf('day').valueOf();

		            if (eras[i].since <= val && val <= eras[i].until) {
		                return eras[i].abbr;
		            }
		            if (eras[i].until <= val && val <= eras[i].since) {
		                return eras[i].abbr;
		            }
		        }

		        return '';
		    }

		    function getEraYear() {
		        var i,
		            l,
		            dir,
		            val,
		            eras = this.localeData().eras();
		        for (i = 0, l = eras.length; i < l; ++i) {
		            dir = eras[i].since <= eras[i].until ? 1 : -1;

		            // truncate time
		            val = this.clone().startOf('day').valueOf();

		            if (
		                (eras[i].since <= val && val <= eras[i].until) ||
		                (eras[i].until <= val && val <= eras[i].since)
		            ) {
		                return (
		                    (this.year() - hooks(eras[i].since).year()) * dir +
		                    eras[i].offset
		                );
		            }
		        }

		        return this.year();
		    }

		    function erasNameRegex(isStrict) {
		        if (!hasOwnProp(this, '_erasNameRegex')) {
		            computeErasParse.call(this);
		        }
		        return isStrict ? this._erasNameRegex : this._erasRegex;
		    }

		    function erasAbbrRegex(isStrict) {
		        if (!hasOwnProp(this, '_erasAbbrRegex')) {
		            computeErasParse.call(this);
		        }
		        return isStrict ? this._erasAbbrRegex : this._erasRegex;
		    }

		    function erasNarrowRegex(isStrict) {
		        if (!hasOwnProp(this, '_erasNarrowRegex')) {
		            computeErasParse.call(this);
		        }
		        return isStrict ? this._erasNarrowRegex : this._erasRegex;
		    }

		    function matchEraAbbr(isStrict, locale) {
		        return locale.erasAbbrRegex(isStrict);
		    }

		    function matchEraName(isStrict, locale) {
		        return locale.erasNameRegex(isStrict);
		    }

		    function matchEraNarrow(isStrict, locale) {
		        return locale.erasNarrowRegex(isStrict);
		    }

		    function matchEraYearOrdinal(isStrict, locale) {
		        return locale._eraYearOrdinalRegex || matchUnsigned;
		    }

		    function computeErasParse() {
		        var abbrPieces = [],
		            namePieces = [],
		            narrowPieces = [],
		            mixedPieces = [],
		            i,
		            l,
		            erasName,
		            erasAbbr,
		            erasNarrow,
		            eras = this.eras();

		        for (i = 0, l = eras.length; i < l; ++i) {
		            erasName = regexEscape(eras[i].name);
		            erasAbbr = regexEscape(eras[i].abbr);
		            erasNarrow = regexEscape(eras[i].narrow);

		            namePieces.push(erasName);
		            abbrPieces.push(erasAbbr);
		            narrowPieces.push(erasNarrow);
		            mixedPieces.push(erasName);
		            mixedPieces.push(erasAbbr);
		            mixedPieces.push(erasNarrow);
		        }

		        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
		        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
		        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
		        this._erasNarrowRegex = new RegExp(
		            '^(' + narrowPieces.join('|') + ')',
		            'i'
		        );
		    }

		    // FORMATTING

		    addFormatToken(0, ['gg', 2], 0, function () {
		        return this.weekYear() % 100;
		    });

		    addFormatToken(0, ['GG', 2], 0, function () {
		        return this.isoWeekYear() % 100;
		    });

		    function addWeekYearFormatToken(token, getter) {
		        addFormatToken(0, [token, token.length], 0, getter);
		    }

		    addWeekYearFormatToken('gggg', 'weekYear');
		    addWeekYearFormatToken('ggggg', 'weekYear');
		    addWeekYearFormatToken('GGGG', 'isoWeekYear');
		    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

		    // ALIASES

		    // PARSING

		    addRegexToken('G', matchSigned);
		    addRegexToken('g', matchSigned);
		    addRegexToken('GG', match1to2, match2);
		    addRegexToken('gg', match1to2, match2);
		    addRegexToken('GGGG', match1to4, match4);
		    addRegexToken('gggg', match1to4, match4);
		    addRegexToken('GGGGG', match1to6, match6);
		    addRegexToken('ggggg', match1to6, match6);

		    addWeekParseToken(
		        ['gggg', 'ggggg', 'GGGG', 'GGGGG'],
		        function (input, week, config, token) {
		            week[token.substr(0, 2)] = toInt(input);
		        }
		    );

		    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
		        week[token] = hooks.parseTwoDigitYear(input);
		    });

		    // MOMENTS

		    function getSetWeekYear(input) {
		        return getSetWeekYearHelper.call(
		            this,
		            input,
		            this.week(),
		            this.weekday() + this.localeData()._week.dow,
		            this.localeData()._week.dow,
		            this.localeData()._week.doy
		        );
		    }

		    function getSetISOWeekYear(input) {
		        return getSetWeekYearHelper.call(
		            this,
		            input,
		            this.isoWeek(),
		            this.isoWeekday(),
		            1,
		            4
		        );
		    }

		    function getISOWeeksInYear() {
		        return weeksInYear(this.year(), 1, 4);
		    }

		    function getISOWeeksInISOWeekYear() {
		        return weeksInYear(this.isoWeekYear(), 1, 4);
		    }

		    function getWeeksInYear() {
		        var weekInfo = this.localeData()._week;
		        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
		    }

		    function getWeeksInWeekYear() {
		        var weekInfo = this.localeData()._week;
		        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
		    }

		    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
		        var weeksTarget;
		        if (input == null) {
		            return weekOfYear(this, dow, doy).year;
		        } else {
		            weeksTarget = weeksInYear(input, dow, doy);
		            if (week > weeksTarget) {
		                week = weeksTarget;
		            }
		            return setWeekAll.call(this, input, week, weekday, dow, doy);
		        }
		    }

		    function setWeekAll(weekYear, week, weekday, dow, doy) {
		        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
		            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

		        this.year(date.getUTCFullYear());
		        this.month(date.getUTCMonth());
		        this.date(date.getUTCDate());
		        return this;
		    }

		    // FORMATTING

		    addFormatToken('Q', 0, 'Qo', 'quarter');

		    // PARSING

		    addRegexToken('Q', match1);
		    addParseToken('Q', function (input, array) {
		        array[MONTH] = (toInt(input) - 1) * 3;
		    });

		    // MOMENTS

		    function getSetQuarter(input) {
		        return input == null
		            ? Math.ceil((this.month() + 1) / 3)
		            : this.month((input - 1) * 3 + (this.month() % 3));
		    }

		    // FORMATTING

		    addFormatToken('D', ['DD', 2], 'Do', 'date');

		    // PARSING

		    addRegexToken('D', match1to2, match1to2NoLeadingZero);
		    addRegexToken('DD', match1to2, match2);
		    addRegexToken('Do', function (isStrict, locale) {
		        // TODO: Remove "ordinalParse" fallback in next major release.
		        return isStrict
		            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
		            : locale._dayOfMonthOrdinalParseLenient;
		    });

		    addParseToken(['D', 'DD'], DATE);
		    addParseToken('Do', function (input, array) {
		        array[DATE] = toInt(input.match(match1to2)[0]);
		    });

		    // MOMENTS

		    var getSetDayOfMonth = makeGetSet('Date', true);

		    // FORMATTING

		    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

		    // PARSING

		    addRegexToken('DDD', match1to3);
		    addRegexToken('DDDD', match3);
		    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
		        config._dayOfYear = toInt(input);
		    });

		    // HELPERS

		    // MOMENTS

		    function getSetDayOfYear(input) {
		        var dayOfYear =
		            Math.round(
		                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
		            ) + 1;
		        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
		    }

		    // FORMATTING

		    addFormatToken('m', ['mm', 2], 0, 'minute');

		    // PARSING

		    addRegexToken('m', match1to2, match1to2HasZero);
		    addRegexToken('mm', match1to2, match2);
		    addParseToken(['m', 'mm'], MINUTE);

		    // MOMENTS

		    var getSetMinute = makeGetSet('Minutes', false);

		    // FORMATTING

		    addFormatToken('s', ['ss', 2], 0, 'second');

		    // PARSING

		    addRegexToken('s', match1to2, match1to2HasZero);
		    addRegexToken('ss', match1to2, match2);
		    addParseToken(['s', 'ss'], SECOND);

		    // MOMENTS

		    var getSetSecond = makeGetSet('Seconds', false);

		    // FORMATTING

		    addFormatToken('S', 0, 0, function () {
		        return ~~(this.millisecond() / 100);
		    });

		    addFormatToken(0, ['SS', 2], 0, function () {
		        return ~~(this.millisecond() / 10);
		    });

		    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
		    addFormatToken(0, ['SSSS', 4], 0, function () {
		        return this.millisecond() * 10;
		    });
		    addFormatToken(0, ['SSSSS', 5], 0, function () {
		        return this.millisecond() * 100;
		    });
		    addFormatToken(0, ['SSSSSS', 6], 0, function () {
		        return this.millisecond() * 1000;
		    });
		    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
		        return this.millisecond() * 10000;
		    });
		    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
		        return this.millisecond() * 100000;
		    });
		    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
		        return this.millisecond() * 1000000;
		    });

		    // PARSING

		    addRegexToken('S', match1to3, match1);
		    addRegexToken('SS', match1to3, match2);
		    addRegexToken('SSS', match1to3, match3);

		    var token, getSetMillisecond;
		    for (token = 'SSSS'; token.length <= 9; token += 'S') {
		        addRegexToken(token, matchUnsigned);
		    }

		    function parseMs(input, array) {
		        array[MILLISECOND] = toInt(('0.' + input) * 1000);
		    }

		    for (token = 'S'; token.length <= 9; token += 'S') {
		        addParseToken(token, parseMs);
		    }

		    getSetMillisecond = makeGetSet('Milliseconds', false);

		    // FORMATTING

		    addFormatToken('z', 0, 0, 'zoneAbbr');
		    addFormatToken('zz', 0, 0, 'zoneName');

		    // MOMENTS

		    function getZoneAbbr() {
		        return this._isUTC ? 'UTC' : '';
		    }

		    function getZoneName() {
		        return this._isUTC ? 'Coordinated Universal Time' : '';
		    }

		    var proto = Moment.prototype;

		    proto.add = add;
		    proto.calendar = calendar$1;
		    proto.clone = clone;
		    proto.diff = diff;
		    proto.endOf = endOf;
		    proto.format = format;
		    proto.from = from;
		    proto.fromNow = fromNow;
		    proto.to = to;
		    proto.toNow = toNow;
		    proto.get = stringGet;
		    proto.invalidAt = invalidAt;
		    proto.isAfter = isAfter;
		    proto.isBefore = isBefore;
		    proto.isBetween = isBetween;
		    proto.isSame = isSame;
		    proto.isSameOrAfter = isSameOrAfter;
		    proto.isSameOrBefore = isSameOrBefore;
		    proto.isValid = isValid$2;
		    proto.lang = lang;
		    proto.locale = locale;
		    proto.localeData = localeData;
		    proto.max = prototypeMax;
		    proto.min = prototypeMin;
		    proto.parsingFlags = parsingFlags;
		    proto.set = stringSet;
		    proto.startOf = startOf;
		    proto.subtract = subtract;
		    proto.toArray = toArray;
		    proto.toObject = toObject;
		    proto.toDate = toDate;
		    proto.toISOString = toISOString;
		    proto.inspect = inspect;
		    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
		        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
		            return 'Moment<' + this.format() + '>';
		        };
		    }
		    proto.toJSON = toJSON;
		    proto.toString = toString;
		    proto.unix = unix;
		    proto.valueOf = valueOf;
		    proto.creationData = creationData;
		    proto.eraName = getEraName;
		    proto.eraNarrow = getEraNarrow;
		    proto.eraAbbr = getEraAbbr;
		    proto.eraYear = getEraYear;
		    proto.year = getSetYear;
		    proto.isLeapYear = getIsLeapYear;
		    proto.weekYear = getSetWeekYear;
		    proto.isoWeekYear = getSetISOWeekYear;
		    proto.quarter = proto.quarters = getSetQuarter;
		    proto.month = getSetMonth;
		    proto.daysInMonth = getDaysInMonth;
		    proto.week = proto.weeks = getSetWeek;
		    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
		    proto.weeksInYear = getWeeksInYear;
		    proto.weeksInWeekYear = getWeeksInWeekYear;
		    proto.isoWeeksInYear = getISOWeeksInYear;
		    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
		    proto.date = getSetDayOfMonth;
		    proto.day = proto.days = getSetDayOfWeek;
		    proto.weekday = getSetLocaleDayOfWeek;
		    proto.isoWeekday = getSetISODayOfWeek;
		    proto.dayOfYear = getSetDayOfYear;
		    proto.hour = proto.hours = getSetHour;
		    proto.minute = proto.minutes = getSetMinute;
		    proto.second = proto.seconds = getSetSecond;
		    proto.millisecond = proto.milliseconds = getSetMillisecond;
		    proto.utcOffset = getSetOffset;
		    proto.utc = setOffsetToUTC;
		    proto.local = setOffsetToLocal;
		    proto.parseZone = setOffsetToParsedOffset;
		    proto.hasAlignedHourOffset = hasAlignedHourOffset;
		    proto.isDST = isDaylightSavingTime;
		    proto.isLocal = isLocal;
		    proto.isUtcOffset = isUtcOffset;
		    proto.isUtc = isUtc;
		    proto.isUTC = isUtc;
		    proto.zoneAbbr = getZoneAbbr;
		    proto.zoneName = getZoneName;
		    proto.dates = deprecate(
		        'dates accessor is deprecated. Use date instead.',
		        getSetDayOfMonth
		    );
		    proto.months = deprecate(
		        'months accessor is deprecated. Use month instead',
		        getSetMonth
		    );
		    proto.years = deprecate(
		        'years accessor is deprecated. Use year instead',
		        getSetYear
		    );
		    proto.zone = deprecate(
		        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
		        getSetZone
		    );
		    proto.isDSTShifted = deprecate(
		        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
		        isDaylightSavingTimeShifted
		    );

		    function createUnix(input) {
		        return createLocal(input * 1000);
		    }

		    function createInZone() {
		        return createLocal.apply(null, arguments).parseZone();
		    }

		    function preParsePostFormat(string) {
		        return string;
		    }

		    var proto$1 = Locale.prototype;

		    proto$1.calendar = calendar;
		    proto$1.longDateFormat = longDateFormat;
		    proto$1.invalidDate = invalidDate;
		    proto$1.ordinal = ordinal;
		    proto$1.preparse = preParsePostFormat;
		    proto$1.postformat = preParsePostFormat;
		    proto$1.relativeTime = relativeTime;
		    proto$1.pastFuture = pastFuture;
		    proto$1.set = set;
		    proto$1.eras = localeEras;
		    proto$1.erasParse = localeErasParse;
		    proto$1.erasConvertYear = localeErasConvertYear;
		    proto$1.erasAbbrRegex = erasAbbrRegex;
		    proto$1.erasNameRegex = erasNameRegex;
		    proto$1.erasNarrowRegex = erasNarrowRegex;

		    proto$1.months = localeMonths;
		    proto$1.monthsShort = localeMonthsShort;
		    proto$1.monthsParse = localeMonthsParse;
		    proto$1.monthsRegex = monthsRegex;
		    proto$1.monthsShortRegex = monthsShortRegex;
		    proto$1.week = localeWeek;
		    proto$1.firstDayOfYear = localeFirstDayOfYear;
		    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

		    proto$1.weekdays = localeWeekdays;
		    proto$1.weekdaysMin = localeWeekdaysMin;
		    proto$1.weekdaysShort = localeWeekdaysShort;
		    proto$1.weekdaysParse = localeWeekdaysParse;

		    proto$1.weekdaysRegex = weekdaysRegex;
		    proto$1.weekdaysShortRegex = weekdaysShortRegex;
		    proto$1.weekdaysMinRegex = weekdaysMinRegex;

		    proto$1.isPM = localeIsPM;
		    proto$1.meridiem = localeMeridiem;

		    function get$1(format, index, field, setter) {
		        var locale = getLocale(),
		            utc = createUTC().set(setter, index);
		        return locale[field](utc, format);
		    }

		    function listMonthsImpl(format, index, field) {
		        if (isNumber(format)) {
		            index = format;
		            format = undefined;
		        }

		        format = format || '';

		        if (index != null) {
		            return get$1(format, index, field, 'month');
		        }

		        var i,
		            out = [];
		        for (i = 0; i < 12; i++) {
		            out[i] = get$1(format, i, field, 'month');
		        }
		        return out;
		    }

		    // ()
		    // (5)
		    // (fmt, 5)
		    // (fmt)
		    // (true)
		    // (true, 5)
		    // (true, fmt, 5)
		    // (true, fmt)
		    function listWeekdaysImpl(localeSorted, format, index, field) {
		        if (typeof localeSorted === 'boolean') {
		            if (isNumber(format)) {
		                index = format;
		                format = undefined;
		            }

		            format = format || '';
		        } else {
		            format = localeSorted;
		            index = format;
		            localeSorted = false;

		            if (isNumber(format)) {
		                index = format;
		                format = undefined;
		            }

		            format = format || '';
		        }

		        var locale = getLocale(),
		            shift = localeSorted ? locale._week.dow : 0,
		            i,
		            out = [];

		        if (index != null) {
		            return get$1(format, (index + shift) % 7, field, 'day');
		        }

		        for (i = 0; i < 7; i++) {
		            out[i] = get$1(format, (i + shift) % 7, field, 'day');
		        }
		        return out;
		    }

		    function listMonths(format, index) {
		        return listMonthsImpl(format, index, 'months');
		    }

		    function listMonthsShort(format, index) {
		        return listMonthsImpl(format, index, 'monthsShort');
		    }

		    function listWeekdays(localeSorted, format, index) {
		        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
		    }

		    function listWeekdaysShort(localeSorted, format, index) {
		        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
		    }

		    function listWeekdaysMin(localeSorted, format, index) {
		        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
		    }

		    getSetGlobalLocale('en', {
		        eras: [
		            {
		                since: '0001-01-01',
		                until: +Infinity,
		                offset: 1,
		                name: 'Anno Domini',
		                narrow: 'AD',
		                abbr: 'AD',
		            },
		            {
		                since: '0000-12-31',
		                until: -Infinity,
		                offset: 1,
		                name: 'Before Christ',
		                narrow: 'BC',
		                abbr: 'BC',
		            },
		        ],
		        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
		        ordinal: function (number) {
		            var b = number % 10,
		                output =
		                    toInt((number % 100) / 10) === 1
		                        ? 'th'
		                        : b === 1
		                          ? 'st'
		                          : b === 2
		                            ? 'nd'
		                            : b === 3
		                              ? 'rd'
		                              : 'th';
		            return number + output;
		        },
		    });

		    // Side effect imports

		    hooks.lang = deprecate(
		        'moment.lang is deprecated. Use moment.locale instead.',
		        getSetGlobalLocale
		    );
		    hooks.langData = deprecate(
		        'moment.langData is deprecated. Use moment.localeData instead.',
		        getLocale
		    );

		    var mathAbs = Math.abs;

		    function abs() {
		        var data = this._data;

		        this._milliseconds = mathAbs(this._milliseconds);
		        this._days = mathAbs(this._days);
		        this._months = mathAbs(this._months);

		        data.milliseconds = mathAbs(data.milliseconds);
		        data.seconds = mathAbs(data.seconds);
		        data.minutes = mathAbs(data.minutes);
		        data.hours = mathAbs(data.hours);
		        data.months = mathAbs(data.months);
		        data.years = mathAbs(data.years);

		        return this;
		    }

		    function addSubtract$1(duration, input, value, direction) {
		        var other = createDuration(input, value);

		        duration._milliseconds += direction * other._milliseconds;
		        duration._days += direction * other._days;
		        duration._months += direction * other._months;

		        return duration._bubble();
		    }

		    // supports only 2.0-style add(1, 's') or add(duration)
		    function add$1(input, value) {
		        return addSubtract$1(this, input, value, 1);
		    }

		    // supports only 2.0-style subtract(1, 's') or subtract(duration)
		    function subtract$1(input, value) {
		        return addSubtract$1(this, input, value, -1);
		    }

		    function absCeil(number) {
		        if (number < 0) {
		            return Math.floor(number);
		        } else {
		            return Math.ceil(number);
		        }
		    }

		    function bubble() {
		        var milliseconds = this._milliseconds,
		            days = this._days,
		            months = this._months,
		            data = this._data,
		            seconds,
		            minutes,
		            hours,
		            years,
		            monthsFromDays;

		        // if we have a mix of positive and negative values, bubble down first
		        // check: https://github.com/moment/moment/issues/2166
		        if (
		            !(
		                (milliseconds >= 0 && days >= 0 && months >= 0) ||
		                (milliseconds <= 0 && days <= 0 && months <= 0)
		            )
		        ) {
		            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
		            days = 0;
		            months = 0;
		        }

		        // The following code bubbles up values, see the tests for
		        // examples of what that means.
		        data.milliseconds = milliseconds % 1000;

		        seconds = absFloor(milliseconds / 1000);
		        data.seconds = seconds % 60;

		        minutes = absFloor(seconds / 60);
		        data.minutes = minutes % 60;

		        hours = absFloor(minutes / 60);
		        data.hours = hours % 24;

		        days += absFloor(hours / 24);

		        // convert days to months
		        monthsFromDays = absFloor(daysToMonths(days));
		        months += monthsFromDays;
		        days -= absCeil(monthsToDays(monthsFromDays));

		        // 12 months -> 1 year
		        years = absFloor(months / 12);
		        months %= 12;

		        data.days = days;
		        data.months = months;
		        data.years = years;

		        return this;
		    }

		    function daysToMonths(days) {
		        // 400 years have 146097 days (taking into account leap year rules)
		        // 400 years have 12 months === 4800
		        return (days * 4800) / 146097;
		    }

		    function monthsToDays(months) {
		        // the reverse of daysToMonths
		        return (months * 146097) / 4800;
		    }

		    function as(units) {
		        if (!this.isValid()) {
		            return NaN;
		        }
		        var days,
		            months,
		            milliseconds = this._milliseconds;

		        units = normalizeUnits(units);

		        if (units === 'month' || units === 'quarter' || units === 'year') {
		            days = this._days + milliseconds / 864e5;
		            months = this._months + daysToMonths(days);
		            switch (units) {
		                case 'month':
		                    return months;
		                case 'quarter':
		                    return months / 3;
		                case 'year':
		                    return months / 12;
		            }
		        } else {
		            // handle milliseconds separately because of floating point math errors (issue #1867)
		            days = this._days + Math.round(monthsToDays(this._months));
		            switch (units) {
		                case 'week':
		                    return days / 7 + milliseconds / 6048e5;
		                case 'day':
		                    return days + milliseconds / 864e5;
		                case 'hour':
		                    return days * 24 + milliseconds / 36e5;
		                case 'minute':
		                    return days * 1440 + milliseconds / 6e4;
		                case 'second':
		                    return days * 86400 + milliseconds / 1000;
		                // Math.floor prevents floating point math errors here
		                case 'millisecond':
		                    return Math.floor(days * 864e5) + milliseconds;
		                default:
		                    throw new Error('Unknown unit ' + units);
		            }
		        }
		    }

		    function makeAs(alias) {
		        return function () {
		            return this.as(alias);
		        };
		    }

		    var asMilliseconds = makeAs('ms'),
		        asSeconds = makeAs('s'),
		        asMinutes = makeAs('m'),
		        asHours = makeAs('h'),
		        asDays = makeAs('d'),
		        asWeeks = makeAs('w'),
		        asMonths = makeAs('M'),
		        asQuarters = makeAs('Q'),
		        asYears = makeAs('y'),
		        valueOf$1 = asMilliseconds;

		    function clone$1() {
		        return createDuration(this);
		    }

		    function get$2(units) {
		        units = normalizeUnits(units);
		        return this.isValid() ? this[units + 's']() : NaN;
		    }

		    function makeGetter(name) {
		        return function () {
		            return this.isValid() ? this._data[name] : NaN;
		        };
		    }

		    var milliseconds = makeGetter('milliseconds'),
		        seconds = makeGetter('seconds'),
		        minutes = makeGetter('minutes'),
		        hours = makeGetter('hours'),
		        days = makeGetter('days'),
		        months = makeGetter('months'),
		        years = makeGetter('years');

		    function weeks() {
		        return absFloor(this.days() / 7);
		    }

		    var round = Math.round,
		        thresholds = {
		            ss: 44, // a few seconds to seconds
		            s: 45, // seconds to minute
		            m: 45, // minutes to hour
		            h: 22, // hours to day
		            d: 26, // days to month/week
		            w: null, // weeks to month
		            M: 11, // months to year
		        };

		    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
		    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
		        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
		    }

		    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
		        var duration = createDuration(posNegDuration).abs(),
		            seconds = round(duration.as('s')),
		            minutes = round(duration.as('m')),
		            hours = round(duration.as('h')),
		            days = round(duration.as('d')),
		            months = round(duration.as('M')),
		            weeks = round(duration.as('w')),
		            years = round(duration.as('y')),
		            a =
		                (seconds <= thresholds.ss && ['s', seconds]) ||
		                (seconds < thresholds.s && ['ss', seconds]) ||
		                (minutes <= 1 && ['m']) ||
		                (minutes < thresholds.m && ['mm', minutes]) ||
		                (hours <= 1 && ['h']) ||
		                (hours < thresholds.h && ['hh', hours]) ||
		                (days <= 1 && ['d']) ||
		                (days < thresholds.d && ['dd', days]);

		        if (thresholds.w != null) {
		            a =
		                a ||
		                (weeks <= 1 && ['w']) ||
		                (weeks < thresholds.w && ['ww', weeks]);
		        }
		        a = a ||
		            (months <= 1 && ['M']) ||
		            (months < thresholds.M && ['MM', months]) ||
		            (years <= 1 && ['y']) || ['yy', years];

		        a[2] = withoutSuffix;
		        a[3] = +posNegDuration > 0;
		        a[4] = locale;
		        return substituteTimeAgo.apply(null, a);
		    }

		    // This function allows you to set the rounding function for relative time strings
		    function getSetRelativeTimeRounding(roundingFunction) {
		        if (roundingFunction === undefined) {
		            return round;
		        }
		        if (typeof roundingFunction === 'function') {
		            round = roundingFunction;
		            return true;
		        }
		        return false;
		    }

		    // This function allows you to set a threshold for relative time strings
		    function getSetRelativeTimeThreshold(threshold, limit) {
		        if (thresholds[threshold] === undefined) {
		            return false;
		        }
		        if (limit === undefined) {
		            return thresholds[threshold];
		        }
		        thresholds[threshold] = limit;
		        if (threshold === 's') {
		            thresholds.ss = limit - 1;
		        }
		        return true;
		    }

		    function humanize(argWithSuffix, argThresholds) {
		        if (!this.isValid()) {
		            return this.localeData().invalidDate();
		        }

		        var withSuffix = false,
		            th = thresholds,
		            locale,
		            output;

		        if (typeof argWithSuffix === 'object') {
		            argThresholds = argWithSuffix;
		            argWithSuffix = false;
		        }
		        if (typeof argWithSuffix === 'boolean') {
		            withSuffix = argWithSuffix;
		        }
		        if (typeof argThresholds === 'object') {
		            th = Object.assign({}, thresholds, argThresholds);
		            if (argThresholds.s != null && argThresholds.ss == null) {
		                th.ss = argThresholds.s - 1;
		            }
		        }

		        locale = this.localeData();
		        output = relativeTime$1(this, !withSuffix, th, locale);

		        if (withSuffix) {
		            output = locale.pastFuture(+this, output);
		        }

		        return locale.postformat(output);
		    }

		    var abs$1 = Math.abs;

		    function sign(x) {
		        return (x > 0) - (x < 0) || +x;
		    }

		    function toISOString$1() {
		        // for ISO strings we do not use the normal bubbling rules:
		        //  * milliseconds bubble up until they become hours
		        //  * days do not bubble at all
		        //  * months bubble up until they become years
		        // This is because there is no context-free conversion between hours and days
		        // (think of clock changes)
		        // and also not between days and months (28-31 days per month)
		        if (!this.isValid()) {
		            return this.localeData().invalidDate();
		        }

		        var seconds = abs$1(this._milliseconds) / 1000,
		            days = abs$1(this._days),
		            months = abs$1(this._months),
		            minutes,
		            hours,
		            years,
		            s,
		            total = this.asSeconds(),
		            totalSign,
		            ymSign,
		            daysSign,
		            hmsSign;

		        if (!total) {
		            // this is the same as C#'s (Noda) and python (isodate)...
		            // but not other JS (goog.date)
		            return 'P0D';
		        }

		        // 3600 seconds -> 60 minutes -> 1 hour
		        minutes = absFloor(seconds / 60);
		        hours = absFloor(minutes / 60);
		        seconds %= 60;
		        minutes %= 60;

		        // 12 months -> 1 year
		        years = absFloor(months / 12);
		        months %= 12;

		        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
		        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

		        totalSign = total < 0 ? '-' : '';
		        ymSign = sign(this._months) !== sign(total) ? '-' : '';
		        daysSign = sign(this._days) !== sign(total) ? '-' : '';
		        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

		        return (
		            totalSign +
		            'P' +
		            (years ? ymSign + years + 'Y' : '') +
		            (months ? ymSign + months + 'M' : '') +
		            (days ? daysSign + days + 'D' : '') +
		            (hours || minutes || seconds ? 'T' : '') +
		            (hours ? hmsSign + hours + 'H' : '') +
		            (minutes ? hmsSign + minutes + 'M' : '') +
		            (seconds ? hmsSign + s + 'S' : '')
		        );
		    }

		    var proto$2 = Duration.prototype;

		    proto$2.isValid = isValid$1;
		    proto$2.abs = abs;
		    proto$2.add = add$1;
		    proto$2.subtract = subtract$1;
		    proto$2.as = as;
		    proto$2.asMilliseconds = asMilliseconds;
		    proto$2.asSeconds = asSeconds;
		    proto$2.asMinutes = asMinutes;
		    proto$2.asHours = asHours;
		    proto$2.asDays = asDays;
		    proto$2.asWeeks = asWeeks;
		    proto$2.asMonths = asMonths;
		    proto$2.asQuarters = asQuarters;
		    proto$2.asYears = asYears;
		    proto$2.valueOf = valueOf$1;
		    proto$2._bubble = bubble;
		    proto$2.clone = clone$1;
		    proto$2.get = get$2;
		    proto$2.milliseconds = milliseconds;
		    proto$2.seconds = seconds;
		    proto$2.minutes = minutes;
		    proto$2.hours = hours;
		    proto$2.days = days;
		    proto$2.weeks = weeks;
		    proto$2.months = months;
		    proto$2.years = years;
		    proto$2.humanize = humanize;
		    proto$2.toISOString = toISOString$1;
		    proto$2.toString = toISOString$1;
		    proto$2.toJSON = toISOString$1;
		    proto$2.locale = locale;
		    proto$2.localeData = localeData;

		    proto$2.toIsoString = deprecate(
		        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
		        toISOString$1
		    );
		    proto$2.lang = lang;

		    // FORMATTING

		    addFormatToken('X', 0, 0, 'unix');
		    addFormatToken('x', 0, 0, 'valueOf');

		    // PARSING

		    addRegexToken('x', matchSigned);
		    addRegexToken('X', matchTimestamp);
		    addParseToken('X', function (input, array, config) {
		        config._d = new Date(parseFloat(input) * 1000);
		    });
		    addParseToken('x', function (input, array, config) {
		        config._d = new Date(toInt(input));
		    });

		    //! moment.js

		    hooks.version = '2.30.1';

		    setHookCallback(createLocal);

		    hooks.fn = proto;
		    hooks.min = min;
		    hooks.max = max;
		    hooks.now = now;
		    hooks.utc = createUTC;
		    hooks.unix = createUnix;
		    hooks.months = listMonths;
		    hooks.isDate = isDate;
		    hooks.locale = getSetGlobalLocale;
		    hooks.invalid = createInvalid;
		    hooks.duration = createDuration;
		    hooks.isMoment = isMoment;
		    hooks.weekdays = listWeekdays;
		    hooks.parseZone = createInZone;
		    hooks.localeData = getLocale;
		    hooks.isDuration = isDuration;
		    hooks.monthsShort = listMonthsShort;
		    hooks.weekdaysMin = listWeekdaysMin;
		    hooks.defineLocale = defineLocale;
		    hooks.updateLocale = updateLocale;
		    hooks.locales = listLocales;
		    hooks.weekdaysShort = listWeekdaysShort;
		    hooks.normalizeUnits = normalizeUnits;
		    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
		    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
		    hooks.calendarFormat = getCalendarFormat;
		    hooks.prototype = proto;

		    // currently HTML5 input type only supports 24-hour formats
		    hooks.HTML5_FMT = {
		        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
		        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
		        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
		        DATE: 'YYYY-MM-DD', // <input type="date" />
		        TIME: 'HH:mm', // <input type="time" />
		        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
		        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
		        WEEK: 'GGGG-[W]WW', // <input type="week" />
		        MONTH: 'YYYY-MM', // <input type="month" />
		    };

		    return hooks;

		}))); 
	} (moment$1));
	return moment$1.exports;
}

var NowExpression_1;
var hasRequiredNowExpression;

function requireNowExpression () {
	if (hasRequiredNowExpression) return NowExpression_1;
	hasRequiredNowExpression = 1;
	const moment = requireMoment();

	class NowExpression {
	  canHandle(expression) {
	    return expression === "now()";
	  }

	  async execute() {
	    return moment().format();
	  }
	}

	NowExpression_1 = NowExpression;
	return NowExpression_1;
}

var TimeExpression_1;
var hasRequiredTimeExpression;

function requireTimeExpression () {
	if (hasRequiredTimeExpression) return TimeExpression_1;
	hasRequiredTimeExpression = 1;
	const moment = requireMoment();

	class TimeExpression {
	  canHandle(expression) {
	    return expression === "time()";
	  }

	  async execute() {
	    return moment().unix();
	  }
	}

	TimeExpression_1 = TimeExpression;
	return TimeExpression_1;
}

var jsonata = {exports: {}};

var hasRequiredJsonata;

function requireJsonata () {
	if (hasRequiredJsonata) return jsonata.exports;
	hasRequiredJsonata = 1;
	(function (module, exports) {
		(function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,true);if(u)return u(i,true);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
		/**
		 * © Copyright IBM Corp. 2018 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		const utils = require('./utils');

		/**
		 * DateTime formatting and parsing functions
		 * Implements the xpath-functions format-date-time specification
		 * @type {{formatInteger, formatDateTime, parseInteger, parseDateTime}}
		 */
		const dateTime = (function () {

		    const stringToArray = utils.stringToArray;

		    const few = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
		        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
		    const ordinals = ['Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
		        'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
		    const decades = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred'];
		    const magnitudes = ['Thousand', 'Million', 'Billion', 'Trillion'];

		    /**
		     * converts a number into english words
		     * @param {string} value - the value to format
		     * @param {boolean} ordinal - ordinal or cardinal form
		     * @returns {string} - representation in words
		     */
		    function numberToWords(value, ordinal) {
		        var lookup = function (num, prev, ord) {
		            var words = '';
		            if (num <= 19) {
		                words = (prev ? ' and ' : '') + (ord ? ordinals[num] : few[num]);
		            } else if (num < 100) {
		                const tens = Math.floor(num / 10);
		                const remainder = num % 10;
		                words = (prev ? ' and ' : '') + decades[tens - 2];
		                if (remainder > 0) {
		                    words += '-' + lookup(remainder, false, ord);
		                } else if (ord) {
		                    words = words.substring(0, words.length - 1) + 'ieth';
		                }
		            } else if (num < 1000) {
		                const hundreds = Math.floor(num / 100);
		                const remainder = num % 100;
		                words = (prev ? ', ' : '') + few[hundreds] + ' Hundred';
		                if (remainder > 0) {
		                    words += lookup(remainder, true, ord);
		                } else if (ord) {
		                    words += 'th';
		                }
		            } else {
		                var mag = Math.floor(Math.log10(num) / 3);
		                if (mag > magnitudes.length) {
		                    mag = magnitudes.length; // the largest word
		                }
		                const factor = Math.pow(10, mag * 3);
		                const mant = Math.floor(num / factor);
		                const remainder = num - mant * factor;
		                words = (prev ? ', ' : '') + lookup(mant, false, false) + ' ' + magnitudes[mag - 1];
		                if (remainder > 0) {
		                    words += lookup(remainder, true, ord);
		                } else if (ord) {
		                    words += 'th';
		                }
		            }
		            return words;
		        };

		        var words = lookup(value, false, ordinal);
		        return words;
		    }

		    const wordValues = {};
		    few.forEach(function (word, index) {
		        wordValues[word.toLowerCase()] = index;
		    });
		    ordinals.forEach(function (word, index) {
		        wordValues[word.toLowerCase()] = index;
		    });
		    decades.forEach(function (word, index) {
		        const lword = word.toLowerCase();
		        wordValues[lword] = (index + 2) * 10;
		        wordValues[lword.substring(0, word.length - 1) + 'ieth'] = wordValues[lword];
		    });
		    wordValues.hundredth = 100;
		    magnitudes.forEach(function (word, index) {
		        const lword = word.toLowerCase();
		        const val = Math.pow(10, (index + 1) * 3);
		        wordValues[lword] = val;
		        wordValues[lword + 'th'] = val;
		    });

		    /**
		     * Converts a number in english words to numeric value
		     * @param {string} text - the number in words
		     * @returns {number} - the numeric value
		     */
		    function wordsToNumber(text) {
		        const parts = text.split(/,\s|\sand\s|[\s\\-]/);
		        const values = parts.map(part => wordValues[part]);
		        let segs = [0];
		        values.forEach(value => {
		            if (value < 100) {
		                let top = segs.pop();
		                if (top >= 1000) {
		                    segs.push(top);
		                    top = 0;
		                }
		                segs.push(top + value);
		            } else {
		                segs.push(segs.pop() * value);
		            }
		        });
		        const result = segs.reduce((a, b) => a + b, 0);
		        return result;
		    }

		    const romanNumerals = [
		        [1000, 'm'],
		        [900, 'cm'],
		        [500, 'd'],
		        [400, 'cd'],
		        [100, 'c'],
		        [90, 'xc'],
		        [50, 'l'],
		        [40, 'xl'],
		        [10, 'x'],
		        [9, 'ix'],
		        [5, 'v'],
		        [4, 'iv'],
		        [1, 'i']
		    ];

		    const romanValues = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1};

		    /**
		     * converts a number to roman numerals
		     * @param {number} value - the number
		     * @returns {string} - the number in roman numerals
		     */
		    function decimalToRoman(value) {
		        for (var index = 0; index < romanNumerals.length; index++) {
		            const numeral = romanNumerals[index];
		            if (value >= numeral[0]) {
		                return numeral[1] + decimalToRoman(value - numeral[0]);
		            }
		        }
		        return '';
		    }

		    /**
		     * converts roman numerals to a number
		     * @param {string} roman - roman number
		     * @returns {number} - the numeric value
		     */
		    function romanToDecimal(roman) {
		        var decimal = 0;
		        var max = 1;
		        for (var i = roman.length - 1; i >= 0; i--) {
		            const digit = roman[i];
		            const value = romanValues[digit];
		            if (value < max) {
		                decimal -= value;
		            } else {
		                max = value;
		                decimal += value;
		            }
		        }
		        return decimal;
		    }

		    /**
		     * converts a number to spreadsheet style letters
		     * @param {number} value - the number
		     * @param {string} aChar - the character representing the start of the sequence, e.g. 'A'
		     * @returns {string} - the letters
		     */
		    function decimalToLetters(value, aChar) {
		        var letters = [];
		        var aCode = aChar.charCodeAt(0);
		        while (value > 0) {
		            letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
		            value = Math.floor((value - 1) / 26);
		        }
		        return letters.join('');
		    }

		    /**
		     * converts spreadsheet style letters to a number
		     * @param {string} letters - the letters
		     * @param {string} aChar - the character representing the start of the sequence, e.g. 'A'
		     * @returns {number} - the numeric value
		     */
		    function lettersToDecimal(letters, aChar) {
		        var aCode = aChar.charCodeAt(0);
		        var decimal = 0;
		        for (var i = 0; i < letters.length; i++) {
		            decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
		        }
		        return decimal;
		    }

		    /**
		     * Formats an integer as specified by the XPath fn:format-integer function
		     * See https://www.w3.org/TR/xpath-functions-31/#func-format-integer
		     * @param {number} value - the number to be formatted
		     * @param {string} picture - the picture string that specifies the format
		     * @returns {string} - the formatted number
		     */
		    function formatInteger(value, picture) {
		        if (typeof value === 'undefined') {
		            return undefined;
		        }

		        value = Math.floor(value);

		        const format = analyseIntegerPicture(picture);
		        return _formatInteger(value, format);
		    }

		    const formats = {
		        DECIMAL: 'decimal',
		        LETTERS: 'letters',
		        ROMAN: 'roman',
		        WORDS: 'words',
		        SEQUENCE: 'sequence'
		    };

		    const tcase = {
		        UPPER: 'upper',
		        LOWER: 'lower',
		        TITLE: 'title'
		    };

		    /**
		     * formats an integer using a preprocessed representation of the picture string
		     * @param {number} value - the number to be formatted
		     * @param {object} format - the preprocessed representation of the pucture string
		     * @returns {string} - the formatted number
		     * @private
		     */
		    function _formatInteger(value, format) {
		        let formattedInteger;
		        const negative = value < 0;
		        value = Math.abs(value);
		        switch (format.primary) {
		            case formats.LETTERS:
		                formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? 'A' : 'a');
		                break;
		            case formats.ROMAN:
		                formattedInteger = decimalToRoman(value);
		                if (format.case === tcase.UPPER) {
		                    formattedInteger = formattedInteger.toUpperCase();
		                }
		                break;
		            case formats.WORDS:
		                formattedInteger = numberToWords(value, format.ordinal);
		                if (format.case === tcase.UPPER) {
		                    formattedInteger = formattedInteger.toUpperCase();
		                } else if (format.case === tcase.LOWER) {
		                    formattedInteger = formattedInteger.toLowerCase();
		                }
		                break;
		            case formats.DECIMAL:
		                formattedInteger = '' + value;
		                // TODO use functionPad
		                var padLength = format.mandatoryDigits - formattedInteger.length;
		                if (padLength > 0) {
		                    var padding = (new Array(padLength + 1)).join('0');
		                    formattedInteger = padding + formattedInteger;
		                }
		                if (format.zeroCode !== 0x30) {
		                    formattedInteger = stringToArray(formattedInteger).map(code => {
		                        return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 0x30);
		                    }).join('');
		                }
		                // insert the grouping-separator-signs, if any
		                if (format.regular) {
		                    const n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
		                    for (let ii = n; ii > 0; ii--) {
		                        const pos = formattedInteger.length - ii * format.groupingSeparators.position;
		                        formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
		                    }
		                } else {
		                    format.groupingSeparators.reverse().forEach(separator => {
		                        const pos = formattedInteger.length - separator.position;
		                        formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
		                    });
		                }

		                if (format.ordinal) {
		                    var suffix123 = {'1': 'st', '2': 'nd', '3': 'rd'};
		                    var lastDigit = formattedInteger[formattedInteger.length - 1];
		                    var suffix = suffix123[lastDigit];
		                    if (!suffix || (formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === '1')) {
		                        suffix = 'th';
		                    }
		                    formattedInteger = formattedInteger + suffix;
		                }
		                break;
		            case formats.SEQUENCE:
		                throw {
		                    code: 'D3130',
		                    value: format.token
		                };
		        }
		        if (negative) {
		            formattedInteger = '-' + formattedInteger;
		        }

		        return formattedInteger;
		    }

		    //TODO what about decimal groups in the unicode supplementary planes (surrogate pairs) ???
		    const decimalGroups = [0x30, 0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6, 0x0C66, 0x0CE6, 0x0D66, 0x0DE6, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0, 0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900, 0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10];

		    /**
		     * preprocesses the picture string
		     * @param {string} picture - picture string
		     * @returns {{type: string, primary: string, case: string, ordinal: boolean}} - analysed picture
		     */
		    function analyseIntegerPicture(picture) {
		        const format = {
		            type: 'integer',
		            primary: formats.DECIMAL,
		            case: tcase.LOWER,
		            ordinal: false
		        };

		        let primaryFormat, formatModifier;
		        const semicolon = picture.lastIndexOf(';');
		        if (semicolon === -1) {
		            primaryFormat = picture;
		        } else {
		            primaryFormat = picture.substring(0, semicolon);
		            formatModifier = picture.substring(semicolon + 1);
		            if (formatModifier[0] === 'o') {
		                format.ordinal = true;
		            }
		        }

		        /* eslnt-disable-next no-fallthrough */
		        switch (primaryFormat) {
		            case 'A':
		                format.case = tcase.UPPER;
		            /* eslnt-disable-next-line no-fallthrough */
		            case 'a':
		                format.primary = formats.LETTERS;
		                break;
		            case 'I':
		                format.case = tcase.UPPER;
		            /* eslnt-disable-next-line no-fallthrough */
		            case 'i':
		                format.primary = formats.ROMAN;
		                break;
		            case 'W':
		                format.case = tcase.UPPER;
		                format.primary = formats.WORDS;
		                break;
		            case 'Ww':
		                format.case = tcase.TITLE;
		                format.primary = formats.WORDS;
		                break;
		            case 'w':
		                format.primary = formats.WORDS;
		                break;
		            default: {
		                // this is a decimal-digit-pattern if it contains a decimal digit (from any unicode decimal digit group)
		                let zeroCode = null;
		                let mandatoryDigits = 0;
		                let optionalDigits = 0;
		                let groupingSeparators = [];
		                let separatorPosition = 0;
		                const formatCodepoints = stringToArray(primaryFormat).map(c => c.codePointAt(0)).reverse(); // reverse the array to determine positions of grouping-separator-signs
		                formatCodepoints.forEach((codePoint) => {
		                    // step though each char in the picture to determine the digit group
		                    let digit = false;
		                    for (let ii = 0; ii < decimalGroups.length; ii++) {
		                        const group = decimalGroups[ii];
		                        if (codePoint >= group && codePoint <= group + 9) {
		                            // codepoint is part of this decimal group
		                            digit = true;
		                            mandatoryDigits++;
		                            separatorPosition++;
		                            if (zeroCode === null) {
		                                zeroCode = group;
		                            } else if (group !== zeroCode) {
		                                // error! different decimal groups in the same pattern
		                                throw {
		                                    code: 'D3131'
		                                };
		                            }
		                            break;
		                        }
		                    }
		                    if (!digit) {
		                        if (codePoint === 0x23) { // # - optional-digit-sign
		                            separatorPosition++;
		                            optionalDigits++;
		                        } else {
		                            // neither a decimal-digit-sign ot optional-digit-sign, assume it is a grouping-separator-sign
		                            groupingSeparators.push({
		                                position: separatorPosition,
		                                character: String.fromCodePoint(codePoint)
		                            });
		                        }
		                    }
		                });
		                if (mandatoryDigits > 0) {
		                    format.primary = formats.DECIMAL;
		                    // TODO validate decimal-digit-pattern

		                    // the decimal digit family (codepoint offset)
		                    format.zeroCode = zeroCode;
		                    // the number of mandatory digits
		                    format.mandatoryDigits = mandatoryDigits;
		                    // the number of optional digits
		                    format.optionalDigits = optionalDigits;
		                    // grouping separator template
		                    // are the grouping-separator-signs 'regular'?
		                    const regularRepeat = function (separators) {
		                        // are the grouping positions regular? i.e. same interval between each of them
		                        // is there at least one separator?
		                        if (separators.length === 0) {
		                            return 0;
		                        }
		                        // are all the characters the same?
		                        const sepChar = separators[0].character;
		                        for (let ii = 1; ii < separators.length; ii++) {
		                            if (separators[ii].character !== sepChar) {
		                                return 0;
		                            }
		                        }
		                        // are they equally spaced?
		                        const indexes = separators.map(separator => separator.position);
		                        const gcd = function (a, b) {
		                            return b === 0 ? a : gcd(b, a % b);
		                        };
		                        // find the greatest common divisor of all the positions
		                        const factor = indexes.reduce(gcd);
		                        // is every position separated by this divisor? If so, it's regular
		                        for (let index = 1; index <= indexes.length; index++) {
		                            if (indexes.indexOf(index * factor) === -1) {
		                                return 0;
		                            }
		                        }
		                        return factor;
		                    };

		                    const regular = regularRepeat(groupingSeparators);
		                    if (regular > 0) {
		                        format.regular = true;
		                        format.groupingSeparators = {
		                            position: regular,
		                            character: groupingSeparators[0].character
		                        };
		                    } else {
		                        format.regular = false;
		                        format.groupingSeparators = groupingSeparators;
		                    }

		                } else {
		                    // this is a 'numbering sequence' which the spec says is implementation-defined
		                    // this implementation doesn't support any numbering sequences at the moment.
		                    format.primary = formats.SEQUENCE;
		                    format.token = primaryFormat;
		                }
		            }
		        }

		        return format;
		    }

		    const defaultPresentationModifiers = {
		        Y: '1', M: '1', D: '1', d: '1', F: 'n', W: '1', w: '1', X: '1', x: '1', H: '1', h: '1',
		        P: 'n', m: '01', s: '01', f: '1', Z: '01:01', z: '01:01', C: 'n', E: 'n'
		    };

		    // §9.8.4.1 the format specifier is an array of string literals and variable markers
		    /**
		     * analyse the date-time picture string
		     * @param {string} picture - picture string
		     * @returns {{type: string, parts: Array}} - the analysed string
		     */
		    function analyseDateTimePicture(picture) {
		        var spec = [];
		        const format = {
		            type: 'datetime',
		            parts: spec
		        };
		        const addLiteral = function (start, end) {
		            if (end > start) {
		                let literal = picture.substring(start, end);
		                // replace any doubled ]] with single ]
		                // what if there are instances of single ']' ? - the spec doesn't say
		                literal = literal.split(']]').join(']');
		                spec.push({type: 'literal', value: literal});
		            }
		        };

		        var start = 0, pos = 0;
		        while (pos < picture.length) {
		            if (picture.charAt(pos) === '[') {
		                // check it's not a doubled [[
		                if (picture.charAt(pos + 1) === '[') {
		                    // literal [
		                    addLiteral(start, pos);
		                    spec.push({type: 'literal', value: '['});
		                    pos += 2;
		                    start = pos;
		                    continue;
		                }
		                // start of variable marker
		                // push the string literal (if there is one) onto the array
		                addLiteral(start, pos);
		                start = pos;
		                // search forward to closing ]
		                pos = picture.indexOf(']', start);
		                // TODO handle error case if pos === -1
		                if(pos === -1) {
		                    // error - no closing bracket
		                    throw {
		                        code: 'D3135'
		                    };
		                }
		                let marker = picture.substring(start + 1, pos);
		                // whitespace within a variable marker is ignored (i.e. remove it)
		                marker = marker.split(/\s+/).join('');
		                var def = {
		                    type: 'marker',
		                    component: marker.charAt(0)  // 1. The component specifier is always present and is always a single letter.
		                };
		                var comma = marker.lastIndexOf(','); // 2. The width modifier may be recognized by the presence of a comma
		                var presMod; // the presentation modifiers
		                if (comma !== -1) {
		                    // §9.8.4.2 The Width Modifier
		                    const widthMod = marker.substring(comma + 1);
		                    const dash = widthMod.indexOf('-');
		                    let min, max;
		                    const parseWidth = function (wm) {
		                        if (typeof wm === 'undefined' || wm === '*') {
		                            return undefined;
		                        } else {
		                            // TODO validate wm is an unsigned int
		                            return parseInt(wm);
		                        }
		                    };
		                    if (dash === -1) {
		                        min = widthMod;
		                    } else {
		                        min = widthMod.substring(0, dash);
		                        max = widthMod.substring(dash + 1);
		                    }
		                    const widthDef = {
		                        min: parseWidth(min),
		                        max: parseWidth(max)
		                    };
		                    def.width = widthDef;
		                    presMod = marker.substring(1, comma);
		                } else {
		                    presMod = marker.substring(1);
		                }
		                if (presMod.length === 1) {
		                    def.presentation1 = presMod; // first presentation modifier
		                    //TODO validate the first presentation modifier - it's either N, n, Nn or it passes analyseIntegerPicture
		                } else if (presMod.length > 1) {
		                    var lastChar = presMod.charAt(presMod.length - 1);
		                    if ('atco'.indexOf(lastChar) !== -1) {
		                        def.presentation2 = lastChar;
		                        if (lastChar === 'o') {
		                            def.ordinal = true;
		                        }
		                        // 'c' means 'cardinal' and is the default (i.e. not 'ordinal')
		                        // 'a' & 't' are ignored (not sure of their relevance to English numbering)
		                        def.presentation1 = presMod.substring(0, presMod.length - 1);
		                    } else {
		                        def.presentation1 = presMod;
		                        //TODO validate the first presentation modifier - it's either N, n, Nn or it passes analyseIntegerPicture,
		                        // doesn't use ] as grouping separator, and if grouping separator is , then must have width modifier
		                    }
		                } else {
		                    // no presentation modifier specified - apply the default;
		                    def.presentation1 = defaultPresentationModifiers[def.component];
		                }
		                if (typeof def.presentation1 === 'undefined') {
		                    // unknown component specifier
		                    throw {
		                        code: 'D3132',
		                        value: def.component
		                    };
		                }
		                if (def.presentation1[0] === 'n') {
		                    def.names = tcase.LOWER;
		                } else if (def.presentation1[0] === 'N') {
		                    if (def.presentation1[1] === 'n') {
		                        def.names = tcase.TITLE;
		                    } else {
		                        def.names = tcase.UPPER;
		                    }
		                } else if ('YMDdFWwXxHhmsf'.indexOf(def.component) !== -1) {
		                    var integerPattern = def.presentation1;
		                    if (def.presentation2) {
		                        integerPattern += ';' + def.presentation2;
		                    }
		                    def.integerFormat = analyseIntegerPicture(integerPattern);
		                    if (def.width && def.width.min !== undefined) {
		                        if (def.integerFormat.mandatoryDigits < def.width.min) {
		                            def.integerFormat.mandatoryDigits = def.width.min;
		                        }
		                    }
		                    if ('YMD'.indexOf(def.component) !== -1) {
		                        // §9.8.4.4
		                        def.n = -1;
		                        if (def.width && def.width.max !== undefined) {
		                            def.n = def.width.max;
		                            def.integerFormat.mandatoryDigits = def.n;
		                        } else {
		                            var w = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
		                            if (w >= 2) {
		                                def.n = w;
		                            }
		                        }
		                    }
		                }
		                if (def.component === 'Z' || def.component === 'z') {
		                    def.integerFormat = analyseIntegerPicture(def.presentation1);
		                }
		                spec.push(def);
		                start = pos + 1;
		            }
		            pos++;
		        }
		        addLiteral(start, pos);
		        return format;
		    }

		    const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		    const millisInADay = 1000 * 60 * 60 * 24;

		    const startOfFirstWeek = function (ym) {
		        // ISO 8601 defines the first week of the year to be the week that contains the first Thursday
		        // XPath F&O extends this same definition for the first week of a month
		        // the week starts on a Monday - calculate the millis for the start of the first week
		        // millis for given 1st Jan of that year (at 00:00 UTC)
		        const jan1 = Date.UTC(ym.year, ym.month);
		        var dayOfJan1 = (new Date(jan1)).getUTCDay();
		        if (dayOfJan1 === 0) {
		            dayOfJan1 = 7;
		        }
		        // if Jan 1 is Fri, Sat or Sun, then add the number of days (in millis) to jan1 to get the start of week 1
		        return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
		    };

		    const yearMonth = function (year, month) {
		        return {
		            year: year,
		            month: month,
		            nextMonth: function () {
		                return (month === 11) ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
		            },
		            previousMonth: function () {
		                return (month === 0) ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
		            },
		            nextYear: function () {
		                return yearMonth(year + 1, month);
		            },
		            previousYear: function () {
		                return yearMonth(year - 1, month);
		            }
		        };
		    };

		    const deltaWeeks = function (start, end) {
		        return (end - start) / (millisInADay * 7) + 1;
		    };

		    const getDateTimeFragment = (date, component) => {
		        let componentValue;
		        switch (component) {
		            case 'Y': // year
		                componentValue = date.getUTCFullYear();
		                break;
		            case 'M': // month in year
		                componentValue = date.getUTCMonth() + 1;
		                break;
		            case 'D': // day in month
		                componentValue = date.getUTCDate();
		                break;
		            case 'd': { // day in year
		                // millis for given date (at 00:00 UTC)
		                const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
		                // millis for given 1st Jan of that year (at 00:00 UTC)
		                const firstJan = Date.UTC(date.getUTCFullYear(), 0);
		                componentValue = (today - firstJan) / millisInADay + 1;
		                break;
		            }
		            case 'F': // day of week
		                componentValue = date.getUTCDay();
		                if (componentValue === 0) {
		                    // ISO 8601 defines days 1-7: Mon-Sun
		                    componentValue = 7;
		                }
		                break;
		            case 'W': { // week in year
		                const thisYear = yearMonth(date.getUTCFullYear(), 0);
		                const startOfWeek1 = startOfFirstWeek(thisYear);
		                const today = Date.UTC(thisYear.year, date.getUTCMonth(), date.getUTCDate());
		                let week = deltaWeeks(startOfWeek1, today);
		                if (week > 52) {
		                    // might be first week of the following year
		                    const startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
		                    if (today >= startOfFollowingYear) {
		                        week = 1;
		                    }
		                } else if (week < 1) {
		                    // must be end of the previous year
		                    const startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
		                    week = deltaWeeks(startOfPreviousYear, today);
		                }
		                componentValue = Math.floor(week);
		                break;
		            }
		            case 'w': { // week in month
		                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
		                const startOfWeek1 = startOfFirstWeek(thisMonth);
		                const today = Date.UTC(thisMonth.year, thisMonth.month, date.getUTCDate());
		                let week = deltaWeeks(startOfWeek1, today);
		                if (week > 4) {
		                    // might be first week of the following month
		                    const startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
		                    if (today >= startOfFollowingMonth) {
		                        week = 1;
		                    }
		                } else if (week < 1) {
		                    // must be end of the previous month
		                    const startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
		                    week = deltaWeeks(startOfPreviousMonth, today);
		                }
		                componentValue = Math.floor(week);
		                break;
		            }
		            case 'X': { // ISO week-numbering year
		                // Extension: The F&O spec says nothing about how to access the year associated with the week-of-the-year
		                // e.g. Sat 1 Jan 2005 is in the 53rd week of 2004.
		                // The 'W' component specifier gives 53, but 'Y' will give 2005.
		                // I propose to add 'X' as the component specifier to give the ISO week-numbering year (2004 in this example)
		                const thisYear = yearMonth(date.getUTCFullYear(), 0);
		                const startOfISOYear = startOfFirstWeek(thisYear);
		                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
		                const now = date.getTime();
		                if (now < startOfISOYear) {
		                    componentValue = thisYear.year - 1;
		                } else if (now >= endOfISOYear) {
		                    componentValue = thisYear.year + 1;
		                } else {
		                    componentValue = thisYear.year;
		                }
		                break;
		            }
		            case 'x': { // ISO week-numbering month
		                // Extension: The F&O spec says nothing about how to access the month associated with the week-of-the-month
		                // e.g. Sat 1 Jan 2005 is in the 5th week of December 2004.
		                // The 'w' component specifier gives 5, but 'W' will give January and 'Y' will give 2005.
		                // I propose to add 'x' as the component specifier to give the 'week-numbering' month (December in this example)
		                const thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
		                const startOfISOMonth = startOfFirstWeek(thisMonth);
		                const nextMonth = thisMonth.nextMonth();
		                const endOfISOMonth = startOfFirstWeek(nextMonth);
		                const now = date.getTime();
		                if (now < startOfISOMonth) {
		                    componentValue = thisMonth.previousMonth().month + 1;
		                } else if (now >= endOfISOMonth) {
		                    componentValue = nextMonth.month + 1;
		                } else {
		                    componentValue = thisMonth.month + 1;
		                }
		                break;
		            }
		            case 'H': // hour in day (24 hours)
		                componentValue = date.getUTCHours();
		                break;
		            case 'h': // hour in half-day (12 hours)
		                componentValue = date.getUTCHours();
		                componentValue = componentValue % 12;
		                if (componentValue === 0) {
		                    componentValue = 12;
		                }
		                break;
		            case 'P': // am/pm marker
		                componentValue = date.getUTCHours() >= 12 ? 'pm' : 'am';
		                break;
		            case 'm': // minute in hour
		                componentValue = date.getUTCMinutes();
		                break;
		            case 's': // second in minute
		                componentValue = date.getUTCSeconds();
		                break;
		            case 'f': // fractional seconds
		                componentValue = date.getUTCMilliseconds();
		                break;
		            case 'Z': // timezone
		            case 'z':
		                // since the date object is constructed from epoch millis, the TZ component is always be UTC.
		                break;
		            case 'C': // calendar name
		                componentValue = 'ISO';
		                break;
		            case 'E': // era
		                componentValue = 'ISO';
		                break;
		        }
		        return componentValue;
		    };

		    let iso8601Spec = null;

		    /**
		     * formats the date/time as specified by the XPath fn:format-dateTime function
		     * @param {number} millis - the timestamp to be formatted, in millis since the epoch
		     * @param {string} picture - the picture string that specifies the format
		     * @param {string} timezone - the timezone to use
		     * @returns {string} - the formatted timestamp
		     */
		    function formatDateTime(millis, picture, timezone) {
		        var offsetHours = 0;
		        var offsetMinutes = 0;

		        if (typeof timezone !== 'undefined') {
		            // parse the hour and minute offsets
		            // assume for now the format supplied is +hhmm
		            const offset = parseInt(timezone);
		            offsetHours = Math.floor(offset / 100);
		            offsetMinutes = offset % 100;
		        }

		        var formatComponent = function (date, markerSpec) {
		            var componentValue = getDateTimeFragment(date, markerSpec.component);

		            // §9.8.4.3 Formatting Integer-Valued Date/Time Components
		            if ('YMDdFWwXxHhms'.indexOf(markerSpec.component) !== -1) {
		                if (markerSpec.component === 'Y') {
		                    // §9.8.4.4 Formatting the Year Component
		                    if (markerSpec.n !== -1) {
		                        componentValue = componentValue % Math.pow(10, markerSpec.n);
		                    }
		                }
		                if (markerSpec.names) {
		                    if (markerSpec.component === 'M' || markerSpec.component === 'x') {
		                        componentValue = months[componentValue - 1];
		                    } else if (markerSpec.component === 'F') {
		                        componentValue = days[componentValue];
		                    } else {
		                        throw {
		                            code: 'D3133',
		                            value: markerSpec.component
		                        };
		                    }
		                    if (markerSpec.names === tcase.UPPER) {
		                        componentValue = componentValue.toUpperCase();
		                    } else if (markerSpec.names === tcase.LOWER) {
		                        componentValue = componentValue.toLowerCase();
		                    }
		                    if (markerSpec.width && componentValue.length > markerSpec.width.max) {
		                        componentValue = componentValue.substring(0, markerSpec.width.max);
		                    }
		                } else {
		                    componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
		                }
		            } else if (markerSpec.component === 'f') {
		                // TODO §9.8.4.5 Formatting Fractional Seconds
		                componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
		            } else if (markerSpec.component === 'Z' || markerSpec.component === 'z') {
		                // §9.8.4.6 Formatting timezones
		                const offset = offsetHours * 100 + offsetMinutes;
		                if (markerSpec.integerFormat.regular) {
		                    componentValue = _formatInteger(offset, markerSpec.integerFormat);
		                } else {
		                    const numDigits = markerSpec.integerFormat.mandatoryDigits;
		                    if (numDigits === 1 || numDigits === 2) {
		                        componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
		                        if (offsetMinutes !== 0) {
		                            componentValue += ':' + formatInteger(offsetMinutes, '00');
		                        }
		                    } else if (numDigits === 3 || numDigits === 4) {
		                        componentValue = _formatInteger(offset, markerSpec.integerFormat);
		                    } else {
		                        throw {
		                            code: 'D3134',
		                            value: numDigits
		                        };
		                    }
		                }
		                if (offset >= 0) {
		                    componentValue = '+' + componentValue;
		                }
		                if (markerSpec.component === 'z') {
		                    componentValue = 'GMT' + componentValue;
		                }
		                if (offset === 0 && markerSpec.presentation2 === 't') {
		                    componentValue = 'Z';
		                }
		            } else if (markerSpec.component === 'P') {
		                // §9.8.4.7 Formatting Other Components
		                // Formatting P for am/pm
		                // getDateTimeFragment() always returns am/pm lower case so check for UPPER here
		                if (markerSpec.names === tcase.UPPER) {
		                    componentValue = componentValue.toUpperCase();
		                }
		            }
		            return componentValue;
		        };

		        let formatSpec;
		        if(typeof picture === 'undefined') {
		            // default to ISO 8601 format
		            if (iso8601Spec === null) {
		                iso8601Spec = analyseDateTimePicture('[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001][Z01:01t]');
		            }
		            formatSpec = iso8601Spec;
		        } else {
		            formatSpec = analyseDateTimePicture(picture);
		        }

		        const offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1000;
		        const dateTime = new Date(millis + offsetMillis);

		        let result = '';
		        formatSpec.parts.forEach(function (part) {
		            if (part.type === 'literal') {
		                result += part.value;
		            } else {
		                result += formatComponent(dateTime, part);
		            }
		        });

		        return result;
		    }

		    /**
		     * Generate a regex to parse integers or timestamps
		     * @param {object} formatSpec - object representing the format
		     * @returns {object} - regex
		     */
		    function generateRegex(formatSpec) {
		        var matcher = {};
		        if (formatSpec.type === 'datetime') {
		            matcher.type = 'datetime';
		            matcher.parts = formatSpec.parts.map(function (part) {
		                var res = {};
		                if (part.type === 'literal') {
		                    res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		                } else if (part.component === 'Z' || part.component === 'z') {
		                    // timezone
		                    let separator;
		                    if (!Array.isArray(part.integerFormat.groupingSeparators)) {
		                        separator = part.integerFormat.groupingSeparators;
		                    }
		                    res.regex = '';
		                    if (part.component === 'z') {
		                        res.regex = 'GMT';
		                    }
		                    res.regex += '[-+][0-9]+';
		                    if (separator) {
		                        res.regex += separator.character + '[0-9]+';
		                    }
		                    res.parse = function(value) {
		                        if (part.component === 'z') {
		                            value = value.substring(3); // remove the leading GMT
		                        }
		                        let offsetHours = 0, offsetMinutes = 0;
		                        if (separator) {
		                            offsetHours = Number.parseInt(value.substring(0, value.indexOf(separator.character)));
		                            offsetMinutes = Number.parseInt(value.substring(value.indexOf(separator.character) + 1));
		                        } else {
		                            // depends on number of digits
		                            const numdigits = value.length - 1;
		                            if (numdigits <= 2) {
		                                // just hour offset
		                                offsetHours = Number.parseInt(value);
		                            } else {
		                                offsetHours = Number.parseInt(value.substring(0, 3));
		                                offsetMinutes = Number.parseInt(value.substring(3));
		                            }
		                        }
		                        return offsetHours * 60 + offsetMinutes;
		                    };
		                } else if (part.integerFormat) {
		                    part.integerFormat.n = part.n;
		                    res = generateRegex(part.integerFormat);
		                } else {
		                    // must be a month or day name
		                    res.regex = '[a-zA-Z]+';
		                    var lookup = {};
		                    if (part.component === 'M' || part.component === 'x') {
		                        // months
		                        months.forEach(function (name, index) {
		                            if (part.width && part.width.max) {
		                                lookup[name.substring(0, part.width.max)] = index + 1;
		                            } else {
		                                lookup[name] = index + 1;
		                            }
		                        });
		                    } else if (part.component === 'F') {
		                        // days
		                        days.forEach(function (name, index) {
		                            if (index > 0) {
		                                if (part.width && part.width.max) {
		                                    lookup[name.substring(0, part.width.max)] = index;
		                                } else {
		                                    lookup[name] = index;
		                                }
		                            }
		                        });
		                    } else if (part.component === 'P') {
		                        lookup = {'am': 0, 'AM': 0, 'pm': 1, 'PM': 1};
		                    } else {
		                        // unsupported 'name' option for this component
		                        throw {
		                            code: 'D3133',
		                            value: part.component
		                        };
		                    }
		                    res.parse = function (value) {
		                        return lookup[value];
		                    };
		                }
		                res.component = part.component;
		                return res;
		            });
		        } else { // type === 'integer'
		            matcher.type = 'integer';
		            const isUpper = formatSpec.case === tcase.UPPER;
		            let occurrences;
		            if(formatSpec.n && formatSpec.n > 0){
		                if(formatSpec.optionalDigits === 0){
		                    occurrences = `{${formatSpec.n}}`;
		                } else {
		                    occurrences = `{${formatSpec.n - formatSpec.optionalDigits},${formatSpec.n}}`;
		                }
		            } else {
		                occurrences = '+';
		            }

		            switch (formatSpec.primary) {
		                case formats.LETTERS:
		                    matcher.regex = isUpper ? '[A-Z]+' : '[a-z]+';
		                    matcher.parse = function (value) {
		                        return lettersToDecimal(value, isUpper ? 'A' : 'a');
		                    };
		                    break;
		                case formats.ROMAN:
		                    matcher.regex = isUpper ? '[MDCLXVI]+' : '[mdclxvi]+';
		                    matcher.parse = function (value) {
		                        return romanToDecimal(isUpper ? value : value.toUpperCase());
		                    };
		                    break;
		                case formats.WORDS:
		                    matcher.regex = '(?:' + Object.keys(wordValues).concat('and', '[\\-, ]').join('|') + ')+';
		                    matcher.parse = function (value) {
		                        return wordsToNumber(value.toLowerCase());
		                    };
		                    break;
		                case formats.DECIMAL:
		                    matcher.regex = `[0-9]${occurrences}`;
		                    if (formatSpec.ordinal) {
		                        // ordinals
		                        matcher.regex += '(?:th|st|nd|rd)';
		                    }
		                    matcher.parse = function (value) {
		                        let digits = value;
		                        if (formatSpec.ordinal) {
		                            // strip off the suffix
		                            digits = value.substring(0, value.length - 2);
		                        }
		                        // strip out the separators
		                        if (formatSpec.regular) {
		                            digits = digits.split(',').join('');
		                        } else {
		                            formatSpec.groupingSeparators.forEach(sep => {
		                                digits = digits.split(sep.character).join('');
		                            });
		                        }
		                        if (formatSpec.zeroCode !== 0x30) {
		                            // apply offset
		                            digits = digits.split('').map(char => String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 0x30)).join('');
		                        }
		                        return parseInt(digits);
		                    };
		                    break;
		                case formats.SEQUENCE:
		                    throw {
		                        code: 'D3130',
		                        value: formatSpec.token
		                    };
		            }

		        }
		        return matcher;
		    }

		    /**
		     * parse a string containing an integer as specified by the picture string
		     * @param {string} value - the string to parse
		     * @param {string} picture - the picture string
		     * @returns {number} - the parsed number
		     */
		    function parseInteger(value, picture) {
		        if (typeof value === 'undefined') {
		            return undefined;
		        }

		        const formatSpec = analyseIntegerPicture(picture);
		        const matchSpec = generateRegex(formatSpec);
		        //const fullRegex = '^' + matchSpec.regex + '$';
		        //const matcher = new RegExp(fullRegex);
		        // TODO validate input based on the matcher regex
		        const result = matchSpec.parse(value);
		        return result;
		    }

		    /**
		     * parse a string containing a timestamp as specified by the picture string
		     * @param {string} timestamp - the string to parse
		     * @param {string} picture - the picture string
		     * @returns {number} - the parsed timestamp in millis since the epoch
		     */
		    function parseDateTime(timestamp, picture) {
		        const formatSpec = analyseDateTimePicture(picture);
		        const matchSpec = generateRegex(formatSpec);
		        const fullRegex = '^' + matchSpec.parts.map(part => '(' + part.regex + ')').join('') + '$';

		        const matcher = new RegExp(fullRegex, 'i'); // TODO can cache this against the picture
		        var info = matcher.exec(timestamp);
		        if (info !== null) {
		            // validate what we've just parsed - do we have enough information to create a timestamp?
		            // rules:
		            // The date is specified by one of:
		            //    {Y, M, D}    (dateA)
		            // or {Y, d}       (dateB)
		            // or {Y, x, w, F} (dateC)
		            // or {X, W, F}    (dateD)
		            // The time is specified by one of:
		            //    {H, m, s, f}    (timeA)
		            // or {P, h, m, s, f} (timeB)
		            // All sets can have an optional Z
		            // To create a timestamp (epoch millis) we need both date and time, but we can default missing
		            // information according to the following rules:
		            // - line up one combination of the above from date, and one from time, most significant value (MSV) to least significant (LSV
		            // - for the values that have been captured, if there are any gaps between MSV and LSV, then throw an error
		            //     (e.g.) if hour and seconds, but not minutes is given - throw
		            //     (e.g.) if month, hour and minutes, but not day-of-month is given - throw
		            // - anything right of the LSV should be defaulted to zero
		            //     (e.g.) if hour and minutes given, default seconds and fractional seconds to zero
		            //     (e.g.) if date only given, default the time to 0:00:00.000 (midnight)
		            // - anything left of the MSV should be defaulted to the value of that component returned by $now()
		            //     (e.g.) if time only given, default the date to today
		            //     (e.g.) if month and date given, default to this year (and midnight, by previous rule)
		            //   -- default values for X, x, W, w, F will be derived from the values returned by $now()

		            // implement the above rules
		            // determine which of the above date/time combinations we have by using bit masks

		            //        Y X M x W w d D F P H h m s f Z
		            // dateA  1 0 1 0 0 0 0 1 ?                     0 - must not appear
		            // dateB  1 0 0 0 0 0 1 0 ?                     1 - can appear - relevant
		            // dateC  0 1 0 1 0 1 0 0 1                     ? - can appear - ignored
		            // dateD  0 1 0 0 1 0 0 0 1
		            // timeA                    0 1 0 1 1 1
		            // timeB                    1 0 1 1 1 1

		            // create bitmasks based on the above
		            //    date mask             YXMxWwdD
		            const dmA = 161;  // binary 10100001
		            const dmB = 130;  // binary 10000010
		            const dmC = 84;   // binary 01010100
		            const dmD = 72;   // binary 01001000
		            //    time mask             PHhmsf
		            const tmA = 23;   // binary 010111
		            const tmB = 47;   // binary 101111

		            const components = {};
		            for (let i = 1; i < info.length; i++) {
		                const mpart = matchSpec.parts[i - 1];
		                if (mpart.parse) {
		                    components[mpart.component] = mpart.parse(info[i]);
		                }
		            }

		            if(Object.getOwnPropertyNames(components).length === 0) {
		                // nothing specified
		                return undefined;
		            }

		            let mask = 0;

		            const shift = bit => {
		                mask <<= 1;
		                mask += bit ? 1 : 0;
		            };

		            const isType = type => {
		                // shouldn't match any 0's, must match at least one 1
		                return !(~type & mask) && !!(type & mask);
		            };

		            'YXMxWwdD'.split('').forEach(part => shift(components[part]));

		            const dateA = isType(dmA);
		            const dateB = !dateA && isType(dmB);
		            const dateC = isType(dmC);
		            const dateD = !dateC && isType(dmD);

		            mask = 0;
		            'PHhmsf'.split('').forEach(part => shift(components[part]));

		            const timeA = isType(tmA);
		            const timeB = !timeA && isType(tmB);

		            // should only be zero or one date type and zero or one time type

		            const dateComps = dateB ? 'YD' : dateC ? 'XxwF' : dateD? 'XWF' : 'YMD';
		            const timeComps = timeB ? 'Phmsf' : 'Hmsf';

		            const comps = dateComps + timeComps;

		            // step through the candidate parts from most significant to least significant
		            // default the most significant unspecified parts to current timestamp component
		            // default the least significant unspecified parts to zero
		            // if any gaps in between the specified parts, throw an error

		            const now = this.environment.timestamp; // must get the fixed timestamp from jsonata

		            let startSpecified = false;
		            let endSpecified = false;
		            comps.split('').forEach(part => {
		                if(typeof components[part] === 'undefined') {
		                    if(startSpecified) {
		                        // past the specified block - default to zero
		                        components[part] = ('MDd'.indexOf(part) !== -1) ? 1 : 0;
		                        endSpecified = true;
		                    } else {
		                        // haven't hit the specified block yet, default to current timestamp
		                        components[part] = getDateTimeFragment(now, part);
		                    }
		                } else {
		                    startSpecified = true;
		                    if(endSpecified) {
		                        throw {
		                            code: 'D3136'
		                        };
		                    }
		                }
		            });

		            // validate and fill in components
		            if (components.M > 0) {
		                components.M -= 1;  // Date.UTC requires a zero-indexed month
		            } else {
		                components.M = 0; // default to January
		            }
		            if (dateB) {
		                // millis for given 1st Jan of that year (at 00:00 UTC)
		                const firstJan = Date.UTC(components.Y, 0);
		                const offsetMillis = (components.d - 1) * 1000 * 60 * 60 * 24;
		                const derivedDate = new Date(firstJan + offsetMillis);
		                components.M = derivedDate.getUTCMonth();
		                components.D = derivedDate.getUTCDate();
		            }
		            if (dateC) {
		                // TODO implement this
		                // parsing this format not currently supported
		                throw {
		                    code: 'D3136'
		                };
		            }
		            if (dateD) {
		                // TODO implement this
		                // parsing this format (ISO week date) not currently supported
		                throw {
		                    code: 'D3136'
		                };
		            }
		            if (timeB) {
		                // 12hr to 24hr
		                components.H = components.h === 12 ? 0 : components.h;
		                if (components.P === 1) {
		                    components.H += 12;
		                }
		            }

		            var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
		            if(components.Z || components.z) {
		                // adjust for timezone
		                millis -= (components.Z || components.z) * 60 * 1000;
		            }
		            return millis;
		        }
		    }

		    // Regular expression to match an ISO 8601 formatted timestamp
		    var iso8601regex = new RegExp('^\\d{4}(-[01]\\d)*(-[0-3]\\d)*(T[0-2]\\d:[0-5]\\d:[0-5]\\d)*(\\.\\d+)?([+-][0-2]\\d:?[0-5]\\d|Z)?$');

		    /**
		     * Converts an ISO 8601 timestamp to milliseconds since the epoch
		     *
		     * @param {string} timestamp - the timestamp to be converted
		     * @param {string} [picture] - the picture string defining the format of the timestamp (defaults to ISO 8601)
		     * @returns {Number} - milliseconds since the epoch
		     */
		    function toMillis(timestamp, picture) {
		        // undefined inputs always return undefined
		        if(typeof timestamp === 'undefined') {
		            return undefined;
		        }

		        if(typeof picture === 'undefined') {
		            if (!iso8601regex.test(timestamp)) {
		                throw {
		                    stack: (new Error()).stack,
		                    code: "D3110",
		                    value: timestamp
		                };
		            }

		            return Date.parse(timestamp);
		        } else {
		            return parseDateTime.call(this, timestamp, picture);
		        }
		    }

		    /**
		     * Converts milliseconds since the epoch to an ISO 8601 timestamp
		     * @param {Number} millis - milliseconds since the epoch to be converted
		     * @param {string} [picture] - the picture string defining the format of the timestamp (defaults to ISO 8601)
		     * @param {string} [timezone] - the timezone to format the timestamp in (defaults to UTC)
		     * @returns {String} - the formatted timestamp
		     */
		    function fromMillis(millis, picture, timezone) {
		        // undefined inputs always return undefined
		        if(typeof millis === 'undefined') {
		            return undefined;
		        }

		        return formatDateTime.call(this, millis, picture, timezone);
		    }

		    return {
		        formatInteger, parseInteger, fromMillis, toMillis
		    };
		})();

		module.exports = dateTime;

		},{"./utils":6}],2:[function(require,module,exports){
		(function (global){(function (){
		/**
		 * © Copyright IBM Corp. 2016, 2018 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		var utils = require('./utils');

		const functions = (() => {

		    var isNumeric = utils.isNumeric;
		    var isArrayOfStrings = utils.isArrayOfStrings;
		    var isArrayOfNumbers = utils.isArrayOfNumbers;
		    var createSequence = utils.createSequence;
		    var isSequence = utils.isSequence;
		    var isFunction = utils.isFunction;
		    var isLambda = utils.isLambda;
		    var isPromise = utils.isPromise;
		    var getFunctionArity = utils.getFunctionArity;
		    var deepEquals = utils.isDeepEqual;
		    var stringToArray = utils.stringToArray;

		    /**
		     * Sum function
		     * @param {Object} args - Arguments
		     * @returns {number} Total value of arguments
		     */
		    function sum(args) {
		        // undefined inputs always return undefined
		        if (typeof args === 'undefined') {
		            return undefined;
		        }

		        var total = 0;
		        args.forEach(function (num) {
		            total += num;
		        });
		        return total;
		    }

		    /**
		     * Count function
		     * @param {Object} args - Arguments
		     * @returns {number} Number of elements in the array
		     */
		    function count(args) {
		        // undefined inputs always return undefined
		        if (typeof args === 'undefined') {
		            return 0;
		        }

		        return args.length;
		    }

		    /**
		     * Max function
		     * @param {Object} args - Arguments
		     * @returns {number} Max element in the array
		     */
		    function max(args) {
		        // undefined inputs always return undefined
		        if (typeof args === 'undefined' || args.length === 0) {
		            return undefined;
		        }

		        return Math.max.apply(Math, args);
		    }

		    /**
		     * Min function
		     * @param {Object} args - Arguments
		     * @returns {number} Min element in the array
		     */
		    function min(args) {
		        // undefined inputs always return undefined
		        if (typeof args === 'undefined' || args.length === 0) {
		            return undefined;
		        }

		        return Math.min.apply(Math, args);
		    }

		    /**
		     * Average function
		     * @param {Object} args - Arguments
		     * @returns {number} Average element in the array
		     */
		    function average(args) {
		        // undefined inputs always return undefined
		        if (typeof args === 'undefined' || args.length === 0) {
		            return undefined;
		        }

		        var total = 0;
		        args.forEach(function (num) {
		            total += num;
		        });
		        return total / args.length;
		    }

		    /**
		     * Stringify arguments
		     * @param {Object} arg - Arguments
		     * @param {boolean} [prettify] - Pretty print the result
		     * @returns {String} String from arguments
		     */
		    function string(arg, prettify = false) {
		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        var str;

		        if (typeof arg === 'string') {
		            // already a string
		            str = arg;
		        } else if (isFunction(arg)) {
		            // functions (built-in and lambda convert to empty string
		            str = '';
		        } else if (typeof arg === 'number' && !isFinite(arg)) {
		            throw {
		                code: "D3001",
		                value: arg,
		                stack: (new Error()).stack
		            };
		        } else {
		            var space = prettify ? 2 : 0;
		            if(Array.isArray(arg) && arg.outerWrapper) {
		                arg = arg[0];
		            }
		            str = JSON.stringify(arg, function (key, val) {
		                return (typeof val !== 'undefined' && val !== null && val.toPrecision && isNumeric(val)) ? Number(val.toPrecision(15)) :
		                    (val && isFunction(val)) ? '' : val;
		            }, space);
		        }
		        return str;
		    }

		    /**
		     * Create substring based on character number and length
		     * @param {String} str - String to evaluate
		     * @param {Integer} start - Character number to start substring
		     * @param {Integer} [length] - Number of characters in substring
		     * @returns {string|*} Substring
		     */
		    function substring(str, start, length) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        var strArray = stringToArray(str);
		        var strLength = strArray.length;

		        if (strLength + start < 0) {
		            start = 0;
		        }

		        if (typeof length !== 'undefined') {
		            if (length <= 0) {
		                return '';
		            }
		            var end = start >= 0 ? start + length : strLength + start + length;
		            return strArray.slice(start, end).join('');
		        }

		        return strArray.slice(start).join('');
		    }

		    /**
		     * Create substring up until a character
		     * @param {String} str - String to evaluate
		     * @param {String} chars - Character to define substring boundary
		     * @returns {*} Substring
		     */
		    function substringBefore(str, chars) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        var pos = str.indexOf(chars);
		        if (pos > -1) {
		            return str.substr(0, pos);
		        } else {
		            return str;
		        }
		    }

		    /**
		     * Create substring after a character
		     * @param {String} str - String to evaluate
		     * @param {String} chars - Character to define substring boundary
		     * @returns {*} Substring
		     */
		    function substringAfter(str, chars) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        var pos = str.indexOf(chars);
		        if (pos > -1) {
		            return str.substr(pos + chars.length);
		        } else {
		            return str;
		        }
		    }

		    /**
		     * Lowercase a string
		     * @param {String} str - String to evaluate
		     * @returns {string} Lowercase string
		     */
		    function lowercase(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        return str.toLowerCase();
		    }

		    /**
		     * Uppercase a string
		     * @param {String} str - String to evaluate
		     * @returns {string} Uppercase string
		     */
		    function uppercase(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        return str.toUpperCase();
		    }

		    /**
		     * length of a string
		     * @param {String} str - string
		     * @returns {Number} The number of characters in the string
		     */
		    function length(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        return stringToArray(str).length;
		    }

		    /**
		     * Normalize and trim whitespace within a string
		     * @param {string} str - string to be trimmed
		     * @returns {string} - trimmed string
		     */
		    function trim(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // normalize whitespace
		        var result = str.replace(/[ \t\n\r]+/gm, ' ');
		        if (result.charAt(0) === ' ') {
		            // strip leading space
		            result = result.substring(1);
		        }
		        if (result.charAt(result.length - 1) === ' ') {
		            // strip trailing space
		            result = result.substring(0, result.length - 1);
		        }
		        return result;
		    }

		    /**
		     * Pad a string to a minimum width by adding characters to the start or end
		     * @param {string} str - string to be padded
		     * @param {number} width - the minimum width; +ve pads to the right, -ve pads to the left
		     * @param {string} [char] - the pad character(s); defaults to ' '
		     * @returns {string} - padded string
		     */
		    function pad(str, width, char) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        if (typeof char === 'undefined' || char.length === 0) {
		            char = ' ';
		        }

		        var result;
		        var padLength = Math.abs(width) - length(str);
		        if (padLength > 0) {
		            var padding = (new Array(padLength + 1)).join(char);
		            if (char.length > 1) {
		                padding = substring(padding, 0, padLength);
		            }
		            if (width > 0) {
		                result = str + padding;
		            } else {
		                result = padding + str;
		            }
		        } else {
		            result = str;
		        }
		        return result;
		    }

		    /**
		     * Evaluate the matcher function against the str arg
		     *
		     * @param {*} matcher - matching function (native or lambda)
		     * @param {string} str - the string to match against
		     * @returns {object} - structure that represents the match(es)
		     */
		    async function evaluateMatcher(matcher, str) {
		        var result = matcher.apply(this, [str]); // eslint-disable-line no-useless-call
		        if(isPromise(result)) {
		            result = await result;
		        }
		        if(result && !(typeof result.start === 'number' || result.end === 'number' || Array.isArray(result.groups) || isFunction(result.next))) {
		            // the matcher function didn't return the correct structure
		            throw {
		                code: "T1010",
		                stack: (new Error()).stack,
		            };
		        }
		        return result;
		    }

		    /**
		     * Tests if the str contains the token
		     * @param {String} str - string to test
		     * @param {String} token - substring or regex to find
		     * @returns {Boolean} - true if str contains token
		     */
		    async function contains(str, token) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        var result;

		        if (typeof token === 'string') {
		            result = (str.indexOf(token) !== -1);
		        } else {
		            var matches = await evaluateMatcher(token, str);
		            result = (typeof matches !== 'undefined');
		        }

		        return result;
		    }

		    /**
		     * Match a string with a regex returning an array of object containing details of each match
		     * @param {String} str - string
		     * @param {String} regex - the regex applied to the string
		     * @param {Integer} [limit] - max number of matches to return
		     * @returns {Array} The array of match objects
		     */
		    async function match(str, regex, limit) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // limit, if specified, must be a non-negative number
		        if (limit < 0) {
		            throw {
		                stack: (new Error()).stack,
		                value: limit,
		                code: 'D3040',
		                index: 3
		            };
		        }

		        var result = createSequence();

		        if (typeof limit === 'undefined' || limit > 0) {
		            var count = 0;
		            var matches = await evaluateMatcher(regex, str);
		            if (typeof matches !== 'undefined') {
		                while (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) {
		                    result.push({
		                        match: matches.match,
		                        index: matches.start,
		                        groups: matches.groups
		                    });
		                    matches = await evaluateMatcher(matches.next);
		                    count++;
		                }
		            }
		        }

		        return result;
		    }

		    /**
		     * Match a string with a regex returning an array of object containing details of each match
		     * @param {String} str - string
		     * @param {String} pattern - the substring/regex applied to the string
		     * @param {String} replacement - text to replace the matched substrings
		     * @param {Integer} [limit] - max number of matches to return
		     * @returns {Array} The array of match objects
		     */
		    async function replace(str, pattern, replacement, limit) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        var self = this;

		        // pattern cannot be an empty string
		        if (pattern === '') {
		            throw {
		                code: "D3010",
		                stack: (new Error()).stack,
		                value: pattern,
		                index: 2
		            };
		        }

		        // limit, if specified, must be a non-negative number
		        if (limit < 0) {
		            throw {
		                code: "D3011",
		                stack: (new Error()).stack,
		                value: limit,
		                index: 4
		            };
		        }

		        var replacer;
		        if (typeof replacement === 'string') {
		            replacer = function (regexMatch) {
		                var substitute = '';
		                // scan forward, copying the replacement text into the substitute string
		                // and replace any occurrence of $n with the values matched by the regex
		                var position = 0;
		                var index = replacement.indexOf('$', position);
		                while (index !== -1 && position < replacement.length) {
		                    substitute += replacement.substring(position, index);
		                    position = index + 1;
		                    var dollarVal = replacement.charAt(position);
		                    if (dollarVal === '$') {
		                        // literal $
		                        substitute += '$';
		                        position++;
		                    } else if (dollarVal === '0') {
		                        substitute += regexMatch.match;
		                        position++;
		                    } else {
		                        var maxDigits;
		                        if (regexMatch.groups.length === 0) {
		                            // no sub-matches; any $ followed by a digit will be replaced by an empty string
		                            maxDigits = 1;
		                        } else {
		                            // max number of digits to parse following the $
		                            maxDigits = Math.floor(Math.log(regexMatch.groups.length) * Math.LOG10E) + 1;
		                        }
		                        index = parseInt(replacement.substring(position, position + maxDigits), 10);
		                        if (maxDigits > 1 && index > regexMatch.groups.length) {
		                            index = parseInt(replacement.substring(position, position + maxDigits - 1), 10);
		                        }
		                        if (!isNaN(index)) {
		                            if (regexMatch.groups.length > 0) {
		                                var submatch = regexMatch.groups[index - 1];
		                                if (typeof submatch !== 'undefined') {
		                                    substitute += submatch;
		                                }
		                            }
		                            position += index.toString().length;
		                        } else {
		                            // not a capture group, treat the $ as literal
		                            substitute += '$';
		                        }
		                    }
		                    index = replacement.indexOf('$', position);
		                }
		                substitute += replacement.substring(position);
		                return substitute;
		            };
		        } else {
		            replacer = replacement;
		        }

		        var result = '';
		        var position = 0;

		        if (typeof limit === 'undefined' || limit > 0) {
		            var count = 0;
		            if (typeof pattern === 'string') {
		                var index = str.indexOf(pattern, position);
		                while (index !== -1 && (typeof limit === 'undefined' || count < limit)) {
		                    result += str.substring(position, index);
		                    result += replacement;
		                    position = index + pattern.length;
		                    count++;
		                    index = str.indexOf(pattern, position);
		                }
		                result += str.substring(position);
		            } else {
		                var matches = await evaluateMatcher(pattern, str);
		                if (typeof matches !== 'undefined') {
		                    while (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) {
		                        result += str.substring(position, matches.start);
		                        var replacedWith = replacer.apply(self, [matches]);
		                        if (isPromise(replacedWith)) {
		                            replacedWith = await replacedWith;
		                        }
		                        // check replacedWith is a string
		                        if (typeof replacedWith === 'string') {
		                            result += replacedWith;
		                        } else {
		                            // not a string - throw error
		                            throw {
		                                code: "D3012",
		                                stack: (new Error()).stack,
		                                value: replacedWith
		                            };
		                        }
		                        position = matches.start + matches.match.length;
		                        count++;
		                        matches = await evaluateMatcher(matches.next);
		                    }
		                    result += str.substring(position);
		                } else {
		                    result = str;
		                }
		            }
		        } else {
		            result = str;
		        }

		        return result;
		    }

		    /**
		     * Base64 encode a string
		     * @param {String} str - string
		     * @returns {String} Base 64 encoding of the binary data
		     */
		    function base64encode(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }
		        // Use btoa in a browser, or Buffer in Node.js

		        var btoa = typeof window !== 'undefined' ?
		            /* istanbul ignore next */ window.btoa :
		            function (str) {
		                // Simply doing `new Buffer` at this point causes Browserify to pull
		                // in the entire Buffer browser library, which is large and unnecessary.
		                // Using `global.Buffer` defeats this.
		                return new global.Buffer.from(str, 'binary').toString('base64'); // eslint-disable-line new-cap
		            };
		        return btoa(str);
		    }

		    /**
		     * Base64 decode a string
		     * @param {String} str - string
		     * @returns {String} Base 64 encoding of the binary data
		     */
		    function base64decode(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }
		        // Use btoa in a browser, or Buffer in Node.js
		        var atob = typeof window !== 'undefined' ?
		            /* istanbul ignore next */ window.atob :
		            function (str) {
		                // Simply doing `new Buffer` at this point causes Browserify to pull
		                // in the entire Buffer browser library, which is large and unnecessary.
		                // Using `global.Buffer` defeats this.
		                return new global.Buffer.from(str, 'base64').toString('binary'); // eslint-disable-line new-cap
		            };
		        return atob(str);
		    }

		    /**
		     * Encode a string into a component for a url
		     * @param {String} str - String to encode
		     * @returns {string} Encoded string
		     */
		    function encodeUrlComponent(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // Catch URIErrors when URI sequence is malformed
		        var returnVal;
		        try {
		            returnVal = encodeURIComponent(str);
		        } catch (e) {
		            throw {
		                code: "D3140",
		                stack: (new Error()).stack,
		                value: str,
		                functionName: "encodeUrlComponent"
		            };
		        }
		        return returnVal;
		    }

		    /**
		     * Encode a string into a url
		     * @param {String} str - String to encode
		     * @returns {string} Encoded string
		     */
		    function encodeUrl(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // Catch URIErrors when URI sequence is malformed
		        var returnVal;
		        try {
		            returnVal = encodeURI(str);
		        } catch (e) {
		            throw {
		                code: "D3140",
		                stack: (new Error()).stack,
		                value: str,
		                functionName: "encodeUrl"
		            };
		        }
		        return returnVal;
		    }

		    /**
		     * Decode a string from a component for a url
		     * @param {String} str - String to decode
		     * @returns {string} Decoded string
		     */
		    function decodeUrlComponent(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // Catch URIErrors when URI sequence is malformed
		        var returnVal;
		        try {
		            returnVal = decodeURIComponent(str);
		        } catch (e) {
		            throw {
		                code: "D3140",
		                stack: (new Error()).stack,
		                value: str,
		                functionName: "decodeUrlComponent"
		            };
		        }
		        return returnVal;
		    }

		    /**
		     * Decode a string from a url
		     * @param {String} str - String to decode
		     * @returns {string} Decoded string
		     */
		    function decodeUrl(str) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // Catch URIErrors when URI sequence is malformed
		        var returnVal;
		        try {
		            returnVal = decodeURI(str);
		        } catch (e) {
		            throw {
		                code: "D3140",
		                stack: (new Error()).stack,
		                value: str,
		                functionName: "decodeUrl"
		            };
		        }
		        return returnVal;
		    }

		    /**
		     * Split a string into an array of substrings
		     * @param {String} str - string
		     * @param {String} separator - the token or regex that splits the string
		     * @param {Integer} [limit] - max number of substrings
		     * @returns {Array} The array of string
		     */
		    async function split(str, separator, limit) {
		        // undefined inputs always return undefined
		        if (typeof str === 'undefined') {
		            return undefined;
		        }

		        // limit, if specified, must be a non-negative number
		        if (limit < 0) {
		            throw {
		                code: "D3020",
		                stack: (new Error()).stack,
		                value: limit,
		                index: 3
		            };
		        }

		        var result = [];

		        if (typeof limit === 'undefined' || limit > 0) {
		            if (typeof separator === 'string') {
		                result = str.split(separator, limit);
		            } else {
		                var count = 0;
		                var matches = await evaluateMatcher(separator, str);
		                if (typeof matches !== 'undefined') {
		                    var start = 0;
		                    while (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) {
		                        result.push(str.substring(start, matches.start));
		                        start = matches.end;
		                        matches = await evaluateMatcher(matches.next);
		                        count++;
		                    }
		                    if (typeof limit === 'undefined' || count < limit) {
		                        result.push(str.substring(start));
		                    }
		                } else {
		                    result.push(str);
		                }
		            }
		        }

		        return result;
		    }

		    /**
		     * Join an array of strings
		     * @param {Array} strs - array of string
		     * @param {String} [separator] - the token that splits the string
		     * @returns {String} The concatenated string
		     */
		    function join(strs, separator) {
		        // undefined inputs always return undefined
		        if (typeof strs === 'undefined') {
		            return undefined;
		        }

		        // if separator is not specified, default to empty string
		        if (typeof separator === 'undefined') {
		            separator = "";
		        }

		        return strs.join(separator);
		    }

		    /**
		     * Formats a number into a decimal string representation using XPath 3.1 F&O fn:format-number spec
		     * @param {number} value - number to format
		     * @param {String} picture - picture string definition
		     * @param {Object} [options] - override locale defaults
		     * @returns {String} The formatted string
		     */
		    function formatNumber(value, picture, options) {
		        // undefined inputs always return undefined
		        if (typeof value === 'undefined') {
		            return undefined;
		        }

		        var defaults = {
		            "decimal-separator": ".",
		            "grouping-separator": ",",
		            "exponent-separator": "e",
		            "infinity": "Infinity",
		            "minus-sign": "-",
		            "NaN": "NaN",
		            "percent": "%",
		            "per-mille": "\u2030",
		            "zero-digit": "0",
		            "digit": "#",
		            "pattern-separator": ";"
		        };

		        // if `options` is specified, then its entries override defaults
		        var properties = defaults;
		        if (typeof options !== 'undefined') {
		            Object.keys(options).forEach(function (key) {
		                properties[key] = options[key];
		            });
		        }

		        var decimalDigitFamily = [];
		        var zeroCharCode = properties['zero-digit'].charCodeAt(0);
		        for (var ii = zeroCharCode; ii < zeroCharCode + 10; ii++) {
		            decimalDigitFamily.push(String.fromCharCode(ii));
		        }

		        var activeChars = decimalDigitFamily.concat([properties['decimal-separator'], properties['exponent-separator'], properties['grouping-separator'], properties.digit, properties['pattern-separator']]);

		        var subPictures = picture.split(properties['pattern-separator']);

		        if (subPictures.length > 2) {
		            throw {
		                code: 'D3080',
		                stack: (new Error()).stack
		            };
		        }

		        var splitParts = function (subpicture) {
		            var prefix = (function () {
		                var ch;
		                for (var ii = 0; ii < subpicture.length; ii++) {
		                    ch = subpicture.charAt(ii);
		                    if (activeChars.indexOf(ch) !== -1 && ch !== properties['exponent-separator']) {
		                        return subpicture.substring(0, ii);
		                    }
		                }
		            })();
		            var suffix = (function () {
		                var ch;
		                for (var ii = subpicture.length - 1; ii >= 0; ii--) {
		                    ch = subpicture.charAt(ii);
		                    if (activeChars.indexOf(ch) !== -1 && ch !== properties['exponent-separator']) {
		                        return subpicture.substring(ii + 1);
		                    }
		                }
		            })();
		            var activePart = subpicture.substring(prefix.length, subpicture.length - suffix.length);
		            var mantissaPart, exponentPart, integerPart, fractionalPart;
		            var exponentPosition = subpicture.indexOf(properties['exponent-separator'], prefix.length);
		            if (exponentPosition === -1 || exponentPosition > subpicture.length - suffix.length) {
		                mantissaPart = activePart;
		                exponentPart = undefined;
		            } else {
		                mantissaPart = activePart.substring(0, exponentPosition);
		                exponentPart = activePart.substring(exponentPosition + 1);
		            }
		            var decimalPosition = mantissaPart.indexOf(properties['decimal-separator']);
		            if (decimalPosition === -1) {
		                integerPart = mantissaPart;
		                fractionalPart = suffix;
		            } else {
		                integerPart = mantissaPart.substring(0, decimalPosition);
		                fractionalPart = mantissaPart.substring(decimalPosition + 1);
		            }
		            return {
		                prefix: prefix,
		                suffix: suffix,
		                activePart: activePart,
		                mantissaPart: mantissaPart,
		                exponentPart: exponentPart,
		                integerPart: integerPart,
		                fractionalPart: fractionalPart,
		                subpicture: subpicture
		            };
		        };

		        // validate the picture string, F&O 4.7.3
		        var validate = function (parts) {
		            var error;
		            var ii;
		            var subpicture = parts.subpicture;
		            var decimalPos = subpicture.indexOf(properties['decimal-separator']);
		            if (decimalPos !== subpicture.lastIndexOf(properties['decimal-separator'])) {
		                error = 'D3081';
		            }
		            if (subpicture.indexOf(properties.percent) !== subpicture.lastIndexOf(properties.percent)) {
		                error = 'D3082';
		            }
		            if (subpicture.indexOf(properties['per-mille']) !== subpicture.lastIndexOf(properties['per-mille'])) {
		                error = 'D3083';
		            }
		            if (subpicture.indexOf(properties.percent) !== -1 && subpicture.indexOf(properties['per-mille']) !== -1) {
		                error = 'D3084';
		            }
		            var valid = false;
		            for (ii = 0; ii < parts.mantissaPart.length; ii++) {
		                var ch = parts.mantissaPart.charAt(ii);
		                if (decimalDigitFamily.indexOf(ch) !== -1 || ch === properties.digit) {
		                    valid = true;
		                    break;
		                }
		            }
		            if (!valid) {
		                error = 'D3085';
		            }
		            var charTypes = parts.activePart.split('').map(function (char) {
		                return activeChars.indexOf(char) === -1 ? 'p' : 'a';
		            }).join('');
		            if (charTypes.indexOf('p') !== -1) {
		                error = 'D3086';
		            }
		            if (decimalPos !== -1) {
		                if (subpicture.charAt(decimalPos - 1) === properties['grouping-separator'] || subpicture.charAt(decimalPos + 1) === properties['grouping-separator']) {
		                    error = 'D3087';
		                }
		            } else if (parts.integerPart.charAt(parts.integerPart.length - 1) === properties['grouping-separator']) {
		                error = 'D3088';
		            }
		            if (subpicture.indexOf(properties['grouping-separator'] + properties['grouping-separator']) !== -1) {
		                error = 'D3089';
		            }
		            var optionalDigitPos = parts.integerPart.indexOf(properties.digit);
		            if (optionalDigitPos !== -1 && parts.integerPart.substring(0, optionalDigitPos).split('').filter(function (char) {
		                return decimalDigitFamily.indexOf(char) > -1;
		            }).length > 0) {
		                error = 'D3090';
		            }
		            optionalDigitPos = parts.fractionalPart.lastIndexOf(properties.digit);
		            if (optionalDigitPos !== -1 && parts.fractionalPart.substring(optionalDigitPos).split('').filter(function (char) {
		                return decimalDigitFamily.indexOf(char) > -1;
		            }).length > 0) {
		                error = 'D3091';
		            }
		            var exponentExists = (typeof parts.exponentPart === 'string');
		            if (exponentExists && parts.exponentPart.length > 0 && (subpicture.indexOf(properties.percent) !== -1 || subpicture.indexOf(properties['per-mille']) !== -1)) {
		                error = 'D3092';
		            }
		            if (exponentExists && (parts.exponentPart.length === 0 || parts.exponentPart.split('').filter(function (char) {
		                return decimalDigitFamily.indexOf(char) === -1;
		            }).length > 0)) {
		                error = 'D3093';
		            }
		            if (error) {
		                throw {
		                    code: error,
		                    stack: (new Error()).stack
		                };
		            }
		        };

		        // analyse the picture string, F&O 4.7.4
		        var analyse = function (parts) {
		            var getGroupingPositions = function (part, toLeft) {
		                var positions = [];
		                var groupingPosition = part.indexOf(properties['grouping-separator']);
		                while (groupingPosition !== -1) {
		                    var charsToTheRight = (toLeft ? part.substring(0, groupingPosition) : part.substring(groupingPosition)).split('').filter(function (char) {
		                        return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
		                    }).length;
		                    positions.push(charsToTheRight);
		                    groupingPosition = parts.integerPart.indexOf(properties['grouping-separator'], groupingPosition + 1);
		                }
		                return positions;
		            };
		            var integerPartGroupingPositions = getGroupingPositions(parts.integerPart);
		            var regular = function (indexes) {
		                // are the grouping positions regular? i.e. same interval between each of them
		                if (indexes.length === 0) {
		                    return 0;
		                }
		                var gcd = function (a, b) {
		                    return b === 0 ? a : gcd(b, a % b);
		                };
		                // find the greatest common divisor of all the positions
		                var factor = indexes.reduce(gcd);
		                // is every position separated by this divisor? If so, it's regular
		                for (var index = 1; index <= indexes.length; index++) {
		                    if (indexes.indexOf(index * factor) === -1) {
		                        return 0;
		                    }
		                }
		                return factor;
		            };

		            var regularGrouping = regular(integerPartGroupingPositions);
		            var fractionalPartGroupingPositions = getGroupingPositions(parts.fractionalPart, true);

		            var minimumIntegerPartSize = parts.integerPart.split('').filter(function (char) {
		                return decimalDigitFamily.indexOf(char) !== -1;
		            }).length;
		            var scalingFactor = minimumIntegerPartSize;

		            var fractionalPartArray = parts.fractionalPart.split('');
		            var minimumFactionalPartSize = fractionalPartArray.filter(function (char) {
		                return decimalDigitFamily.indexOf(char) !== -1;
		            }).length;
		            var maximumFactionalPartSize = fractionalPartArray.filter(function (char) {
		                return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
		            }).length;
		            var exponentPresent = typeof parts.exponentPart === 'string';
		            if (minimumIntegerPartSize === 0 && maximumFactionalPartSize === 0) {
		                if (exponentPresent) {
		                    minimumFactionalPartSize = 1;
		                    maximumFactionalPartSize = 1;
		                } else {
		                    minimumIntegerPartSize = 1;
		                }
		            }
		            if (exponentPresent && minimumIntegerPartSize === 0 && parts.integerPart.indexOf(properties.digit) !== -1) {
		                minimumIntegerPartSize = 1;
		            }
		            if (minimumIntegerPartSize === 0 && minimumFactionalPartSize === 0) {
		                minimumFactionalPartSize = 1;
		            }
		            var minimumExponentSize = 0;
		            if (exponentPresent) {
		                minimumExponentSize = parts.exponentPart.split('').filter(function (char) {
		                    return decimalDigitFamily.indexOf(char) !== -1;
		                }).length;
		            }

		            return {
		                integerPartGroupingPositions: integerPartGroupingPositions,
		                regularGrouping: regularGrouping,
		                minimumIntegerPartSize: minimumIntegerPartSize,
		                scalingFactor: scalingFactor,
		                prefix: parts.prefix,
		                fractionalPartGroupingPositions: fractionalPartGroupingPositions,
		                minimumFactionalPartSize: minimumFactionalPartSize,
		                maximumFactionalPartSize: maximumFactionalPartSize,
		                minimumExponentSize: minimumExponentSize,
		                suffix: parts.suffix,
		                picture: parts.subpicture
		            };
		        };

		        var parts = subPictures.map(splitParts);
		        parts.forEach(validate);

		        var variables = parts.map(analyse);

		        var minus_sign = properties['minus-sign'];
		        var zero_digit = properties['zero-digit'];
		        var decimal_separator = properties['decimal-separator'];
		        var grouping_separator = properties['grouping-separator'];

		        if (variables.length === 1) {
		            variables.push(JSON.parse(JSON.stringify(variables[0])));
		            variables[1].prefix = minus_sign + variables[1].prefix;
		        }

		        // TODO cache the result of the analysis

		        // format the number
		        // bullet 1: TODO: NaN - not sure we'd ever get this in JSON
		        var pic;
		        // bullet 2:
		        if (value >= 0) {
		            pic = variables[0];
		        } else {
		            pic = variables[1];
		        }
		        var adjustedNumber;
		        // bullet 3:
		        if (pic.picture.indexOf(properties.percent) !== -1) {
		            adjustedNumber = value * 100;
		        } else if (pic.picture.indexOf(properties['per-mille']) !== -1) {
		            adjustedNumber = value * 1000;
		        } else {
		            adjustedNumber = value;
		        }
		        // bullet 4:
		        // TODO: infinity - not sure we'd ever get this in JSON
		        // bullet 5:
		        var mantissa, exponent;
		        if (pic.minimumExponentSize === 0) {
		            mantissa = adjustedNumber;
		        } else {
		            // mantissa * 10^exponent = adjustedNumber
		            var maxMantissa = Math.pow(10, pic.scalingFactor);
		            var minMantissa = Math.pow(10, pic.scalingFactor - 1);
		            mantissa = adjustedNumber;
		            exponent = 0;
		            while (mantissa < minMantissa) {
		                mantissa *= 10;
		                exponent -= 1;
		            }
		            while (mantissa > maxMantissa) {
		                mantissa /= 10;
		                exponent += 1;
		            }
		        }
		        // bullet 6:
		        var roundedNumber = round(mantissa, pic.maximumFactionalPartSize);
		        // bullet 7:
		        var makeString = function (value, dp) {
		            var str = Math.abs(value).toFixed(dp);
		            if (zero_digit !== '0') {
		                str = str.split('').map(function (digit) {
		                    if (digit >= '0' && digit <= '9') {
		                        return decimalDigitFamily[digit.charCodeAt(0) - 48];
		                    } else {
		                        return digit;
		                    }
		                }).join('');
		            }
		            return str;
		        };
		        var stringValue = makeString(roundedNumber, pic.maximumFactionalPartSize);
		        var decimalPos = stringValue.indexOf('.');
		        if (decimalPos === -1) {
		            stringValue = stringValue + decimal_separator;
		        } else {
		            stringValue = stringValue.replace('.', decimal_separator);
		        }
		        while (stringValue.charAt(0) === zero_digit) {
		            stringValue = stringValue.substring(1);
		        }
		        while (stringValue.charAt(stringValue.length - 1) === zero_digit) {
		            stringValue = stringValue.substring(0, stringValue.length - 1);
		        }
		        // bullets 8 & 9:
		        decimalPos = stringValue.indexOf(decimal_separator);
		        var padLeft = pic.minimumIntegerPartSize - decimalPos;
		        var padRight = pic.minimumFactionalPartSize - (stringValue.length - decimalPos - 1);
		        stringValue = (padLeft > 0 ? new Array(padLeft + 1).join(zero_digit) : '') + stringValue;
		        stringValue = stringValue + (padRight > 0 ? new Array(padRight + 1).join(zero_digit) : '');
		        decimalPos = stringValue.indexOf(decimal_separator);
		        // bullet 10:
		        if (pic.regularGrouping > 0) {
		            var groupCount = Math.floor((decimalPos - 1) / pic.regularGrouping);
		            for (var group = 1; group <= groupCount; group++) {
		                stringValue = [stringValue.slice(0, decimalPos - group * pic.regularGrouping), grouping_separator, stringValue.slice(decimalPos - group * pic.regularGrouping)].join('');
		            }
		        } else {
		            pic.integerPartGroupingPositions.forEach(function (pos) {
		                stringValue = [stringValue.slice(0, decimalPos - pos), grouping_separator, stringValue.slice(decimalPos - pos)].join('');
		                decimalPos++;
		            });
		        }
		        // bullet 11:
		        decimalPos = stringValue.indexOf(decimal_separator);
		        pic.fractionalPartGroupingPositions.forEach(function (pos) {
		            stringValue = [stringValue.slice(0, pos + decimalPos + 1), grouping_separator, stringValue.slice(pos + decimalPos + 1)].join('');
		        });
		        // bullet 12:
		        decimalPos = stringValue.indexOf(decimal_separator);
		        if (pic.picture.indexOf(decimal_separator) === -1 || decimalPos === stringValue.length - 1) {
		            stringValue = stringValue.substring(0, stringValue.length - 1);
		        }
		        // bullet 13:
		        if (typeof exponent !== 'undefined') {
		            var stringExponent = makeString(exponent, 0);
		            padLeft = pic.minimumExponentSize - stringExponent.length;
		            if (padLeft > 0) {
		                stringExponent = new Array(padLeft + 1).join(zero_digit) + stringExponent;
		            }
		            stringValue = stringValue + properties['exponent-separator'] + (exponent < 0 ? minus_sign : '') + stringExponent;
		        }
		        // bullet 14:
		        stringValue = pic.prefix + stringValue + pic.suffix;
		        return stringValue;
		    }

		    /**
		     * Converts a number to a string using a specified number base
		     * @param {number} value - the number to convert
		     * @param {number} [radix] - the number base; must be between 2 and 36. Defaults to 10
		     * @returns {string} - the converted string
		     */
		    function formatBase(value, radix) {
		        // undefined inputs always return undefined
		        if (typeof value === 'undefined') {
		            return undefined;
		        }

		        value = round(value);

		        if (typeof radix === 'undefined') {
		            radix = 10;
		        } else {
		            radix = round(radix);
		        }

		        if (radix < 2 || radix > 36) {
		            throw {
		                code: 'D3100',
		                stack: (new Error()).stack,
		                value: radix
		            };

		        }

		        var result = value.toString(radix);

		        return result;
		    }

		    /**
		     * Cast argument to number
		     * @param {Object} arg - Argument
		     * @returns {Number} numeric value of argument
		     */
		    function number(arg) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        if (typeof arg === 'number') {
		            // already a number
		            result = arg;
		        } else if (typeof arg === 'string' && /^-?[0-9]+(\.[0-9]+)?([Ee][-+]?[0-9]+)?$/.test(arg) && !isNaN(parseFloat(arg)) && isFinite(arg)) {
		            result = parseFloat(arg);
		        } else if (typeof arg === 'string' && /^(0[xX][0-9A-Fa-f]+)|(0[oO][0-7]+)|(0[bB][0-1]+)$/.test(arg)) {
		            result = Number(arg);
		        } else if (arg === true) {
		            // boolean true casts to 1
		            result = 1;
		        } else if (arg === false) {
		            // boolean false casts to 0
		            result = 0;
		        } else {
		            throw {
		                code: "D3030",
		                value: arg,
		                stack: (new Error()).stack,
		                index: 1
		            };
		        }
		        return result;
		    }

		    /**
		     * Absolute value of a number
		     * @param {Number} arg - Argument
		     * @returns {Number} absolute value of argument
		     */
		    function abs(arg) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        result = Math.abs(arg);
		        return result;
		    }

		    /**
		     * Rounds a number down to integer
		     * @param {Number} arg - Argument
		     * @returns {Number} rounded integer
		     */
		    function floor(arg) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        result = Math.floor(arg);
		        return result;
		    }

		    /**
		     * Rounds a number up to integer
		     * @param {Number} arg - Argument
		     * @returns {Number} rounded integer
		     */
		    function ceil(arg) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        result = Math.ceil(arg);
		        return result;
		    }

		    /**
		     * Round to half even
		     * @param {Number} arg - Argument
		     * @param {Number} [precision] - number of decimal places
		     * @returns {Number} rounded integer
		     */
		    function round(arg, precision) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        if (precision) {
		            // shift the decimal place - this needs to be done in a string since multiplying
		            // by a power of ten can introduce floating point precision errors which mess up
		            // this rounding algorithm - See 'Decimal rounding' in
		            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
		            // Shift
		            var value = arg.toString().split('e');
		            arg = +(value[0] + 'e' + (value[1] ? (+value[1] + precision) : precision));

		        }

		        // round up to nearest int
		        result = Math.round(arg);
		        var diff = result - arg;
		        if (Math.abs(diff) === 0.5 && Math.abs(result % 2) === 1) {
		            // rounded the wrong way - adjust to nearest even number
		            result = result - 1;
		        }
		        if (precision) {
		            // Shift back
		            value = result.toString().split('e');
		            /* istanbul ignore next */
		            result = +(value[0] + 'e' + (value[1] ? (+value[1] - precision) : -precision));
		        }
		        if (Object.is(result, -0)) { // ESLint rule 'no-compare-neg-zero' suggests this way
		            // JSON doesn't do -0
		            result = 0;
		        }
		        return result;
		    }

		    /**
		     * Square root of number
		     * @param {Number} arg - Argument
		     * @returns {Number} square root
		     */
		    function sqrt(arg) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        if (arg < 0) {
		            throw {
		                stack: (new Error()).stack,
		                code: "D3060",
		                index: 1,
		                value: arg
		            };
		        }

		        result = Math.sqrt(arg);

		        return result;
		    }

		    /**
		     * Raises number to the power of the second number
		     * @param {Number} arg - the base
		     * @param {Number} exp - the exponent
		     * @returns {Number} rounded integer
		     */
		    function power(arg, exp) {
		        var result;

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        result = Math.pow(arg, exp);

		        if (!isFinite(result)) {
		            throw {
		                stack: (new Error()).stack,
		                code: "D3061",
		                index: 1,
		                value: arg,
		                exp: exp
		            };
		        }

		        return result;
		    }

		    /**
		     * Returns a random number 0 <= n < 1
		     * @returns {number} random number
		     */
		    function random() {
		        return Math.random();
		    }

		    /**
		     * Evaluate an input and return a boolean
		     * @param {*} arg - Arguments
		     * @returns {boolean} Boolean
		     */
		    function boolean(arg) {
		        // cast arg to its effective boolean value
		        // boolean: unchanged
		        // string: zero-length -> false; otherwise -> true
		        // number: 0 -> false; otherwise -> true
		        // null -> false
		        // array: empty -> false; length > 1 -> true
		        // object: empty -> false; non-empty -> true
		        // function -> false

		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        var result = false;
		        if (Array.isArray(arg)) {
		            if (arg.length === 1) {
		                result = boolean(arg[0]);
		            } else if (arg.length > 1) {
		                var trues = arg.filter(function (val) {
		                    return boolean(val);
		                });
		                result = trues.length > 0;
		            }
		        } else if (typeof arg === 'string') {
		            if (arg.length > 0) {
		                result = true;
		            }
		        } else if (isNumeric(arg)) {
		            if (arg !== 0) {
		                result = true;
		            }
		        } else if (arg !== null && typeof arg === 'object') {
		            if (Object.keys(arg).length > 0) {
		                result = true;
		            }
		        } else if (typeof arg === 'boolean' && arg === true) {
		            result = true;
		        }
		        return result;
		    }

		    /**
		     * returns the Boolean NOT of the arg
		     * @param {*} arg - argument
		     * @returns {boolean} - NOT arg
		     */
		    function not(arg) {
		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        return !boolean(arg);
		    }

		    /**
		     * Helper function to build the arguments to be supplied to the function arg of the
		     * HOFs map, filter, each, sift and single
		     * @param {function} func - the function to be invoked
		     * @param {*} arg1 - the first (required) arg - the value
		     * @param {*} arg2 - the second (optional) arg - the position (index or key)
		     * @param {*} arg3 - the third (optional) arg - the whole structure (array or object)
		     * @returns {*[]} the argument list
		     */
		    function hofFuncArgs(func, arg1, arg2, arg3) {
		        var func_args = [arg1]; // the first arg (the value) is required
		        // the other two are optional - only supply it if the function can take it
		        var length = getFunctionArity(func);
		        if (length >= 2) {
		            func_args.push(arg2);
		        }
		        if (length >= 3) {
		            func_args.push(arg3);
		        }
		        return func_args;
		    }

		    /**
		     * Create a map from an array of arguments
		     * @param {Array} [arr] - array to map over
		     * @param {Function} func - function to apply
		     * @returns {Array} Map array
		     */
		    async function map(arr, func) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        var result = createSequence();
		        // do the map - iterate over the arrays, and invoke func
		        for (var i = 0; i < arr.length; i++) {
		            var func_args = hofFuncArgs(func, arr[i], i, arr);
		            // invoke func
		            var res = await func.apply(this, func_args);
		            if (typeof res !== 'undefined') {
		                result.push(res);
		            }
		        }

		        return result;
		    }

		    /**
		     * Create a map from an array of arguments
		     * @param {Array} [arr] - array to filter
		     * @param {Function} func - predicate function
		     * @returns {Array} Map array
		     */
		    async function filter(arr, func) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        var result = createSequence();

		        for (var i = 0; i < arr.length; i++) {
		            var entry = arr[i];
		            var func_args = hofFuncArgs(func, entry, i, arr);
		            // invoke func
		            var res = await func.apply(this, func_args);
		            if (boolean(res)) {
		                result.push(entry);
		            }
		        }

		        return result;
		    }

		    /**
		     * Given an array, find the single element matching a specified condition
		     * Throws an exception if the number of matching elements is not exactly one
		     * @param {Array} [arr] - array to filter
		     * @param {Function} [func] - predicate function
		     * @returns {*} Matching element
		     */
		    async function single(arr, func) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        var hasFoundMatch = false;
		        var result;

		        for (var i = 0; i < arr.length; i++) {
		            var entry = arr[i];
		            var positiveResult = true;
		            if (typeof func !== 'undefined') {
		                var func_args = hofFuncArgs(func, entry, i, arr);
		                // invoke func
		                var res = await func.apply(this, func_args);
		                positiveResult = boolean(res);
		            }
		            if (positiveResult) {
		                if(!hasFoundMatch) {
		                    result = entry;
		                    hasFoundMatch = true;
		                } else {
		                    throw {
		                        stack: (new Error()).stack,
		                        code: "D3138",
		                        index: i
		                    };
		                }
		            }
		        }

		        if(!hasFoundMatch) {
		            throw {
		                stack: (new Error()).stack,
		                code: "D3139"
		            };
		        }

		        return result;
		    }

		    /**
		     * Convolves (zips) each value from a set of arrays
		     * @param {Array} [args] - arrays to zip
		     * @returns {Array} Zipped array
		     */
		    function zip() {
		        // this can take a variable number of arguments
		        var result = [];
		        var args = Array.prototype.slice.call(arguments);
		        // length of the shortest array
		        var length = Math.min.apply(Math, args.map(function (arg) {
		            if (Array.isArray(arg)) {
		                return arg.length;
		            }
		            return 0;
		        }));
		        for (var i = 0; i < length; i++) {
		            var tuple = args.map((arg) => {
		                return arg[i];
		            });
		            result.push(tuple);
		        }
		        return result;
		    }

		    /**
		     * Fold left function
		     * @param {Array} sequence - Sequence
		     * @param {Function} func - Function
		     * @param {Object} init - Initial value
		     * @returns {*} Result
		     */
		    async function foldLeft(sequence, func, init) {
		        // undefined inputs always return undefined
		        if (typeof sequence === 'undefined') {
		            return undefined;
		        }

		        var result;

		        var arity = getFunctionArity(func);
		        if (arity < 2) {
		            throw {
		                stack: (new Error()).stack,
		                code: "D3050",
		                index: 1
		            };
		        }

		        var index;
		        if (typeof init === 'undefined' && sequence.length > 0) {
		            result = sequence[0];
		            index = 1;
		        } else {
		            result = init;
		            index = 0;
		        }

		        while (index < sequence.length) {
		            var args = [result, sequence[index]];
		            if (arity >= 3) {
		                args.push(index);
		            }
		            if (arity >= 4) {
		                args.push(sequence);
		            }
		            result = await func.apply(this, args);
		            index++;
		        }

		        return result;
		    }

		    /**
		     * Return keys for an object
		     * @param {Object} arg - Object
		     * @returns {Array} Array of keys
		     */
		    function keys(arg) {
		        var result = createSequence();

		        if (Array.isArray(arg)) {
		            // merge the keys of all of the items in the array
		            var merge = {};
		            arg.forEach(function (item) {
		                var allkeys = keys(item);
		                allkeys.forEach(function (key) {
		                    merge[key] = true;
		                });
		            });
		            result = keys(merge);
		        } else if (arg !== null && typeof arg === 'object' && !isFunction(arg)) {
		            Object.keys(arg).forEach(key => result.push(key));
		        }
		        return result;
		    }

		    /**
		     * Return value from an object for a given key
		     * @param {Object} input - Object/Array
		     * @param {String} key - Key in object
		     * @returns {*} Value of key in object
		     */
		    function lookup(input, key) {
		        // lookup the 'name' item in the input
		        var result;
		        if (Array.isArray(input)) {
		            result = createSequence();
		            for(var ii = 0; ii < input.length; ii++) {
		                var res =  lookup(input[ii], key);
		                if (typeof res !== 'undefined') {
		                    if (Array.isArray(res)) {
		                        res.forEach(val => result.push(val));
		                    } else {
		                        result.push(res);
		                    }
		                }
		            }
		        } else if (input !== null && typeof input === 'object' && !isFunction(input)) {
		            result = input[key];
		        }
		        return result;
		    }

		    /**
		     * Append second argument to first
		     * @param {Array|Object} arg1 - First argument
		     * @param {Array|Object} arg2 - Second argument
		     * @returns {*} Appended arguments
		     */
		    function append(arg1, arg2) {
		        // disregard undefined args
		        if (typeof arg1 === 'undefined') {
		            return arg2;
		        }
		        if (typeof arg2 === 'undefined') {
		            return arg1;
		        }
		        // if either argument is not an array, make it so
		        if (!Array.isArray(arg1)) {
		            arg1 = createSequence(arg1);
		        }
		        if (!Array.isArray(arg2)) {
		            arg2 = [arg2];
		        }
		        return arg1.concat(arg2);
		    }

		    /**
		     * Determines if the argument is undefined
		     * @param {*} arg - argument
		     * @returns {boolean} False if argument undefined, otherwise true
		     */
		    function exists(arg) {
		        if (typeof arg === 'undefined') {
		            return false;
		        } else {
		            return true;
		        }
		    }

		    /**
		     * Splits an object into an array of object with one property each
		     * @param {*} arg - the object to split
		     * @returns {*} - the array
		     */
		    function spread(arg) {
		        var result = createSequence();

		        if (Array.isArray(arg)) {
		            // spread all of the items in the array
		            arg.forEach(function (item) {
		                result = append(result, spread(item));
		            });
		        } else if (arg !== null && typeof arg === 'object' && !isLambda(arg)) {
		            for (var key in arg) {
		                var obj = {};
		                obj[key] = arg[key];
		                result.push(obj);
		            }
		        } else {
		            result = arg;
		        }
		        return result;
		    }

		    /**
		     * Merges an array of objects into a single object.  Duplicate properties are
		     * overridden by entries later in the array
		     * @param {*} arg - the objects to merge
		     * @returns {*} - the object
		     */
		    function merge(arg) {
		        // undefined inputs always return undefined
		        if (typeof arg === 'undefined') {
		            return undefined;
		        }

		        var result = {};

		        arg.forEach(function (obj) {
		            for (var prop in obj) {
		                result[prop] = obj[prop];
		            }
		        });
		        return result;
		    }

		    /**
		     * Reverses the order of items in an array
		     * @param {Array} arr - the array to reverse
		     * @returns {Array} - the reversed array
		     */
		    function reverse(arr) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        if (arr.length <= 1) {
		            return arr;
		        }

		        var length = arr.length;
		        var result = new Array(length);
		        for (var i = 0; i < length; i++) {
		            result[length - i - 1] = arr[i];
		        }

		        return result;
		    }

		    /**
		     *
		     * @param {*} obj - the input object to iterate over
		     * @param {*} func - the function to apply to each key/value pair
		     * @returns {Array} - the resultant array
		     */
		    async function each(obj, func) {
		        var result = createSequence();

		        for (var key in obj) {
		            var func_args = hofFuncArgs(func, obj[key], key, obj);
		            // invoke func
		            var val = await func.apply(this, func_args);
		            if(typeof val !== 'undefined') {
		                result.push(val);
		            }
		        }

		        return result;
		    }

		    /**
		     *
		     * @param {string} [message] - the message to attach to the error
		     * @throws custom error with code 'D3137'
		     */
		    function error(message) {
		        throw {
		            code: "D3137",
		            stack: (new Error()).stack,
		            message: message || "$error() function evaluated"
		        };
		    }

		    /**
		     *
		     * @param {boolean} condition - the condition to evaluate
		     * @param {string} [message] - the message to attach to the error
		     * @throws custom error with code 'D3137'
		     * @returns {undefined}
		     */
		    function assert(condition, message) {
		        if(!condition) {
		            throw {
		                code: "D3141",
		                stack: (new Error()).stack,
		                message: message || "$assert() statement failed"
		            };
		        }

		        return undefined;
		    }

		    /**
		     *
		     * @param {*} [value] - the input to which the type will be checked
		     * @returns {string} - the type of the input
		     */
		    function type(value) {
		        if (value === undefined) {
		            return undefined;
		        }

		        if (value === null) {
		            return 'null';
		        }

		        if (isNumeric(value)) {
		            return 'number';
		        }

		        if (typeof value === 'string') {
		            return 'string';
		        }

		        if (typeof value === 'boolean') {
		            return 'boolean';
		        }

		        if(Array.isArray(value)) {
		            return 'array';
		        }

		        if(isFunction(value)) {
		            return 'function';
		        }

		        return 'object';
		    }

		    /**
		     * Implements the merge sort (stable) with optional comparator function
		     *
		     * @param {Array} arr - the array to sort
		     * @param {*} comparator - comparator function
		     * @returns {Array} - sorted array
		     */
		    async function sort(arr, comparator) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        if (arr.length <= 1) {
		            return arr;
		        }

		        var comp;
		        if (typeof comparator === 'undefined') {
		            // inject a default comparator - only works for numeric or string arrays
		            if (!isArrayOfNumbers(arr) && !isArrayOfStrings(arr)) {
		                throw {
		                    stack: (new Error()).stack,
		                    code: "D3070",
		                    index: 1
		                };
		            }

		            comp = async function (a, b) {
		                return a > b;
		            };
		        } else {
		            // for internal usage of functionSort (i.e. order-by syntax)
		            comp = comparator;
		        }

		        var merge = async function (l, r) {
		            var merge_iter = async function (result, left, right) {
		                if (left.length === 0) {
		                    Array.prototype.push.apply(result, right);
		                } else if (right.length === 0) {
		                    Array.prototype.push.apply(result, left);
		                } else if (await comp(left[0], right[0])) { // invoke the comparator function
		                    // if it returns true - swap left and right
		                    result.push(right[0]);
		                    await merge_iter(result, left, right.slice(1));
		                } else {
		                    // otherwise keep the same order
		                    result.push(left[0]);
		                    await merge_iter(result, left.slice(1), right);
		                }
		            };
		            var merged = [];
		            await merge_iter(merged, l, r);
		            return merged;
		        };

		        var msort = async function (array) {
		            if (!Array.isArray(array) || array.length <= 1) {
		                return array;
		            } else {
		                var middle = Math.floor(array.length / 2);
		                var left = array.slice(0, middle);
		                var right = array.slice(middle);
		                left = await msort(left);
		                right = await msort(right);
		                return await merge(left, right);
		            }
		        };

		        var result = await msort(arr);

		        return result;
		    }

		    /**
		     * Randomly shuffles the contents of an array
		     * @param {Array} arr - the input array
		     * @returns {Array} the shuffled array
		     */
		    function shuffle(arr) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        if (arr.length <= 1) {
		            return arr;
		        }

		        // shuffle using the 'inside-out' variant of the Fisher-Yates algorithm
		        var result = new Array(arr.length);
		        for (var i = 0; i < arr.length; i++) {
		            var j = Math.floor(Math.random() * (i + 1)); // random integer such that 0 ≤ j ≤ i
		            if (i !== j) {
		                result[i] = result[j];
		            }
		            result[j] = arr[i];
		        }

		        return result;
		    }

		    /**
		     * Returns the values that appear in a sequence, with duplicates eliminated.
		     * @param {Array} arr - An array or sequence of values
		     * @returns {Array} - sequence of distinct values
		     */
		    function distinct(arr) {
		        // undefined inputs always return undefined
		        if (typeof arr === 'undefined') {
		            return undefined;
		        }

		        if(!Array.isArray(arr) || arr.length <= 1) {
		            return arr;
		        }

		        var results = isSequence(arr) ? createSequence() : [];

		        for(var ii = 0; ii < arr.length; ii++) {
		            var value = arr[ii];
		            // is this value already in the result sequence?
		            var includes = false;
		            for(var jj = 0; jj < results.length; jj++) {
		                if (deepEquals(value, results[jj])) {
		                    includes = true;
		                    break;
		                }
		            }
		            if(!includes) {
		                results.push(value);
		            }
		        }
		        return results;
		    }

		    /**
		     * Applies a predicate function to each key/value pair in an object, and returns an object containing
		     * only the key/value pairs that passed the predicate
		     *
		     * @param {object} arg - the object to be sifted
		     * @param {object} func - the predicate function (lambda or native)
		     * @returns {object} - sifted object
		     */
		    async function sift(arg, func) {
		        var result = {};

		        for (var item in arg) {
		            var entry = arg[item];
		            var func_args = hofFuncArgs(func, entry, item, arg);
		            // invoke func
		            var res = await func.apply(this, func_args);
		            if (boolean(res)) {
		                result[item] = entry;
		            }
		        }

		        // empty objects should be changed to undefined
		        if (Object.keys(result).length === 0) {
		            result = undefined;
		        }

		        return result;
		    }

		    return {
		        sum, count, max, min, average,
		        string, substring, substringBefore, substringAfter, lowercase, uppercase, length, trim, pad,
		        match, contains, replace, split, join,
		        formatNumber, formatBase, number, floor, ceil, round, abs, sqrt, power, random,
		        boolean, not,
		        map, zip, filter, single, foldLeft, sift,
		        keys, lookup, append, exists, spread, merge, reverse, each, error, assert, type, sort, shuffle, distinct,
		        base64encode, base64decode,  encodeUrlComponent, encodeUrl, decodeUrlComponent, decodeUrl
		    };
		})();

		module.exports = functions;

		}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
		},{"./utils":6}],3:[function(require,module,exports){
		/**
		 * © Copyright IBM Corp. 2016, 2017 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		/**
		 * @module JSONata
		 * @description JSON query and transformation language
		 */

		var datetime = require('./datetime');
		var fn = require('./functions');
		var utils = require('./utils');
		var parser = require('./parser');
		var parseSignature = require('./signature');

		/**
		 * jsonata
		 * @function
		 * @param {Object} expr - JSONata expression
		 * @returns {{evaluate: evaluate, assign: assign}} Evaluated expression
		 */
		var jsonata = (function() {

		    var isNumeric = utils.isNumeric;
		    var isArrayOfStrings = utils.isArrayOfStrings;
		    var isArrayOfNumbers = utils.isArrayOfNumbers;
		    var createSequence = utils.createSequence;
		    var isSequence = utils.isSequence;
		    var isFunction = utils.isFunction;
		    var isLambda = utils.isLambda;
		    var isIterable = utils.isIterable;
		    var isPromise = utils.isPromise;
		    var getFunctionArity = utils.getFunctionArity;
		    var isDeepEqual = utils.isDeepEqual;

		    // Start of Evaluator code

		    var staticFrame = createFrame(null);

		    /**
		     * Evaluate expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluate(expr, input, environment) {
		        var result;

		        var entryCallback = environment.lookup(Symbol.for('jsonata.__evaluate_entry'));
		        if(entryCallback) {
		            await entryCallback(expr, input, environment);
		        }

		        switch (expr.type) {
		            case 'path':
		                result = await evaluatePath(expr, input, environment);
		                break;
		            case 'binary':
		                result = await evaluateBinary(expr, input, environment);
		                break;
		            case 'unary':
		                result = await evaluateUnary(expr, input, environment);
		                break;
		            case 'name':
		                result = evaluateName(expr, input);
		                break;
		            case 'string':
		            case 'number':
		            case 'value':
		                result = evaluateLiteral(expr);
		                break;
		            case 'wildcard':
		                result = evaluateWildcard(expr, input);
		                break;
		            case 'descendant':
		                result = evaluateDescendants(expr, input);
		                break;
		            case 'parent':
		                result = environment.lookup(expr.slot.label);
		                break;
		            case 'condition':
		                result = await evaluateCondition(expr, input, environment);
		                break;
		            case 'block':
		                result = await evaluateBlock(expr, input, environment);
		                break;
		            case 'bind':
		                result = await evaluateBindExpression(expr, input, environment);
		                break;
		            case 'regex':
		                result = evaluateRegex(expr);
		                break;
		            case 'function':
		                result = await evaluateFunction(expr, input, environment);
		                break;
		            case 'variable':
		                result = evaluateVariable(expr, input, environment);
		                break;
		            case 'lambda':
		                result = evaluateLambda(expr, input, environment);
		                break;
		            case 'partial':
		                result = await evaluatePartialApplication(expr, input, environment);
		                break;
		            case 'apply':
		                result = await evaluateApplyExpression(expr, input, environment);
		                break;
		            case 'transform':
		                result = evaluateTransformExpression(expr, input, environment);
		                break;
		        }

		        if (Object.prototype.hasOwnProperty.call(expr, 'predicate')) {
		            for(var ii = 0; ii < expr.predicate.length; ii++) {
		                result = await evaluateFilter(expr.predicate[ii].expr, result, environment);
		            }
		        }

		        if (expr.type !== 'path' && Object.prototype.hasOwnProperty.call(expr, 'group')) {
		            result = await evaluateGroupExpression(expr.group, result, environment);
		        }

		        var exitCallback = environment.lookup(Symbol.for('jsonata.__evaluate_exit'));
		        if(exitCallback) {
		            await exitCallback(expr, input, environment, result);
		        }

		        if(result && isSequence(result) && !result.tupleStream) {
		            if(expr.keepArray) {
		                result.keepSingleton = true;
		            }
		            if(result.length === 0) {
		                result = undefined;
		            } else if(result.length === 1) {
		                result =  result.keepSingleton ? result : result[0];
		            }

		        }

		        return result;
		    }

		    /**
		     * Evaluate path expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluatePath(expr, input, environment) {
		        var inputSequence;
		        // expr is an array of steps
		        // if the first step is a variable reference ($...), including root reference ($$),
		        //   then the path is absolute rather than relative
		        if (Array.isArray(input) && expr.steps[0].type !== 'variable') {
		            inputSequence = input;
		        } else {
		            // if input is not an array, make it so
		            inputSequence = createSequence(input);
		        }

		        var resultSequence;
		        var isTupleStream = false;
		        var tupleBindings = undefined;

		        // evaluate each step in turn
		        for(var ii = 0; ii < expr.steps.length; ii++) {
		            var step = expr.steps[ii];

		            if(step.tuple) {
		                isTupleStream = true;
		            }

		            // if the first step is an explicit array constructor, then just evaluate that (i.e. don't iterate over a context array)
		            if(ii === 0 && step.consarray) {
		                resultSequence = await evaluate(step, inputSequence, environment);
		            } else {
		                if(isTupleStream) {
		                    tupleBindings = await evaluateTupleStep(step, inputSequence, tupleBindings, environment);
		                } else {
		                    resultSequence = await evaluateStep(step, inputSequence, environment, ii === expr.steps.length - 1);
		                }
		            }

		            if (!isTupleStream && (typeof resultSequence === 'undefined' || resultSequence.length === 0)) {
		                break;
		            }

		            if(typeof step.focus === 'undefined') {
		                inputSequence = resultSequence;
		            }

		        }

		        if(isTupleStream) {
		            if(expr.tuple) {
		                // tuple stream is carrying ancestry information - keep this
		                resultSequence = tupleBindings;
		            } else {
		                resultSequence = createSequence();
		                for (ii = 0; ii < tupleBindings.length; ii++) {
		                    resultSequence.push(tupleBindings[ii]['@']);
		                }
		            }
		        }

		        if(expr.keepSingletonArray) {
		            // if the array is explicitly constructed in the expression and marked to promote singleton sequences to array
		            if(Array.isArray(resultSequence) && resultSequence.cons && !resultSequence.sequence) {
		                resultSequence = createSequence(resultSequence);
		            }
		            resultSequence.keepSingleton = true;
		        }

		        if (expr.hasOwnProperty('group')) {
		            resultSequence = await evaluateGroupExpression(expr.group, isTupleStream ? tupleBindings : resultSequence, environment);
		        }

		        return resultSequence;
		    }

		    function createFrameFromTuple(environment, tuple) {
		        var frame = createFrame(environment);
		        for(const prop in tuple) {
		            frame.bind(prop, tuple[prop]);
		        }
		        return frame;
		    }

		    /**
		     * Evaluate a step within a path
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @param {boolean} lastStep - flag the last step in a path
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateStep(expr, input, environment, lastStep) {
		        var result;
		        if(expr.type === 'sort') {
		             result = await evaluateSortExpression(expr, input, environment);
		             if(expr.stages) {
		                 result = await evaluateStages(expr.stages, result, environment);
		             }
		             return result;
		        }

		        result = createSequence();

		        for(var ii = 0; ii < input.length; ii++) {
		            var res = await evaluate(expr, input[ii], environment);
		            if(expr.stages) {
		                for(var ss = 0; ss < expr.stages.length; ss++) {
		                    res = await evaluateFilter(expr.stages[ss].expr, res, environment);
		                }
		            }
		            if(typeof res !== 'undefined') {
		                result.push(res);
		            }
		        }

		        var resultSequence = createSequence();
		        if(lastStep && result.length === 1 && Array.isArray(result[0]) && !isSequence(result[0])) {
		            resultSequence = result[0];
		        } else {
		            // flatten the sequence
		            result.forEach(function(res) {
		                if (!Array.isArray(res) || res.cons) {
		                    // it's not an array - just push into the result sequence
		                    resultSequence.push(res);
		                } else {
		                    // res is a sequence - flatten it into the parent sequence
		                    res.forEach(val => resultSequence.push(val));
		                }
		            });
		        }

		        return resultSequence;
		    }

		    async function evaluateStages(stages, input, environment) {
		        var result = input;
		        for(var ss = 0; ss < stages.length; ss++) {
		            var stage = stages[ss];
		            switch(stage.type) {
		                case 'filter':
		                    result = await evaluateFilter(stage.expr, result, environment);
		                    break;
		                case 'index':
		                    for(var ee = 0; ee < result.length; ee++) {
		                        var tuple = result[ee];
		                        tuple[stage.value] = ee;
		                    }
		                    break;
		            }
		        }
		        return result;
		    }

		    /**
		     * Evaluate a step within a path
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} tupleBindings - The tuple stream
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateTupleStep(expr, input, tupleBindings, environment) {
		        var result;
		        if(expr.type === 'sort') {
		            if(tupleBindings) {
		                result = await evaluateSortExpression(expr, tupleBindings, environment);
		            } else {
		                var sorted = await evaluateSortExpression(expr, input, environment);
		                result = createSequence();
		                result.tupleStream = true;
		                for(var ss = 0; ss < sorted.length; ss++) {
		                    var tuple = {'@': sorted[ss]};
		                    tuple[expr.index] = ss;
		                    result.push(tuple);
		                }
		            }
		            if(expr.stages) {
		                result = await evaluateStages(expr.stages, result, environment);
		            }
		            return result;
		        }

		        result = createSequence();
		        result.tupleStream = true;
		        var stepEnv = environment;
		        if(tupleBindings === undefined) {
		            tupleBindings = input.map(item => { return {'@': item} });
		        }

		        for(var ee = 0; ee < tupleBindings.length; ee++) {
		            stepEnv = createFrameFromTuple(environment, tupleBindings[ee]);
		            var res = await evaluate(expr, tupleBindings[ee]['@'], stepEnv);
		            // res is the binding sequence for the output tuple stream
		            if(typeof res !== 'undefined') {
		                if (!Array.isArray(res)) {
		                    res = [res];
		                }
		                for (var bb = 0; bb < res.length; bb++) {
		                    tuple = {};
		                    Object.assign(tuple, tupleBindings[ee]);
		                    if(res.tupleStream) {
		                        Object.assign(tuple, res[bb]);
		                    } else {
		                        if (expr.focus) {
		                            tuple[expr.focus] = res[bb];
		                            tuple['@'] = tupleBindings[ee]['@'];
		                        } else {
		                            tuple['@'] = res[bb];
		                        }
		                        if (expr.index) {
		                            tuple[expr.index] = bb;
		                        }
		                        if (expr.ancestor) {
		                            tuple[expr.ancestor.label] = tupleBindings[ee]['@'];
		                        }
		                    }
		                    result.push(tuple);
		                }
		            }
		        }

		        if(expr.stages) {
		            result = await evaluateStages(expr.stages, result, environment);
		        }

		        return result;
		    }

		    /**
		     * Apply filter predicate to input data
		     * @param {Object} predicate - filter expression
		     * @param {Object} input - Input data to apply predicates against
		     * @param {Object} environment - Environment
		     * @returns {*} Result after applying predicates
		     */
		    async function evaluateFilter(predicate, input, environment) {
		        var results = createSequence();
		        if( input && input.tupleStream) {
		            results.tupleStream = true;
		        }
		        if (!Array.isArray(input)) {
		            input = createSequence(input);
		        }
		        if (predicate.type === 'number') {
		            var index = Math.floor(predicate.value);  // round it down
		            if (index < 0) {
		                // count in from end of array
		                index = input.length + index;
		            }
		            var item = input[index];
		            if(typeof item !== 'undefined') {
		                if(Array.isArray(item)) {
		                    results = item;
		                } else {
		                    results.push(item);
		                }
		            }
		        } else {
		            for (index = 0; index < input.length; index++) {
		                var item = input[index];
		                var context = item;
		                var env = environment;
		                if(input.tupleStream) {
		                    context = item['@'];
		                    env = createFrameFromTuple(environment, item);
		                }
		                var res = await evaluate(predicate, context, env);
		                if (isNumeric(res)) {
		                    res = [res];
		                }
		                if (isArrayOfNumbers(res)) {
		                    res.forEach(function (ires) {
		                        // round it down
		                        var ii = Math.floor(ires);
		                        if (ii < 0) {
		                            // count in from end of array
		                            ii = input.length + ii;
		                        }
		                        if (ii === index) {
		                            results.push(item);
		                        }
		                    });
		                } else if (fn.boolean(res)) { // truthy
		                    results.push(item);
		                }
		            }
		        }
		        return results;
		    }

		    /**
		     * Evaluate binary expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateBinary(expr, input, environment) {
		        var result;
		        var lhs = await evaluate(expr.lhs, input, environment);
		        var op = expr.value;

		        //defer evaluation of RHS to allow short-circuiting
		        var evalrhs = async () => await evaluate(expr.rhs, input, environment);
		        if (op === "and" || op === "or") {
		            try {
		                return await evaluateBooleanExpression(lhs, evalrhs, op);
		            } catch(err) {
		                err.position = expr.position;
		                err.token = op;
		                throw err;
		            }
		        }

		        var rhs = await evalrhs();
		        try {
		            switch (op) {
		                case '+':
		                case '-':
		                case '*':
		                case '/':
		                case '%':
		                    result = evaluateNumericExpression(lhs, rhs, op);
		                    break;
		                case '=':
		                case '!=':
		                    result = evaluateEqualityExpression(lhs, rhs, op);
		                    break;
		                case '<':
		                case '<=':
		                case '>':
		                case '>=':
		                    result = evaluateComparisonExpression(lhs, rhs, op);
		                    break;
		                case '&':
		                    result = evaluateStringConcat(lhs, rhs);
		                    break;
		                case '..':
		                    result = evaluateRangeExpression(lhs, rhs);
		                    break;
		                case 'in':
		                    result = evaluateIncludesExpression(lhs, rhs);
		                    break;
		            }
		        } catch(err) {
		            err.position = expr.position;
		            err.token = op;
		            throw err;
		        }
		        return result;
		    }

		    /**
		     * Evaluate unary expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateUnary(expr, input, environment) {
		        var result;

		        switch (expr.value) {
		            case '-':
		                result = await evaluate(expr.expression, input, environment);
		                if(typeof result === 'undefined') {
		                    result = undefined;
		                } else if (isNumeric(result)) {
		                    result = -result;
		                } else {
		                    throw {
		                        code: "D1002",
		                        stack: (new Error()).stack,
		                        position: expr.position,
		                        token: expr.value,
		                        value: result
		                    };
		                }
		                break;
		            case '[':
		                // array constructor - evaluate each item
		                result = [];
		                let generators = await Promise.all(expr.expressions
		                    .map(async (item, idx) => {
		                        environment.isParallelCall = idx > 0;
		                        return [item, await evaluate(item, input, environment)]
		                    }));
		                for (let generator of generators) {
		                    var [item, value] = generator;
		                    if (typeof value !== 'undefined') {
		                        if(item.value === '[') {
		                            result.push(value);
		                        } else {
		                            result = fn.append(result, value);
		                        }
		                    }
		                }
		                if(expr.consarray) {
		                    Object.defineProperty(result, 'cons', {
		                        enumerable: false,
		                        configurable: false,
		                        value: true
		                    });
		                }
		                break;
		            case '{':
		                // object constructor - apply grouping
		                result = await evaluateGroupExpression(expr, input, environment);
		                break;

		        }
		        return result;
		    }

		    /**
		     * Evaluate name object against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    function evaluateName(expr, input, environment) {
		        // lookup the 'name' item in the input
		        return fn.lookup(input, expr.value);
		    }

		    /**
		     * Evaluate literal against input data
		     * @param {Object} expr - JSONata expression
		     * @returns {*} Evaluated input data
		     */
		    function evaluateLiteral(expr) {
		        return expr.value;
		    }

		    /**
		     * Evaluate wildcard against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @returns {*} Evaluated input data
		     */
		    function evaluateWildcard(expr, input) {
		        var results = createSequence();
		        if (Array.isArray(input) && input.outerWrapper && input.length > 0) {
		            input = input[0];
		        }
		        if (input !== null && typeof input === 'object') {
		            Object.keys(input).forEach(function (key) {
		                var value = input[key];
		                if(Array.isArray(value)) {
		                    value = flatten(value);
		                    results = fn.append(results, value);
		                } else {
		                    results.push(value);
		                }
		            });
		        }

		        //        result = normalizeSequence(results);
		        return results;
		    }

		    /**
		     * Returns a flattened array
		     * @param {Array} arg - the array to be flatten
		     * @param {Array} flattened - carries the flattened array - if not defined, will initialize to []
		     * @returns {Array} - the flattened array
		     */
		    function flatten(arg, flattened) {
		        if(typeof flattened === 'undefined') {
		            flattened = [];
		        }
		        if(Array.isArray(arg)) {
		            arg.forEach(function (item) {
		                flatten(item, flattened);
		            });
		        } else {
		            flattened.push(arg);
		        }
		        return flattened;
		    }

		    /**
		     * Evaluate descendants against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @returns {*} Evaluated input data
		     */
		    function evaluateDescendants(expr, input) {
		        var result;
		        var resultSequence = createSequence();
		        if (typeof input !== 'undefined') {
		            // traverse all descendants of this object/array
		            recurseDescendants(input, resultSequence);
		            if (resultSequence.length === 1) {
		                result = resultSequence[0];
		            } else {
		                result = resultSequence;
		            }
		        }
		        return result;
		    }

		    /**
		     * Recurse through descendants
		     * @param {Object} input - Input data
		     * @param {Object} results - Results
		     */
		    function recurseDescendants(input, results) {
		        // this is the equivalent of //* in XPath
		        if (!Array.isArray(input)) {
		            results.push(input);
		        }
		        if (Array.isArray(input)) {
		            input.forEach(function (member) {
		                recurseDescendants(member, results);
		            });
		        } else if (input !== null && typeof input === 'object') {
		            Object.keys(input).forEach(function (key) {
		                recurseDescendants(input[key], results);
		            });
		        }
		    }

		    /**
		     * Evaluate numeric expression against input data
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @param {Object} op - opcode
		     * @returns {*} Result
		     */
		    function evaluateNumericExpression(lhs, rhs, op) {
		        var result;

		        if (typeof lhs !== 'undefined' && !isNumeric(lhs)) {
		            throw {
		                code: "T2001",
		                stack: (new Error()).stack,
		                value: lhs
		            };
		        }
		        if (typeof rhs !== 'undefined' && !isNumeric(rhs)) {
		            throw {
		                code: "T2002",
		                stack: (new Error()).stack,
		                value: rhs
		            };
		        }

		        if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
		            // if either side is undefined, the result is undefined
		            return result;
		        }

		        switch (op) {
		            case '+':
		                result = lhs + rhs;
		                break;
		            case '-':
		                result = lhs - rhs;
		                break;
		            case '*':
		                result = lhs * rhs;
		                break;
		            case '/':
		                result = lhs / rhs;
		                break;
		            case '%':
		                result = lhs % rhs;
		                break;
		        }
		        return result;
		    }

		    /**
		     * Evaluate equality expression against input data
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @param {Object} op - opcode
		     * @returns {*} Result
		     */
		    function evaluateEqualityExpression(lhs, rhs, op) {
		        var result;

		        // type checks
		        var ltype = typeof lhs;
		        var rtype = typeof rhs;

		        if (ltype === 'undefined' || rtype === 'undefined') {
		            // if either side is undefined, the result is false
		            return false;
		        }

		        switch (op) {
		            case '=':
		                result = isDeepEqual(lhs, rhs);
		                break;
		            case '!=':
		                result = !isDeepEqual(lhs, rhs);
		                break;
		        }
		        return result;
		    }

		    /**
		     * Evaluate comparison expression against input data
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @param {Object} op - opcode
		     * @returns {*} Result
		     */
		    function evaluateComparisonExpression(lhs, rhs, op) {
		        var result;

		        // type checks
		        var ltype = typeof lhs;
		        var rtype = typeof rhs;

		        var lcomparable = (ltype === 'undefined' || ltype === 'string' || ltype === 'number');
		        var rcomparable = (rtype === 'undefined' || rtype === 'string' || rtype === 'number');

		        // if either aa or bb are not comparable (string or numeric) values, then throw an error
		        if (!lcomparable || !rcomparable) {
		            throw {
		                code: "T2010",
		                stack: (new Error()).stack,
		                value: !(ltype === 'string' || ltype === 'number') ? lhs : rhs
		            };
		        }

		        // if either side is undefined, the result is undefined
		        if (ltype === 'undefined' || rtype === 'undefined') {
		            return undefined;
		        }

		        //if aa and bb are not of the same type
		        if (ltype !== rtype) {
		            throw {
		                code: "T2009",
		                stack: (new Error()).stack,
		                value: lhs,
		                value2: rhs
		            };
		        }

		        switch (op) {
		            case '<':
		                result = lhs < rhs;
		                break;
		            case '<=':
		                result = lhs <= rhs;
		                break;
		            case '>':
		                result = lhs > rhs;
		                break;
		            case '>=':
		                result = lhs >= rhs;
		                break;
		        }
		        return result;
		    }

		    /**
		     * Inclusion operator - in
		     *
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @returns {boolean} - true if lhs is a member of rhs
		     */
		    function evaluateIncludesExpression(lhs, rhs) {
		        var result = false;

		        if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
		            // if either side is undefined, the result is false
		            return false;
		        }

		        if(!Array.isArray(rhs)) {
		            rhs = [rhs];
		        }

		        for(var i = 0; i < rhs.length; i++) {
		            if(rhs[i] === lhs) {
		                result = true;
		                break;
		            }
		        }

		        return result;
		    }

		    /**
		     * Evaluate boolean expression against input data
		     * @param {Object} lhs - LHS value
		     * @param {Function} evalrhs - function to evaluate RHS value
		     * @param {Object} op - opcode
		     * @returns {*} Result
		     */
		    async function evaluateBooleanExpression(lhs, evalrhs, op) {
		        var result;

		        var lBool = boolize(lhs);

		        switch (op) {
		            case 'and':
		                result = lBool && boolize(await evalrhs());
		                break;
		            case 'or':
		                result = lBool || boolize(await evalrhs());
		                break;
		        }
		        return result;
		    }

		    function boolize(value) {
		        var booledValue = fn.boolean(value);
		        return typeof booledValue === 'undefined' ? false : booledValue;
		    }

		    /**
		     * Evaluate string concatenation against input data
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @returns {string|*} Concatenated string
		     */
		    function evaluateStringConcat(lhs, rhs) {
		        var result;

		        var lstr = '';
		        var rstr = '';
		        if (typeof lhs !== 'undefined') {
		            lstr = fn.string(lhs);
		        }
		        if (typeof rhs !== 'undefined') {
		            rstr = fn.string(rhs);
		        }

		        result = lstr.concat(rstr);
		        return result;
		    }

		    /**
		     * Evaluate group expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {{}} Evaluated input data
		     */
		    async function evaluateGroupExpression(expr, input, environment) {
		        var result = {};
		        var groups = {};
		        var reduce = input && input.tupleStream ? true : false;
		        // group the input sequence by 'key' expression
		        if (!Array.isArray(input)) {
		            input = createSequence(input);
		        }
		        // if the array is empty, add an undefined entry to enable literal JSON object to be generated
		        if (input.length === 0) {
		            input.push(undefined);
		        }

		        for(var itemIndex = 0; itemIndex < input.length; itemIndex++) {
		            var item = input[itemIndex];
		            var env = reduce ? createFrameFromTuple(environment, item) : environment;
		            for(var pairIndex = 0; pairIndex < expr.lhs.length; pairIndex++) {
		                var pair = expr.lhs[pairIndex];
		                var key = await evaluate(pair[0], reduce ? item['@'] : item, env);
		                // key has to be a string
		                if (typeof  key !== 'string' && key !== undefined) {
		                    throw {
		                        code: "T1003",
		                        stack: (new Error()).stack,
		                        position: expr.position,
		                        value: key
		                    };
		                }

		                if (key !== undefined) {
		                    var entry = {data: item, exprIndex: pairIndex};
		                    if (groups.hasOwnProperty(key)) {
		                        // a value already exists in this slot
		                        if(groups[key].exprIndex !== pairIndex) {
		                            // this key has been generated by another expression in this group
		                            // when multiple key expressions evaluate to the same key, then error D1009 must be thrown
		                            throw {
		                                code: "D1009",
		                                stack: (new Error()).stack,
		                                position: expr.position,
		                                value: key
		                            };
		                        }

		                        // append it as an array
		                        groups[key].data = fn.append(groups[key].data, item);
		                    } else {
		                        groups[key] = entry;
		                    }
		                }
		            }
		        }

		        // iterate over the groups to evaluate the 'value' expression
		        let generators = await Promise.all(Object.keys(groups).map(async (key, idx) => {
		            let entry = groups[key];
		            var context = entry.data;
		            var env = environment;
		            if (reduce) {
		                var tuple = reduceTupleStream(entry.data);
		                context = tuple['@'];
		                delete tuple['@'];
		                env = createFrameFromTuple(environment, tuple);
		            }
		            environment.isParallelCall = idx > 0;
		            return [key, await evaluate(expr.lhs[entry.exprIndex][1], context, env)];
		        }));

		        for (let generator of generators) {
		            var [key, value] = await generator;
		            if(typeof value !== 'undefined') {
		                result[key] = value;
		            }
		        }

		        return result;
		    }

		    function reduceTupleStream(tupleStream) {
		        if(!Array.isArray(tupleStream)) {
		            return tupleStream;
		        }
		        var result = {};
		        Object.assign(result, tupleStream[0]);
		        for(var ii = 1; ii < tupleStream.length; ii++) {
		            for(const prop in tupleStream[ii]) {
		                result[prop] = fn.append(result[prop], tupleStream[ii][prop]);
		            }
		        }
		        return result;
		    }

		    /**
		     * Evaluate range expression against input data
		     * @param {Object} lhs - LHS value
		     * @param {Object} rhs - RHS value
		     * @returns {Array} Resultant array
		     */
		    function evaluateRangeExpression(lhs, rhs) {
		        var result;

		        if (typeof lhs !== 'undefined' && !Number.isInteger(lhs)) {
		            throw {
		                code: "T2003",
		                stack: (new Error()).stack,
		                value: lhs
		            };
		        }
		        if (typeof rhs !== 'undefined' && !Number.isInteger(rhs)) {
		            throw {
		                code: "T2004",
		                stack: (new Error()).stack,
		                value: rhs
		            };
		        }

		        if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
		            // if either side is undefined, the result is undefined
		            return result;
		        }

		        if (lhs > rhs) {
		            // if the lhs is greater than the rhs, return undefined
		            return result;
		        }

		        // limit the size of the array to ten million entries (1e7)
		        // this is an implementation defined limit to protect against
		        // memory and performance issues.  This value may increase in the future.
		        var size = rhs - lhs + 1;
		        if(size > 1e7) {
		            throw {
		                code: "D2014",
		                stack: (new Error()).stack,
		                value: size
		            };
		        }

		        result = new Array(size);
		        for (var item = lhs, index = 0; item <= rhs; item++, index++) {
		            result[index] = item;
		        }
		        result.sequence = true;
		        return result;
		    }

		    /**
		     * Evaluate bind expression against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateBindExpression(expr, input, environment) {
		        // The RHS is the expression to evaluate
		        // The LHS is the name of the variable to bind to - should be a VARIABLE token (enforced by parser)
		        var value = await evaluate(expr.rhs, input, environment);
		        environment.bind(expr.lhs.value, value);
		        return value;
		    }

		    /**
		     * Evaluate condition against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateCondition(expr, input, environment) {
		        var result;
		        var condition = await evaluate(expr.condition, input, environment);
		        if (fn.boolean(condition)) {
		            result = await evaluate(expr.then, input, environment);
		        } else if (typeof expr.else !== 'undefined') {
		            result = await evaluate(expr.else, input, environment);
		        }
		        return result;
		    }

		    /**
		     * Evaluate block against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateBlock(expr, input, environment) {
		        var result;
		        // create a new frame to limit the scope of variable assignments
		        // TODO, only do this if the post-parse stage has flagged this as required
		        var frame = createFrame(environment);
		        // invoke each expression in turn
		        // only return the result of the last one
		        for(var ii = 0; ii < expr.expressions.length; ii++) {
		            result = await evaluate(expr.expressions[ii], input, frame);
		        }

		        return result;
		    }

		    /**
		     * Prepare a regex
		     * @param {Object} expr - expression containing regex
		     * @returns {Function} Higher order function representing prepared regex
		     */
		    function evaluateRegex(expr) {
		        var re = new jsonata.RegexEngine(expr.value);
		        var closure = function(str, fromIndex) {
		            var result;
		            re.lastIndex = fromIndex || 0;
		            var match = re.exec(str);
		            if(match !== null) {
		                result = {
		                    match: match[0],
		                    start: match.index,
		                    end: match.index + match[0].length,
		                    groups: []
		                };
		                if(match.length > 1) {
		                    for(var i = 1; i < match.length; i++) {
		                        result.groups.push(match[i]);
		                    }
		                }
		                result.next = function() {
		                    if(re.lastIndex >= str.length) {
		                        return undefined;
		                    } else {
		                        var next = closure(str, re.lastIndex);
		                        if(next && next.match === '') {
		                            // matches zero length string; this will never progress
		                            throw {
		                                code: "D1004",
		                                stack: (new Error()).stack,
		                                position: expr.position,
		                                value: expr.value.source
		                            };
		                        }
		                        return next;
		                    }
		                };
		            }

		            return result;
		        };
		        return closure;
		    }

		    /**
		     * Evaluate variable against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    function evaluateVariable(expr, input, environment) {
		        // lookup the variable value in the environment
		        var result;
		        // if the variable name is empty string, then it refers to context value
		        if (expr.value === '') {
		            result = input && input.outerWrapper ? input[0] : input;
		        } else {
		            result = environment.lookup(expr.value);
		        }
		        return result;
		    }

		    /**
		     * sort / order-by operator
		     * @param {Object} expr - AST for operator
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Ordered sequence
		     */
		    async function evaluateSortExpression(expr, input, environment) {
		        var result;

		        // evaluate the lhs, then sort the results in order according to rhs expression
		        var lhs = input;
		        var isTupleSort = input.tupleStream ? true : false;

		        // sort the lhs array
		        // use comparator function
		        var comparator = async function(a, b) { 
		            // expr.terms is an array of order-by in priority order
		            var comp = 0;
		            for(var index = 0; comp === 0 && index < expr.terms.length; index++) {
		                var term = expr.terms[index];
		                //evaluate the sort term in the context of a
		                var context = a;
		                var env = environment;
		                if(isTupleSort) {
		                    context = a['@'];
		                    env = createFrameFromTuple(environment, a);
		                }
		                var aa = await evaluate(term.expression, context, env);
		                //evaluate the sort term in the context of b
		                context = b;
		                env = environment;
		                if(isTupleSort) {
		                    context = b['@'];
		                    env = createFrameFromTuple(environment, b);
		                }
		                var bb = await evaluate(term.expression, context, env);

		                // type checks
		                var atype = typeof aa;
		                var btype = typeof bb;
		                // undefined should be last in sort order
		                if(atype === 'undefined') {
		                    // swap them, unless btype is also undefined
		                    comp = (btype === 'undefined') ? 0 : 1;
		                    continue;
		                }
		                if(btype === 'undefined') {
		                    comp = -1;
		                    continue;
		                }

		                // if aa or bb are not string or numeric values, then throw an error
		                if(!(atype === 'string' || atype === 'number') || !(btype === 'string' || btype === 'number')) {
		                    throw {
		                        code: "T2008",
		                        stack: (new Error()).stack,
		                        position: expr.position,
		                        value: !(atype === 'string' || atype === 'number') ? aa : bb
		                    };
		                }

		                //if aa and bb are not of the same type
		                if(atype !== btype) {
		                    throw {
		                        code: "T2007",
		                        stack: (new Error()).stack,
		                        position: expr.position,
		                        value: aa,
		                        value2: bb
		                    };
		                }
		                if(aa === bb) {
		                    // both the same - move on to next term
		                    continue;
		                } else if (aa < bb) {
		                    comp = -1;
		                } else {
		                    comp = 1;
		                }
		                if(term.descending === true) {
		                    comp = -comp;
		                }
		            }
		            // only swap a & b if comp equals 1
		            return comp === 1;
		        };

		        var focus = {
		            environment: environment,
		            input: input
		        };
		        // the `focus` is passed in as the `this` for the invoked function
		        result = await fn.sort.apply(focus, [lhs, comparator]);

		        return result;
		    }

		    /**
		     * create a transformer function
		     * @param {Object} expr - AST for operator
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} tranformer function
		     */
		    function evaluateTransformExpression(expr, input, environment) {
		        // create a function to implement the transform definition
		        var transformer = async function (obj) { // signature <(oa):o>
		            // undefined inputs always return undefined
		            if(typeof obj === 'undefined') {
		                return undefined;
		            }

		            // this function returns a copy of obj with changes specified by the pattern/operation
		            var cloneFunction = environment.lookup('clone');
		            if(!isFunction(cloneFunction)) {
		                // throw type error
		                throw {
		                    code: "T2013",
		                    stack: (new Error()).stack,
		                    position: expr.position
		                };
		            }
		            var result = await apply(cloneFunction, [obj], null, environment);
		            var matches = await evaluate(expr.pattern, result, environment);
		            if(typeof matches !== 'undefined') {
		                if(!Array.isArray(matches)) {
		                    matches = [matches];
		                }
		                for(var ii = 0; ii < matches.length; ii++) {
		                    var match = matches[ii];
		                    if (match && (match.isPrototypeOf(result) || match instanceof Object.constructor)) {
		                        throw {
		                            code: "D1010",
		                            stack: (new Error()).stack,
		                            position: expr.position
		                        };
		                    }
		                    // evaluate the update value for each match
		                    var update = await evaluate(expr.update, match, environment);
		                    // update must be an object
		                    var updateType = typeof update;
		                    if(updateType !== 'undefined') {
		                        if(updateType !== 'object' || update === null || Array.isArray(update)) {
		                            // throw type error
		                            throw {
		                                code: "T2011",
		                                stack: (new Error()).stack,
		                                position: expr.update.position,
		                                value: update
		                            };
		                        }
		                        // merge the update
		                        for(var prop in update) {
		                            match[prop] = update[prop];
		                        }
		                    }

		                    // delete, if specified, must be an array of strings (or single string)
		                    if(typeof expr.delete !== 'undefined') {
		                        var deletions = await evaluate(expr.delete, match, environment);
		                        if(typeof deletions !== 'undefined') {
		                            var val = deletions;
		                            if (!Array.isArray(deletions)) {
		                                deletions = [deletions];
		                            }
		                            if (!isArrayOfStrings(deletions)) {
		                                // throw type error
		                                throw {
		                                    code: "T2012",
		                                    stack: (new Error()).stack,
		                                    position: expr.delete.position,
		                                    value: val
		                                };
		                            }
		                            for (var jj = 0; jj < deletions.length; jj++) {
		                                if(typeof match === 'object' && match !== null) {
		                                    delete match[deletions[jj]];
		                                }
		                            }
		                        }
		                    }
		                }
		            }

		            return result;
		        };

		        return defineFunction(transformer, '<(oa):o>');
		    }

		    var chainAST = parser('function($f, $g) { function($x){ $g($f($x)) } }');

		    /**
		     * Apply the function on the RHS using the sequence on the LHS as the first argument
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateApplyExpression(expr, input, environment) {
		        var result;


		        var lhs = await evaluate(expr.lhs, input, environment);
		        if(expr.rhs.type === 'function') {
		            // this is a function _invocation_; invoke it with lhs expression as the first argument
		            result = await evaluateFunction(expr.rhs, input, environment, { context: lhs });
		        } else {
		            var func = await evaluate(expr.rhs, input, environment);

		            if(!isFunction(func)) {
		                throw {
		                    code: "T2006",
		                    stack: (new Error()).stack,
		                    position: expr.position,
		                    value: func
		                };
		            }

		            if(isFunction(lhs)) {
		                // this is function chaining (func1 ~> func2)
		                // λ($f, $g) { λ($x){ $g($f($x)) } }
		                var chain = await evaluate(chainAST, null, environment);
		                result = await apply(chain, [lhs, func], null, environment);
		            } else {
		                result = await apply(func, [lhs], null, environment);
		            }

		        }

		        return result;
		    }

		    /**
		     * Evaluate function against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluateFunction(expr, input, environment, applyto) {
		        var result;

		        // create the procedure
		        // can't assume that expr.procedure is a lambda type directly
		        // could be an expression that evaluates to a function (e.g. variable reference, parens expr etc.
		        // evaluate it generically first, then check that it is a function.  Throw error if not.
		        var proc = await evaluate(expr.procedure, input, environment);

		        if (typeof proc === 'undefined' && expr.procedure.type === 'path' && environment.lookup(expr.procedure.steps[0].value)) {
		            // help the user out here if they simply forgot the leading $
		            throw {
		                code: "T1005",
		                stack: (new Error()).stack,
		                position: expr.position,
		                token: expr.procedure.steps[0].value
		            };
		        }

		        var evaluatedArgs = [];
		        if(typeof applyto !== 'undefined') {
		            evaluatedArgs.push(applyto.context);
		        }
		        // eager evaluation - evaluate the arguments
		        for (var jj = 0; jj < expr.arguments.length; jj++) {
		            const arg = await evaluate(expr.arguments[jj], input, environment);
		            if(isFunction(arg)) {
		                // wrap this in a closure
		                const closure = async function (...params) {
		                    // invoke func
		                    return await apply(arg, params, null, environment);
		                };
		                closure.arity = getFunctionArity(arg);
		                evaluatedArgs.push(closure);
		            } else {
		                evaluatedArgs.push(arg);
		            }
		        }
		        // apply the procedure
		        var procName = expr.procedure.type === 'path' ? expr.procedure.steps[0].value : expr.procedure.value;
		        try {
		            if(typeof proc === 'object') {
		                proc.token = procName;
		                proc.position = expr.position;
		            }
		            result = await apply(proc, evaluatedArgs, input, environment);
		        } catch (err) {
		            if(!err.position) {
		                // add the position field to the error
		                err.position = expr.position;
		            }
		            if (!err.token) {
		                // and the function identifier
		                err.token = procName;
		            }
		            throw err;
		        }
		        return result;
		    }

		    /**
		     * Apply procedure or function
		     * @param {Object} proc - Procedure
		     * @param {Array} args - Arguments
		     * @param {Object} input - input
		     * @param {Object} environment - environment
		     * @returns {*} Result of procedure
		     */
		    async function apply(proc, args, input, environment) {
		        var result;
		        result = await applyInner(proc, args, input, environment);
		        while(isLambda(result) && result.thunk === true) {
		            // trampoline loop - this gets invoked as a result of tail-call optimization
		            // the function returned a tail-call thunk
		            // unpack it, evaluate its arguments, and apply the tail call
		            var next = await evaluate(result.body.procedure, result.input, result.environment);
		            if(result.body.procedure.type === 'variable') {
		                next.token = result.body.procedure.value;
		            }
		            next.position = result.body.procedure.position;
		            var evaluatedArgs = [];
		            for(var ii = 0; ii < result.body.arguments.length; ii++) {
		                evaluatedArgs.push(await evaluate(result.body.arguments[ii], result.input, result.environment));
		            }

		            result = await applyInner(next, evaluatedArgs, input, environment);
		        }
		        return result;
		    }

		    /**
		     * Apply procedure or function
		     * @param {Object} proc - Procedure
		     * @param {Array} args - Arguments
		     * @param {Object} input - input
		     * @param {Object} environment - environment
		     * @returns {*} Result of procedure
		     */
		    async function applyInner(proc, args, input, environment) {
		        var result;
		        try {
		            var validatedArgs = args;
		            if (proc) {
		                validatedArgs = validateArguments(proc.signature, args, input);
		            }

		            if (isLambda(proc)) {
		                result = await applyProcedure(proc, validatedArgs);
		            } else if (proc && proc._jsonata_function === true) {
		                var focus = {
		                    environment: environment,
		                    input: input
		                };
		                // the `focus` is passed in as the `this` for the invoked function
		                result = proc.implementation.apply(focus, validatedArgs);
		                // `proc.implementation` might be a generator function
		                // and `result` might be a generator - if so, yield
		                if (isIterable(result)) {
		                    result = result.next().value;
		                }
		                if (isPromise(result)) {
		                    result = await result;
		                }
		            } else if (typeof proc === 'function') {
		                // typically these are functions that are returned by the invocation of plugin functions
		                // the `input` is being passed in as the `this` for the invoked function
		                // this is so that functions that return objects containing functions can chain
		                // e.g. await (await $func())
		                result = proc.apply(input, validatedArgs);
		                if (isPromise(result)) {
		                    result = await result;
		                }
		            } else {
		                throw {
		                    code: "T1006",
		                    stack: (new Error()).stack
		                };
		            }
		        } catch(err) {
		            if(proc) {
		                if (typeof err.token == 'undefined' && typeof proc.token !== 'undefined') {
		                    err.token = proc.token;
		                }
		                err.position = proc.position || err.position;
		            }
		            throw err;
		        }
		        return result;
		    }

		    /**
		     * Evaluate lambda against input data
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {{lambda: boolean, input: *, environment: *, arguments: *, body: *}} Evaluated input data
		     */
		    function evaluateLambda(expr, input, environment) {
		        // make a function (closure)
		        var procedure = {
		            _jsonata_lambda: true,
		            input: input,
		            environment: environment,
		            arguments: expr.arguments,
		            signature: expr.signature,
		            body: expr.body
		        };
		        if(expr.thunk === true) {
		            procedure.thunk = true;
		        }
		        procedure.apply = async function(self, args) {
		            return await apply(procedure, args, input, !!self ? self.environment : environment);
		        };
		        return procedure;
		    }

		    /**
		     * Evaluate partial application
		     * @param {Object} expr - JSONata expression
		     * @param {Object} input - Input data to evaluate against
		     * @param {Object} environment - Environment
		     * @returns {*} Evaluated input data
		     */
		    async function evaluatePartialApplication(expr, input, environment) {
		        // partially apply a function
		        var result;
		        // evaluate the arguments
		        var evaluatedArgs = [];
		        for(var ii = 0; ii < expr.arguments.length; ii++) {
		            var arg = expr.arguments[ii];
		            if (arg.type === 'operator' && arg.value === '?') {
		                evaluatedArgs.push(arg);
		            } else {
		                evaluatedArgs.push(await evaluate(arg, input, environment));
		            }
		        }
		        // lookup the procedure
		        var proc = await evaluate(expr.procedure, input, environment);
		        if (typeof proc === 'undefined' && expr.procedure.type === 'path' && environment.lookup(expr.procedure.steps[0].value)) {
		            // help the user out here if they simply forgot the leading $
		            throw {
		                code: "T1007",
		                stack: (new Error()).stack,
		                position: expr.position,
		                token: expr.procedure.steps[0].value
		            };
		        }
		        if (isLambda(proc)) {
		            result = partialApplyProcedure(proc, evaluatedArgs);
		        } else if (proc && proc._jsonata_function === true) {
		            result = partialApplyNativeFunction(proc.implementation, evaluatedArgs);
		        } else if (typeof proc === 'function') {
		            result = partialApplyNativeFunction(proc, evaluatedArgs);
		        } else {
		            throw {
		                code: "T1008",
		                stack: (new Error()).stack,
		                position: expr.position,
		                token: expr.procedure.type === 'path' ? expr.procedure.steps[0].value : expr.procedure.value
		            };
		        }
		        return result;
		    }

		    /**
		     * Validate the arguments against the signature validator (if it exists)
		     * @param {Function} signature - validator function
		     * @param {Array} args - function arguments
		     * @param {*} context - context value
		     * @returns {Array} - validated arguments
		     */
		    function validateArguments(signature, args, context) {
		        if(typeof signature === 'undefined') {
		            // nothing to validate
		            return args;
		        }
		        var validatedArgs = signature.validate(args, context);
		        return validatedArgs;
		    }

		    /**
		     * Apply procedure
		     * @param {Object} proc - Procedure
		     * @param {Array} args - Arguments
		     * @returns {*} Result of procedure
		     */
		    async function applyProcedure(proc, args) {
		        var result;
		        var env = createFrame(proc.environment);
		        proc.arguments.forEach(function (param, index) {
		            env.bind(param.value, args[index]);
		        });
		        if (typeof proc.body === 'function') {
		            // this is a lambda that wraps a native function - generated by partially evaluating a native
		            result = await applyNativeFunction(proc.body, env);
		        } else {
		            result = await evaluate(proc.body, proc.input, env);
		        }
		        return result;
		    }

		    /**
		     * Partially apply procedure
		     * @param {Object} proc - Procedure
		     * @param {Array} args - Arguments
		     * @returns {{lambda: boolean, input: *, environment: {bind, lookup}, arguments: Array, body: *}} Result of partially applied procedure
		     */
		    function partialApplyProcedure(proc, args) {
		        // create a closure, bind the supplied parameters and return a function that takes the remaining (?) parameters
		        var env = createFrame(proc.environment);
		        var unboundArgs = [];
		        proc.arguments.forEach(function (param, index) {
		            var arg = args[index];
		            if (arg && arg.type === 'operator' && arg.value === '?') {
		                unboundArgs.push(param);
		            } else {
		                env.bind(param.value, arg);
		            }
		        });
		        var procedure = {
		            _jsonata_lambda: true,
		            input: proc.input,
		            environment: env,
		            arguments: unboundArgs,
		            body: proc.body
		        };
		        return procedure;
		    }

		    /**
		     * Partially apply native function
		     * @param {Function} native - Native function
		     * @param {Array} args - Arguments
		     * @returns {{lambda: boolean, input: *, environment: {bind, lookup}, arguments: Array, body: *}} Result of partially applying native function
		     */
		    function partialApplyNativeFunction(native, args) {
		        // create a lambda function that wraps and invokes the native function
		        // get the list of declared arguments from the native function
		        // this has to be picked out from the toString() value
		        var sigArgs = getNativeFunctionArguments(native);
		        sigArgs = sigArgs.map(function (sigArg) {
		            return '$' + sigArg.trim();
		        });
		        var body = 'function(' + sigArgs.join(', ') + '){ _ }';

		        var bodyAST = parser(body);
		        bodyAST.body = native;

		        var partial = partialApplyProcedure(bodyAST, args);
		        return partial;
		    }

		    /**
		     * Apply native function
		     * @param {Object} proc - Procedure
		     * @param {Object} env - Environment
		     * @returns {*} Result of applying native function
		     */
		    async function applyNativeFunction(proc, env) {
		        var sigArgs = getNativeFunctionArguments(proc);
		        // generate the array of arguments for invoking the function - look them up in the environment
		        var args = sigArgs.map(function (sigArg) {
		            return env.lookup(sigArg.trim());
		        });

		        var focus = {
		            environment: env
		        };
		        var result = proc.apply(focus, args);
		        if (isPromise(result)) {
		            result = await result;
		        }
		        return result;
		    }

		    /**
		     * Get native function arguments
		     * @param {Function} func - Function
		     * @returns {*|Array} Native function arguments
		     */
		    function getNativeFunctionArguments(func) {
		        var signature = func.toString();
		        var sigParens = /\(([^)]*)\)/.exec(signature)[1]; // the contents of the parens
		        var sigArgs = sigParens.split(',');
		        return sigArgs;
		    }

		    /**
		     * Creates a function definition
		     * @param {Function} func - function implementation in Javascript
		     * @param {string} signature - JSONata function signature definition
		     * @returns {{implementation: *, signature: *}} function definition
		     */
		    function defineFunction(func, signature) {
		        var definition = {
		            _jsonata_function: true,
		            implementation: func
		        };
		        if(typeof signature !== 'undefined') {
		            definition.signature = parseSignature(signature);
		        }
		        return definition;
		    }


		    /**
		     * parses and evaluates the supplied expression
		     * @param {string} expr - expression to evaluate
		     * @returns {*} - result of evaluating the expression
		     */
		    async function functionEval(expr, focus) {
		        // undefined inputs always return undefined
		        if(typeof expr === 'undefined') {
		            return undefined;
		        }
		        var input = this.input;
		        if(typeof focus !== 'undefined') {
		            input = focus;
		            // if the input is a JSON array, then wrap it in a singleton sequence so it gets treated as a single input
		            if(Array.isArray(input) && !isSequence(input)) {
		                input = createSequence(input);
		                input.outerWrapper = true;
		            }
		        }

		        try {
		            var ast = parser(expr, false);
		        } catch(err) {
		            // error parsing the expression passed to $eval
		            populateMessage(err);
		            throw {
		                stack: (new Error()).stack,
		                code: "D3120",
		                value: err.message,
		                error: err
		            };
		        }
		        try {
		            var result = await evaluate(ast, input, this.environment);
		        } catch(err) {
		            // error evaluating the expression passed to $eval
		            populateMessage(err);
		            throw {
		                stack: (new Error()).stack,
		                code: "D3121",
		                value:err.message,
		                error: err
		            };
		        }

		        return result;
		    }

		    /**
		     * Clones an object
		     * @param {Object} arg - object to clone (deep copy)
		     * @returns {*} - the cloned object
		     */
		    function functionClone(arg) {
		        // undefined inputs always return undefined
		        if(typeof arg === 'undefined') {
		            return undefined;
		        }

		        return JSON.parse(fn.string(arg));
		    }

		    /**
		     * Create frame
		     * @param {Object} enclosingEnvironment - Enclosing environment
		     * @returns {{bind: bind, lookup: lookup}} Created frame
		     */
		    function createFrame(enclosingEnvironment) {
		        var bindings = {};
		        const newFrame = {
		            bind: function (name, value) {
		                bindings[name] = value;
		            },
		            lookup: function (name) {
		                var value;
		                if(bindings.hasOwnProperty(name)) {
		                    value = bindings[name];
		                } else if (enclosingEnvironment) {
		                    value = enclosingEnvironment.lookup(name);
		                }
		                return value;
		            },
		            timestamp: enclosingEnvironment ? enclosingEnvironment.timestamp : null,
		            async: enclosingEnvironment ? enclosingEnvironment.async : false,
		            isParallelCall: enclosingEnvironment ? enclosingEnvironment.isParallelCall : false,
		            global: enclosingEnvironment ? enclosingEnvironment.global : {
		                ancestry: [ null ]
		            }
		        };

		        if (enclosingEnvironment) {
		            var framePushCallback = enclosingEnvironment.lookup(Symbol.for('jsonata.__createFrame_push'));
		            if(framePushCallback) {
		                framePushCallback(enclosingEnvironment, newFrame);
		            }
		        }
		       

		        return newFrame
		    }

		    // Function registration
		    staticFrame.bind('sum', defineFunction(fn.sum, '<a<n>:n>'));
		    staticFrame.bind('count', defineFunction(fn.count, '<a:n>'));
		    staticFrame.bind('max', defineFunction(fn.max, '<a<n>:n>'));
		    staticFrame.bind('min', defineFunction(fn.min, '<a<n>:n>'));
		    staticFrame.bind('average', defineFunction(fn.average, '<a<n>:n>'));
		    staticFrame.bind('string', defineFunction(fn.string, '<x-b?:s>'));
		    staticFrame.bind('substring', defineFunction(fn.substring, '<s-nn?:s>'));
		    staticFrame.bind('substringBefore', defineFunction(fn.substringBefore, '<s-s:s>'));
		    staticFrame.bind('substringAfter', defineFunction(fn.substringAfter, '<s-s:s>'));
		    staticFrame.bind('lowercase', defineFunction(fn.lowercase, '<s-:s>'));
		    staticFrame.bind('uppercase', defineFunction(fn.uppercase, '<s-:s>'));
		    staticFrame.bind('length', defineFunction(fn.length, '<s-:n>'));
		    staticFrame.bind('trim', defineFunction(fn.trim, '<s-:s>'));
		    staticFrame.bind('pad', defineFunction(fn.pad, '<s-ns?:s>'));
		    staticFrame.bind('match', defineFunction(fn.match, '<s-f<s:o>n?:a<o>>'));
		    staticFrame.bind('contains', defineFunction(fn.contains, '<s-(sf):b>')); // TODO <s-(sf<s:o>):b>
		    staticFrame.bind('replace', defineFunction(fn.replace, '<s-(sf)(sf)n?:s>')); // TODO <s-(sf<s:o>)(sf<o:s>)n?:s>
		    staticFrame.bind('split', defineFunction(fn.split, '<s-(sf)n?:a<s>>')); // TODO <s-(sf<s:o>)n?:a<s>>
		    staticFrame.bind('join', defineFunction(fn.join, '<a<s>s?:s>'));
		    staticFrame.bind('formatNumber', defineFunction(fn.formatNumber, '<n-so?:s>'));
		    staticFrame.bind('formatBase', defineFunction(fn.formatBase, '<n-n?:s>'));
		    staticFrame.bind('formatInteger', defineFunction(datetime.formatInteger, '<n-s:s>'));
		    staticFrame.bind('parseInteger', defineFunction(datetime.parseInteger, '<s-s:n>'));
		    staticFrame.bind('number', defineFunction(fn.number, '<(nsb)-:n>'));
		    staticFrame.bind('floor', defineFunction(fn.floor, '<n-:n>'));
		    staticFrame.bind('ceil', defineFunction(fn.ceil, '<n-:n>'));
		    staticFrame.bind('round', defineFunction(fn.round, '<n-n?:n>'));
		    staticFrame.bind('abs', defineFunction(fn.abs, '<n-:n>'));
		    staticFrame.bind('sqrt', defineFunction(fn.sqrt, '<n-:n>'));
		    staticFrame.bind('power', defineFunction(fn.power, '<n-n:n>'));
		    staticFrame.bind('random', defineFunction(fn.random, '<:n>'));
		    staticFrame.bind('boolean', defineFunction(fn.boolean, '<x-:b>'));
		    staticFrame.bind('not', defineFunction(fn.not, '<x-:b>'));
		    staticFrame.bind('map', defineFunction(fn.map, '<af>'));
		    staticFrame.bind('zip', defineFunction(fn.zip, '<a+>'));
		    staticFrame.bind('filter', defineFunction(fn.filter, '<af>'));
		    staticFrame.bind('single', defineFunction(fn.single, '<af?>'));
		    staticFrame.bind('reduce', defineFunction(fn.foldLeft, '<afj?:j>')); // TODO <f<jj:j>a<j>j?:j>
		    staticFrame.bind('sift', defineFunction(fn.sift, '<o-f?:o>'));
		    staticFrame.bind('keys', defineFunction(fn.keys, '<x-:a<s>>'));
		    staticFrame.bind('lookup', defineFunction(fn.lookup, '<x-s:x>'));
		    staticFrame.bind('append', defineFunction(fn.append, '<xx:a>'));
		    staticFrame.bind('exists', defineFunction(fn.exists, '<x:b>'));
		    staticFrame.bind('spread', defineFunction(fn.spread, '<x-:a<o>>'));
		    staticFrame.bind('merge', defineFunction(fn.merge, '<a<o>:o>'));
		    staticFrame.bind('reverse', defineFunction(fn.reverse, '<a:a>'));
		    staticFrame.bind('each', defineFunction(fn.each, '<o-f:a>'));
		    staticFrame.bind('error', defineFunction(fn.error, '<s?:x>'));
		    staticFrame.bind('assert', defineFunction(fn.assert, '<bs?:x>'));
		    staticFrame.bind('type', defineFunction(fn.type, '<x:s>'));
		    staticFrame.bind('sort', defineFunction(fn.sort, '<af?:a>'));
		    staticFrame.bind('shuffle', defineFunction(fn.shuffle, '<a:a>'));
		    staticFrame.bind('distinct', defineFunction(fn.distinct, '<x:x>'));
		    staticFrame.bind('base64encode', defineFunction(fn.base64encode, '<s-:s>'));
		    staticFrame.bind('base64decode', defineFunction(fn.base64decode, '<s-:s>'));
		    staticFrame.bind('encodeUrlComponent', defineFunction(fn.encodeUrlComponent, '<s-:s>'));
		    staticFrame.bind('encodeUrl', defineFunction(fn.encodeUrl, '<s-:s>'));
		    staticFrame.bind('decodeUrlComponent', defineFunction(fn.decodeUrlComponent, '<s-:s>'));
		    staticFrame.bind('decodeUrl', defineFunction(fn.decodeUrl, '<s-:s>'));
		    staticFrame.bind('eval', defineFunction(functionEval, '<sx?:x>'));
		    staticFrame.bind('toMillis', defineFunction(datetime.toMillis, '<s-s?:n>'));
		    staticFrame.bind('fromMillis', defineFunction(datetime.fromMillis, '<n-s?s?:s>'));
		    staticFrame.bind('clone', defineFunction(functionClone, '<(oa)-:o>'));

		    /**
		     * Error codes
		     *
		     * Sxxxx    - Static errors (compile time)
		     * Txxxx    - Type errors
		     * Dxxxx    - Dynamic errors (evaluate time)
		     *  01xx    - tokenizer
		     *  02xx    - parser
		     *  03xx    - regex parser
		     *  04xx    - function signature parser/evaluator
		     *  10xx    - evaluator
		     *  20xx    - operators
		     *  3xxx    - functions (blocks of 10 for each function)
		     */
		    var errorCodes = {
		        "S0101": "String literal must be terminated by a matching quote",
		        "S0102": "Number out of range: {{token}}",
		        "S0103": "Unsupported escape sequence: \\{{token}}",
		        "S0104": "The escape sequence \\u must be followed by 4 hex digits",
		        "S0105": "Quoted property name must be terminated with a backquote (`)",
		        "S0106": "Comment has no closing tag",
		        "S0201": "Syntax error: {{token}}",
		        "S0202": "Expected {{value}}, got {{token}}",
		        "S0203": "Expected {{value}} before end of expression",
		        "S0204": "Unknown operator: {{token}}",
		        "S0205": "Unexpected token: {{token}}",
		        "S0206": "Unknown expression type: {{token}}",
		        "S0207": "Unexpected end of expression",
		        "S0208": "Parameter {{value}} of function definition must be a variable name (start with $)",
		        "S0209": "A predicate cannot follow a grouping expression in a step",
		        "S0210": "Each step can only have one grouping expression",
		        "S0211": "The symbol {{token}} cannot be used as a unary operator",
		        "S0212": "The left side of := must be a variable name (start with $)",
		        "S0213": "The literal value {{value}} cannot be used as a step within a path expression",
		        "S0214": "The right side of {{token}} must be a variable name (start with $)",
		        "S0215": "A context variable binding must precede any predicates on a step",
		        "S0216": "A context variable binding must precede the 'order-by' clause on a step",
		        "S0217": "The object representing the 'parent' cannot be derived from this expression",
		        "S0301": "Empty regular expressions are not allowed",
		        "S0302": "No terminating / in regular expression",
		        "S0402": "Choice groups containing parameterized types are not supported",
		        "S0401": "Type parameters can only be applied to functions and arrays",
		        "S0500": "Attempted to evaluate an expression containing syntax error(s)",
		        "T0410": "Argument {{index}} of function {{token}} does not match function signature",
		        "T0411": "Context value is not a compatible type with argument {{index}} of function {{token}}",
		        "T0412": "Argument {{index}} of function {{token}} must be an array of {{type}}",
		        "D1001": "Number out of range: {{value}}",
		        "D1002": "Cannot negate a non-numeric value: {{value}}",
		        "T1003": "Key in object structure must evaluate to a string; got: {{value}}",
		        "D1004": "Regular expression matches zero length string",
		        "T1005": "Attempted to invoke a non-function. Did you mean ${{{token}}}?",
		        "T1006": "Attempted to invoke a non-function",
		        "T1007": "Attempted to partially apply a non-function. Did you mean ${{{token}}}?",
		        "T1008": "Attempted to partially apply a non-function",
		        "D1009": "Multiple key definitions evaluate to same key: {{value}}",
		        "D1010": "Attempted to access the Javascript object prototype", // Javascript specific 
		        "T1010": "The matcher function argument passed to function {{token}} does not return the correct object structure",
		        "T2001": "The left side of the {{token}} operator must evaluate to a number",
		        "T2002": "The right side of the {{token}} operator must evaluate to a number",
		        "T2003": "The left side of the range operator (..) must evaluate to an integer",
		        "T2004": "The right side of the range operator (..) must evaluate to an integer",
		        "D2005": "The left side of := must be a variable name (start with $)",  // defunct - replaced by S0212 parser error
		        "T2006": "The right side of the function application operator ~> must be a function",
		        "T2007": "Type mismatch when comparing values {{value}} and {{value2}} in order-by clause",
		        "T2008": "The expressions within an order-by clause must evaluate to numeric or string values",
		        "T2009": "The values {{value}} and {{value2}} either side of operator {{token}} must be of the same data type",
		        "T2010": "The expressions either side of operator {{token}} must evaluate to numeric or string values",
		        "T2011": "The insert/update clause of the transform expression must evaluate to an object: {{value}}",
		        "T2012": "The delete clause of the transform expression must evaluate to a string or array of strings: {{value}}",
		        "T2013": "The transform expression clones the input object using the $clone() function.  This has been overridden in the current scope by a non-function.",
		        "D2014": "The size of the sequence allocated by the range operator (..) must not exceed 1e6.  Attempted to allocate {{value}}.",
		        "D3001": "Attempting to invoke string function on Infinity or NaN",
		        "D3010": "Second argument of replace function cannot be an empty string",
		        "D3011": "Fourth argument of replace function must evaluate to a positive number",
		        "D3012": "Attempted to replace a matched string with a non-string value",
		        "D3020": "Third argument of split function must evaluate to a positive number",
		        "D3030": "Unable to cast value to a number: {{value}}",
		        "D3040": "Third argument of match function must evaluate to a positive number",
		        "D3050": "The second argument of reduce function must be a function with at least two arguments",
		        "D3060": "The sqrt function cannot be applied to a negative number: {{value}}",
		        "D3061": "The power function has resulted in a value that cannot be represented as a JSON number: base={{value}}, exponent={{exp}}",
		        "D3070": "The single argument form of the sort function can only be applied to an array of strings or an array of numbers.  Use the second argument to specify a comparison function",
		        "D3080": "The picture string must only contain a maximum of two sub-pictures",
		        "D3081": "The sub-picture must not contain more than one instance of the 'decimal-separator' character",
		        "D3082": "The sub-picture must not contain more than one instance of the 'percent' character",
		        "D3083": "The sub-picture must not contain more than one instance of the 'per-mille' character",
		        "D3084": "The sub-picture must not contain both a 'percent' and a 'per-mille' character",
		        "D3085": "The mantissa part of a sub-picture must contain at least one character that is either an 'optional digit character' or a member of the 'decimal digit family'",
		        "D3086": "The sub-picture must not contain a passive character that is preceded by an active character and that is followed by another active character",
		        "D3087": "The sub-picture must not contain a 'grouping-separator' character that appears adjacent to a 'decimal-separator' character",
		        "D3088": "The sub-picture must not contain a 'grouping-separator' at the end of the integer part",
		        "D3089": "The sub-picture must not contain two adjacent instances of the 'grouping-separator' character",
		        "D3090": "The integer part of the sub-picture must not contain a member of the 'decimal digit family' that is followed by an instance of the 'optional digit character'",
		        "D3091": "The fractional part of the sub-picture must not contain an instance of the 'optional digit character' that is followed by a member of the 'decimal digit family'",
		        "D3092": "A sub-picture that contains a 'percent' or 'per-mille' character must not contain a character treated as an 'exponent-separator'",
		        "D3093": "The exponent part of the sub-picture must comprise only of one or more characters that are members of the 'decimal digit family'",
		        "D3100": "The radix of the formatBase function must be between 2 and 36.  It was given {{value}}",
		        "D3110": "The argument of the toMillis function must be an ISO 8601 formatted timestamp. Given {{value}}",
		        "D3120": "Syntax error in expression passed to function eval: {{value}}",
		        "D3121": "Dynamic error evaluating the expression passed to function eval: {{value}}",
		        "D3130": "Formatting or parsing an integer as a sequence starting with {{value}} is not supported by this implementation",
		        "D3131": "In a decimal digit pattern, all digits must be from the same decimal group",
		        "D3132": "Unknown component specifier {{value}} in date/time picture string",
		        "D3133": "The 'name' modifier can only be applied to months and days in the date/time picture string, not {{value}}",
		        "D3134": "The timezone integer format specifier cannot have more than four digits",
		        "D3135": "No matching closing bracket ']' in date/time picture string",
		        "D3136": "The date/time picture string is missing specifiers required to parse the timestamp",
		        "D3137": "{{{message}}}",
		        "D3138": "The $single() function expected exactly 1 matching result.  Instead it matched more.",
		        "D3139": "The $single() function expected exactly 1 matching result.  Instead it matched 0.",
		        "D3140": "Malformed URL passed to ${{{functionName}}}(): {{value}}",
		        "D3141": "{{{message}}}"
		    };

		    /**
		     * lookup a message template from the catalog and substitute the inserts.
		     * Populates `err.message` with the substituted message. Leaves `err.message`
		     * untouched if code lookup fails.
		     * @param {string} err - error code to lookup
		     * @returns {undefined} - `err` is modified in place
		     */
		    function populateMessage(err) {
		        var template = errorCodes[err.code];
		        if(typeof template !== 'undefined') {
		            // if there are any handlebars, replace them with the field references
		            // triple braces - replace with value
		            // double braces - replace with json stringified value
		            var message = template.replace(/\{\{\{([^}]+)}}}/g, function() {
		                return err[arguments[1]];
		            });
		            message = message.replace(/\{\{([^}]+)}}/g, function() {
		                return JSON.stringify(err[arguments[1]]);
		            });
		            err.message = message;
		        }
		        // Otherwise retain the original `err.message`
		    }

		    /**
		     * JSONata
		     * @param {Object} expr - JSONata expression
		     * @param {Object} options
		     * @param {boolean} options.recover: attempt to recover on parse error
		     * @param {Function} options.RegexEngine: RegEx class constructor to use
		     * @returns {{evaluate: evaluate, assign: assign}} Evaluated expression
		     */
		    function jsonata(expr, options) {
		        var ast;
		        var errors;
		        try {
		            ast = parser(expr, options && options.recover);
		            errors = ast.errors;
		            delete ast.errors;
		        } catch(err) {
		            // insert error message into structure
		            populateMessage(err); // possible side-effects on `err`
		            throw err;
		        }
		        var environment = createFrame(staticFrame);

		        var timestamp = new Date(); // will be overridden on each call to evalute()
		        environment.bind('now', defineFunction(function(picture, timezone) {
		            return datetime.fromMillis(timestamp.getTime(), picture, timezone);
		        }, '<s?s?:s>'));
		        environment.bind('millis', defineFunction(function() {
		            return timestamp.getTime();
		        }, '<:n>'));

		        if(options && options.RegexEngine) {
		            jsonata.RegexEngine = options.RegexEngine;
		        } else {
		            jsonata.RegexEngine = RegExp;
		        }

		        return {
		            evaluate: async function (input, bindings, callback) {
		                // throw if the expression compiled with syntax errors
		                if(typeof errors !== 'undefined') {
		                    var err = {
		                        code: 'S0500',
		                        position: 0
		                    };
		                    populateMessage(err); // possible side-effects on `err`
		                    throw err;
		                }

		                if (typeof bindings !== 'undefined') {
		                    var exec_env;
		                    // the variable bindings have been passed in - create a frame to hold these
		                    exec_env = createFrame(environment);
		                    for (var v in bindings) {
		                        exec_env.bind(v, bindings[v]);
		                    }
		                } else {
		                    exec_env = environment;
		                }
		                // put the input document into the environment as the root object
		                exec_env.bind('$', input);

		                // capture the timestamp and put it in the execution environment
		                // the $now() and $millis() functions will return this value - whenever it is called
		                timestamp = new Date();
		                exec_env.timestamp = timestamp;

		                // if the input is a JSON array, then wrap it in a singleton sequence so it gets treated as a single input
		                if(Array.isArray(input) && !isSequence(input)) {
		                    input = createSequence(input);
		                    input.outerWrapper = true;
		                }

		                var it;
		                try {
		                    it = await evaluate(ast, input, exec_env);
		                    if (typeof callback === "function") {
		                        callback(null, it);
		                    }
		                    return it;
		                } catch (err) {
		                    // insert error message into structure
		                    populateMessage(err); // possible side-effects on `err`
		                    throw err;
		                }
		            },
		            assign: function (name, value) {
		                environment.bind(name, value);
		            },
		            registerFunction: function(name, implementation, signature) {
		                var func = defineFunction(implementation, signature);
		                environment.bind(name, func);
		            },
		            ast: function() {
		                return ast;
		            },
		            errors: function() {
		                return errors;
		            }
		        };
		    }

		    jsonata.parser = parser; // TODO remove this in a future release - use ast() instead

		    return jsonata;

		})();

		module.exports = jsonata;

		},{"./datetime":1,"./functions":2,"./parser":4,"./signature":5,"./utils":6}],4:[function(require,module,exports){
		/**
		 * © Copyright IBM Corp. 2016, 2018 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		var parseSignature = require('./signature');

		const parser = (() => {

		    var operators = {
		        '.': 75,
		        '[': 80,
		        ']': 0,
		        '{': 70,
		        '}': 0,
		        '(': 80,
		        ')': 0,
		        ',': 0,
		        '@': 80,
		        '#': 80,
		        ';': 80,
		        ':': 80,
		        '?': 20,
		        '+': 50,
		        '-': 50,
		        '*': 60,
		        '/': 60,
		        '%': 60,
		        '|': 20,
		        '=': 40,
		        '<': 40,
		        '>': 40,
		        '^': 40,
		        '**': 60,
		        '..': 20,
		        ':=': 10,
		        '!=': 40,
		        '<=': 40,
		        '>=': 40,
		        '~>': 40,
		        'and': 30,
		        'or': 25,
		        'in': 40,
		        '&': 50,
		        '!': 0,   // not an operator, but needed as a stop character for name tokens
		        '~': 0   // not an operator, but needed as a stop character for name tokens
		    };

		    var escapes = {  // JSON string escape sequences - see json.org
		        '"': '"',
		        '\\': '\\',
		        '/': '/',
		        'b': '\b',
		        'f': '\f',
		        'n': '\n',
		        'r': '\r',
		        't': '\t'
		    };

		    // Tokenizer (lexer) - invoked by the parser to return one token at a time
		    var tokenizer = function (path) {
		        var position = 0;
		        var length = path.length;

		        var create = function (type, value) {
		            var obj = {type: type, value: value, position: position};
		            return obj;
		        };

		        var scanRegex = function () {
		            // the prefix '/' will have been previously scanned. Find the end of the regex.
		            // search for closing '/' ignoring any that are escaped, or within brackets
		            var start = position;
		            var depth = 0;
		            var pattern;
		            var flags;

		            var isClosingSlash = function (position) {
		                if (path.charAt(position) === '/' && depth === 0) {
		                    var backslashCount = 0;
		                    while (path.charAt(position - (backslashCount + 1)) === '\\') {
		                        backslashCount++;
		                    }
		                    if (backslashCount % 2 === 0) {
		                        return true;
		                    }
		                }
		                return false;
		            };

		            while (position < length) {
		                var currentChar = path.charAt(position);
		                if (isClosingSlash(position)) {
		                    // end of regex found
		                    pattern = path.substring(start, position);
		                    if (pattern === '') {
		                        throw {
		                            code: "S0301",
		                            stack: (new Error()).stack,
		                            position: position
		                        };
		                    }
		                    position++;
		                    currentChar = path.charAt(position);
		                    // flags
		                    start = position;
		                    while (currentChar === 'i' || currentChar === 'm') {
		                        position++;
		                        currentChar = path.charAt(position);
		                    }
		                    flags = path.substring(start, position) + 'g';
		                    return new RegExp(pattern, flags);
		                }
		                if ((currentChar === '(' || currentChar === '[' || currentChar === '{') && path.charAt(position - 1) !== '\\') {
		                    depth++;
		                }
		                if ((currentChar === ')' || currentChar === ']' || currentChar === '}') && path.charAt(position - 1) !== '\\') {
		                    depth--;
		                }

		                position++;
		            }
		            throw {
		                code: "S0302",
		                stack: (new Error()).stack,
		                position: position
		            };
		        };

		        var next = function (prefix) {
		            if (position >= length) return null;
		            var currentChar = path.charAt(position);
		            // skip whitespace
		            while (position < length && ' \t\n\r\v'.indexOf(currentChar) > -1) {
		                position++;
		                currentChar = path.charAt(position);
		            }
		            // skip comments
		            if (currentChar === '/' && path.charAt(position + 1) === '*') {
		                var commentStart = position;
		                position += 2;
		                currentChar = path.charAt(position);
		                while (!(currentChar === '*' && path.charAt(position + 1) === '/')) {
		                    currentChar = path.charAt(++position);
		                    if (position >= length) {
		                        // no closing tag
		                        throw {
		                            code: "S0106",
		                            stack: (new Error()).stack,
		                            position: commentStart
		                        };
		                    }
		                }
		                position += 2;
		                currentChar = path.charAt(position);
		                return next(prefix); // need this to swallow any following whitespace
		            }
		            // test for regex
		            if (prefix !== true && currentChar === '/') {
		                position++;
		                return create('regex', scanRegex());
		            }
		            // handle double-char operators
		            if (currentChar === '.' && path.charAt(position + 1) === '.') {
		                // double-dot .. range operator
		                position += 2;
		                return create('operator', '..');
		            }
		            if (currentChar === ':' && path.charAt(position + 1) === '=') {
		                // := assignment
		                position += 2;
		                return create('operator', ':=');
		            }
		            if (currentChar === '!' && path.charAt(position + 1) === '=') {
		                // !=
		                position += 2;
		                return create('operator', '!=');
		            }
		            if (currentChar === '>' && path.charAt(position + 1) === '=') {
		                // >=
		                position += 2;
		                return create('operator', '>=');
		            }
		            if (currentChar === '<' && path.charAt(position + 1) === '=') {
		                // <=
		                position += 2;
		                return create('operator', '<=');
		            }
		            if (currentChar === '*' && path.charAt(position + 1) === '*') {
		                // **  descendant wildcard
		                position += 2;
		                return create('operator', '**');
		            }
		            if (currentChar === '~' && path.charAt(position + 1) === '>') {
		                // ~>  chain function
		                position += 2;
		                return create('operator', '~>');
		            }
		            // test for single char operators
		            if (Object.prototype.hasOwnProperty.call(operators, currentChar)) {
		                position++;
		                return create('operator', currentChar);
		            }
		            // test for string literals
		            if (currentChar === '"' || currentChar === "'") {
		                var quoteType = currentChar;
		                // double quoted string literal - find end of string
		                position++;
		                var qstr = "";
		                while (position < length) {
		                    currentChar = path.charAt(position);
		                    if (currentChar === '\\') { // escape sequence
		                        position++;
		                        currentChar = path.charAt(position);
		                        if (Object.prototype.hasOwnProperty.call(escapes, currentChar)) {
		                            qstr += escapes[currentChar];
		                        } else if (currentChar === 'u') {
		                            // \u should be followed by 4 hex digits
		                            var octets = path.substr(position + 1, 4);
		                            if (/^[0-9a-fA-F]+$/.test(octets)) {
		                                var codepoint = parseInt(octets, 16);
		                                qstr += String.fromCharCode(codepoint);
		                                position += 4;
		                            } else {
		                                throw {
		                                    code: "S0104",
		                                    stack: (new Error()).stack,
		                                    position: position
		                                };
		                            }
		                        } else {
		                            // illegal escape sequence
		                            throw {
		                                code: "S0103",
		                                stack: (new Error()).stack,
		                                position: position,
		                                token: currentChar
		                            };

		                        }
		                    } else if (currentChar === quoteType) {
		                        position++;
		                        return create('string', qstr);
		                    } else {
		                        qstr += currentChar;
		                    }
		                    position++;
		                }
		                throw {
		                    code: "S0101",
		                    stack: (new Error()).stack,
		                    position: position
		                };
		            }
		            // test for numbers
		            var numregex = /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?/;
		            var match = numregex.exec(path.substring(position));
		            if (match !== null) {
		                var num = parseFloat(match[0]);
		                if (!isNaN(num) && isFinite(num)) {
		                    position += match[0].length;
		                    return create('number', num);
		                } else {
		                    throw {
		                        code: "S0102",
		                        stack: (new Error()).stack,
		                        position: position,
		                        token: match[0]
		                    };
		                }
		            }
		            // test for quoted names (backticks)
		            var name;
		            if (currentChar === '`') {
		                // scan for closing quote
		                position++;
		                var end = path.indexOf('`', position);
		                if (end !== -1) {
		                    name = path.substring(position, end);
		                    position = end + 1;
		                    return create('name', name);
		                }
		                position = length;
		                throw {
		                    code: "S0105",
		                    stack: (new Error()).stack,
		                    position: position
		                };
		            }
		            // test for names
		            var i = position;
		            var ch;
		            for (; ;) {
		                ch = path.charAt(i);
		                if (i === length || ' \t\n\r\v'.indexOf(ch) > -1 || Object.prototype.hasOwnProperty.call(operators, ch)) {
		                    if (path.charAt(position) === '$') {
		                        // variable reference
		                        name = path.substring(position + 1, i);
		                        position = i;
		                        return create('variable', name);
		                    } else {
		                        name = path.substring(position, i);
		                        position = i;
		                        switch (name) {
		                            case 'or':
		                            case 'in':
		                            case 'and':
		                                return create('operator', name);
		                            case 'true':
		                                return create('value', true);
		                            case 'false':
		                                return create('value', false);
		                            case 'null':
		                                return create('value', null);
		                            default:
		                                if (position === length && name === '') {
		                                    // whitespace at end of input
		                                    return null;
		                                }
		                                return create('name', name);
		                        }
		                    }
		                } else {
		                    i++;
		                }
		            }
		        };

		        return next;
		    };

		    // This parser implements the 'Top down operator precedence' algorithm developed by Vaughan R Pratt; http://dl.acm.org/citation.cfm?id=512931.
		    // and builds on the Javascript framework described by Douglas Crockford at http://javascript.crockford.com/tdop/tdop.html
		    // and in 'Beautiful Code', edited by Andy Oram and Greg Wilson, Copyright 2007 O'Reilly Media, Inc. 798-0-596-51004-6

		    var parser = function (source, recover) {
		        var node;
		        var lexer;

		        var symbol_table = {};
		        var errors = [];

		        var remainingTokens = function () {
		            var remaining = [];
		            if (node.id !== '(end)') {
		                remaining.push({type: node.type, value: node.value, position: node.position});
		            }
		            var nxt = lexer();
		            while (nxt !== null) {
		                remaining.push(nxt);
		                nxt = lexer();
		            }
		            return remaining;
		        };

		        var base_symbol = {
		            nud: function () {
		                // error - symbol has been invoked as a unary operator
		                var err = {
		                    code: 'S0211',
		                    token: this.value,
		                    position: this.position
		                };

		                if (recover) {
		                    err.remaining = remainingTokens();
		                    err.type = 'error';
		                    errors.push(err);
		                    return err;
		                } else {
		                    err.stack = (new Error()).stack;
		                    throw err;
		                }
		            }
		        };

		        var symbol = function (id, bp) {
		            var s = symbol_table[id];
		            bp = bp || 0;
		            if (s) {
		                if (bp >= s.lbp) {
		                    s.lbp = bp;
		                }
		            } else {
		                s = Object.create(base_symbol);
		                s.id = s.value = id;
		                s.lbp = bp;
		                symbol_table[id] = s;
		            }
		            return s;
		        };

		        var handleError = function (err) {
		            if (recover) {
		                // tokenize the rest of the buffer and add it to an error token
		                err.remaining = remainingTokens();
		                errors.push(err);
		                var symbol = symbol_table["(error)"];
		                node = Object.create(symbol);
		                node.error = err;
		                node.type = "(error)";
		                return node;
		            } else {
		                err.stack = (new Error()).stack;
		                throw err;
		            }
		        };

		        var advance = function (id, infix) {
		            if (id && node.id !== id) {
		                var code;
		                if (node.id === '(end)') {
		                    // unexpected end of buffer
		                    code = "S0203";
		                } else {
		                    code = "S0202";
		                }
		                var err = {
		                    code: code,
		                    position: node.position,
		                    token: node.value,
		                    value: id
		                };
		                return handleError(err);
		            }
		            var next_token = lexer(infix);
		            if (next_token === null) {
		                node = symbol_table["(end)"];
		                node.position = source.length;
		                return node;
		            }
		            var value = next_token.value;
		            var type = next_token.type;
		            var symbol;
		            switch (type) {
		                case 'name':
		                case 'variable':
		                    symbol = symbol_table["(name)"];
		                    break;
		                case 'operator':
		                    symbol = symbol_table[value];
		                    if (!symbol) {
		                        return handleError({
		                            code: "S0204",
		                            stack: (new Error()).stack,
		                            position: next_token.position,
		                            token: value
		                        });
		                    }
		                    break;
		                case 'string':
		                case 'number':
		                case 'value':
		                    symbol = symbol_table["(literal)"];
		                    break;
		                case 'regex':
		                    type = "regex";
		                    symbol = symbol_table["(regex)"];
		                    break;
		                /* istanbul ignore next */
		                default:
		                    return handleError({
		                        code: "S0205",
		                        stack: (new Error()).stack,
		                        position: next_token.position,
		                        token: value
		                    });
		            }

		            node = Object.create(symbol);
		            node.value = value;
		            node.type = type;
		            node.position = next_token.position;
		            return node;
		        };

		        // Pratt's algorithm
		        var expression = function (rbp) {
		            var left;
		            var t = node;
		            advance(null, true);
		            left = t.nud();
		            while (rbp < node.lbp) {
		                t = node;
		                advance();
		                left = t.led(left);
		            }
		            return left;
		        };

		        var terminal = function (id) {
		            var s = symbol(id, 0);
		            s.nud = function () {
		                return this;
		            };
		        };

		        // match infix operators
		        // <expression> <operator> <expression>
		        // left associative
		        var infix = function (id, bp, led) {
		            var bindingPower = bp || operators[id];
		            var s = symbol(id, bindingPower);
		            s.led = led || function (left) {
		                this.lhs = left;
		                this.rhs = expression(bindingPower);
		                this.type = "binary";
		                return this;
		            };
		            return s;
		        };

		        // match infix operators
		        // <expression> <operator> <expression>
		        // right associative
		        var infixr = function (id, bp, led) {
		            var s = symbol(id, bp);
		            s.led = led;
		            return s;
		        };

		        // match prefix operators
		        // <operator> <expression>
		        var prefix = function (id, nud) {
		            var s = symbol(id);
		            s.nud = nud || function () {
		                this.expression = expression(70);
		                this.type = "unary";
		                return this;
		            };
		            return s;
		        };

		        terminal("(end)");
		        terminal("(name)");
		        terminal("(literal)");
		        terminal("(regex)");
		        symbol(":");
		        symbol(";");
		        symbol(",");
		        symbol(")");
		        symbol("]");
		        symbol("}");
		        symbol(".."); // range operator
		        infix("."); // map operator
		        infix("+"); // numeric addition
		        infix("-"); // numeric subtraction
		        infix("*"); // numeric multiplication
		        infix("/"); // numeric division
		        infix("%"); // numeric modulus
		        infix("="); // equality
		        infix("<"); // less than
		        infix(">"); // greater than
		        infix("!="); // not equal to
		        infix("<="); // less than or equal
		        infix(">="); // greater than or equal
		        infix("&"); // string concatenation
		        infix("and"); // Boolean AND
		        infix("or"); // Boolean OR
		        infix("in"); // is member of array
		        terminal("and"); // the 'keywords' can also be used as terminals (field names)
		        terminal("or"); //
		        terminal("in"); //
		        prefix("-"); // unary numeric negation
		        infix("~>"); // function application

		        infixr("(error)", 10, function (left) {
		            this.lhs = left;

		            this.error = node.error;
		            this.remaining = remainingTokens();
		            this.type = 'error';
		            return this;
		        });

		        // field wildcard (single level)
		        prefix('*', function () {
		            this.type = "wildcard";
		            return this;
		        });

		        // descendant wildcard (multi-level)
		        prefix('**', function () {
		            this.type = "descendant";
		            return this;
		        });

		        // parent operator
		        prefix('%', function () {
		            this.type = "parent";
		            return this;
		        });

		        // function invocation
		        infix("(", operators['('], function (left) {
		            // left is is what we are trying to invoke
		            this.procedure = left;
		            this.type = 'function';
		            this.arguments = [];
		            if (node.id !== ')') {
		                for (; ;) {
		                    if (node.type === 'operator' && node.id === '?') {
		                        // partial function application
		                        this.type = 'partial';
		                        this.arguments.push(node);
		                        advance('?');
		                    } else {
		                        this.arguments.push(expression(0));
		                    }
		                    if (node.id !== ',') break;
		                    advance(',');
		                }
		            }
		            advance(")", true);
		            // if the name of the function is 'function' or λ, then this is function definition (lambda function)
		            if (left.type === 'name' && (left.value === 'function' || left.value === '\u03BB')) {
		                // all of the args must be VARIABLE tokens
		                this.arguments.forEach(function (arg, index) {
		                    if (arg.type !== 'variable') {
		                        return handleError({
		                            code: "S0208",
		                            stack: (new Error()).stack,
		                            position: arg.position,
		                            token: arg.value,
		                            value: index + 1
		                        });
		                    }
		                });
		                this.type = 'lambda';
		                // is the next token a '<' - if so, parse the function signature
		                if (node.id === '<') {
		                    var sigPos = node.position;
		                    var depth = 1;
		                    var sig = '<';
		                    while (depth > 0 && node.id !== '{' && node.id !== '(end)') {
		                        var tok = advance();
		                        if (tok.id === '>') {
		                            depth--;
		                        } else if (tok.id === '<') {
		                            depth++;
		                        }
		                        sig += tok.value;
		                    }
		                    advance('>');
		                    try {
		                        this.signature = parseSignature(sig);
		                    } catch (err) {
		                        // insert the position into this error
		                        err.position = sigPos + err.offset;
		                        return handleError(err);
		                    }
		                }
		                // parse the function body
		                advance('{');
		                this.body = expression(0);
		                advance('}');
		            }
		            return this;
		        });

		        // parenthesis - block expression
		        prefix("(", function () {
		            var expressions = [];
		            while (node.id !== ")") {
		                expressions.push(expression(0));
		                if (node.id !== ";") {
		                    break;
		                }
		                advance(";");
		            }
		            advance(")", true);
		            this.type = 'block';
		            this.expressions = expressions;
		            return this;
		        });

		        // array constructor
		        prefix("[", function () {
		            var a = [];
		            if (node.id !== "]") {
		                for (; ;) {
		                    var item = expression(0);
		                    if (node.id === "..") {
		                        // range operator
		                        var range = {type: "binary", value: "..", position: node.position, lhs: item};
		                        advance("..");
		                        range.rhs = expression(0);
		                        item = range;
		                    }
		                    a.push(item);
		                    if (node.id !== ",") {
		                        break;
		                    }
		                    advance(",");
		                }
		            }
		            advance("]", true);
		            this.expressions = a;
		            this.type = "unary";
		            return this;
		        });

		        // filter - predicate or array index
		        infix("[", operators['['], function (left) {
		            if (node.id === "]") {
		                // empty predicate means maintain singleton arrays in the output
		                var step = left;
		                while (step && step.type === 'binary' && step.value === '[') {
		                    step = step.lhs;
		                }
		                step.keepArray = true;
		                advance("]");
		                return left;
		            } else {
		                this.lhs = left;
		                this.rhs = expression(operators[']']);
		                this.type = 'binary';
		                advance("]", true);
		                return this;
		            }
		        });

		        // order-by
		        infix("^", operators['^'], function (left) {
		            advance("(");
		            var terms = [];
		            for (; ;) {
		                var term = {
		                    descending: false
		                };
		                if (node.id === "<") {
		                    // ascending sort
		                    advance("<");
		                } else if (node.id === ">") {
		                    // descending sort
		                    term.descending = true;
		                    advance(">");
		                } else ;
		                term.expression = expression(0);
		                terms.push(term);
		                if (node.id !== ",") {
		                    break;
		                }
		                advance(",");
		            }
		            advance(")");
		            this.lhs = left;
		            this.rhs = terms;
		            this.type = 'binary';
		            return this;
		        });

		        var objectParser = function (left) {
		            var a = [];
		            if (node.id !== "}") {
		                for (; ;) {
		                    var n = expression(0);
		                    advance(":");
		                    var v = expression(0);
		                    a.push([n, v]); // holds an array of name/value expression pairs
		                    if (node.id !== ",") {
		                        break;
		                    }
		                    advance(",");
		                }
		            }
		            advance("}", true);
		            if (typeof left === 'undefined') {
		                // NUD - unary prefix form
		                this.lhs = a;
		                this.type = "unary";
		            } else {
		                // LED - binary infix form
		                this.lhs = left;
		                this.rhs = a;
		                this.type = 'binary';
		            }
		            return this;
		        };

		        // object constructor
		        prefix("{", objectParser);

		        // object grouping
		        infix("{", operators['{'], objectParser);

		        // bind variable
		        infixr(":=", operators[':='], function (left) {
		            if (left.type !== 'variable') {
		                return handleError({
		                    code: "S0212",
		                    stack: (new Error()).stack,
		                    position: left.position,
		                    token: left.value
		                });
		            }
		            this.lhs = left;
		            this.rhs = expression(operators[':='] - 1); // subtract 1 from bindingPower for right associative operators
		            this.type = "binary";
		            return this;
		        });

		        // focus variable bind
		        infix("@", operators['@'], function (left) {
		            this.lhs = left;
		            this.rhs = expression(operators['@']);
		            if(this.rhs.type !== 'variable') {
		                return handleError({
		                    code: "S0214",
		                    stack: (new Error()).stack,
		                    position: this.rhs.position,
		                    token: "@"
		                });
		            }
		            this.type = "binary";
		            return this;
		        });

		        // index (position) variable bind
		        infix("#", operators['#'], function (left) {
		            this.lhs = left;
		            this.rhs = expression(operators['#']);
		            if(this.rhs.type !== 'variable') {
		                return handleError({
		                    code: "S0214",
		                    stack: (new Error()).stack,
		                    position: this.rhs.position,
		                    token: "#"
		                });
		            }
		            this.type = "binary";
		            return this;
		        });

		        // if/then/else ternary operator ?:
		        infix("?", operators['?'], function (left) {
		            this.type = 'condition';
		            this.condition = left;
		            this.then = expression(0);
		            if (node.id === ':') {
		                // else condition
		                advance(":");
		                this.else = expression(0);
		            }
		            return this;
		        });

		        // object transformer
		        prefix("|", function () {
		            this.type = 'transform';
		            this.pattern = expression(0);
		            advance('|');
		            this.update = expression(0);
		            if (node.id === ',') {
		                advance(',');
		                this.delete = expression(0);
		            }
		            advance('|');
		            return this;
		        });

		        // tail call optimization
		        // this is invoked by the post parser to analyse lambda functions to see
		        // if they make a tail call.  If so, it is replaced by a thunk which will
		        // be invoked by the trampoline loop during function application.
		        // This enables tail-recursive functions to be written without growing the stack
		        var tailCallOptimize = function (expr) {
		            var result;
		            if (expr.type === 'function' && !expr.predicate) {
		                var thunk = {type: 'lambda', thunk: true, arguments: [], position: expr.position};
		                thunk.body = expr;
		                result = thunk;
		            } else if (expr.type === 'condition') {
		                // analyse both branches
		                expr.then = tailCallOptimize(expr.then);
		                if (typeof expr.else !== 'undefined') {
		                    expr.else = tailCallOptimize(expr.else);
		                }
		                result = expr;
		            } else if (expr.type === 'block') {
		                // only the last expression in the block
		                var length = expr.expressions.length;
		                if (length > 0) {
		                    expr.expressions[length - 1] = tailCallOptimize(expr.expressions[length - 1]);
		                }
		                result = expr;
		            } else {
		                result = expr;
		            }
		            return result;
		        };

		        var ancestorLabel = 0;
		        var ancestorIndex = 0;
		        var ancestry = [];

		        var seekParent = function (node, slot) {
		            switch (node.type) {
		                case 'name':
		                case 'wildcard':
		                    slot.level--;
		                    if(slot.level === 0) {
		                        if (typeof node.ancestor === 'undefined') {
		                            node.ancestor = slot;
		                        } else {
		                            // reuse the existing label
		                            ancestry[slot.index].slot.label = node.ancestor.label;
		                            node.ancestor = slot;
		                        }
		                        node.tuple = true;
		                    }
		                    break;
		                case 'parent':
		                    slot.level++;
		                    break;
		                case 'block':
		                    // look in last expression in the block
		                    if(node.expressions.length > 0) {
		                        node.tuple = true;
		                        slot = seekParent(node.expressions[node.expressions.length - 1], slot);
		                    }
		                    break;
		                case 'path':
		                    // last step in path
		                    node.tuple = true;
		                    var index = node.steps.length - 1;
		                    slot = seekParent(node.steps[index--], slot);
		                    while (slot.level > 0 && index >= 0) {
		                        // check previous steps
		                        slot = seekParent(node.steps[index--], slot);
		                    }
		                    break;
		                default:
		                    // error - can't derive ancestor
		                    throw {
		                        code: "S0217",
		                        token: node.type,
		                        position: node.position
		                    };
		            }
		            return slot;
		        };

		        var pushAncestry = function(result, value) {
		            if(typeof value.seekingParent !== 'undefined' || value.type === 'parent') {
		                var slots = (typeof value.seekingParent !== 'undefined') ? value.seekingParent : [];
		                if (value.type === 'parent') {
		                    slots.push(value.slot);
		                }
		                if(typeof result.seekingParent === 'undefined') {
		                    result.seekingParent = slots;
		                } else {
		                    Array.prototype.push.apply(result.seekingParent, slots);
		                }
		            }
		        };

		        var resolveAncestry = function(path) {
		            var index = path.steps.length - 1;
		            var laststep = path.steps[index];
		            var slots = (typeof laststep.seekingParent !== 'undefined') ? laststep.seekingParent : [];
		            if (laststep.type === 'parent') {
		                slots.push(laststep.slot);
		            }
		            for(var is = 0; is < slots.length; is++) {
		                var slot = slots[is];
		                index = path.steps.length - 2;
		                while (slot.level > 0) {
		                    if (index < 0) {
		                        if(typeof path.seekingParent === 'undefined') {
		                            path.seekingParent = [slot];
		                        } else {
		                            path.seekingParent.push(slot);
		                        }
		                        break;
		                    }
		                    // try previous step
		                    var step = path.steps[index--];
		                    // multiple contiguous steps that bind the focus should be skipped
		                    while(index >= 0 && step.focus && path.steps[index].focus) {
		                        step = path.steps[index--];
		                    }
		                    slot = seekParent(step, slot);
		                }
		            }
		        };

		        // post-parse stage
		        // the purpose of this is to add as much semantic value to the parse tree as possible
		        // in order to simplify the work of the evaluator.
		        // This includes flattening the parts of the AST representing location paths,
		        // converting them to arrays of steps which in turn may contain arrays of predicates.
		        // following this, nodes containing '.' and '[' should be eliminated from the AST.
		        var processAST = function (expr) {
		            var result;
		            switch (expr.type) {
		                case 'binary':
		                    switch (expr.value) {
		                        case '.':
		                            var lstep = processAST(expr.lhs);

		                            if (lstep.type === 'path') {
		                                result = lstep;
		                            } else {
		                                result = {type: 'path', steps: [lstep]};
		                            }
		                            if(lstep.type === 'parent') {
		                                result.seekingParent = [lstep.slot];
		                            }
		                            var rest = processAST(expr.rhs);
		                            if (rest.type === 'function' &&
		                                rest.procedure.type === 'path' &&
		                                rest.procedure.steps.length === 1 &&
		                                rest.procedure.steps[0].type === 'name' &&
		                                result.steps[result.steps.length - 1].type === 'function') {
		                                // next function in chain of functions - will override a thenable
		                                result.steps[result.steps.length - 1].nextFunction = rest.procedure.steps[0].value;
		                            }
		                            if (rest.type === 'path') {
		                                Array.prototype.push.apply(result.steps, rest.steps);
		                            } else {
		                                if(typeof rest.predicate !== 'undefined') {
		                                    rest.stages = rest.predicate;
		                                    delete rest.predicate;
		                                }
		                                result.steps.push(rest);
		                            }
		                            // any steps within a path that are string literals, should be changed to 'name'
		                            result.steps.filter(function (step) {
		                                if (step.type === 'number' || step.type === 'value') {
		                                    // don't allow steps to be numbers or the values true/false/null
		                                    throw {
		                                        code: "S0213",
		                                        stack: (new Error()).stack,
		                                        position: step.position,
		                                        value: step.value
		                                    };
		                                }
		                                return step.type === 'string';
		                            }).forEach(function (lit) {
		                                lit.type = 'name';
		                            });
		                            // any step that signals keeping a singleton array, should be flagged on the path
		                            if (result.steps.filter(function (step) {
		                                return step.keepArray === true;
		                            }).length > 0) {
		                                result.keepSingletonArray = true;
		                            }
		                            // if first step is a path constructor, flag it for special handling
		                            var firststep = result.steps[0];
		                            if (firststep.type === 'unary' && firststep.value === '[') {
		                                firststep.consarray = true;
		                            }
		                            // if the last step is an array constructor, flag it so it doesn't flatten
		                            var laststep = result.steps[result.steps.length - 1];
		                            if (laststep.type === 'unary' && laststep.value === '[') {
		                                laststep.consarray = true;
		                            }
		                            resolveAncestry(result);
		                            break;
		                        case '[':
		                            // predicated step
		                            // LHS is a step or a predicated step
		                            // RHS is the predicate expr
		                            result = processAST(expr.lhs);
		                            var step = result;
		                            var type = 'predicate';
		                            if (result.type === 'path') {
		                                step = result.steps[result.steps.length - 1];
		                                type = 'stages';
		                            }
		                            if (typeof step.group !== 'undefined') {
		                                throw {
		                                    code: "S0209",
		                                    stack: (new Error()).stack,
		                                    position: expr.position
		                                };
		                            }
		                            if (typeof step[type] === 'undefined') {
		                                step[type] = [];
		                            }
		                            var predicate = processAST(expr.rhs);
		                            if(typeof predicate.seekingParent !== 'undefined') {
		                                predicate.seekingParent.forEach(slot => {
		                                    if(slot.level === 1) {
		                                        seekParent(step, slot);
		                                    } else {
		                                        slot.level--;
		                                    }
		                                });
		                                pushAncestry(step, predicate);
		                            }
		                            step[type].push({type: 'filter', expr: predicate, position: expr.position});
		                            break;
		                        case '{':
		                            // group-by
		                            // LHS is a step or a predicated step
		                            // RHS is the object constructor expr
		                            result = processAST(expr.lhs);
		                            if (typeof result.group !== 'undefined') {
		                                throw {
		                                    code: "S0210",
		                                    stack: (new Error()).stack,
		                                    position: expr.position
		                                };
		                            }
		                            // object constructor - process each pair
		                            result.group = {
		                                lhs: expr.rhs.map(function (pair) {
		                                    return [processAST(pair[0]), processAST(pair[1])];
		                                }),
		                                position: expr.position
		                            };
		                            break;
		                        case '^':
		                            // order-by
		                            // LHS is the array to be ordered
		                            // RHS defines the terms
		                            result = processAST(expr.lhs);
		                            if (result.type !== 'path') {
		                                result = {type: 'path', steps: [result]};
		                            }
		                            var sortStep = {type: 'sort', position: expr.position};
		                            sortStep.terms = expr.rhs.map(function (terms) {
		                                var expression = processAST(terms.expression);
		                                pushAncestry(sortStep, expression);
		                                return {
		                                    descending: terms.descending,
		                                    expression: expression
		                                };
		                            });
		                            result.steps.push(sortStep);
		                            resolveAncestry(result);
		                            break;
		                        case ':=':
		                            result = {type: 'bind', value: expr.value, position: expr.position};
		                            result.lhs = processAST(expr.lhs);
		                            result.rhs = processAST(expr.rhs);
		                            pushAncestry(result, result.rhs);
		                            break;
		                        case '@':
		                            result = processAST(expr.lhs);
		                            step = result;
		                            if (result.type === 'path') {
		                                step = result.steps[result.steps.length - 1];
		                            }
		                            // throw error if there are any predicates defined at this point
		                            // at this point the only type of stages can be predicates
		                            if(typeof step.stages !== 'undefined' || typeof step.predicate !== 'undefined') {
		                                throw {
		                                    code: "S0215",
		                                    stack: (new Error()).stack,
		                                    position: expr.position
		                                };
		                            }
		                            // also throw if this is applied after an 'order-by' clause
		                            if(step.type === 'sort') {
		                                throw {
		                                    code: "S0216",
		                                    stack: (new Error()).stack,
		                                    position: expr.position
		                                };
		                            }
		                            if(expr.keepArray) {
		                                step.keepArray = true;
		                            }
		                            step.focus = expr.rhs.value;
		                            step.tuple = true;
		                            break;
		                        case '#':
		                            result = processAST(expr.lhs);
		                            step = result;
		                            if (result.type === 'path') {
		                                step = result.steps[result.steps.length - 1];
		                            } else {
		                                result = {type: 'path', steps: [result]};
		                                if (typeof step.predicate !== 'undefined') {
		                                    step.stages = step.predicate;
		                                    delete step.predicate;
		                                }
		                            }
		                            if (typeof step.stages === 'undefined') {
		                                step.index = expr.rhs.value;
		                            } else {
		                                step.stages.push({type: 'index', value: expr.rhs.value, position: expr.position});
		                            }
		                            step.tuple = true;
		                            break;
		                        case '~>':
		                            result = {type: 'apply', value: expr.value, position: expr.position};
		                            result.lhs = processAST(expr.lhs);
		                            result.rhs = processAST(expr.rhs);
		                            result.keepArray = result.lhs.keepArray || result.rhs.keepArray;
		                            break;
		                        default:
		                            result = {type: expr.type, value: expr.value, position: expr.position};
		                            result.lhs = processAST(expr.lhs);
		                            result.rhs = processAST(expr.rhs);
		                            pushAncestry(result, result.lhs);
		                            pushAncestry(result, result.rhs);
		                    }
		                    break;
		                case 'unary':
		                    result = {type: expr.type, value: expr.value, position: expr.position};
		                    if (expr.value === '[') {
		                        // array constructor - process each item
		                        result.expressions = expr.expressions.map(function (item) {
		                            var value = processAST(item);
		                            pushAncestry(result, value);
		                            return value;
		                        });
		                    } else if (expr.value === '{') {
		                        // object constructor - process each pair
		                        result.lhs = expr.lhs.map(function (pair) {
		                            var key = processAST(pair[0]);
		                            pushAncestry(result, key);
		                            var value = processAST(pair[1]);
		                            pushAncestry(result, value);
		                            return [key, value];
		                        });
		                    } else {
		                        // all other unary expressions - just process the expression
		                        result.expression = processAST(expr.expression);
		                        // if unary minus on a number, then pre-process
		                        if (expr.value === '-' && result.expression.type === 'number') {
		                            result = result.expression;
		                            result.value = -result.value;
		                        } else {
		                            pushAncestry(result, result.expression);
		                        }
		                    }
		                    break;
		                case 'function':
		                case 'partial':
		                    result = {type: expr.type, name: expr.name, value: expr.value, position: expr.position};
		                    result.arguments = expr.arguments.map(function (arg) {
		                        var argAST = processAST(arg);
		                        pushAncestry(result, argAST);
		                        return argAST;
		                    });
		                    result.procedure = processAST(expr.procedure);
		                    break;
		                case 'lambda':
		                    result = {
		                        type: expr.type,
		                        arguments: expr.arguments,
		                        signature: expr.signature,
		                        position: expr.position
		                    };
		                    var body = processAST(expr.body);
		                    result.body = tailCallOptimize(body);
		                    break;
		                case 'condition':
		                    result = {type: expr.type, position: expr.position};
		                    result.condition = processAST(expr.condition);
		                    pushAncestry(result, result.condition);
		                    result.then = processAST(expr.then);
		                    pushAncestry(result, result.then);
		                    if (typeof expr.else !== 'undefined') {
		                        result.else = processAST(expr.else);
		                        pushAncestry(result, result.else);
		                    }
		                    break;
		                case 'transform':
		                    result = {type: expr.type, position: expr.position};
		                    result.pattern = processAST(expr.pattern);
		                    result.update = processAST(expr.update);
		                    if (typeof expr.delete !== 'undefined') {
		                        result.delete = processAST(expr.delete);
		                    }
		                    break;
		                case 'block':
		                    result = {type: expr.type, position: expr.position};
		                    // array of expressions - process each one
		                    result.expressions = expr.expressions.map(function (item) {
		                        var part = processAST(item);
		                        pushAncestry(result, part);
		                        if (part.consarray || (part.type === 'path' && part.steps[0].consarray)) {
		                            result.consarray = true;
		                        }
		                        return part;
		                    });
		                    // TODO scan the array of expressions to see if any of them assign variables
		                    // if so, need to mark the block as one that needs to create a new frame
		                    break;
		                case 'name':
		                    result = {type: 'path', steps: [expr]};
		                    if (expr.keepArray) {
		                        result.keepSingletonArray = true;
		                    }
		                    break;
		                case 'parent':
		                    result = {type: 'parent', slot: { label: '!' + ancestorLabel++, level: 1, index: ancestorIndex++ } };
		                    ancestry.push(result);
		                    break;
		                case 'string':
		                case 'number':
		                case 'value':
		                case 'wildcard':
		                case 'descendant':
		                case 'variable':
		                case 'regex':
		                    result = expr;
		                    break;
		                case 'operator':
		                    // the tokens 'and' and 'or' might have been used as a name rather than an operator
		                    if (expr.value === 'and' || expr.value === 'or' || expr.value === 'in') {
		                        expr.type = 'name';
		                        result = processAST(expr);
		                    } else /* istanbul ignore else */ if (expr.value === '?') {
		                        // partial application
		                        result = expr;
		                    } else {
		                        throw {
		                            code: "S0201",
		                            stack: (new Error()).stack,
		                            position: expr.position,
		                            token: expr.value
		                        };
		                    }
		                    break;
		                case 'error':
		                    result = expr;
		                    if (expr.lhs) {
		                        result = processAST(expr.lhs);
		                    }
		                    break;
		                default:
		                    var code = "S0206";
		                    /* istanbul ignore else */
		                    if (expr.id === '(end)') {
		                        code = "S0207";
		                    }
		                    var err = {
		                        code: code,
		                        position: expr.position,
		                        token: expr.value
		                    };
		                    if (recover) {
		                        errors.push(err);
		                        return {type: 'error', error: err};
		                    } else {
		                        err.stack = (new Error()).stack;
		                        throw err;
		                    }
		            }
		            if (expr.keepArray) {
		                result.keepArray = true;
		            }
		            return result;
		        };

		        // now invoke the tokenizer and the parser and return the syntax tree
		        lexer = tokenizer(source);
		        advance();
		        // parse the tokens
		        var expr = expression(0);
		        if (node.id !== '(end)') {
		            var err = {
		                code: "S0201",
		                position: node.position,
		                token: node.value
		            };
		            handleError(err);
		        }
		        expr = processAST(expr);

		        if(expr.type === 'parent' || typeof expr.seekingParent !== 'undefined') {
		            // error - trying to derive ancestor at top level
		            throw {
		                code: "S0217",
		                token: expr.type,
		                position: expr.position
		            };
		        }

		        if (errors.length > 0) {
		            expr.errors = errors;
		        }

		        return expr;
		    };

		    return parser;
		})();

		module.exports = parser;

		},{"./signature":5}],5:[function(require,module,exports){
		/**
		 * © Copyright IBM Corp. 2016, 2018 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		var utils = require('./utils');

		const signature = (() => {

		    // A mapping between the function signature symbols and the full plural of the type
		    // Expected to be used in error messages
		    var arraySignatureMapping = {
		        "a": "arrays",
		        "b": "booleans",
		        "f": "functions",
		        "n": "numbers",
		        "o": "objects",
		        "s": "strings"
		    };

		    /**
		     * Parses a function signature definition and returns a validation function
		     * @param {string} signature - the signature between the <angle brackets>
		     * @returns {Function} validation function
		     */
		    function parseSignature(signature) {
		        // create a Regex that represents this signature and return a function that when invoked,
		        // returns the validated (possibly fixed-up) arguments, or throws a validation error
		        // step through the signature, one symbol at a time
		        var position = 1;
		        var params = [];
		        var param = {};
		        var prevParam = param;
		        while (position < signature.length) {
		            var symbol = signature.charAt(position);
		            if (symbol === ':') {
		                // TODO figure out what to do with the return type
		                // ignore it for now
		                break;
		            }

		            var next = function () {
		                params.push(param);
		                prevParam = param;
		                param = {};
		            };

		            var findClosingBracket = function (str, start, openSymbol, closeSymbol) {
		                // returns the position of the closing symbol (e.g. bracket) in a string
		                // that balances the opening symbol at position start
		                var depth = 1;
		                var position = start;
		                while (position < str.length) {
		                    position++;
		                    symbol = str.charAt(position);
		                    if (symbol === closeSymbol) {
		                        depth--;
		                        if (depth === 0) {
		                            // we're done
		                            break; // out of while loop
		                        }
		                    } else if (symbol === openSymbol) {
		                        depth++;
		                    }
		                }
		                return position;
		            };

		            switch (symbol) {
		                case 's': // string
		                case 'n': // number
		                case 'b': // boolean
		                case 'l': // not so sure about expecting null?
		                case 'o': // object
		                    param.regex = '[' + symbol + 'm]';
		                    param.type = symbol;
		                    next();
		                    break;
		                case 'a': // array
		                    //  normally treat any value as singleton array
		                    param.regex = '[asnblfom]';
		                    param.type = symbol;
		                    param.array = true;
		                    next();
		                    break;
		                case 'f': // function
		                    param.regex = 'f';
		                    param.type = symbol;
		                    next();
		                    break;
		                case 'j': // any JSON type
		                    param.regex = '[asnblom]';
		                    param.type = symbol;
		                    next();
		                    break;
		                case 'x': // any type
		                    param.regex = '[asnblfom]';
		                    param.type = symbol;
		                    next();
		                    break;
		                case '-': // use context if param not supplied
		                    prevParam.context = true;
		                    prevParam.contextRegex = new RegExp(prevParam.regex); // pre-compiled to test the context type at runtime
		                    prevParam.regex += '?';
		                    break;
		                case '?': // optional param
		                case '+': // one or more
		                    prevParam.regex += symbol;
		                    break;
		                case '(': // choice of types
		                    // search forward for matching ')'
		                    var endParen = findClosingBracket(signature, position, '(', ')');
		                    var choice = signature.substring(position + 1, endParen);
		                    if (choice.indexOf('<') === -1) {
		                        // no parameterized types, simple regex
		                        param.regex = '[' + choice + 'm]';
		                    } else {
		                        // TODO harder
		                        throw {
		                            code: "S0402",
		                            stack: (new Error()).stack,
		                            value: choice,
		                            offset: position
		                        };
		                    }
		                    param.type = '(' + choice + ')';
		                    position = endParen;
		                    next();
		                    break;
		                case '<': // type parameter - can only be applied to 'a' and 'f'
		                    if (prevParam.type === 'a' || prevParam.type === 'f') {
		                        // search forward for matching '>'
		                        var endPos = findClosingBracket(signature, position, '<', '>');
		                        prevParam.subtype = signature.substring(position + 1, endPos);
		                        position = endPos;
		                    } else {
		                        throw {
		                            code: "S0401",
		                            stack: (new Error()).stack,
		                            value: prevParam.type,
		                            offset: position
		                        };
		                    }
		                    break;
		            }
		            position++;
		        }
		        var regexStr = '^' +
		            params.map(function (param) {
		                return '(' + param.regex + ')';
		            }).join('') +
		            '$';
		        var regex = new RegExp(regexStr);
		        var getSymbol = function (value) {
		            var symbol;
		            if (utils.isFunction(value)) {
		                symbol = 'f';
		            } else {
		                var type = typeof value;
		                switch (type) {
		                    case 'string':
		                        symbol = 's';
		                        break;
		                    case 'number':
		                        symbol = 'n';
		                        break;
		                    case 'boolean':
		                        symbol = 'b';
		                        break;
		                    case 'object':
		                        if (value === null) {
		                            symbol = 'l';
		                        } else if (Array.isArray(value)) {
		                            symbol = 'a';
		                        } else {
		                            symbol = 'o';
		                        }
		                        break;
		                    case 'undefined':
		                    default:
		                        // any value can be undefined, but should be allowed to match
		                        symbol = 'm'; // m for missing
		                }
		            }
		            return symbol;
		        };

		        var throwValidationError = function (badArgs, badSig) {
		            // to figure out where this went wrong we need apply each component of the
		            // regex to each argument until we get to the one that fails to match
		            var partialPattern = '^';
		            var goodTo = 0;
		            for (var index = 0; index < params.length; index++) {
		                partialPattern += params[index].regex;
		                var match = badSig.match(partialPattern);
		                if (match === null) {
		                    // failed here
		                    throw {
		                        code: "T0410",
		                        stack: (new Error()).stack,
		                        value: badArgs[goodTo],
		                        index: goodTo + 1
		                    };
		                }
		                goodTo = match[0].length;
		            }
		            // if it got this far, it's probably because of extraneous arguments (we
		            // haven't added the trailing '$' in the regex yet.
		            throw {
		                code: "T0410",
		                stack: (new Error()).stack,
		                value: badArgs[goodTo],
		                index: goodTo + 1
		            };
		        };

		        return {
		            definition: signature,
		            validate: function (args, context) {
		                var suppliedSig = '';
		                args.forEach(function (arg) {
		                    suppliedSig += getSymbol(arg);
		                });
		                var isValid = regex.exec(suppliedSig);
		                if (isValid) {
		                    var validatedArgs = [];
		                    var argIndex = 0;
		                    params.forEach(function (param, index) {
		                        var arg = args[argIndex];
		                        var match = isValid[index + 1];
		                        if (match === '') {
		                            if (param.context && param.contextRegex) {
		                                // substitute context value for missing arg
		                                // first check that the context value is the right type
		                                var contextType = getSymbol(context);
		                                // test contextType against the regex for this arg (without the trailing ?)
		                                if (param.contextRegex.test(contextType)) {
		                                    validatedArgs.push(context);
		                                } else {
		                                    // context value not compatible with this argument
		                                    throw {
		                                        code: "T0411",
		                                        stack: (new Error()).stack,
		                                        value: context,
		                                        index: argIndex + 1
		                                    };
		                                }
		                            } else {
		                                validatedArgs.push(arg);
		                                argIndex++;
		                            }
		                        } else {
		                            // may have matched multiple args (if the regex ends with a '+'
		                            // split into single tokens
		                            match.split('').forEach(function (single) {
		                                if (param.type === 'a') {
		                                    if (single === 'm') {
		                                        // missing (undefined)
		                                        arg = undefined;
		                                    } else {
		                                        arg = args[argIndex];
		                                        var arrayOK = true;
		                                        // is there type information on the contents of the array?
		                                        if (typeof param.subtype !== 'undefined') {
		                                            if (single !== 'a' && match !== param.subtype) {
		                                                arrayOK = false;
		                                            } else if (single === 'a') {
		                                                if (arg.length > 0) {
		                                                    var itemType = getSymbol(arg[0]);
		                                                    if (itemType !== param.subtype.charAt(0)) { // TODO recurse further
		                                                        arrayOK = false;
		                                                    } else {
		                                                        // make sure every item in the array is this type
		                                                        var differentItems = arg.filter(function (val) {
		                                                            return (getSymbol(val) !== itemType);
		                                                        });
		                                                        arrayOK = (differentItems.length === 0);
		                                                    }
		                                                }
		                                            }
		                                        }
		                                        if (!arrayOK) {
		                                            throw {
		                                                code: "T0412",
		                                                stack: (new Error()).stack,
		                                                value: arg,
		                                                index: argIndex + 1,
		                                                type: arraySignatureMapping[param.subtype]
		                                            };
		                                        }
		                                        // the function expects an array. If it's not one, make it so
		                                        if (single !== 'a') {
		                                            arg = [arg];
		                                        }
		                                    }
		                                    validatedArgs.push(arg);
		                                    argIndex++;
		                                } else {
		                                    validatedArgs.push(arg);
		                                    argIndex++;
		                                }
		                            });
		                        }
		                    });
		                    return validatedArgs;
		                }
		                throwValidationError(args, suppliedSig);
		            }
		        };
		    }

		    return parseSignature;
		})();

		module.exports = signature;

		},{"./utils":6}],6:[function(require,module,exports){
		/**
		 * © Copyright IBM Corp. 2016, 2018 All Rights Reserved
		 *   Project name: JSONata
		 *   This project is licensed under the MIT License, see LICENSE
		 */

		const utils = (() => {

		    /**
		     * Check if value is a finite number
		     * @param {float} n - number to evaluate
		     * @returns {boolean} True if n is a finite number
		     */
		    function isNumeric(n) {
		        var isNum = false;
		        if(typeof n === 'number') {
		            isNum = !isNaN(n);
		            if (isNum && !isFinite(n)) {
		                throw {
		                    code: "D1001",
		                    value: n,
		                    stack: (new Error()).stack
		                };
		            }
		        }
		        return isNum;
		    }

		    /**
		     * Returns true if the arg is an array of strings
		     * @param {*} arg - the item to test
		     * @returns {boolean} True if arg is an array of strings
		     */
		    function isArrayOfStrings(arg) {
		        var result = false;
		        /* istanbul ignore else */
		        if(Array.isArray(arg)) {
		            result = (arg.filter(function(item){return typeof item !== 'string';}).length === 0);
		        }
		        return result;
		    }

		    /**
		     * Returns true if the arg is an array of numbers
		     * @param {*} arg - the item to test
		     * @returns {boolean} True if arg is an array of numbers
		     */
		    function isArrayOfNumbers(arg) {
		        var result = false;
		        if(Array.isArray(arg)) {
		            result = (arg.filter(function(item){return !isNumeric(item);}).length === 0);
		        }
		        return result;
		    }

		    /**
		     * Create an empty sequence to contain query results
		     * @returns {Array} - empty sequence
		     */
		    function createSequence() {
		        var sequence = [];
		        sequence.sequence = true;
		        if (arguments.length === 1) {
		            sequence.push(arguments[0]);
		        }
		        return sequence;
		    }

		    /**
		     * Tests if a value is a sequence
		     * @param {*} value the value to test
		     * @returns {boolean} true if it's a sequence
		     */
		    function isSequence(value) {
		        return value.sequence === true && Array.isArray(value);
		    }

		    /**
		     *
		     * @param {Object} arg - expression to test
		     * @returns {boolean} - true if it is a function (lambda or built-in)
		     */
		    function isFunction(arg) {
		        return ((arg && (arg._jsonata_function === true || arg._jsonata_lambda === true)) || typeof arg === 'function');
		    }

		    /**
		     * Returns the arity (number of arguments) of the function
		     * @param {*} func - the function
		     * @returns {*} - the arity
		     */
		    function getFunctionArity(func) {
		        var arity = typeof func.arity === 'number' ? func.arity :
		            typeof func.implementation === 'function' ? func.implementation.length :
		                typeof func.length === 'number' ? func.length : func.arguments.length;
		        return arity;
		    }

		    /**
		     * Tests whether arg is a lambda function
		     * @param {*} arg - the value to test
		     * @returns {boolean} - true if it is a lambda function
		     */
		    function isLambda(arg) {
		        return arg && arg._jsonata_lambda === true;
		    }

		    // istanbul ignore next
		    var iteratorSymbol = (typeof Symbol === "function" ? Symbol : {}).iterator || "@@iterator";

		    /**
		     * @param {Object} arg - expression to test
		     * @returns {boolean} - true if it is iterable
		     */
		    function isIterable(arg) {
		        return (
		            typeof arg === 'object' &&
		            arg !== null &&
		            iteratorSymbol in arg &&
		            'next' in arg &&
		            typeof arg.next === 'function'
		        );
		    }

		    /**
		     * Compares two values for equality
		     * @param {*} lhs first value
		     * @param {*} rhs second value
		     * @returns {boolean} true if they are deep equal
		     */
		    function isDeepEqual(lhs, rhs) {
		        if (lhs === rhs) {
		            return true;
		        }
		        if(typeof lhs === 'object' && typeof rhs === 'object' && lhs !== null && rhs !== null) {
		            if(Array.isArray(lhs) && Array.isArray(rhs)) {
		                // both arrays (or sequences)
		                // must be the same length
		                if(lhs.length !== rhs.length) {
		                    return false;
		                }
		                // must contain same values in same order
		                for(var ii = 0; ii < lhs.length; ii++) {
		                    if(!isDeepEqual(lhs[ii], rhs[ii])) {
		                        return false;
		                    }
		                }
		                return true;
		            }
		            // both objects
		            // must have the same set of keys (in any order)
		            var lkeys = Object.getOwnPropertyNames(lhs);
		            var rkeys = Object.getOwnPropertyNames(rhs);
		            if(lkeys.length !== rkeys.length) {
		                return false;
		            }
		            lkeys = lkeys.sort();
		            rkeys = rkeys.sort();
		            for(ii=0; ii < lkeys.length; ii++) {
		                if(lkeys[ii] !== rkeys[ii]) {
		                    return false;
		                }
		            }
		            // must have the same values
		            for(ii=0; ii < lkeys.length; ii++) {
		                var key = lkeys[ii];
		                if(!isDeepEqual(lhs[key], rhs[key])) {
		                    return false;
		                }
		            }
		            return true;
		        }
		        return false;
		    }

		    /**
		     * @param {Object} arg - expression to test
		     * @returns {boolean} - true if it is a promise
		     */
		    function isPromise(arg) {
		        return (
		            typeof arg === 'object' &&
		                arg !== null &&
		                'then' in arg &&
		                typeof arg.then === 'function'
		        );
		    }

		    /**
		     * converts a string to an array of characters
		     * @param {string} str - the input string
		     * @returns {Array} - the array of characters
		     */
		    function stringToArray(str) {
		        var arr = [];
		        for (let char of str) {
		            arr.push(char);
		        }
		        return arr;
		    }

		    return {
		        isNumeric,
		        isArrayOfStrings,
		        isArrayOfNumbers,
		        createSequence,
		        isSequence,
		        isFunction,
		        isLambda,
		        isIterable,
		        getFunctionArity,
		        isDeepEqual,
		        stringToArray,
		        isPromise
		    };
		})();

		module.exports = utils;

		},{}]},{},[3])(3)
		}); 
	} (jsonata));
	return jsonata.exports;
}

var JsonataExpression_1;
var hasRequiredJsonataExpression;

function requireJsonataExpression () {
	if (hasRequiredJsonataExpression) return JsonataExpression_1;
	hasRequiredJsonataExpression = 1;
	const jsonata = requireJsonata();

	class JsonataExpression {
	  canHandle() {
	    return true;
	  }

	  async execute(expression, object) {
	    const jsonExpression = jsonata(expression);
	    return await jsonExpression.evaluate(object);
	  }
	}

	JsonataExpression_1 = JsonataExpression;
	return JsonataExpression_1;
}

var Adapter;
var hasRequiredAdapter;

function requireAdapter () {
	if (hasRequiredAdapter) return Adapter;
	hasRequiredAdapter = 1;
	const ExpressionProcessor = requireExpressionProcessor();
	const UuidExpression = requireUuidExpression();
	const NowExpression = requireNowExpression();
	const TimeExpression = requireTimeExpression();
	const JsonataExpression = requireJsonataExpression();

	const JSONPATH_REGEX = /\$(\[\d+])?(\.[a-zA-Z0-9-_$]+(\[\d+])?)*/g;

	const expressionProcessor = new ExpressionProcessor();
	expressionProcessor.register(new UuidExpression());
	expressionProcessor.register(new NowExpression());
	expressionProcessor.register(new TimeExpression());
	expressionProcessor.register(new JsonataExpression());

	async function adapt(adapter, rawData, root = { path: "$" }, responseMapping, transformerFactory, params) {
	  const json = await adapter.parse(rawData, params);
	  const rootNode = adapter.getRoot(json, root.path, root.type);

	  if (!rootNode || (Array.isArray(rootNode) && rootNode.length === 0)) {
	    throw new Error("No data");
	  }

	  if (Array.isArray(rootNode)) {
	    return await Promise.all(rootNode.map(item => adaptObject(adapter, item, responseMapping, transformerFactory)));
	  }

	  return await adaptObject(adapter, rootNode, responseMapping, transformerFactory);
	}

	async function adaptObject(adapter, object, responseMapping, transformerFactory) {
	  const response = {};

	  for (const [key, value] of Object.entries(responseMapping)) {
	    let path, type, defaultValue, text, transformer, expression;

	    if (typeof value === "object") {
	      path = value.path;
	      type = value.type;
	      defaultValue = value.default;
	      text = value.text;
	      transformer = value.transformer;
	      expression = value.expr;
	    } else {
	      path = value;
	    }

	    if (expression) {
	      response[key] = await expressionProcessor.evaluate(expression, object);
	      continue;
	    }

	    let fieldValue;

	    if (path) {
	      fieldValue = adapter.getValue(object, path, type);
	    } else if (text !== undefined) {
	      fieldValue = text.replace(JSONPATH_REGEX, path => {
	        const variableValue = adapter.getValue(object, path, type);
	        if (variableValue === undefined || variableValue === null) {
	          return "";
	        }
	        return variableValue;
	      }).trim();
	    } else if (type === "object") {
	      fieldValue = await adaptObject(adapter, object, value.mapping, transformerFactory);
	    }

	    if (transformer) {
	      fieldValue = transformerFactory.get(transformer).transform(fieldValue);
	    }

	    if (type === "number" && fieldValue !== undefined) {
	      fieldValue = Number(fieldValue);
	    } else if (type === "boolean" && fieldValue !== undefined) {
	      fieldValue = `${fieldValue}`.toLowerCase() === "true";
	    }

	    if (path && fieldValue !== undefined) {
	      if (type === "array") {
	        const array = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
	        fieldValue = await Promise.all(
	          array.map(item => adaptObject(adapter, item, value.mapping, transformerFactory))
	        );
	      } else if (type === "object") {
	        fieldValue = await adaptObject(adapter, fieldValue, value.mapping, transformerFactory);
	      } else if (Array.isArray(fieldValue)) {
	        fieldValue = fieldValue.join(", ");
	      }
	    }

	    if (fieldValue === "") {
	      fieldValue = undefined;
	    }

	    if (defaultValue !== undefined && fieldValue === undefined) {
	      fieldValue = defaultValue;
	    }

	    if (typeof fieldValue === "object" && Object.keys(fieldValue).length === 0) {
	      fieldValue = undefined;
	    }

	    if (fieldValue !== undefined) {
	      response[key] = fieldValue;
	    }
	  }

	  return response;
	}

	Adapter = { adapt };
	return Adapter;
}

var cjs = {};

var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;

	var stream = require$$0$3;

	const is_object = function (obj) {
	  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
	};

	class CsvError extends Error {
	  constructor(code, message, options, ...contexts) {
	    if (Array.isArray(message)) message = message.join(" ").trim();
	    super(message);
	    if (Error.captureStackTrace !== undefined) {
	      Error.captureStackTrace(this, CsvError);
	    }
	    this.code = code;
	    for (const context of contexts) {
	      for (const key in context) {
	        const value = context[key];
	        this[key] = Buffer.isBuffer(value)
	          ? value.toString(options.encoding)
	          : value == null
	            ? value
	            : JSON.parse(JSON.stringify(value));
	      }
	    }
	  }
	}

	const normalize_columns_array = function (columns) {
	  const normalizedColumns = [];
	  for (let i = 0, l = columns.length; i < l; i++) {
	    const column = columns[i];
	    if (column === undefined || column === null || column === false) {
	      normalizedColumns[i] = { disabled: true };
	    } else if (typeof column === "string") {
	      normalizedColumns[i] = { name: column };
	    } else if (is_object(column)) {
	      if (typeof column.name !== "string") {
	        throw new CsvError("CSV_OPTION_COLUMNS_MISSING_NAME", [
	          "Option columns missing name:",
	          `property "name" is required at position ${i}`,
	          "when column is an object literal",
	        ]);
	      }
	      normalizedColumns[i] = column;
	    } else {
	      throw new CsvError("CSV_INVALID_COLUMN_DEFINITION", [
	        "Invalid column definition:",
	        "expect a string or a literal object,",
	        `got ${JSON.stringify(column)} at position ${i}`,
	      ]);
	    }
	  }
	  return normalizedColumns;
	};

	class ResizeableBuffer {
	  constructor(size = 100) {
	    this.size = size;
	    this.length = 0;
	    this.buf = Buffer.allocUnsafe(size);
	  }
	  prepend(val) {
	    if (Buffer.isBuffer(val)) {
	      const length = this.length + val.length;
	      if (length >= this.size) {
	        this.resize();
	        if (length >= this.size) {
	          throw Error("INVALID_BUFFER_STATE");
	        }
	      }
	      const buf = this.buf;
	      this.buf = Buffer.allocUnsafe(this.size);
	      val.copy(this.buf, 0);
	      buf.copy(this.buf, val.length);
	      this.length += val.length;
	    } else {
	      const length = this.length++;
	      if (length === this.size) {
	        this.resize();
	      }
	      const buf = this.clone();
	      this.buf[0] = val;
	      buf.copy(this.buf, 1, 0, length);
	    }
	  }
	  append(val) {
	    const length = this.length++;
	    if (length === this.size) {
	      this.resize();
	    }
	    this.buf[length] = val;
	  }
	  clone() {
	    return Buffer.from(this.buf.slice(0, this.length));
	  }
	  resize() {
	    const length = this.length;
	    this.size = this.size * 2;
	    const buf = Buffer.allocUnsafe(this.size);
	    this.buf.copy(buf, 0, 0, length);
	    this.buf = buf;
	  }
	  toString(encoding) {
	    if (encoding) {
	      return this.buf.slice(0, this.length).toString(encoding);
	    } else {
	      return Uint8Array.prototype.slice.call(this.buf.slice(0, this.length));
	    }
	  }
	  toJSON() {
	    return this.toString("utf8");
	  }
	  reset() {
	    this.length = 0;
	  }
	}

	// white space characters
	// https://en.wikipedia.org/wiki/Whitespace_character
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#Types
	// \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
	const np = 12;
	const cr$1 = 13; // `\r`, carriage return, 0x0D in hexadécimal, 13 in decimal
	const nl$1 = 10; // `\n`, newline, 0x0A in hexadecimal, 10 in decimal
	const space = 32;
	const tab = 9;

	const init_state = function (options) {
	  return {
	    bomSkipped: false,
	    bufBytesStart: 0,
	    castField: options.cast_function,
	    commenting: false,
	    // Current error encountered by a record
	    error: undefined,
	    enabled: options.from_line === 1,
	    escaping: false,
	    escapeIsQuote:
	      Buffer.isBuffer(options.escape) &&
	      Buffer.isBuffer(options.quote) &&
	      Buffer.compare(options.escape, options.quote) === 0,
	    // columns can be `false`, `true`, `Array`
	    expectedRecordLength: Array.isArray(options.columns)
	      ? options.columns.length
	      : undefined,
	    field: new ResizeableBuffer(20),
	    firstLineToHeaders: options.cast_first_line_to_header,
	    needMoreDataSize: Math.max(
	      // Skip if the remaining buffer smaller than comment
	      options.comment !== null ? options.comment.length : 0,
	      // Skip if the remaining buffer can be delimiter
	      ...options.delimiter.map((delimiter) => delimiter.length),
	      // Skip if the remaining buffer can be escape sequence
	      options.quote !== null ? options.quote.length : 0,
	    ),
	    previousBuf: undefined,
	    quoting: false,
	    stop: false,
	    rawBuffer: new ResizeableBuffer(100),
	    record: [],
	    recordHasError: false,
	    record_length: 0,
	    recordDelimiterMaxLength:
	      options.record_delimiter.length === 0
	        ? 0
	        : Math.max(...options.record_delimiter.map((v) => v.length)),
	    trimChars: [
	      Buffer.from(" ", options.encoding)[0],
	      Buffer.from("\t", options.encoding)[0],
	    ],
	    wasQuoting: false,
	    wasRowDelimiter: false,
	    timchars: [
	      Buffer.from(Buffer.from([cr$1], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([nl$1], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([np], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([space], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([tab], "utf8").toString(), options.encoding),
	    ],
	  };
	};

	const underscore = function (str) {
	  return str.replace(/([A-Z])/g, function (_, match) {
	    return "_" + match.toLowerCase();
	  });
	};

	const normalize_options = function (opts) {
	  const options = {};
	  // Merge with user options
	  for (const opt in opts) {
	    options[underscore(opt)] = opts[opt];
	  }
	  // Normalize option `encoding`
	  // Note: defined first because other options depends on it
	  // to convert chars/strings into buffers.
	  if (options.encoding === undefined || options.encoding === true) {
	    options.encoding = "utf8";
	  } else if (options.encoding === null || options.encoding === false) {
	    options.encoding = null;
	  } else if (
	    typeof options.encoding !== "string" &&
	    options.encoding !== null
	  ) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_ENCODING",
	      [
	        "Invalid option encoding:",
	        "encoding must be a string or null to return a buffer,",
	        `got ${JSON.stringify(options.encoding)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `bom`
	  if (
	    options.bom === undefined ||
	    options.bom === null ||
	    options.bom === false
	  ) {
	    options.bom = false;
	  } else if (options.bom !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_BOM",
	      [
	        "Invalid option bom:",
	        "bom must be true,",
	        `got ${JSON.stringify(options.bom)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `cast`
	  options.cast_function = null;
	  if (
	    options.cast === undefined ||
	    options.cast === null ||
	    options.cast === false ||
	    options.cast === ""
	  ) {
	    options.cast = undefined;
	  } else if (typeof options.cast === "function") {
	    options.cast_function = options.cast;
	    options.cast = true;
	  } else if (options.cast !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_CAST",
	      [
	        "Invalid option cast:",
	        "cast must be true or a function,",
	        `got ${JSON.stringify(options.cast)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `cast_date`
	  if (
	    options.cast_date === undefined ||
	    options.cast_date === null ||
	    options.cast_date === false ||
	    options.cast_date === ""
	  ) {
	    options.cast_date = false;
	  } else if (options.cast_date === true) {
	    options.cast_date = function (value) {
	      const date = Date.parse(value);
	      return !isNaN(date) ? new Date(date) : value;
	    };
	  } else if (typeof options.cast_date !== "function") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_CAST_DATE",
	      [
	        "Invalid option cast_date:",
	        "cast_date must be true or a function,",
	        `got ${JSON.stringify(options.cast_date)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `columns`
	  options.cast_first_line_to_header = null;
	  if (options.columns === true) {
	    // Fields in the first line are converted as-is to columns
	    options.cast_first_line_to_header = undefined;
	  } else if (typeof options.columns === "function") {
	    options.cast_first_line_to_header = options.columns;
	    options.columns = true;
	  } else if (Array.isArray(options.columns)) {
	    options.columns = normalize_columns_array(options.columns);
	  } else if (
	    options.columns === undefined ||
	    options.columns === null ||
	    options.columns === false
	  ) {
	    options.columns = false;
	  } else {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_COLUMNS",
	      [
	        "Invalid option columns:",
	        "expect an array, a function or true,",
	        `got ${JSON.stringify(options.columns)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `group_columns_by_name`
	  if (
	    options.group_columns_by_name === undefined ||
	    options.group_columns_by_name === null ||
	    options.group_columns_by_name === false
	  ) {
	    options.group_columns_by_name = false;
	  } else if (options.group_columns_by_name !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
	      [
	        "Invalid option group_columns_by_name:",
	        "expect an boolean,",
	        `got ${JSON.stringify(options.group_columns_by_name)}`,
	      ],
	      options,
	    );
	  } else if (options.columns === false) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
	      [
	        "Invalid option group_columns_by_name:",
	        "the `columns` mode must be activated.",
	      ],
	      options,
	    );
	  }
	  // Normalize option `comment`
	  if (
	    options.comment === undefined ||
	    options.comment === null ||
	    options.comment === false ||
	    options.comment === ""
	  ) {
	    options.comment = null;
	  } else {
	    if (typeof options.comment === "string") {
	      options.comment = Buffer.from(options.comment, options.encoding);
	    }
	    if (!Buffer.isBuffer(options.comment)) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_COMMENT",
	        [
	          "Invalid option comment:",
	          "comment must be a buffer or a string,",
	          `got ${JSON.stringify(options.comment)}`,
	        ],
	        options,
	      );
	    }
	  }
	  // Normalize option `comment_no_infix`
	  if (
	    options.comment_no_infix === undefined ||
	    options.comment_no_infix === null ||
	    options.comment_no_infix === false
	  ) {
	    options.comment_no_infix = false;
	  } else if (options.comment_no_infix !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_COMMENT",
	      [
	        "Invalid option comment_no_infix:",
	        "value must be a boolean,",
	        `got ${JSON.stringify(options.comment_no_infix)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `delimiter`
	  const delimiter_json = JSON.stringify(options.delimiter);
	  if (!Array.isArray(options.delimiter))
	    options.delimiter = [options.delimiter];
	  if (options.delimiter.length === 0) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_DELIMITER",
	      [
	        "Invalid option delimiter:",
	        "delimiter must be a non empty string or buffer or array of string|buffer,",
	        `got ${delimiter_json}`,
	      ],
	      options,
	    );
	  }
	  options.delimiter = options.delimiter.map(function (delimiter) {
	    if (delimiter === undefined || delimiter === null || delimiter === false) {
	      return Buffer.from(",", options.encoding);
	    }
	    if (typeof delimiter === "string") {
	      delimiter = Buffer.from(delimiter, options.encoding);
	    }
	    if (!Buffer.isBuffer(delimiter) || delimiter.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_DELIMITER",
	        [
	          "Invalid option delimiter:",
	          "delimiter must be a non empty string or buffer or array of string|buffer,",
	          `got ${delimiter_json}`,
	        ],
	        options,
	      );
	    }
	    return delimiter;
	  });
	  // Normalize option `escape`
	  if (options.escape === undefined || options.escape === true) {
	    options.escape = Buffer.from('"', options.encoding);
	  } else if (typeof options.escape === "string") {
	    options.escape = Buffer.from(options.escape, options.encoding);
	  } else if (options.escape === null || options.escape === false) {
	    options.escape = null;
	  }
	  if (options.escape !== null) {
	    if (!Buffer.isBuffer(options.escape)) {
	      throw new Error(
	        `Invalid Option: escape must be a buffer, a string or a boolean, got ${JSON.stringify(options.escape)}`,
	      );
	    }
	  }
	  // Normalize option `from`
	  if (options.from === undefined || options.from === null) {
	    options.from = 1;
	  } else {
	    if (typeof options.from === "string" && /\d+/.test(options.from)) {
	      options.from = parseInt(options.from);
	    }
	    if (Number.isInteger(options.from)) {
	      if (options.from < 0) {
	        throw new Error(
	          `Invalid Option: from must be a positive integer, got ${JSON.stringify(opts.from)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: from must be an integer, got ${JSON.stringify(options.from)}`,
	      );
	    }
	  }
	  // Normalize option `from_line`
	  if (options.from_line === undefined || options.from_line === null) {
	    options.from_line = 1;
	  } else {
	    if (
	      typeof options.from_line === "string" &&
	      /\d+/.test(options.from_line)
	    ) {
	      options.from_line = parseInt(options.from_line);
	    }
	    if (Number.isInteger(options.from_line)) {
	      if (options.from_line <= 0) {
	        throw new Error(
	          `Invalid Option: from_line must be a positive integer greater than 0, got ${JSON.stringify(opts.from_line)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: from_line must be an integer, got ${JSON.stringify(opts.from_line)}`,
	      );
	    }
	  }
	  // Normalize options `ignore_last_delimiters`
	  if (
	    options.ignore_last_delimiters === undefined ||
	    options.ignore_last_delimiters === null
	  ) {
	    options.ignore_last_delimiters = false;
	  } else if (typeof options.ignore_last_delimiters === "number") {
	    options.ignore_last_delimiters = Math.floor(options.ignore_last_delimiters);
	    if (options.ignore_last_delimiters === 0) {
	      options.ignore_last_delimiters = false;
	    }
	  } else if (typeof options.ignore_last_delimiters !== "boolean") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS",
	      [
	        "Invalid option `ignore_last_delimiters`:",
	        "the value must be a boolean value or an integer,",
	        `got ${JSON.stringify(options.ignore_last_delimiters)}`,
	      ],
	      options,
	    );
	  }
	  if (options.ignore_last_delimiters === true && options.columns === false) {
	    throw new CsvError(
	      "CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS",
	      [
	        "The option `ignore_last_delimiters`",
	        "requires the activation of the `columns` option",
	      ],
	      options,
	    );
	  }
	  // Normalize option `info`
	  if (
	    options.info === undefined ||
	    options.info === null ||
	    options.info === false
	  ) {
	    options.info = false;
	  } else if (options.info !== true) {
	    throw new Error(
	      `Invalid Option: info must be true, got ${JSON.stringify(options.info)}`,
	    );
	  }
	  // Normalize option `max_record_size`
	  if (
	    options.max_record_size === undefined ||
	    options.max_record_size === null ||
	    options.max_record_size === false
	  ) {
	    options.max_record_size = 0;
	  } else if (
	    Number.isInteger(options.max_record_size) &&
	    options.max_record_size >= 0
	  ) ; else if (
	    typeof options.max_record_size === "string" &&
	    /\d+/.test(options.max_record_size)
	  ) {
	    options.max_record_size = parseInt(options.max_record_size);
	  } else {
	    throw new Error(
	      `Invalid Option: max_record_size must be a positive integer, got ${JSON.stringify(options.max_record_size)}`,
	    );
	  }
	  // Normalize option `objname`
	  if (
	    options.objname === undefined ||
	    options.objname === null ||
	    options.objname === false
	  ) {
	    options.objname = undefined;
	  } else if (Buffer.isBuffer(options.objname)) {
	    if (options.objname.length === 0) {
	      throw new Error(`Invalid Option: objname must be a non empty buffer`);
	    }
	    if (options.encoding === null) ; else {
	      options.objname = options.objname.toString(options.encoding);
	    }
	  } else if (typeof options.objname === "string") {
	    if (options.objname.length === 0) {
	      throw new Error(`Invalid Option: objname must be a non empty string`);
	    }
	    // Great, nothing to do
	  } else if (typeof options.objname === "number") ; else {
	    throw new Error(
	      `Invalid Option: objname must be a string or a buffer, got ${options.objname}`,
	    );
	  }
	  if (options.objname !== undefined) {
	    if (typeof options.objname === "number") {
	      if (options.columns !== false) {
	        throw Error(
	          "Invalid Option: objname index cannot be combined with columns or be defined as a field",
	        );
	      }
	    } else {
	      // A string or a buffer
	      if (options.columns === false) {
	        throw Error(
	          "Invalid Option: objname field must be combined with columns or be defined as an index",
	        );
	      }
	    }
	  }
	  // Normalize option `on_record`
	  if (options.on_record === undefined || options.on_record === null) {
	    options.on_record = undefined;
	  } else if (typeof options.on_record !== "function") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_ON_RECORD",
	      [
	        "Invalid option `on_record`:",
	        "expect a function,",
	        `got ${JSON.stringify(options.on_record)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `on_skip`
	  // options.on_skip ??= (err, chunk) => {
	  //   this.emit('skip', err, chunk);
	  // };
	  if (
	    options.on_skip !== undefined &&
	    options.on_skip !== null &&
	    typeof options.on_skip !== "function"
	  ) {
	    throw new Error(
	      `Invalid Option: on_skip must be a function, got ${JSON.stringify(options.on_skip)}`,
	    );
	  }
	  // Normalize option `quote`
	  if (
	    options.quote === null ||
	    options.quote === false ||
	    options.quote === ""
	  ) {
	    options.quote = null;
	  } else {
	    if (options.quote === undefined || options.quote === true) {
	      options.quote = Buffer.from('"', options.encoding);
	    } else if (typeof options.quote === "string") {
	      options.quote = Buffer.from(options.quote, options.encoding);
	    }
	    if (!Buffer.isBuffer(options.quote)) {
	      throw new Error(
	        `Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(options.quote)}`,
	      );
	    }
	  }
	  // Normalize option `raw`
	  if (
	    options.raw === undefined ||
	    options.raw === null ||
	    options.raw === false
	  ) {
	    options.raw = false;
	  } else if (options.raw !== true) {
	    throw new Error(
	      `Invalid Option: raw must be true, got ${JSON.stringify(options.raw)}`,
	    );
	  }
	  // Normalize option `record_delimiter`
	  if (options.record_delimiter === undefined) {
	    options.record_delimiter = [];
	  } else if (
	    typeof options.record_delimiter === "string" ||
	    Buffer.isBuffer(options.record_delimiter)
	  ) {
	    if (options.record_delimiter.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a non empty string or buffer,",
	          `got ${JSON.stringify(options.record_delimiter)}`,
	        ],
	        options,
	      );
	    }
	    options.record_delimiter = [options.record_delimiter];
	  } else if (!Array.isArray(options.record_delimiter)) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_RECORD_DELIMITER",
	      [
	        "Invalid option `record_delimiter`:",
	        "value must be a string, a buffer or array of string|buffer,",
	        `got ${JSON.stringify(options.record_delimiter)}`,
	      ],
	      options,
	    );
	  }
	  options.record_delimiter = options.record_delimiter.map(function (rd, i) {
	    if (typeof rd !== "string" && !Buffer.isBuffer(rd)) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a string, a buffer or array of string|buffer",
	          `at index ${i},`,
	          `got ${JSON.stringify(rd)}`,
	        ],
	        options,
	      );
	    } else if (rd.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a non empty string or buffer",
	          `at index ${i},`,
	          `got ${JSON.stringify(rd)}`,
	        ],
	        options,
	      );
	    }
	    if (typeof rd === "string") {
	      rd = Buffer.from(rd, options.encoding);
	    }
	    return rd;
	  });
	  // Normalize option `relax_column_count`
	  if (typeof options.relax_column_count === "boolean") ; else if (
	    options.relax_column_count === undefined ||
	    options.relax_column_count === null
	  ) {
	    options.relax_column_count = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count must be a boolean, got ${JSON.stringify(options.relax_column_count)}`,
	    );
	  }
	  if (typeof options.relax_column_count_less === "boolean") ; else if (
	    options.relax_column_count_less === undefined ||
	    options.relax_column_count_less === null
	  ) {
	    options.relax_column_count_less = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count_less must be a boolean, got ${JSON.stringify(options.relax_column_count_less)}`,
	    );
	  }
	  if (typeof options.relax_column_count_more === "boolean") ; else if (
	    options.relax_column_count_more === undefined ||
	    options.relax_column_count_more === null
	  ) {
	    options.relax_column_count_more = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count_more must be a boolean, got ${JSON.stringify(options.relax_column_count_more)}`,
	    );
	  }
	  // Normalize option `relax_quotes`
	  if (typeof options.relax_quotes === "boolean") ; else if (
	    options.relax_quotes === undefined ||
	    options.relax_quotes === null
	  ) {
	    options.relax_quotes = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_quotes must be a boolean, got ${JSON.stringify(options.relax_quotes)}`,
	    );
	  }
	  // Normalize option `skip_empty_lines`
	  if (typeof options.skip_empty_lines === "boolean") ; else if (
	    options.skip_empty_lines === undefined ||
	    options.skip_empty_lines === null
	  ) {
	    options.skip_empty_lines = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_empty_lines must be a boolean, got ${JSON.stringify(options.skip_empty_lines)}`,
	    );
	  }
	  // Normalize option `skip_records_with_empty_values`
	  if (typeof options.skip_records_with_empty_values === "boolean") ; else if (
	    options.skip_records_with_empty_values === undefined ||
	    options.skip_records_with_empty_values === null
	  ) {
	    options.skip_records_with_empty_values = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_records_with_empty_values must be a boolean, got ${JSON.stringify(options.skip_records_with_empty_values)}`,
	    );
	  }
	  // Normalize option `skip_records_with_error`
	  if (typeof options.skip_records_with_error === "boolean") ; else if (
	    options.skip_records_with_error === undefined ||
	    options.skip_records_with_error === null
	  ) {
	    options.skip_records_with_error = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_records_with_error must be a boolean, got ${JSON.stringify(options.skip_records_with_error)}`,
	    );
	  }
	  // Normalize option `rtrim`
	  if (
	    options.rtrim === undefined ||
	    options.rtrim === null ||
	    options.rtrim === false
	  ) {
	    options.rtrim = false;
	  } else if (options.rtrim !== true) {
	    throw new Error(
	      `Invalid Option: rtrim must be a boolean, got ${JSON.stringify(options.rtrim)}`,
	    );
	  }
	  // Normalize option `ltrim`
	  if (
	    options.ltrim === undefined ||
	    options.ltrim === null ||
	    options.ltrim === false
	  ) {
	    options.ltrim = false;
	  } else if (options.ltrim !== true) {
	    throw new Error(
	      `Invalid Option: ltrim must be a boolean, got ${JSON.stringify(options.ltrim)}`,
	    );
	  }
	  // Normalize option `trim`
	  if (
	    options.trim === undefined ||
	    options.trim === null ||
	    options.trim === false
	  ) {
	    options.trim = false;
	  } else if (options.trim !== true) {
	    throw new Error(
	      `Invalid Option: trim must be a boolean, got ${JSON.stringify(options.trim)}`,
	    );
	  }
	  // Normalize options `trim`, `ltrim` and `rtrim`
	  if (options.trim === true && opts.ltrim !== false) {
	    options.ltrim = true;
	  } else if (options.ltrim !== true) {
	    options.ltrim = false;
	  }
	  if (options.trim === true && opts.rtrim !== false) {
	    options.rtrim = true;
	  } else if (options.rtrim !== true) {
	    options.rtrim = false;
	  }
	  // Normalize option `to`
	  if (options.to === undefined || options.to === null) {
	    options.to = -1;
	  } else {
	    if (typeof options.to === "string" && /\d+/.test(options.to)) {
	      options.to = parseInt(options.to);
	    }
	    if (Number.isInteger(options.to)) {
	      if (options.to <= 0) {
	        throw new Error(
	          `Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(opts.to)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: to must be an integer, got ${JSON.stringify(opts.to)}`,
	      );
	    }
	  }
	  // Normalize option `to_line`
	  if (options.to_line === undefined || options.to_line === null) {
	    options.to_line = -1;
	  } else {
	    if (typeof options.to_line === "string" && /\d+/.test(options.to_line)) {
	      options.to_line = parseInt(options.to_line);
	    }
	    if (Number.isInteger(options.to_line)) {
	      if (options.to_line <= 0) {
	        throw new Error(
	          `Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(opts.to_line)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: to_line must be an integer, got ${JSON.stringify(opts.to_line)}`,
	      );
	    }
	  }
	  return options;
	};

	const isRecordEmpty = function (record) {
	  return record.every(
	    (field) =>
	      field == null || (field.toString && field.toString().trim() === ""),
	  );
	};

	const cr = 13; // `\r`, carriage return, 0x0D in hexadécimal, 13 in decimal
	const nl = 10; // `\n`, newline, 0x0A in hexadecimal, 10 in decimal

	const boms = {
	  // Note, the following are equals:
	  // Buffer.from("\ufeff")
	  // Buffer.from([239, 187, 191])
	  // Buffer.from('EFBBBF', 'hex')
	  utf8: Buffer.from([239, 187, 191]),
	  // Note, the following are equals:
	  // Buffer.from "\ufeff", 'utf16le
	  // Buffer.from([255, 254])
	  utf16le: Buffer.from([255, 254]),
	};

	const transform = function (original_options = {}) {
	  const info = {
	    bytes: 0,
	    comment_lines: 0,
	    empty_lines: 0,
	    invalid_field_length: 0,
	    lines: 1,
	    records: 0,
	  };
	  const options = normalize_options(original_options);
	  return {
	    info: info,
	    original_options: original_options,
	    options: options,
	    state: init_state(options),
	    __needMoreData: function (i, bufLen, end) {
	      if (end) return false;
	      const { encoding, escape, quote } = this.options;
	      const { quoting, needMoreDataSize, recordDelimiterMaxLength } =
	        this.state;
	      const numOfCharLeft = bufLen - i - 1;
	      const requiredLength = Math.max(
	        needMoreDataSize,
	        // Skip if the remaining buffer smaller than record delimiter
	        // If "record_delimiter" is yet to be discovered:
	        // 1. It is equals to `[]` and "recordDelimiterMaxLength" equals `0`
	        // 2. We set the length to windows line ending in the current encoding
	        // Note, that encoding is known from user or bom discovery at that point
	        // recordDelimiterMaxLength,
	        recordDelimiterMaxLength === 0
	          ? Buffer.from("\r\n", encoding).length
	          : recordDelimiterMaxLength,
	        // Skip if remaining buffer can be an escaped quote
	        quoting ? (escape === null ? 0 : escape.length) + quote.length : 0,
	        // Skip if remaining buffer can be record delimiter following the closing quote
	        quoting ? quote.length + recordDelimiterMaxLength : 0,
	      );
	      return numOfCharLeft < requiredLength;
	    },
	    // Central parser implementation
	    parse: function (nextBuf, end, push, close) {
	      const {
	        bom,
	        comment_no_infix,
	        encoding,
	        from_line,
	        ltrim,
	        max_record_size,
	        raw,
	        relax_quotes,
	        rtrim,
	        skip_empty_lines,
	        to,
	        to_line,
	      } = this.options;
	      let { comment, escape, quote, record_delimiter } = this.options;
	      const { bomSkipped, previousBuf, rawBuffer, escapeIsQuote } = this.state;
	      let buf;
	      if (previousBuf === undefined) {
	        if (nextBuf === undefined) {
	          // Handle empty string
	          close();
	          return;
	        } else {
	          buf = nextBuf;
	        }
	      } else if (previousBuf !== undefined && nextBuf === undefined) {
	        buf = previousBuf;
	      } else {
	        buf = Buffer.concat([previousBuf, nextBuf]);
	      }
	      // Handle UTF BOM
	      if (bomSkipped === false) {
	        if (bom === false) {
	          this.state.bomSkipped = true;
	        } else if (buf.length < 3) {
	          // No enough data
	          if (end === false) {
	            // Wait for more data
	            this.state.previousBuf = buf;
	            return;
	          }
	        } else {
	          for (const encoding in boms) {
	            if (boms[encoding].compare(buf, 0, boms[encoding].length) === 0) {
	              // Skip BOM
	              const bomLength = boms[encoding].length;
	              this.state.bufBytesStart += bomLength;
	              buf = buf.slice(bomLength);
	              // Renormalize original options with the new encoding
	              this.options = normalize_options({
	                ...this.original_options,
	                encoding: encoding,
	              });
	              // Options will re-evaluate the Buffer with the new encoding
	              ({ comment, escape, quote } = this.options);
	              break;
	            }
	          }
	          this.state.bomSkipped = true;
	        }
	      }
	      const bufLen = buf.length;
	      let pos;
	      for (pos = 0; pos < bufLen; pos++) {
	        // Ensure we get enough space to look ahead
	        // There should be a way to move this out of the loop
	        if (this.__needMoreData(pos, bufLen, end)) {
	          break;
	        }
	        if (this.state.wasRowDelimiter === true) {
	          this.info.lines++;
	          this.state.wasRowDelimiter = false;
	        }
	        if (to_line !== -1 && this.info.lines > to_line) {
	          this.state.stop = true;
	          close();
	          return;
	        }
	        // Auto discovery of record_delimiter, unix, mac and windows supported
	        if (this.state.quoting === false && record_delimiter.length === 0) {
	          const record_delimiterCount = this.__autoDiscoverRecordDelimiter(
	            buf,
	            pos,
	          );
	          if (record_delimiterCount) {
	            record_delimiter = this.options.record_delimiter;
	          }
	        }
	        const chr = buf[pos];
	        if (raw === true) {
	          rawBuffer.append(chr);
	        }
	        if (
	          (chr === cr || chr === nl) &&
	          this.state.wasRowDelimiter === false
	        ) {
	          this.state.wasRowDelimiter = true;
	        }
	        // Previous char was a valid escape char
	        // treat the current char as a regular char
	        if (this.state.escaping === true) {
	          this.state.escaping = false;
	        } else {
	          // Escape is only active inside quoted fields
	          // We are quoting, the char is an escape chr and there is a chr to escape
	          // if(escape !== null && this.state.quoting === true && chr === escape && pos + 1 < bufLen){
	          if (
	            escape !== null &&
	            this.state.quoting === true &&
	            this.__isEscape(buf, pos, chr) &&
	            pos + escape.length < bufLen
	          ) {
	            if (escapeIsQuote) {
	              if (this.__isQuote(buf, pos + escape.length)) {
	                this.state.escaping = true;
	                pos += escape.length - 1;
	                continue;
	              }
	            } else {
	              this.state.escaping = true;
	              pos += escape.length - 1;
	              continue;
	            }
	          }
	          // Not currently escaping and chr is a quote
	          // TODO: need to compare bytes instead of single char
	          if (this.state.commenting === false && this.__isQuote(buf, pos)) {
	            if (this.state.quoting === true) {
	              const nextChr = buf[pos + quote.length];
	              const isNextChrTrimable =
	                rtrim && this.__isCharTrimable(buf, pos + quote.length);
	              const isNextChrComment =
	                comment !== null &&
	                this.__compareBytes(comment, buf, pos + quote.length, nextChr);
	              const isNextChrDelimiter = this.__isDelimiter(
	                buf,
	                pos + quote.length,
	                nextChr,
	              );
	              const isNextChrRecordDelimiter =
	                record_delimiter.length === 0
	                  ? this.__autoDiscoverRecordDelimiter(buf, pos + quote.length)
	                  : this.__isRecordDelimiter(nextChr, buf, pos + quote.length);
	              // Escape a quote
	              // Treat next char as a regular character
	              if (
	                escape !== null &&
	                this.__isEscape(buf, pos, chr) &&
	                this.__isQuote(buf, pos + escape.length)
	              ) {
	                pos += escape.length - 1;
	              } else if (
	                !nextChr ||
	                isNextChrDelimiter ||
	                isNextChrRecordDelimiter ||
	                isNextChrComment ||
	                isNextChrTrimable
	              ) {
	                this.state.quoting = false;
	                this.state.wasQuoting = true;
	                pos += quote.length - 1;
	                continue;
	              } else if (relax_quotes === false) {
	                const err = this.__error(
	                  new CsvError(
	                    "CSV_INVALID_CLOSING_QUOTE",
	                    [
	                      "Invalid Closing Quote:",
	                      `got "${String.fromCharCode(nextChr)}"`,
	                      `at line ${this.info.lines}`,
	                      "instead of delimiter, record delimiter, trimable character",
	                      "(if activated) or comment",
	                    ],
	                    this.options,
	                    this.__infoField(),
	                  ),
	                );
	                if (err !== undefined) return err;
	              } else {
	                this.state.quoting = false;
	                this.state.wasQuoting = true;
	                this.state.field.prepend(quote);
	                pos += quote.length - 1;
	              }
	            } else {
	              if (this.state.field.length !== 0) {
	                // In relax_quotes mode, treat opening quote preceded by chrs as regular
	                if (relax_quotes === false) {
	                  const info = this.__infoField();
	                  const bom = Object.keys(boms)
	                    .map((b) =>
	                      boms[b].equals(this.state.field.toString()) ? b : false,
	                    )
	                    .filter(Boolean)[0];
	                  const err = this.__error(
	                    new CsvError(
	                      "INVALID_OPENING_QUOTE",
	                      [
	                        "Invalid Opening Quote:",
	                        `a quote is found on field ${JSON.stringify(info.column)} at line ${info.lines}, value is ${JSON.stringify(this.state.field.toString(encoding))}`,
	                        bom ? `(${bom} bom)` : undefined,
	                      ],
	                      this.options,
	                      info,
	                      {
	                        field: this.state.field,
	                      },
	                    ),
	                  );
	                  if (err !== undefined) return err;
	                }
	              } else {
	                this.state.quoting = true;
	                pos += quote.length - 1;
	                continue;
	              }
	            }
	          }
	          if (this.state.quoting === false) {
	            const recordDelimiterLength = this.__isRecordDelimiter(
	              chr,
	              buf,
	              pos,
	            );
	            if (recordDelimiterLength !== 0) {
	              // Do not emit comments which take a full line
	              const skipCommentLine =
	                this.state.commenting &&
	                this.state.wasQuoting === false &&
	                this.state.record.length === 0 &&
	                this.state.field.length === 0;
	              if (skipCommentLine) {
	                this.info.comment_lines++;
	                // Skip full comment line
	              } else {
	                // Activate records emition if above from_line
	                if (
	                  this.state.enabled === false &&
	                  this.info.lines +
	                    (this.state.wasRowDelimiter === true ? 1 : 0) >=
	                    from_line
	                ) {
	                  this.state.enabled = true;
	                  this.__resetField();
	                  this.__resetRecord();
	                  pos += recordDelimiterLength - 1;
	                  continue;
	                }
	                // Skip if line is empty and skip_empty_lines activated
	                if (
	                  skip_empty_lines === true &&
	                  this.state.wasQuoting === false &&
	                  this.state.record.length === 0 &&
	                  this.state.field.length === 0
	                ) {
	                  this.info.empty_lines++;
	                  pos += recordDelimiterLength - 1;
	                  continue;
	                }
	                this.info.bytes = this.state.bufBytesStart + pos;
	                const errField = this.__onField();
	                if (errField !== undefined) return errField;
	                this.info.bytes =
	                  this.state.bufBytesStart + pos + recordDelimiterLength;
	                const errRecord = this.__onRecord(push);
	                if (errRecord !== undefined) return errRecord;
	                if (to !== -1 && this.info.records >= to) {
	                  this.state.stop = true;
	                  close();
	                  return;
	                }
	              }
	              this.state.commenting = false;
	              pos += recordDelimiterLength - 1;
	              continue;
	            }
	            if (this.state.commenting) {
	              continue;
	            }
	            if (
	              comment !== null &&
	              (comment_no_infix === false ||
	                (this.state.record.length === 0 &&
	                  this.state.field.length === 0))
	            ) {
	              const commentCount = this.__compareBytes(comment, buf, pos, chr);
	              if (commentCount !== 0) {
	                this.state.commenting = true;
	                continue;
	              }
	            }
	            const delimiterLength = this.__isDelimiter(buf, pos, chr);
	            if (delimiterLength !== 0) {
	              this.info.bytes = this.state.bufBytesStart + pos;
	              const errField = this.__onField();
	              if (errField !== undefined) return errField;
	              pos += delimiterLength - 1;
	              continue;
	            }
	          }
	        }
	        if (this.state.commenting === false) {
	          if (
	            max_record_size !== 0 &&
	            this.state.record_length + this.state.field.length > max_record_size
	          ) {
	            return this.__error(
	              new CsvError(
	                "CSV_MAX_RECORD_SIZE",
	                [
	                  "Max Record Size:",
	                  "record exceed the maximum number of tolerated bytes",
	                  `of ${max_record_size}`,
	                  `at line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	              ),
	            );
	          }
	        }
	        const lappend =
	          ltrim === false ||
	          this.state.quoting === true ||
	          this.state.field.length !== 0 ||
	          !this.__isCharTrimable(buf, pos);
	        // rtrim in non quoting is handle in __onField
	        const rappend = rtrim === false || this.state.wasQuoting === false;
	        if (lappend === true && rappend === true) {
	          this.state.field.append(chr);
	        } else if (rtrim === true && !this.__isCharTrimable(buf, pos)) {
	          return this.__error(
	            new CsvError(
	              "CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE",
	              [
	                "Invalid Closing Quote:",
	                "found non trimable byte after quote",
	                `at line ${this.info.lines}`,
	              ],
	              this.options,
	              this.__infoField(),
	            ),
	          );
	        } else {
	          if (lappend === false) {
	            pos += this.__isCharTrimable(buf, pos) - 1;
	          }
	          continue;
	        }
	      }
	      if (end === true) {
	        // Ensure we are not ending in a quoting state
	        if (this.state.quoting === true) {
	          const err = this.__error(
	            new CsvError(
	              "CSV_QUOTE_NOT_CLOSED",
	              [
	                "Quote Not Closed:",
	                `the parsing is finished with an opening quote at line ${this.info.lines}`,
	              ],
	              this.options,
	              this.__infoField(),
	            ),
	          );
	          if (err !== undefined) return err;
	        } else {
	          // Skip last line if it has no characters
	          if (
	            this.state.wasQuoting === true ||
	            this.state.record.length !== 0 ||
	            this.state.field.length !== 0
	          ) {
	            this.info.bytes = this.state.bufBytesStart + pos;
	            const errField = this.__onField();
	            if (errField !== undefined) return errField;
	            const errRecord = this.__onRecord(push);
	            if (errRecord !== undefined) return errRecord;
	          } else if (this.state.wasRowDelimiter === true) {
	            this.info.empty_lines++;
	          } else if (this.state.commenting === true) {
	            this.info.comment_lines++;
	          }
	        }
	      } else {
	        this.state.bufBytesStart += pos;
	        this.state.previousBuf = buf.slice(pos);
	      }
	      if (this.state.wasRowDelimiter === true) {
	        this.info.lines++;
	        this.state.wasRowDelimiter = false;
	      }
	    },
	    __onRecord: function (push) {
	      const {
	        columns,
	        group_columns_by_name,
	        encoding,
	        info,
	        from,
	        relax_column_count,
	        relax_column_count_less,
	        relax_column_count_more,
	        raw,
	        skip_records_with_empty_values,
	      } = this.options;
	      const { enabled, record } = this.state;
	      if (enabled === false) {
	        return this.__resetRecord();
	      }
	      // Convert the first line into column names
	      const recordLength = record.length;
	      if (columns === true) {
	        if (skip_records_with_empty_values === true && isRecordEmpty(record)) {
	          this.__resetRecord();
	          return;
	        }
	        return this.__firstLineToColumns(record);
	      }
	      if (columns === false && this.info.records === 0) {
	        this.state.expectedRecordLength = recordLength;
	      }
	      if (recordLength !== this.state.expectedRecordLength) {
	        const err =
	          columns === false
	            ? new CsvError(
	                "CSV_RECORD_INCONSISTENT_FIELDS_LENGTH",
	                [
	                  "Invalid Record Length:",
	                  `expect ${this.state.expectedRecordLength},`,
	                  `got ${recordLength} on line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	                {
	                  record: record,
	                },
	              )
	            : new CsvError(
	                "CSV_RECORD_INCONSISTENT_COLUMNS",
	                [
	                  "Invalid Record Length:",
	                  `columns length is ${columns.length},`, // rename columns
	                  `got ${recordLength} on line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	                {
	                  record: record,
	                },
	              );
	        if (
	          relax_column_count === true ||
	          (relax_column_count_less === true &&
	            recordLength < this.state.expectedRecordLength) ||
	          (relax_column_count_more === true &&
	            recordLength > this.state.expectedRecordLength)
	        ) {
	          this.info.invalid_field_length++;
	          this.state.error = err;
	          // Error is undefined with skip_records_with_error
	        } else {
	          const finalErr = this.__error(err);
	          if (finalErr) return finalErr;
	        }
	      }
	      if (skip_records_with_empty_values === true && isRecordEmpty(record)) {
	        this.__resetRecord();
	        return;
	      }
	      if (this.state.recordHasError === true) {
	        this.__resetRecord();
	        this.state.recordHasError = false;
	        return;
	      }
	      this.info.records++;
	      if (from === 1 || this.info.records >= from) {
	        const { objname } = this.options;
	        // With columns, records are object
	        if (columns !== false) {
	          const obj = {};
	          // Transform record array to an object
	          for (let i = 0, l = record.length; i < l; i++) {
	            if (columns[i] === undefined || columns[i].disabled) continue;
	            // Turn duplicate columns into an array
	            if (
	              group_columns_by_name === true &&
	              obj[columns[i].name] !== undefined
	            ) {
	              if (Array.isArray(obj[columns[i].name])) {
	                obj[columns[i].name] = obj[columns[i].name].concat(record[i]);
	              } else {
	                obj[columns[i].name] = [obj[columns[i].name], record[i]];
	              }
	            } else {
	              obj[columns[i].name] = record[i];
	            }
	          }
	          // Without objname (default)
	          if (raw === true || info === true) {
	            const extRecord = Object.assign(
	              { record: obj },
	              raw === true
	                ? { raw: this.state.rawBuffer.toString(encoding) }
	                : {},
	              info === true ? { info: this.__infoRecord() } : {},
	            );
	            const err = this.__push(
	              objname === undefined ? extRecord : [obj[objname], extRecord],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          } else {
	            const err = this.__push(
	              objname === undefined ? obj : [obj[objname], obj],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          }
	          // Without columns, records are array
	        } else {
	          if (raw === true || info === true) {
	            const extRecord = Object.assign(
	              { record: record },
	              raw === true
	                ? { raw: this.state.rawBuffer.toString(encoding) }
	                : {},
	              info === true ? { info: this.__infoRecord() } : {},
	            );
	            const err = this.__push(
	              objname === undefined ? extRecord : [record[objname], extRecord],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          } else {
	            const err = this.__push(
	              objname === undefined ? record : [record[objname], record],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          }
	        }
	      }
	      this.__resetRecord();
	    },
	    __firstLineToColumns: function (record) {
	      const { firstLineToHeaders } = this.state;
	      try {
	        const headers =
	          firstLineToHeaders === undefined
	            ? record
	            : firstLineToHeaders.call(null, record);
	        if (!Array.isArray(headers)) {
	          return this.__error(
	            new CsvError(
	              "CSV_INVALID_COLUMN_MAPPING",
	              [
	                "Invalid Column Mapping:",
	                "expect an array from column function,",
	                `got ${JSON.stringify(headers)}`,
	              ],
	              this.options,
	              this.__infoField(),
	              {
	                headers: headers,
	              },
	            ),
	          );
	        }
	        const normalizedHeaders = normalize_columns_array(headers);
	        this.state.expectedRecordLength = normalizedHeaders.length;
	        this.options.columns = normalizedHeaders;
	        this.__resetRecord();
	        return;
	      } catch (err) {
	        return err;
	      }
	    },
	    __resetRecord: function () {
	      if (this.options.raw === true) {
	        this.state.rawBuffer.reset();
	      }
	      this.state.error = undefined;
	      this.state.record = [];
	      this.state.record_length = 0;
	    },
	    __onField: function () {
	      const { cast, encoding, rtrim, max_record_size } = this.options;
	      const { enabled, wasQuoting } = this.state;
	      // Short circuit for the from_line options
	      if (enabled === false) {
	        return this.__resetField();
	      }
	      let field = this.state.field.toString(encoding);
	      if (rtrim === true && wasQuoting === false) {
	        field = field.trimRight();
	      }
	      if (cast === true) {
	        const [err, f] = this.__cast(field);
	        if (err !== undefined) return err;
	        field = f;
	      }
	      this.state.record.push(field);
	      // Increment record length if record size must not exceed a limit
	      if (max_record_size !== 0 && typeof field === "string") {
	        this.state.record_length += field.length;
	      }
	      this.__resetField();
	    },
	    __resetField: function () {
	      this.state.field.reset();
	      this.state.wasQuoting = false;
	    },
	    __push: function (record, push) {
	      const { on_record } = this.options;
	      if (on_record !== undefined) {
	        const info = this.__infoRecord();
	        try {
	          record = on_record.call(null, record, info);
	        } catch (err) {
	          return err;
	        }
	        if (record === undefined || record === null) {
	          return;
	        }
	      }
	      push(record);
	    },
	    // Return a tuple with the error and the casted value
	    __cast: function (field) {
	      const { columns, relax_column_count } = this.options;
	      const isColumns = Array.isArray(columns);
	      // Dont loose time calling cast
	      // because the final record is an object
	      // and this field can't be associated to a key present in columns
	      if (
	        isColumns === true &&
	        relax_column_count &&
	        this.options.columns.length <= this.state.record.length
	      ) {
	        return [undefined, undefined];
	      }
	      if (this.state.castField !== null) {
	        try {
	          const info = this.__infoField();
	          return [undefined, this.state.castField.call(null, field, info)];
	        } catch (err) {
	          return [err];
	        }
	      }
	      if (this.__isFloat(field)) {
	        return [undefined, parseFloat(field)];
	      } else if (this.options.cast_date !== false) {
	        const info = this.__infoField();
	        return [undefined, this.options.cast_date.call(null, field, info)];
	      }
	      return [undefined, field];
	    },
	    // Helper to test if a character is a space or a line delimiter
	    __isCharTrimable: function (buf, pos) {
	      const isTrim = (buf, pos) => {
	        const { timchars } = this.state;
	        loop1: for (let i = 0; i < timchars.length; i++) {
	          const timchar = timchars[i];
	          for (let j = 0; j < timchar.length; j++) {
	            if (timchar[j] !== buf[pos + j]) continue loop1;
	          }
	          return timchar.length;
	        }
	        return 0;
	      };
	      return isTrim(buf, pos);
	    },
	    // Keep it in case we implement the `cast_int` option
	    // __isInt(value){
	    //   // return Number.isInteger(parseInt(value))
	    //   // return !isNaN( parseInt( obj ) );
	    //   return /^(\-|\+)?[1-9][0-9]*$/.test(value)
	    // }
	    __isFloat: function (value) {
	      return value - parseFloat(value) + 1 >= 0; // Borrowed from jquery
	    },
	    __compareBytes: function (sourceBuf, targetBuf, targetPos, firstByte) {
	      if (sourceBuf[0] !== firstByte) return 0;
	      const sourceLength = sourceBuf.length;
	      for (let i = 1; i < sourceLength; i++) {
	        if (sourceBuf[i] !== targetBuf[targetPos + i]) return 0;
	      }
	      return sourceLength;
	    },
	    __isDelimiter: function (buf, pos, chr) {
	      const { delimiter, ignore_last_delimiters } = this.options;
	      if (
	        ignore_last_delimiters === true &&
	        this.state.record.length === this.options.columns.length - 1
	      ) {
	        return 0;
	      } else if (
	        ignore_last_delimiters !== false &&
	        typeof ignore_last_delimiters === "number" &&
	        this.state.record.length === ignore_last_delimiters - 1
	      ) {
	        return 0;
	      }
	      loop1: for (let i = 0; i < delimiter.length; i++) {
	        const del = delimiter[i];
	        if (del[0] === chr) {
	          for (let j = 1; j < del.length; j++) {
	            if (del[j] !== buf[pos + j]) continue loop1;
	          }
	          return del.length;
	        }
	      }
	      return 0;
	    },
	    __isRecordDelimiter: function (chr, buf, pos) {
	      const { record_delimiter } = this.options;
	      const recordDelimiterLength = record_delimiter.length;
	      loop1: for (let i = 0; i < recordDelimiterLength; i++) {
	        const rd = record_delimiter[i];
	        const rdLength = rd.length;
	        if (rd[0] !== chr) {
	          continue;
	        }
	        for (let j = 1; j < rdLength; j++) {
	          if (rd[j] !== buf[pos + j]) {
	            continue loop1;
	          }
	        }
	        return rd.length;
	      }
	      return 0;
	    },
	    __isEscape: function (buf, pos, chr) {
	      const { escape } = this.options;
	      if (escape === null) return false;
	      const l = escape.length;
	      if (escape[0] === chr) {
	        for (let i = 0; i < l; i++) {
	          if (escape[i] !== buf[pos + i]) {
	            return false;
	          }
	        }
	        return true;
	      }
	      return false;
	    },
	    __isQuote: function (buf, pos) {
	      const { quote } = this.options;
	      if (quote === null) return false;
	      const l = quote.length;
	      for (let i = 0; i < l; i++) {
	        if (quote[i] !== buf[pos + i]) {
	          return false;
	        }
	      }
	      return true;
	    },
	    __autoDiscoverRecordDelimiter: function (buf, pos) {
	      const { encoding } = this.options;
	      // Note, we don't need to cache this information in state,
	      // It is only called on the first line until we find out a suitable
	      // record delimiter.
	      const rds = [
	        // Important, the windows line ending must be before mac os 9
	        Buffer.from("\r\n", encoding),
	        Buffer.from("\n", encoding),
	        Buffer.from("\r", encoding),
	      ];
	      loop: for (let i = 0; i < rds.length; i++) {
	        const l = rds[i].length;
	        for (let j = 0; j < l; j++) {
	          if (rds[i][j] !== buf[pos + j]) {
	            continue loop;
	          }
	        }
	        this.options.record_delimiter.push(rds[i]);
	        this.state.recordDelimiterMaxLength = rds[i].length;
	        return rds[i].length;
	      }
	      return 0;
	    },
	    __error: function (msg) {
	      const { encoding, raw, skip_records_with_error } = this.options;
	      const err = typeof msg === "string" ? new Error(msg) : msg;
	      if (skip_records_with_error) {
	        this.state.recordHasError = true;
	        if (this.options.on_skip !== undefined) {
	          this.options.on_skip(
	            err,
	            raw ? this.state.rawBuffer.toString(encoding) : undefined,
	          );
	        }
	        // this.emit('skip', err, raw ? this.state.rawBuffer.toString(encoding) : undefined);
	        return undefined;
	      } else {
	        return err;
	      }
	    },
	    __infoDataSet: function () {
	      return {
	        ...this.info,
	        columns: this.options.columns,
	      };
	    },
	    __infoRecord: function () {
	      const { columns, raw, encoding } = this.options;
	      return {
	        ...this.__infoDataSet(),
	        error: this.state.error,
	        header: columns === true,
	        index: this.state.record.length,
	        raw: raw ? this.state.rawBuffer.toString(encoding) : undefined,
	      };
	    },
	    __infoField: function () {
	      const { columns } = this.options;
	      const isColumns = Array.isArray(columns);
	      return {
	        ...this.__infoRecord(),
	        column:
	          isColumns === true
	            ? columns.length > this.state.record.length
	              ? columns[this.state.record.length].name
	              : null
	            : this.state.record.length,
	        quoting: this.state.wasQuoting,
	      };
	    },
	  };
	};

	/*
	CSV Parse

	Please look at the [project documentation](https://csv.js.org/parse/) for
	additional information.
	*/


	class Parser extends stream.Transform {
	  constructor(opts = {}) {
	    super({ ...{ readableObjectMode: true }, ...opts, encoding: null });
	    this.api = transform({
	      on_skip: (err, chunk) => {
	        this.emit("skip", err, chunk);
	      },
	      ...opts,
	    });
	    // Backward compatibility
	    this.state = this.api.state;
	    this.options = this.api.options;
	    this.info = this.api.info;
	  }
	  // Implementation of `Transform._transform`
	  _transform(buf, _, callback) {
	    if (this.state.stop === true) {
	      return;
	    }
	    const err = this.api.parse(
	      buf,
	      false,
	      (record) => {
	        this.push(record);
	      },
	      () => {
	        this.push(null);
	        this.end();
	        // Fix #333 and break #410
	        //   ko: api.stream.iterator.coffee
	        //   ko with v21.4.0, ok with node v20.5.1: api.stream.finished # aborted (with generate())
	        //   ko: api.stream.finished # aborted (with Readable)
	        // this.destroy()
	        // Fix #410 and partially break #333
	        //   ok: api.stream.iterator.coffee
	        //   ok: api.stream.finished # aborted (with generate())
	        //   broken: api.stream.finished # aborted (with Readable)
	        this.on("end", this.destroy);
	      },
	    );
	    if (err !== undefined) {
	      this.state.stop = true;
	    }
	    callback(err);
	  }
	  // Implementation of `Transform._flush`
	  _flush(callback) {
	    if (this.state.stop === true) {
	      return;
	    }
	    const err = this.api.parse(
	      undefined,
	      true,
	      (record) => {
	        this.push(record);
	      },
	      () => {
	        this.push(null);
	        this.on("end", this.destroy);
	      },
	    );
	    callback(err);
	  }
	}

	const parse = function () {
	  let data, options, callback;
	  for (const i in arguments) {
	    const argument = arguments[i];
	    const type = typeof argument;
	    if (
	      data === undefined &&
	      (typeof argument === "string" || Buffer.isBuffer(argument))
	    ) {
	      data = argument;
	    } else if (options === undefined && is_object(argument)) {
	      options = argument;
	    } else if (callback === undefined && type === "function") {
	      callback = argument;
	    } else {
	      throw new CsvError(
	        "CSV_INVALID_ARGUMENT",
	        ["Invalid argument:", `got ${JSON.stringify(argument)} at index ${i}`],
	        options || {},
	      );
	    }
	  }
	  const parser = new Parser(options);
	  if (callback) {
	    const records =
	      options === undefined || options.objname === undefined ? [] : {};
	    parser.on("readable", function () {
	      let record;
	      while ((record = this.read()) !== null) {
	        if (options === undefined || options.objname === undefined) {
	          records.push(record);
	        } else {
	          records[record[0]] = record[1];
	        }
	      }
	    });
	    parser.on("error", function (err) {
	      callback(err, undefined, parser.api.__infoDataSet());
	    });
	    parser.on("end", function () {
	      callback(undefined, records, parser.api.__infoDataSet());
	    });
	  }
	  if (data !== undefined) {
	    const writer = function () {
	      parser.write(data);
	      parser.end();
	    };
	    // Support Deno, Rollup doesnt provide a shim for setImmediate
	    if (typeof setImmediate === "function") {
	      setImmediate(writer);
	    } else {
	      setTimeout(writer, 0);
	    }
	  }
	  return parser;
	};

	cjs.CsvError = CsvError;
	cjs.Parser = Parser;
	cjs.parse = parse;
	return cjs;
}

var sync = {};

var hasRequiredSync;

function requireSync () {
	if (hasRequiredSync) return sync;
	hasRequiredSync = 1;

	class CsvError extends Error {
	  constructor(code, message, options, ...contexts) {
	    if (Array.isArray(message)) message = message.join(" ").trim();
	    super(message);
	    if (Error.captureStackTrace !== undefined) {
	      Error.captureStackTrace(this, CsvError);
	    }
	    this.code = code;
	    for (const context of contexts) {
	      for (const key in context) {
	        const value = context[key];
	        this[key] = Buffer.isBuffer(value)
	          ? value.toString(options.encoding)
	          : value == null
	            ? value
	            : JSON.parse(JSON.stringify(value));
	      }
	    }
	  }
	}

	const is_object = function (obj) {
	  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
	};

	const normalize_columns_array = function (columns) {
	  const normalizedColumns = [];
	  for (let i = 0, l = columns.length; i < l; i++) {
	    const column = columns[i];
	    if (column === undefined || column === null || column === false) {
	      normalizedColumns[i] = { disabled: true };
	    } else if (typeof column === "string") {
	      normalizedColumns[i] = { name: column };
	    } else if (is_object(column)) {
	      if (typeof column.name !== "string") {
	        throw new CsvError("CSV_OPTION_COLUMNS_MISSING_NAME", [
	          "Option columns missing name:",
	          `property "name" is required at position ${i}`,
	          "when column is an object literal",
	        ]);
	      }
	      normalizedColumns[i] = column;
	    } else {
	      throw new CsvError("CSV_INVALID_COLUMN_DEFINITION", [
	        "Invalid column definition:",
	        "expect a string or a literal object,",
	        `got ${JSON.stringify(column)} at position ${i}`,
	      ]);
	    }
	  }
	  return normalizedColumns;
	};

	class ResizeableBuffer {
	  constructor(size = 100) {
	    this.size = size;
	    this.length = 0;
	    this.buf = Buffer.allocUnsafe(size);
	  }
	  prepend(val) {
	    if (Buffer.isBuffer(val)) {
	      const length = this.length + val.length;
	      if (length >= this.size) {
	        this.resize();
	        if (length >= this.size) {
	          throw Error("INVALID_BUFFER_STATE");
	        }
	      }
	      const buf = this.buf;
	      this.buf = Buffer.allocUnsafe(this.size);
	      val.copy(this.buf, 0);
	      buf.copy(this.buf, val.length);
	      this.length += val.length;
	    } else {
	      const length = this.length++;
	      if (length === this.size) {
	        this.resize();
	      }
	      const buf = this.clone();
	      this.buf[0] = val;
	      buf.copy(this.buf, 1, 0, length);
	    }
	  }
	  append(val) {
	    const length = this.length++;
	    if (length === this.size) {
	      this.resize();
	    }
	    this.buf[length] = val;
	  }
	  clone() {
	    return Buffer.from(this.buf.slice(0, this.length));
	  }
	  resize() {
	    const length = this.length;
	    this.size = this.size * 2;
	    const buf = Buffer.allocUnsafe(this.size);
	    this.buf.copy(buf, 0, 0, length);
	    this.buf = buf;
	  }
	  toString(encoding) {
	    if (encoding) {
	      return this.buf.slice(0, this.length).toString(encoding);
	    } else {
	      return Uint8Array.prototype.slice.call(this.buf.slice(0, this.length));
	    }
	  }
	  toJSON() {
	    return this.toString("utf8");
	  }
	  reset() {
	    this.length = 0;
	  }
	}

	// white space characters
	// https://en.wikipedia.org/wiki/Whitespace_character
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#Types
	// \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
	const np = 12;
	const cr$1 = 13; // `\r`, carriage return, 0x0D in hexadécimal, 13 in decimal
	const nl$1 = 10; // `\n`, newline, 0x0A in hexadecimal, 10 in decimal
	const space = 32;
	const tab = 9;

	const init_state = function (options) {
	  return {
	    bomSkipped: false,
	    bufBytesStart: 0,
	    castField: options.cast_function,
	    commenting: false,
	    // Current error encountered by a record
	    error: undefined,
	    enabled: options.from_line === 1,
	    escaping: false,
	    escapeIsQuote:
	      Buffer.isBuffer(options.escape) &&
	      Buffer.isBuffer(options.quote) &&
	      Buffer.compare(options.escape, options.quote) === 0,
	    // columns can be `false`, `true`, `Array`
	    expectedRecordLength: Array.isArray(options.columns)
	      ? options.columns.length
	      : undefined,
	    field: new ResizeableBuffer(20),
	    firstLineToHeaders: options.cast_first_line_to_header,
	    needMoreDataSize: Math.max(
	      // Skip if the remaining buffer smaller than comment
	      options.comment !== null ? options.comment.length : 0,
	      // Skip if the remaining buffer can be delimiter
	      ...options.delimiter.map((delimiter) => delimiter.length),
	      // Skip if the remaining buffer can be escape sequence
	      options.quote !== null ? options.quote.length : 0,
	    ),
	    previousBuf: undefined,
	    quoting: false,
	    stop: false,
	    rawBuffer: new ResizeableBuffer(100),
	    record: [],
	    recordHasError: false,
	    record_length: 0,
	    recordDelimiterMaxLength:
	      options.record_delimiter.length === 0
	        ? 0
	        : Math.max(...options.record_delimiter.map((v) => v.length)),
	    trimChars: [
	      Buffer.from(" ", options.encoding)[0],
	      Buffer.from("\t", options.encoding)[0],
	    ],
	    wasQuoting: false,
	    wasRowDelimiter: false,
	    timchars: [
	      Buffer.from(Buffer.from([cr$1], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([nl$1], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([np], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([space], "utf8").toString(), options.encoding),
	      Buffer.from(Buffer.from([tab], "utf8").toString(), options.encoding),
	    ],
	  };
	};

	const underscore = function (str) {
	  return str.replace(/([A-Z])/g, function (_, match) {
	    return "_" + match.toLowerCase();
	  });
	};

	const normalize_options = function (opts) {
	  const options = {};
	  // Merge with user options
	  for (const opt in opts) {
	    options[underscore(opt)] = opts[opt];
	  }
	  // Normalize option `encoding`
	  // Note: defined first because other options depends on it
	  // to convert chars/strings into buffers.
	  if (options.encoding === undefined || options.encoding === true) {
	    options.encoding = "utf8";
	  } else if (options.encoding === null || options.encoding === false) {
	    options.encoding = null;
	  } else if (
	    typeof options.encoding !== "string" &&
	    options.encoding !== null
	  ) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_ENCODING",
	      [
	        "Invalid option encoding:",
	        "encoding must be a string or null to return a buffer,",
	        `got ${JSON.stringify(options.encoding)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `bom`
	  if (
	    options.bom === undefined ||
	    options.bom === null ||
	    options.bom === false
	  ) {
	    options.bom = false;
	  } else if (options.bom !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_BOM",
	      [
	        "Invalid option bom:",
	        "bom must be true,",
	        `got ${JSON.stringify(options.bom)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `cast`
	  options.cast_function = null;
	  if (
	    options.cast === undefined ||
	    options.cast === null ||
	    options.cast === false ||
	    options.cast === ""
	  ) {
	    options.cast = undefined;
	  } else if (typeof options.cast === "function") {
	    options.cast_function = options.cast;
	    options.cast = true;
	  } else if (options.cast !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_CAST",
	      [
	        "Invalid option cast:",
	        "cast must be true or a function,",
	        `got ${JSON.stringify(options.cast)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `cast_date`
	  if (
	    options.cast_date === undefined ||
	    options.cast_date === null ||
	    options.cast_date === false ||
	    options.cast_date === ""
	  ) {
	    options.cast_date = false;
	  } else if (options.cast_date === true) {
	    options.cast_date = function (value) {
	      const date = Date.parse(value);
	      return !isNaN(date) ? new Date(date) : value;
	    };
	  } else if (typeof options.cast_date !== "function") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_CAST_DATE",
	      [
	        "Invalid option cast_date:",
	        "cast_date must be true or a function,",
	        `got ${JSON.stringify(options.cast_date)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `columns`
	  options.cast_first_line_to_header = null;
	  if (options.columns === true) {
	    // Fields in the first line are converted as-is to columns
	    options.cast_first_line_to_header = undefined;
	  } else if (typeof options.columns === "function") {
	    options.cast_first_line_to_header = options.columns;
	    options.columns = true;
	  } else if (Array.isArray(options.columns)) {
	    options.columns = normalize_columns_array(options.columns);
	  } else if (
	    options.columns === undefined ||
	    options.columns === null ||
	    options.columns === false
	  ) {
	    options.columns = false;
	  } else {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_COLUMNS",
	      [
	        "Invalid option columns:",
	        "expect an array, a function or true,",
	        `got ${JSON.stringify(options.columns)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `group_columns_by_name`
	  if (
	    options.group_columns_by_name === undefined ||
	    options.group_columns_by_name === null ||
	    options.group_columns_by_name === false
	  ) {
	    options.group_columns_by_name = false;
	  } else if (options.group_columns_by_name !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
	      [
	        "Invalid option group_columns_by_name:",
	        "expect an boolean,",
	        `got ${JSON.stringify(options.group_columns_by_name)}`,
	      ],
	      options,
	    );
	  } else if (options.columns === false) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
	      [
	        "Invalid option group_columns_by_name:",
	        "the `columns` mode must be activated.",
	      ],
	      options,
	    );
	  }
	  // Normalize option `comment`
	  if (
	    options.comment === undefined ||
	    options.comment === null ||
	    options.comment === false ||
	    options.comment === ""
	  ) {
	    options.comment = null;
	  } else {
	    if (typeof options.comment === "string") {
	      options.comment = Buffer.from(options.comment, options.encoding);
	    }
	    if (!Buffer.isBuffer(options.comment)) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_COMMENT",
	        [
	          "Invalid option comment:",
	          "comment must be a buffer or a string,",
	          `got ${JSON.stringify(options.comment)}`,
	        ],
	        options,
	      );
	    }
	  }
	  // Normalize option `comment_no_infix`
	  if (
	    options.comment_no_infix === undefined ||
	    options.comment_no_infix === null ||
	    options.comment_no_infix === false
	  ) {
	    options.comment_no_infix = false;
	  } else if (options.comment_no_infix !== true) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_COMMENT",
	      [
	        "Invalid option comment_no_infix:",
	        "value must be a boolean,",
	        `got ${JSON.stringify(options.comment_no_infix)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `delimiter`
	  const delimiter_json = JSON.stringify(options.delimiter);
	  if (!Array.isArray(options.delimiter))
	    options.delimiter = [options.delimiter];
	  if (options.delimiter.length === 0) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_DELIMITER",
	      [
	        "Invalid option delimiter:",
	        "delimiter must be a non empty string or buffer or array of string|buffer,",
	        `got ${delimiter_json}`,
	      ],
	      options,
	    );
	  }
	  options.delimiter = options.delimiter.map(function (delimiter) {
	    if (delimiter === undefined || delimiter === null || delimiter === false) {
	      return Buffer.from(",", options.encoding);
	    }
	    if (typeof delimiter === "string") {
	      delimiter = Buffer.from(delimiter, options.encoding);
	    }
	    if (!Buffer.isBuffer(delimiter) || delimiter.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_DELIMITER",
	        [
	          "Invalid option delimiter:",
	          "delimiter must be a non empty string or buffer or array of string|buffer,",
	          `got ${delimiter_json}`,
	        ],
	        options,
	      );
	    }
	    return delimiter;
	  });
	  // Normalize option `escape`
	  if (options.escape === undefined || options.escape === true) {
	    options.escape = Buffer.from('"', options.encoding);
	  } else if (typeof options.escape === "string") {
	    options.escape = Buffer.from(options.escape, options.encoding);
	  } else if (options.escape === null || options.escape === false) {
	    options.escape = null;
	  }
	  if (options.escape !== null) {
	    if (!Buffer.isBuffer(options.escape)) {
	      throw new Error(
	        `Invalid Option: escape must be a buffer, a string or a boolean, got ${JSON.stringify(options.escape)}`,
	      );
	    }
	  }
	  // Normalize option `from`
	  if (options.from === undefined || options.from === null) {
	    options.from = 1;
	  } else {
	    if (typeof options.from === "string" && /\d+/.test(options.from)) {
	      options.from = parseInt(options.from);
	    }
	    if (Number.isInteger(options.from)) {
	      if (options.from < 0) {
	        throw new Error(
	          `Invalid Option: from must be a positive integer, got ${JSON.stringify(opts.from)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: from must be an integer, got ${JSON.stringify(options.from)}`,
	      );
	    }
	  }
	  // Normalize option `from_line`
	  if (options.from_line === undefined || options.from_line === null) {
	    options.from_line = 1;
	  } else {
	    if (
	      typeof options.from_line === "string" &&
	      /\d+/.test(options.from_line)
	    ) {
	      options.from_line = parseInt(options.from_line);
	    }
	    if (Number.isInteger(options.from_line)) {
	      if (options.from_line <= 0) {
	        throw new Error(
	          `Invalid Option: from_line must be a positive integer greater than 0, got ${JSON.stringify(opts.from_line)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: from_line must be an integer, got ${JSON.stringify(opts.from_line)}`,
	      );
	    }
	  }
	  // Normalize options `ignore_last_delimiters`
	  if (
	    options.ignore_last_delimiters === undefined ||
	    options.ignore_last_delimiters === null
	  ) {
	    options.ignore_last_delimiters = false;
	  } else if (typeof options.ignore_last_delimiters === "number") {
	    options.ignore_last_delimiters = Math.floor(options.ignore_last_delimiters);
	    if (options.ignore_last_delimiters === 0) {
	      options.ignore_last_delimiters = false;
	    }
	  } else if (typeof options.ignore_last_delimiters !== "boolean") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS",
	      [
	        "Invalid option `ignore_last_delimiters`:",
	        "the value must be a boolean value or an integer,",
	        `got ${JSON.stringify(options.ignore_last_delimiters)}`,
	      ],
	      options,
	    );
	  }
	  if (options.ignore_last_delimiters === true && options.columns === false) {
	    throw new CsvError(
	      "CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS",
	      [
	        "The option `ignore_last_delimiters`",
	        "requires the activation of the `columns` option",
	      ],
	      options,
	    );
	  }
	  // Normalize option `info`
	  if (
	    options.info === undefined ||
	    options.info === null ||
	    options.info === false
	  ) {
	    options.info = false;
	  } else if (options.info !== true) {
	    throw new Error(
	      `Invalid Option: info must be true, got ${JSON.stringify(options.info)}`,
	    );
	  }
	  // Normalize option `max_record_size`
	  if (
	    options.max_record_size === undefined ||
	    options.max_record_size === null ||
	    options.max_record_size === false
	  ) {
	    options.max_record_size = 0;
	  } else if (
	    Number.isInteger(options.max_record_size) &&
	    options.max_record_size >= 0
	  ) ; else if (
	    typeof options.max_record_size === "string" &&
	    /\d+/.test(options.max_record_size)
	  ) {
	    options.max_record_size = parseInt(options.max_record_size);
	  } else {
	    throw new Error(
	      `Invalid Option: max_record_size must be a positive integer, got ${JSON.stringify(options.max_record_size)}`,
	    );
	  }
	  // Normalize option `objname`
	  if (
	    options.objname === undefined ||
	    options.objname === null ||
	    options.objname === false
	  ) {
	    options.objname = undefined;
	  } else if (Buffer.isBuffer(options.objname)) {
	    if (options.objname.length === 0) {
	      throw new Error(`Invalid Option: objname must be a non empty buffer`);
	    }
	    if (options.encoding === null) ; else {
	      options.objname = options.objname.toString(options.encoding);
	    }
	  } else if (typeof options.objname === "string") {
	    if (options.objname.length === 0) {
	      throw new Error(`Invalid Option: objname must be a non empty string`);
	    }
	    // Great, nothing to do
	  } else if (typeof options.objname === "number") ; else {
	    throw new Error(
	      `Invalid Option: objname must be a string or a buffer, got ${options.objname}`,
	    );
	  }
	  if (options.objname !== undefined) {
	    if (typeof options.objname === "number") {
	      if (options.columns !== false) {
	        throw Error(
	          "Invalid Option: objname index cannot be combined with columns or be defined as a field",
	        );
	      }
	    } else {
	      // A string or a buffer
	      if (options.columns === false) {
	        throw Error(
	          "Invalid Option: objname field must be combined with columns or be defined as an index",
	        );
	      }
	    }
	  }
	  // Normalize option `on_record`
	  if (options.on_record === undefined || options.on_record === null) {
	    options.on_record = undefined;
	  } else if (typeof options.on_record !== "function") {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_ON_RECORD",
	      [
	        "Invalid option `on_record`:",
	        "expect a function,",
	        `got ${JSON.stringify(options.on_record)}`,
	      ],
	      options,
	    );
	  }
	  // Normalize option `on_skip`
	  // options.on_skip ??= (err, chunk) => {
	  //   this.emit('skip', err, chunk);
	  // };
	  if (
	    options.on_skip !== undefined &&
	    options.on_skip !== null &&
	    typeof options.on_skip !== "function"
	  ) {
	    throw new Error(
	      `Invalid Option: on_skip must be a function, got ${JSON.stringify(options.on_skip)}`,
	    );
	  }
	  // Normalize option `quote`
	  if (
	    options.quote === null ||
	    options.quote === false ||
	    options.quote === ""
	  ) {
	    options.quote = null;
	  } else {
	    if (options.quote === undefined || options.quote === true) {
	      options.quote = Buffer.from('"', options.encoding);
	    } else if (typeof options.quote === "string") {
	      options.quote = Buffer.from(options.quote, options.encoding);
	    }
	    if (!Buffer.isBuffer(options.quote)) {
	      throw new Error(
	        `Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(options.quote)}`,
	      );
	    }
	  }
	  // Normalize option `raw`
	  if (
	    options.raw === undefined ||
	    options.raw === null ||
	    options.raw === false
	  ) {
	    options.raw = false;
	  } else if (options.raw !== true) {
	    throw new Error(
	      `Invalid Option: raw must be true, got ${JSON.stringify(options.raw)}`,
	    );
	  }
	  // Normalize option `record_delimiter`
	  if (options.record_delimiter === undefined) {
	    options.record_delimiter = [];
	  } else if (
	    typeof options.record_delimiter === "string" ||
	    Buffer.isBuffer(options.record_delimiter)
	  ) {
	    if (options.record_delimiter.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a non empty string or buffer,",
	          `got ${JSON.stringify(options.record_delimiter)}`,
	        ],
	        options,
	      );
	    }
	    options.record_delimiter = [options.record_delimiter];
	  } else if (!Array.isArray(options.record_delimiter)) {
	    throw new CsvError(
	      "CSV_INVALID_OPTION_RECORD_DELIMITER",
	      [
	        "Invalid option `record_delimiter`:",
	        "value must be a string, a buffer or array of string|buffer,",
	        `got ${JSON.stringify(options.record_delimiter)}`,
	      ],
	      options,
	    );
	  }
	  options.record_delimiter = options.record_delimiter.map(function (rd, i) {
	    if (typeof rd !== "string" && !Buffer.isBuffer(rd)) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a string, a buffer or array of string|buffer",
	          `at index ${i},`,
	          `got ${JSON.stringify(rd)}`,
	        ],
	        options,
	      );
	    } else if (rd.length === 0) {
	      throw new CsvError(
	        "CSV_INVALID_OPTION_RECORD_DELIMITER",
	        [
	          "Invalid option `record_delimiter`:",
	          "value must be a non empty string or buffer",
	          `at index ${i},`,
	          `got ${JSON.stringify(rd)}`,
	        ],
	        options,
	      );
	    }
	    if (typeof rd === "string") {
	      rd = Buffer.from(rd, options.encoding);
	    }
	    return rd;
	  });
	  // Normalize option `relax_column_count`
	  if (typeof options.relax_column_count === "boolean") ; else if (
	    options.relax_column_count === undefined ||
	    options.relax_column_count === null
	  ) {
	    options.relax_column_count = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count must be a boolean, got ${JSON.stringify(options.relax_column_count)}`,
	    );
	  }
	  if (typeof options.relax_column_count_less === "boolean") ; else if (
	    options.relax_column_count_less === undefined ||
	    options.relax_column_count_less === null
	  ) {
	    options.relax_column_count_less = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count_less must be a boolean, got ${JSON.stringify(options.relax_column_count_less)}`,
	    );
	  }
	  if (typeof options.relax_column_count_more === "boolean") ; else if (
	    options.relax_column_count_more === undefined ||
	    options.relax_column_count_more === null
	  ) {
	    options.relax_column_count_more = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_column_count_more must be a boolean, got ${JSON.stringify(options.relax_column_count_more)}`,
	    );
	  }
	  // Normalize option `relax_quotes`
	  if (typeof options.relax_quotes === "boolean") ; else if (
	    options.relax_quotes === undefined ||
	    options.relax_quotes === null
	  ) {
	    options.relax_quotes = false;
	  } else {
	    throw new Error(
	      `Invalid Option: relax_quotes must be a boolean, got ${JSON.stringify(options.relax_quotes)}`,
	    );
	  }
	  // Normalize option `skip_empty_lines`
	  if (typeof options.skip_empty_lines === "boolean") ; else if (
	    options.skip_empty_lines === undefined ||
	    options.skip_empty_lines === null
	  ) {
	    options.skip_empty_lines = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_empty_lines must be a boolean, got ${JSON.stringify(options.skip_empty_lines)}`,
	    );
	  }
	  // Normalize option `skip_records_with_empty_values`
	  if (typeof options.skip_records_with_empty_values === "boolean") ; else if (
	    options.skip_records_with_empty_values === undefined ||
	    options.skip_records_with_empty_values === null
	  ) {
	    options.skip_records_with_empty_values = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_records_with_empty_values must be a boolean, got ${JSON.stringify(options.skip_records_with_empty_values)}`,
	    );
	  }
	  // Normalize option `skip_records_with_error`
	  if (typeof options.skip_records_with_error === "boolean") ; else if (
	    options.skip_records_with_error === undefined ||
	    options.skip_records_with_error === null
	  ) {
	    options.skip_records_with_error = false;
	  } else {
	    throw new Error(
	      `Invalid Option: skip_records_with_error must be a boolean, got ${JSON.stringify(options.skip_records_with_error)}`,
	    );
	  }
	  // Normalize option `rtrim`
	  if (
	    options.rtrim === undefined ||
	    options.rtrim === null ||
	    options.rtrim === false
	  ) {
	    options.rtrim = false;
	  } else if (options.rtrim !== true) {
	    throw new Error(
	      `Invalid Option: rtrim must be a boolean, got ${JSON.stringify(options.rtrim)}`,
	    );
	  }
	  // Normalize option `ltrim`
	  if (
	    options.ltrim === undefined ||
	    options.ltrim === null ||
	    options.ltrim === false
	  ) {
	    options.ltrim = false;
	  } else if (options.ltrim !== true) {
	    throw new Error(
	      `Invalid Option: ltrim must be a boolean, got ${JSON.stringify(options.ltrim)}`,
	    );
	  }
	  // Normalize option `trim`
	  if (
	    options.trim === undefined ||
	    options.trim === null ||
	    options.trim === false
	  ) {
	    options.trim = false;
	  } else if (options.trim !== true) {
	    throw new Error(
	      `Invalid Option: trim must be a boolean, got ${JSON.stringify(options.trim)}`,
	    );
	  }
	  // Normalize options `trim`, `ltrim` and `rtrim`
	  if (options.trim === true && opts.ltrim !== false) {
	    options.ltrim = true;
	  } else if (options.ltrim !== true) {
	    options.ltrim = false;
	  }
	  if (options.trim === true && opts.rtrim !== false) {
	    options.rtrim = true;
	  } else if (options.rtrim !== true) {
	    options.rtrim = false;
	  }
	  // Normalize option `to`
	  if (options.to === undefined || options.to === null) {
	    options.to = -1;
	  } else {
	    if (typeof options.to === "string" && /\d+/.test(options.to)) {
	      options.to = parseInt(options.to);
	    }
	    if (Number.isInteger(options.to)) {
	      if (options.to <= 0) {
	        throw new Error(
	          `Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(opts.to)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: to must be an integer, got ${JSON.stringify(opts.to)}`,
	      );
	    }
	  }
	  // Normalize option `to_line`
	  if (options.to_line === undefined || options.to_line === null) {
	    options.to_line = -1;
	  } else {
	    if (typeof options.to_line === "string" && /\d+/.test(options.to_line)) {
	      options.to_line = parseInt(options.to_line);
	    }
	    if (Number.isInteger(options.to_line)) {
	      if (options.to_line <= 0) {
	        throw new Error(
	          `Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(opts.to_line)}`,
	        );
	      }
	    } else {
	      throw new Error(
	        `Invalid Option: to_line must be an integer, got ${JSON.stringify(opts.to_line)}`,
	      );
	    }
	  }
	  return options;
	};

	const isRecordEmpty = function (record) {
	  return record.every(
	    (field) =>
	      field == null || (field.toString && field.toString().trim() === ""),
	  );
	};

	const cr = 13; // `\r`, carriage return, 0x0D in hexadécimal, 13 in decimal
	const nl = 10; // `\n`, newline, 0x0A in hexadecimal, 10 in decimal

	const boms = {
	  // Note, the following are equals:
	  // Buffer.from("\ufeff")
	  // Buffer.from([239, 187, 191])
	  // Buffer.from('EFBBBF', 'hex')
	  utf8: Buffer.from([239, 187, 191]),
	  // Note, the following are equals:
	  // Buffer.from "\ufeff", 'utf16le
	  // Buffer.from([255, 254])
	  utf16le: Buffer.from([255, 254]),
	};

	const transform = function (original_options = {}) {
	  const info = {
	    bytes: 0,
	    comment_lines: 0,
	    empty_lines: 0,
	    invalid_field_length: 0,
	    lines: 1,
	    records: 0,
	  };
	  const options = normalize_options(original_options);
	  return {
	    info: info,
	    original_options: original_options,
	    options: options,
	    state: init_state(options),
	    __needMoreData: function (i, bufLen, end) {
	      if (end) return false;
	      const { encoding, escape, quote } = this.options;
	      const { quoting, needMoreDataSize, recordDelimiterMaxLength } =
	        this.state;
	      const numOfCharLeft = bufLen - i - 1;
	      const requiredLength = Math.max(
	        needMoreDataSize,
	        // Skip if the remaining buffer smaller than record delimiter
	        // If "record_delimiter" is yet to be discovered:
	        // 1. It is equals to `[]` and "recordDelimiterMaxLength" equals `0`
	        // 2. We set the length to windows line ending in the current encoding
	        // Note, that encoding is known from user or bom discovery at that point
	        // recordDelimiterMaxLength,
	        recordDelimiterMaxLength === 0
	          ? Buffer.from("\r\n", encoding).length
	          : recordDelimiterMaxLength,
	        // Skip if remaining buffer can be an escaped quote
	        quoting ? (escape === null ? 0 : escape.length) + quote.length : 0,
	        // Skip if remaining buffer can be record delimiter following the closing quote
	        quoting ? quote.length + recordDelimiterMaxLength : 0,
	      );
	      return numOfCharLeft < requiredLength;
	    },
	    // Central parser implementation
	    parse: function (nextBuf, end, push, close) {
	      const {
	        bom,
	        comment_no_infix,
	        encoding,
	        from_line,
	        ltrim,
	        max_record_size,
	        raw,
	        relax_quotes,
	        rtrim,
	        skip_empty_lines,
	        to,
	        to_line,
	      } = this.options;
	      let { comment, escape, quote, record_delimiter } = this.options;
	      const { bomSkipped, previousBuf, rawBuffer, escapeIsQuote } = this.state;
	      let buf;
	      if (previousBuf === undefined) {
	        if (nextBuf === undefined) {
	          // Handle empty string
	          close();
	          return;
	        } else {
	          buf = nextBuf;
	        }
	      } else if (previousBuf !== undefined && nextBuf === undefined) {
	        buf = previousBuf;
	      } else {
	        buf = Buffer.concat([previousBuf, nextBuf]);
	      }
	      // Handle UTF BOM
	      if (bomSkipped === false) {
	        if (bom === false) {
	          this.state.bomSkipped = true;
	        } else if (buf.length < 3) {
	          // No enough data
	          if (end === false) {
	            // Wait for more data
	            this.state.previousBuf = buf;
	            return;
	          }
	        } else {
	          for (const encoding in boms) {
	            if (boms[encoding].compare(buf, 0, boms[encoding].length) === 0) {
	              // Skip BOM
	              const bomLength = boms[encoding].length;
	              this.state.bufBytesStart += bomLength;
	              buf = buf.slice(bomLength);
	              // Renormalize original options with the new encoding
	              this.options = normalize_options({
	                ...this.original_options,
	                encoding: encoding,
	              });
	              // Options will re-evaluate the Buffer with the new encoding
	              ({ comment, escape, quote } = this.options);
	              break;
	            }
	          }
	          this.state.bomSkipped = true;
	        }
	      }
	      const bufLen = buf.length;
	      let pos;
	      for (pos = 0; pos < bufLen; pos++) {
	        // Ensure we get enough space to look ahead
	        // There should be a way to move this out of the loop
	        if (this.__needMoreData(pos, bufLen, end)) {
	          break;
	        }
	        if (this.state.wasRowDelimiter === true) {
	          this.info.lines++;
	          this.state.wasRowDelimiter = false;
	        }
	        if (to_line !== -1 && this.info.lines > to_line) {
	          this.state.stop = true;
	          close();
	          return;
	        }
	        // Auto discovery of record_delimiter, unix, mac and windows supported
	        if (this.state.quoting === false && record_delimiter.length === 0) {
	          const record_delimiterCount = this.__autoDiscoverRecordDelimiter(
	            buf,
	            pos,
	          );
	          if (record_delimiterCount) {
	            record_delimiter = this.options.record_delimiter;
	          }
	        }
	        const chr = buf[pos];
	        if (raw === true) {
	          rawBuffer.append(chr);
	        }
	        if (
	          (chr === cr || chr === nl) &&
	          this.state.wasRowDelimiter === false
	        ) {
	          this.state.wasRowDelimiter = true;
	        }
	        // Previous char was a valid escape char
	        // treat the current char as a regular char
	        if (this.state.escaping === true) {
	          this.state.escaping = false;
	        } else {
	          // Escape is only active inside quoted fields
	          // We are quoting, the char is an escape chr and there is a chr to escape
	          // if(escape !== null && this.state.quoting === true && chr === escape && pos + 1 < bufLen){
	          if (
	            escape !== null &&
	            this.state.quoting === true &&
	            this.__isEscape(buf, pos, chr) &&
	            pos + escape.length < bufLen
	          ) {
	            if (escapeIsQuote) {
	              if (this.__isQuote(buf, pos + escape.length)) {
	                this.state.escaping = true;
	                pos += escape.length - 1;
	                continue;
	              }
	            } else {
	              this.state.escaping = true;
	              pos += escape.length - 1;
	              continue;
	            }
	          }
	          // Not currently escaping and chr is a quote
	          // TODO: need to compare bytes instead of single char
	          if (this.state.commenting === false && this.__isQuote(buf, pos)) {
	            if (this.state.quoting === true) {
	              const nextChr = buf[pos + quote.length];
	              const isNextChrTrimable =
	                rtrim && this.__isCharTrimable(buf, pos + quote.length);
	              const isNextChrComment =
	                comment !== null &&
	                this.__compareBytes(comment, buf, pos + quote.length, nextChr);
	              const isNextChrDelimiter = this.__isDelimiter(
	                buf,
	                pos + quote.length,
	                nextChr,
	              );
	              const isNextChrRecordDelimiter =
	                record_delimiter.length === 0
	                  ? this.__autoDiscoverRecordDelimiter(buf, pos + quote.length)
	                  : this.__isRecordDelimiter(nextChr, buf, pos + quote.length);
	              // Escape a quote
	              // Treat next char as a regular character
	              if (
	                escape !== null &&
	                this.__isEscape(buf, pos, chr) &&
	                this.__isQuote(buf, pos + escape.length)
	              ) {
	                pos += escape.length - 1;
	              } else if (
	                !nextChr ||
	                isNextChrDelimiter ||
	                isNextChrRecordDelimiter ||
	                isNextChrComment ||
	                isNextChrTrimable
	              ) {
	                this.state.quoting = false;
	                this.state.wasQuoting = true;
	                pos += quote.length - 1;
	                continue;
	              } else if (relax_quotes === false) {
	                const err = this.__error(
	                  new CsvError(
	                    "CSV_INVALID_CLOSING_QUOTE",
	                    [
	                      "Invalid Closing Quote:",
	                      `got "${String.fromCharCode(nextChr)}"`,
	                      `at line ${this.info.lines}`,
	                      "instead of delimiter, record delimiter, trimable character",
	                      "(if activated) or comment",
	                    ],
	                    this.options,
	                    this.__infoField(),
	                  ),
	                );
	                if (err !== undefined) return err;
	              } else {
	                this.state.quoting = false;
	                this.state.wasQuoting = true;
	                this.state.field.prepend(quote);
	                pos += quote.length - 1;
	              }
	            } else {
	              if (this.state.field.length !== 0) {
	                // In relax_quotes mode, treat opening quote preceded by chrs as regular
	                if (relax_quotes === false) {
	                  const info = this.__infoField();
	                  const bom = Object.keys(boms)
	                    .map((b) =>
	                      boms[b].equals(this.state.field.toString()) ? b : false,
	                    )
	                    .filter(Boolean)[0];
	                  const err = this.__error(
	                    new CsvError(
	                      "INVALID_OPENING_QUOTE",
	                      [
	                        "Invalid Opening Quote:",
	                        `a quote is found on field ${JSON.stringify(info.column)} at line ${info.lines}, value is ${JSON.stringify(this.state.field.toString(encoding))}`,
	                        bom ? `(${bom} bom)` : undefined,
	                      ],
	                      this.options,
	                      info,
	                      {
	                        field: this.state.field,
	                      },
	                    ),
	                  );
	                  if (err !== undefined) return err;
	                }
	              } else {
	                this.state.quoting = true;
	                pos += quote.length - 1;
	                continue;
	              }
	            }
	          }
	          if (this.state.quoting === false) {
	            const recordDelimiterLength = this.__isRecordDelimiter(
	              chr,
	              buf,
	              pos,
	            );
	            if (recordDelimiterLength !== 0) {
	              // Do not emit comments which take a full line
	              const skipCommentLine =
	                this.state.commenting &&
	                this.state.wasQuoting === false &&
	                this.state.record.length === 0 &&
	                this.state.field.length === 0;
	              if (skipCommentLine) {
	                this.info.comment_lines++;
	                // Skip full comment line
	              } else {
	                // Activate records emition if above from_line
	                if (
	                  this.state.enabled === false &&
	                  this.info.lines +
	                    (this.state.wasRowDelimiter === true ? 1 : 0) >=
	                    from_line
	                ) {
	                  this.state.enabled = true;
	                  this.__resetField();
	                  this.__resetRecord();
	                  pos += recordDelimiterLength - 1;
	                  continue;
	                }
	                // Skip if line is empty and skip_empty_lines activated
	                if (
	                  skip_empty_lines === true &&
	                  this.state.wasQuoting === false &&
	                  this.state.record.length === 0 &&
	                  this.state.field.length === 0
	                ) {
	                  this.info.empty_lines++;
	                  pos += recordDelimiterLength - 1;
	                  continue;
	                }
	                this.info.bytes = this.state.bufBytesStart + pos;
	                const errField = this.__onField();
	                if (errField !== undefined) return errField;
	                this.info.bytes =
	                  this.state.bufBytesStart + pos + recordDelimiterLength;
	                const errRecord = this.__onRecord(push);
	                if (errRecord !== undefined) return errRecord;
	                if (to !== -1 && this.info.records >= to) {
	                  this.state.stop = true;
	                  close();
	                  return;
	                }
	              }
	              this.state.commenting = false;
	              pos += recordDelimiterLength - 1;
	              continue;
	            }
	            if (this.state.commenting) {
	              continue;
	            }
	            if (
	              comment !== null &&
	              (comment_no_infix === false ||
	                (this.state.record.length === 0 &&
	                  this.state.field.length === 0))
	            ) {
	              const commentCount = this.__compareBytes(comment, buf, pos, chr);
	              if (commentCount !== 0) {
	                this.state.commenting = true;
	                continue;
	              }
	            }
	            const delimiterLength = this.__isDelimiter(buf, pos, chr);
	            if (delimiterLength !== 0) {
	              this.info.bytes = this.state.bufBytesStart + pos;
	              const errField = this.__onField();
	              if (errField !== undefined) return errField;
	              pos += delimiterLength - 1;
	              continue;
	            }
	          }
	        }
	        if (this.state.commenting === false) {
	          if (
	            max_record_size !== 0 &&
	            this.state.record_length + this.state.field.length > max_record_size
	          ) {
	            return this.__error(
	              new CsvError(
	                "CSV_MAX_RECORD_SIZE",
	                [
	                  "Max Record Size:",
	                  "record exceed the maximum number of tolerated bytes",
	                  `of ${max_record_size}`,
	                  `at line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	              ),
	            );
	          }
	        }
	        const lappend =
	          ltrim === false ||
	          this.state.quoting === true ||
	          this.state.field.length !== 0 ||
	          !this.__isCharTrimable(buf, pos);
	        // rtrim in non quoting is handle in __onField
	        const rappend = rtrim === false || this.state.wasQuoting === false;
	        if (lappend === true && rappend === true) {
	          this.state.field.append(chr);
	        } else if (rtrim === true && !this.__isCharTrimable(buf, pos)) {
	          return this.__error(
	            new CsvError(
	              "CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE",
	              [
	                "Invalid Closing Quote:",
	                "found non trimable byte after quote",
	                `at line ${this.info.lines}`,
	              ],
	              this.options,
	              this.__infoField(),
	            ),
	          );
	        } else {
	          if (lappend === false) {
	            pos += this.__isCharTrimable(buf, pos) - 1;
	          }
	          continue;
	        }
	      }
	      if (end === true) {
	        // Ensure we are not ending in a quoting state
	        if (this.state.quoting === true) {
	          const err = this.__error(
	            new CsvError(
	              "CSV_QUOTE_NOT_CLOSED",
	              [
	                "Quote Not Closed:",
	                `the parsing is finished with an opening quote at line ${this.info.lines}`,
	              ],
	              this.options,
	              this.__infoField(),
	            ),
	          );
	          if (err !== undefined) return err;
	        } else {
	          // Skip last line if it has no characters
	          if (
	            this.state.wasQuoting === true ||
	            this.state.record.length !== 0 ||
	            this.state.field.length !== 0
	          ) {
	            this.info.bytes = this.state.bufBytesStart + pos;
	            const errField = this.__onField();
	            if (errField !== undefined) return errField;
	            const errRecord = this.__onRecord(push);
	            if (errRecord !== undefined) return errRecord;
	          } else if (this.state.wasRowDelimiter === true) {
	            this.info.empty_lines++;
	          } else if (this.state.commenting === true) {
	            this.info.comment_lines++;
	          }
	        }
	      } else {
	        this.state.bufBytesStart += pos;
	        this.state.previousBuf = buf.slice(pos);
	      }
	      if (this.state.wasRowDelimiter === true) {
	        this.info.lines++;
	        this.state.wasRowDelimiter = false;
	      }
	    },
	    __onRecord: function (push) {
	      const {
	        columns,
	        group_columns_by_name,
	        encoding,
	        info,
	        from,
	        relax_column_count,
	        relax_column_count_less,
	        relax_column_count_more,
	        raw,
	        skip_records_with_empty_values,
	      } = this.options;
	      const { enabled, record } = this.state;
	      if (enabled === false) {
	        return this.__resetRecord();
	      }
	      // Convert the first line into column names
	      const recordLength = record.length;
	      if (columns === true) {
	        if (skip_records_with_empty_values === true && isRecordEmpty(record)) {
	          this.__resetRecord();
	          return;
	        }
	        return this.__firstLineToColumns(record);
	      }
	      if (columns === false && this.info.records === 0) {
	        this.state.expectedRecordLength = recordLength;
	      }
	      if (recordLength !== this.state.expectedRecordLength) {
	        const err =
	          columns === false
	            ? new CsvError(
	                "CSV_RECORD_INCONSISTENT_FIELDS_LENGTH",
	                [
	                  "Invalid Record Length:",
	                  `expect ${this.state.expectedRecordLength},`,
	                  `got ${recordLength} on line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	                {
	                  record: record,
	                },
	              )
	            : new CsvError(
	                "CSV_RECORD_INCONSISTENT_COLUMNS",
	                [
	                  "Invalid Record Length:",
	                  `columns length is ${columns.length},`, // rename columns
	                  `got ${recordLength} on line ${this.info.lines}`,
	                ],
	                this.options,
	                this.__infoField(),
	                {
	                  record: record,
	                },
	              );
	        if (
	          relax_column_count === true ||
	          (relax_column_count_less === true &&
	            recordLength < this.state.expectedRecordLength) ||
	          (relax_column_count_more === true &&
	            recordLength > this.state.expectedRecordLength)
	        ) {
	          this.info.invalid_field_length++;
	          this.state.error = err;
	          // Error is undefined with skip_records_with_error
	        } else {
	          const finalErr = this.__error(err);
	          if (finalErr) return finalErr;
	        }
	      }
	      if (skip_records_with_empty_values === true && isRecordEmpty(record)) {
	        this.__resetRecord();
	        return;
	      }
	      if (this.state.recordHasError === true) {
	        this.__resetRecord();
	        this.state.recordHasError = false;
	        return;
	      }
	      this.info.records++;
	      if (from === 1 || this.info.records >= from) {
	        const { objname } = this.options;
	        // With columns, records are object
	        if (columns !== false) {
	          const obj = {};
	          // Transform record array to an object
	          for (let i = 0, l = record.length; i < l; i++) {
	            if (columns[i] === undefined || columns[i].disabled) continue;
	            // Turn duplicate columns into an array
	            if (
	              group_columns_by_name === true &&
	              obj[columns[i].name] !== undefined
	            ) {
	              if (Array.isArray(obj[columns[i].name])) {
	                obj[columns[i].name] = obj[columns[i].name].concat(record[i]);
	              } else {
	                obj[columns[i].name] = [obj[columns[i].name], record[i]];
	              }
	            } else {
	              obj[columns[i].name] = record[i];
	            }
	          }
	          // Without objname (default)
	          if (raw === true || info === true) {
	            const extRecord = Object.assign(
	              { record: obj },
	              raw === true
	                ? { raw: this.state.rawBuffer.toString(encoding) }
	                : {},
	              info === true ? { info: this.__infoRecord() } : {},
	            );
	            const err = this.__push(
	              objname === undefined ? extRecord : [obj[objname], extRecord],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          } else {
	            const err = this.__push(
	              objname === undefined ? obj : [obj[objname], obj],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          }
	          // Without columns, records are array
	        } else {
	          if (raw === true || info === true) {
	            const extRecord = Object.assign(
	              { record: record },
	              raw === true
	                ? { raw: this.state.rawBuffer.toString(encoding) }
	                : {},
	              info === true ? { info: this.__infoRecord() } : {},
	            );
	            const err = this.__push(
	              objname === undefined ? extRecord : [record[objname], extRecord],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          } else {
	            const err = this.__push(
	              objname === undefined ? record : [record[objname], record],
	              push,
	            );
	            if (err) {
	              return err;
	            }
	          }
	        }
	      }
	      this.__resetRecord();
	    },
	    __firstLineToColumns: function (record) {
	      const { firstLineToHeaders } = this.state;
	      try {
	        const headers =
	          firstLineToHeaders === undefined
	            ? record
	            : firstLineToHeaders.call(null, record);
	        if (!Array.isArray(headers)) {
	          return this.__error(
	            new CsvError(
	              "CSV_INVALID_COLUMN_MAPPING",
	              [
	                "Invalid Column Mapping:",
	                "expect an array from column function,",
	                `got ${JSON.stringify(headers)}`,
	              ],
	              this.options,
	              this.__infoField(),
	              {
	                headers: headers,
	              },
	            ),
	          );
	        }
	        const normalizedHeaders = normalize_columns_array(headers);
	        this.state.expectedRecordLength = normalizedHeaders.length;
	        this.options.columns = normalizedHeaders;
	        this.__resetRecord();
	        return;
	      } catch (err) {
	        return err;
	      }
	    },
	    __resetRecord: function () {
	      if (this.options.raw === true) {
	        this.state.rawBuffer.reset();
	      }
	      this.state.error = undefined;
	      this.state.record = [];
	      this.state.record_length = 0;
	    },
	    __onField: function () {
	      const { cast, encoding, rtrim, max_record_size } = this.options;
	      const { enabled, wasQuoting } = this.state;
	      // Short circuit for the from_line options
	      if (enabled === false) {
	        return this.__resetField();
	      }
	      let field = this.state.field.toString(encoding);
	      if (rtrim === true && wasQuoting === false) {
	        field = field.trimRight();
	      }
	      if (cast === true) {
	        const [err, f] = this.__cast(field);
	        if (err !== undefined) return err;
	        field = f;
	      }
	      this.state.record.push(field);
	      // Increment record length if record size must not exceed a limit
	      if (max_record_size !== 0 && typeof field === "string") {
	        this.state.record_length += field.length;
	      }
	      this.__resetField();
	    },
	    __resetField: function () {
	      this.state.field.reset();
	      this.state.wasQuoting = false;
	    },
	    __push: function (record, push) {
	      const { on_record } = this.options;
	      if (on_record !== undefined) {
	        const info = this.__infoRecord();
	        try {
	          record = on_record.call(null, record, info);
	        } catch (err) {
	          return err;
	        }
	        if (record === undefined || record === null) {
	          return;
	        }
	      }
	      push(record);
	    },
	    // Return a tuple with the error and the casted value
	    __cast: function (field) {
	      const { columns, relax_column_count } = this.options;
	      const isColumns = Array.isArray(columns);
	      // Dont loose time calling cast
	      // because the final record is an object
	      // and this field can't be associated to a key present in columns
	      if (
	        isColumns === true &&
	        relax_column_count &&
	        this.options.columns.length <= this.state.record.length
	      ) {
	        return [undefined, undefined];
	      }
	      if (this.state.castField !== null) {
	        try {
	          const info = this.__infoField();
	          return [undefined, this.state.castField.call(null, field, info)];
	        } catch (err) {
	          return [err];
	        }
	      }
	      if (this.__isFloat(field)) {
	        return [undefined, parseFloat(field)];
	      } else if (this.options.cast_date !== false) {
	        const info = this.__infoField();
	        return [undefined, this.options.cast_date.call(null, field, info)];
	      }
	      return [undefined, field];
	    },
	    // Helper to test if a character is a space or a line delimiter
	    __isCharTrimable: function (buf, pos) {
	      const isTrim = (buf, pos) => {
	        const { timchars } = this.state;
	        loop1: for (let i = 0; i < timchars.length; i++) {
	          const timchar = timchars[i];
	          for (let j = 0; j < timchar.length; j++) {
	            if (timchar[j] !== buf[pos + j]) continue loop1;
	          }
	          return timchar.length;
	        }
	        return 0;
	      };
	      return isTrim(buf, pos);
	    },
	    // Keep it in case we implement the `cast_int` option
	    // __isInt(value){
	    //   // return Number.isInteger(parseInt(value))
	    //   // return !isNaN( parseInt( obj ) );
	    //   return /^(\-|\+)?[1-9][0-9]*$/.test(value)
	    // }
	    __isFloat: function (value) {
	      return value - parseFloat(value) + 1 >= 0; // Borrowed from jquery
	    },
	    __compareBytes: function (sourceBuf, targetBuf, targetPos, firstByte) {
	      if (sourceBuf[0] !== firstByte) return 0;
	      const sourceLength = sourceBuf.length;
	      for (let i = 1; i < sourceLength; i++) {
	        if (sourceBuf[i] !== targetBuf[targetPos + i]) return 0;
	      }
	      return sourceLength;
	    },
	    __isDelimiter: function (buf, pos, chr) {
	      const { delimiter, ignore_last_delimiters } = this.options;
	      if (
	        ignore_last_delimiters === true &&
	        this.state.record.length === this.options.columns.length - 1
	      ) {
	        return 0;
	      } else if (
	        ignore_last_delimiters !== false &&
	        typeof ignore_last_delimiters === "number" &&
	        this.state.record.length === ignore_last_delimiters - 1
	      ) {
	        return 0;
	      }
	      loop1: for (let i = 0; i < delimiter.length; i++) {
	        const del = delimiter[i];
	        if (del[0] === chr) {
	          for (let j = 1; j < del.length; j++) {
	            if (del[j] !== buf[pos + j]) continue loop1;
	          }
	          return del.length;
	        }
	      }
	      return 0;
	    },
	    __isRecordDelimiter: function (chr, buf, pos) {
	      const { record_delimiter } = this.options;
	      const recordDelimiterLength = record_delimiter.length;
	      loop1: for (let i = 0; i < recordDelimiterLength; i++) {
	        const rd = record_delimiter[i];
	        const rdLength = rd.length;
	        if (rd[0] !== chr) {
	          continue;
	        }
	        for (let j = 1; j < rdLength; j++) {
	          if (rd[j] !== buf[pos + j]) {
	            continue loop1;
	          }
	        }
	        return rd.length;
	      }
	      return 0;
	    },
	    __isEscape: function (buf, pos, chr) {
	      const { escape } = this.options;
	      if (escape === null) return false;
	      const l = escape.length;
	      if (escape[0] === chr) {
	        for (let i = 0; i < l; i++) {
	          if (escape[i] !== buf[pos + i]) {
	            return false;
	          }
	        }
	        return true;
	      }
	      return false;
	    },
	    __isQuote: function (buf, pos) {
	      const { quote } = this.options;
	      if (quote === null) return false;
	      const l = quote.length;
	      for (let i = 0; i < l; i++) {
	        if (quote[i] !== buf[pos + i]) {
	          return false;
	        }
	      }
	      return true;
	    },
	    __autoDiscoverRecordDelimiter: function (buf, pos) {
	      const { encoding } = this.options;
	      // Note, we don't need to cache this information in state,
	      // It is only called on the first line until we find out a suitable
	      // record delimiter.
	      const rds = [
	        // Important, the windows line ending must be before mac os 9
	        Buffer.from("\r\n", encoding),
	        Buffer.from("\n", encoding),
	        Buffer.from("\r", encoding),
	      ];
	      loop: for (let i = 0; i < rds.length; i++) {
	        const l = rds[i].length;
	        for (let j = 0; j < l; j++) {
	          if (rds[i][j] !== buf[pos + j]) {
	            continue loop;
	          }
	        }
	        this.options.record_delimiter.push(rds[i]);
	        this.state.recordDelimiterMaxLength = rds[i].length;
	        return rds[i].length;
	      }
	      return 0;
	    },
	    __error: function (msg) {
	      const { encoding, raw, skip_records_with_error } = this.options;
	      const err = typeof msg === "string" ? new Error(msg) : msg;
	      if (skip_records_with_error) {
	        this.state.recordHasError = true;
	        if (this.options.on_skip !== undefined) {
	          this.options.on_skip(
	            err,
	            raw ? this.state.rawBuffer.toString(encoding) : undefined,
	          );
	        }
	        // this.emit('skip', err, raw ? this.state.rawBuffer.toString(encoding) : undefined);
	        return undefined;
	      } else {
	        return err;
	      }
	    },
	    __infoDataSet: function () {
	      return {
	        ...this.info,
	        columns: this.options.columns,
	      };
	    },
	    __infoRecord: function () {
	      const { columns, raw, encoding } = this.options;
	      return {
	        ...this.__infoDataSet(),
	        error: this.state.error,
	        header: columns === true,
	        index: this.state.record.length,
	        raw: raw ? this.state.rawBuffer.toString(encoding) : undefined,
	      };
	    },
	    __infoField: function () {
	      const { columns } = this.options;
	      const isColumns = Array.isArray(columns);
	      return {
	        ...this.__infoRecord(),
	        column:
	          isColumns === true
	            ? columns.length > this.state.record.length
	              ? columns[this.state.record.length].name
	              : null
	            : this.state.record.length,
	        quoting: this.state.wasQuoting,
	      };
	    },
	  };
	};

	const parse = function (data, opts = {}) {
	  if (typeof data === "string") {
	    data = Buffer.from(data);
	  }
	  const records = opts && opts.objname ? {} : [];
	  const parser = transform(opts);
	  const push = (record) => {
	    if (parser.options.objname === undefined) records.push(record);
	    else {
	      records[record[0]] = record[1];
	    }
	  };
	  const close = () => {};
	  const err1 = parser.parse(data, false, push, close);
	  if (err1 !== undefined) throw err1;
	  const err2 = parser.parse(undefined, true, push, close);
	  if (err2 !== undefined) throw err2;
	  return records;
	};

	sync.CsvError = CsvError;
	sync.parse = parse;
	return sync;
}

var simpleJsonpath;
var hasRequiredSimpleJsonpath;

function requireSimpleJsonpath () {
	if (hasRequiredSimpleJsonpath) return simpleJsonpath;
	hasRequiredSimpleJsonpath = 1;
	// Simple JSONPath implementation for basic path queries
	function value(obj, path) {
	    if (!obj || !path) return undefined;
	    
	    // Handle simple dot notation like "$.name" or "name"
	    if (path.startsWith('$.')) {
	        path = path.substring(2);
	    } else if (path.startsWith('$')) {
	        path = path.substring(1);
	    }
	    
	    if (!path) return obj;
	    
	    // Split path by dots, handling array indices
	    const parts = path.split(/[.\[\]]/).filter(Boolean);
	    
	    let current = obj;
	    for (const part of parts) {
	        if (current === null || current === undefined) {
	            return undefined;
	        }
	        
	        // Handle array index
	        if (/^\d+$/.test(part)) {
	            current = current[parseInt(part)];
	        } else {
	            current = current[part];
	        }
	    }
	    
	    return current;
	}

	simpleJsonpath = { value };
	return simpleJsonpath;
}

var CsvAdapter_1;
var hasRequiredCsvAdapter;

function requireCsvAdapter () {
	if (hasRequiredCsvAdapter) return CsvAdapter_1;
	hasRequiredCsvAdapter = 1;
	const { parse: streamParse } = requireCjs();
	const { parse } = requireSync();
	const jsonpath = requireSimpleJsonpath();

	class CsvAdapter {
	  constructor(config = {}) {
	    this.config = config;
	  }

	  async parse(rawData, params) {
	    if (typeof rawData === "object") {
	      return rawData;
	    }

	    const options = await createOptions(this.config, params);
	    return parse(rawData, options);
	  }

	  async stream(path, params) {
	    const options = await createOptions(this.config, params);
	    return streamParse(options);
	  }

	  getRoot(rows) {
	    return rows;
	  }

	  getValue(row, path) {
	    return jsonpath.value(row, path);
	  }
	}

	async function createOptions(config, params) {
	  const delimiter = config.delimiter || (await params.delimiter);
	  const escape = config.escape || "\\";
	  const relaxQuotes = config.relaxQuotes !== undefined ? config.relaxQuotes : true;
	  const trim = config.trim !== undefined ? config.trim : true;
	  const options = config.options || {};

	  let columns = true;
	  const columnNames = config.columns || (await params.columns);
	  if (columnNames) {
	    columns = columnNames.split(",");
	  }

	  return {
	    bom: true,
	    delimiter,
	    columns,
	    escape,
	    trim,
	    relax_quotes: relaxQuotes,
	    skip_records_with_empty_values: true,
	    skip_empty_lines: true,
	    ...options
	  };
	}

	CsvAdapter_1 = CsvAdapter;
	return CsvAdapter_1;
}

var JSONStream = {};

/*global Buffer*/

var jsonparse;
var hasRequiredJsonparse;

function requireJsonparse () {
	if (hasRequiredJsonparse) return jsonparse;
	hasRequiredJsonparse = 1;
	// Named constants with unique integer values
	var C = {};
	// Tokens
	var LEFT_BRACE    = C.LEFT_BRACE    = 0x1;
	var RIGHT_BRACE   = C.RIGHT_BRACE   = 0x2;
	var LEFT_BRACKET  = C.LEFT_BRACKET  = 0x3;
	var RIGHT_BRACKET = C.RIGHT_BRACKET = 0x4;
	var COLON         = C.COLON         = 0x5;
	var COMMA         = C.COMMA         = 0x6;
	var TRUE          = C.TRUE          = 0x7;
	var FALSE         = C.FALSE         = 0x8;
	var NULL          = C.NULL          = 0x9;
	var STRING        = C.STRING        = 0xa;
	var NUMBER        = C.NUMBER        = 0xb;
	// Tokenizer States
	var START   = C.START   = 0x11;
	var STOP    = C.STOP    = 0x12;
	var TRUE1   = C.TRUE1   = 0x21;
	var TRUE2   = C.TRUE2   = 0x22;
	var TRUE3   = C.TRUE3   = 0x23;
	var FALSE1  = C.FALSE1  = 0x31;
	var FALSE2  = C.FALSE2  = 0x32;
	var FALSE3  = C.FALSE3  = 0x33;
	var FALSE4  = C.FALSE4  = 0x34;
	var NULL1   = C.NULL1   = 0x41;
	var NULL2   = C.NULL2   = 0x42;
	var NULL3   = C.NULL3   = 0x43;
	var NUMBER1 = C.NUMBER1 = 0x51;
	var NUMBER3 = C.NUMBER3 = 0x53;
	var STRING1 = C.STRING1 = 0x61;
	var STRING2 = C.STRING2 = 0x62;
	var STRING3 = C.STRING3 = 0x63;
	var STRING4 = C.STRING4 = 0x64;
	var STRING5 = C.STRING5 = 0x65;
	var STRING6 = C.STRING6 = 0x66;
	// Parser States
	var VALUE   = C.VALUE   = 0x71;
	var KEY     = C.KEY     = 0x72;
	// Parser Modes
	var OBJECT  = C.OBJECT  = 0x81;
	var ARRAY   = C.ARRAY   = 0x82;
	// Character constants
	var BACK_SLASH =      "\\".charCodeAt(0);
	var FORWARD_SLASH =   "\/".charCodeAt(0);
	var BACKSPACE =       "\b".charCodeAt(0);
	var FORM_FEED =       "\f".charCodeAt(0);
	var NEWLINE =         "\n".charCodeAt(0);
	var CARRIAGE_RETURN = "\r".charCodeAt(0);
	var TAB =             "\t".charCodeAt(0);

	var STRING_BUFFER_SIZE = 64 * 1024;

	function Parser() {
	  this.tState = START;
	  this.value = undefined;

	  this.string = undefined; // string data
	  this.stringBuffer = Buffer.alloc ? Buffer.alloc(STRING_BUFFER_SIZE) : new Buffer(STRING_BUFFER_SIZE);
	  this.stringBufferOffset = 0;
	  this.unicode = undefined; // unicode escapes
	  this.highSurrogate = undefined;

	  this.key = undefined;
	  this.mode = undefined;
	  this.stack = [];
	  this.state = VALUE;
	  this.bytes_remaining = 0; // number of bytes remaining in multi byte utf8 char to read after split boundary
	  this.bytes_in_sequence = 0; // bytes in multi byte utf8 char to read
	  this.temp_buffs = { "2": new Buffer(2), "3": new Buffer(3), "4": new Buffer(4) }; // for rebuilding chars split before boundary is reached

	  // Stream offset
	  this.offset = -1;
	}

	// Slow code to string converter (only used when throwing syntax errors)
	Parser.toknam = function (code) {
	  var keys = Object.keys(C);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    if (C[key] === code) { return key; }
	  }
	  return code && ("0x" + code.toString(16));
	};

	var proto = Parser.prototype;
	proto.onError = function (err) { throw err; };
	proto.charError = function (buffer, i) {
	  this.tState = STOP;
	  this.onError(new Error("Unexpected " + JSON.stringify(String.fromCharCode(buffer[i])) + " at position " + i + " in state " + Parser.toknam(this.tState)));
	};
	proto.appendStringChar = function (char) {
	  if (this.stringBufferOffset >= STRING_BUFFER_SIZE) {
	    this.string += this.stringBuffer.toString('utf8');
	    this.stringBufferOffset = 0;
	  }

	  this.stringBuffer[this.stringBufferOffset++] = char;
	};
	proto.appendStringBuf = function (buf, start, end) {
	  var size = buf.length;
	  if (typeof start === 'number') {
	    if (typeof end === 'number') {
	      if (end < 0) {
	        // adding a negative end decreeses the size
	        size = buf.length - start + end;
	      } else {
	        size = end - start;
	      }
	    } else {
	      size = buf.length - start;
	    }
	  }

	  if (size < 0) {
	    size = 0;
	  }

	  if (this.stringBufferOffset + size > STRING_BUFFER_SIZE) {
	    this.string += this.stringBuffer.toString('utf8', 0, this.stringBufferOffset);
	    this.stringBufferOffset = 0;
	  }

	  buf.copy(this.stringBuffer, this.stringBufferOffset, start, end);
	  this.stringBufferOffset += size;
	};
	proto.write = function (buffer) {
	  if (typeof buffer === "string") buffer = new Buffer(buffer);
	  var n;
	  for (var i = 0, l = buffer.length; i < l; i++) {
	    if (this.tState === START){
	      n = buffer[i];
	      this.offset++;
	      if(n === 0x7b){ this.onToken(LEFT_BRACE, "{"); // {
	      }else if(n === 0x7d){ this.onToken(RIGHT_BRACE, "}"); // }
	      }else if(n === 0x5b){ this.onToken(LEFT_BRACKET, "["); // [
	      }else if(n === 0x5d){ this.onToken(RIGHT_BRACKET, "]"); // ]
	      }else if(n === 0x3a){ this.onToken(COLON, ":");  // :
	      }else if(n === 0x2c){ this.onToken(COMMA, ","); // ,
	      }else if(n === 0x74){ this.tState = TRUE1;  // t
	      }else if(n === 0x66){ this.tState = FALSE1;  // f
	      }else if(n === 0x6e){ this.tState = NULL1; // n
	      }else if(n === 0x22){ // "
	        this.string = "";
	        this.stringBufferOffset = 0;
	        this.tState = STRING1;
	      }else if(n === 0x2d){ this.string = "-"; this.tState = NUMBER1; // -
	      }else {
	        if (n >= 0x30 && n < 0x40) { // 1-9
	          this.string = String.fromCharCode(n); this.tState = NUMBER3;
	        } else if (n === 0x20 || n === 0x09 || n === 0x0a || n === 0x0d) ; else {
	          return this.charError(buffer, i);
	        }
	      }
	    }else if (this.tState === STRING1){ // After open quote
	      n = buffer[i]; // get current byte from buffer
	      // check for carry over of a multi byte char split between data chunks
	      // & fill temp buffer it with start of this data chunk up to the boundary limit set in the last iteration
	      if (this.bytes_remaining > 0) {
	        for (var j = 0; j < this.bytes_remaining; j++) {
	          this.temp_buffs[this.bytes_in_sequence][this.bytes_in_sequence - this.bytes_remaining + j] = buffer[j];
	        }

	        this.appendStringBuf(this.temp_buffs[this.bytes_in_sequence]);
	        this.bytes_in_sequence = this.bytes_remaining = 0;
	        i = i + j - 1;
	      } else if (this.bytes_remaining === 0 && n >= 128) { // else if no remainder bytes carried over, parse multi byte (>=128) chars one at a time
	        if (n <= 193 || n > 244) {
	          return this.onError(new Error("Invalid UTF-8 character at position " + i + " in state " + Parser.toknam(this.tState)));
	        }
	        if ((n >= 194) && (n <= 223)) this.bytes_in_sequence = 2;
	        if ((n >= 224) && (n <= 239)) this.bytes_in_sequence = 3;
	        if ((n >= 240) && (n <= 244)) this.bytes_in_sequence = 4;
	        if ((this.bytes_in_sequence + i) > buffer.length) { // if bytes needed to complete char fall outside buffer length, we have a boundary split
	          for (var k = 0; k <= (buffer.length - 1 - i); k++) {
	            this.temp_buffs[this.bytes_in_sequence][k] = buffer[i + k]; // fill temp buffer of correct size with bytes available in this chunk
	          }
	          this.bytes_remaining = (i + this.bytes_in_sequence) - buffer.length;
	          i = buffer.length - 1;
	        } else {
	          this.appendStringBuf(buffer, i, i + this.bytes_in_sequence);
	          i = i + this.bytes_in_sequence - 1;
	        }
	      } else if (n === 0x22) {
	        this.tState = START;
	        this.string += this.stringBuffer.toString('utf8', 0, this.stringBufferOffset);
	        this.stringBufferOffset = 0;
	        this.onToken(STRING, this.string);
	        this.offset += Buffer.byteLength(this.string, 'utf8') + 1;
	        this.string = undefined;
	      }
	      else if (n === 0x5c) {
	        this.tState = STRING2;
	      }
	      else if (n >= 0x20) { this.appendStringChar(n); }
	      else {
	          return this.charError(buffer, i);
	      }
	    }else if (this.tState === STRING2){ // After backslash
	      n = buffer[i];
	      if(n === 0x22){ this.appendStringChar(n); this.tState = STRING1;
	      }else if(n === 0x5c){ this.appendStringChar(BACK_SLASH); this.tState = STRING1;
	      }else if(n === 0x2f){ this.appendStringChar(FORWARD_SLASH); this.tState = STRING1;
	      }else if(n === 0x62){ this.appendStringChar(BACKSPACE); this.tState = STRING1;
	      }else if(n === 0x66){ this.appendStringChar(FORM_FEED); this.tState = STRING1;
	      }else if(n === 0x6e){ this.appendStringChar(NEWLINE); this.tState = STRING1;
	      }else if(n === 0x72){ this.appendStringChar(CARRIAGE_RETURN); this.tState = STRING1;
	      }else if(n === 0x74){ this.appendStringChar(TAB); this.tState = STRING1;
	      }else if(n === 0x75){ this.unicode = ""; this.tState = STRING3;
	      }else {
	        return this.charError(buffer, i);
	      }
	    }else if (this.tState === STRING3 || this.tState === STRING4 || this.tState === STRING5 || this.tState === STRING6){ // unicode hex codes
	      n = buffer[i];
	      // 0-9 A-F a-f
	      if ((n >= 0x30 && n < 0x40) || (n > 0x40 && n <= 0x46) || (n > 0x60 && n <= 0x66)) {
	        this.unicode += String.fromCharCode(n);
	        if (this.tState++ === STRING6) {
	          var intVal = parseInt(this.unicode, 16);
	          this.unicode = undefined;
	          if (this.highSurrogate !== undefined && intVal >= 0xDC00 && intVal < (0xDFFF + 1)) { //<56320,57343> - lowSurrogate
	            this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate, intVal)));
	            this.highSurrogate = undefined;
	          } else if (this.highSurrogate === undefined && intVal >= 0xD800 && intVal < (0xDBFF + 1)) { //<55296,56319> - highSurrogate
	            this.highSurrogate = intVal;
	          } else {
	            if (this.highSurrogate !== undefined) {
	              this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate)));
	              this.highSurrogate = undefined;
	            }
	            this.appendStringBuf(new Buffer(String.fromCharCode(intVal)));
	          }
	          this.tState = STRING1;
	        }
	      } else {
	        return this.charError(buffer, i);
	      }
	    } else if (this.tState === NUMBER1 || this.tState === NUMBER3) {
	        n = buffer[i];

	        switch (n) {
	          case 0x30: // 0
	          case 0x31: // 1
	          case 0x32: // 2
	          case 0x33: // 3
	          case 0x34: // 4
	          case 0x35: // 5
	          case 0x36: // 6
	          case 0x37: // 7
	          case 0x38: // 8
	          case 0x39: // 9
	          case 0x2e: // .
	          case 0x65: // e
	          case 0x45: // E
	          case 0x2b: // +
	          case 0x2d: // -
	            this.string += String.fromCharCode(n);
	            this.tState = NUMBER3;
	            break;
	          default:
	            this.tState = START;
	            var result = Number(this.string);

	            if (isNaN(result)){
	              return this.charError(buffer, i);
	            }

	            if ((this.string.match(/[0-9]+/) == this.string) && (result.toString() != this.string)) {
	              // Long string of digits which is an ID string and not valid and/or safe JavaScript integer Number
	              this.onToken(STRING, this.string);
	            } else {
	              this.onToken(NUMBER, result);
	            }

	            this.offset += this.string.length - 1;
	            this.string = undefined;
	            i--;
	            break;
	        }
	    }else if (this.tState === TRUE1){ // r
	      if (buffer[i] === 0x72) { this.tState = TRUE2; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === TRUE2){ // u
	      if (buffer[i] === 0x75) { this.tState = TRUE3; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === TRUE3){ // e
	      if (buffer[i] === 0x65) { this.tState = START; this.onToken(TRUE, true); this.offset+= 3; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === FALSE1){ // a
	      if (buffer[i] === 0x61) { this.tState = FALSE2; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === FALSE2){ // l
	      if (buffer[i] === 0x6c) { this.tState = FALSE3; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === FALSE3){ // s
	      if (buffer[i] === 0x73) { this.tState = FALSE4; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === FALSE4){ // e
	      if (buffer[i] === 0x65) { this.tState = START; this.onToken(FALSE, false); this.offset+= 4; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === NULL1){ // u
	      if (buffer[i] === 0x75) { this.tState = NULL2; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === NULL2){ // l
	      if (buffer[i] === 0x6c) { this.tState = NULL3; }
	      else { return this.charError(buffer, i); }
	    }else if (this.tState === NULL3){ // l
	      if (buffer[i] === 0x6c) { this.tState = START; this.onToken(NULL, null); this.offset += 3; }
	      else { return this.charError(buffer, i); }
	    }
	  }
	};
	proto.onToken = function (token, value) {
	  // Override this to get events
	};

	proto.parseError = function (token, value) {
	  this.tState = STOP;
	  this.onError(new Error("Unexpected " + Parser.toknam(token) + (value ? ("(" + JSON.stringify(value) + ")") : "") + " in state " + Parser.toknam(this.state)));
	};
	proto.push = function () {
	  this.stack.push({value: this.value, key: this.key, mode: this.mode});
	};
	proto.pop = function () {
	  var value = this.value;
	  var parent = this.stack.pop();
	  this.value = parent.value;
	  this.key = parent.key;
	  this.mode = parent.mode;
	  this.emit(value);
	  if (!this.mode) { this.state = VALUE; }
	};
	proto.emit = function (value) {
	  if (this.mode) { this.state = COMMA; }
	  this.onValue(value);
	};
	proto.onValue = function (value) {
	  // Override me
	};
	proto.onToken = function (token, value) {
	  if(this.state === VALUE){
	    if(token === STRING || token === NUMBER || token === TRUE || token === FALSE || token === NULL){
	      if (this.value) {
	        this.value[this.key] = value;
	      }
	      this.emit(value);
	    }else if(token === LEFT_BRACE){
	      this.push();
	      if (this.value) {
	        this.value = this.value[this.key] = {};
	      } else {
	        this.value = {};
	      }
	      this.key = undefined;
	      this.state = KEY;
	      this.mode = OBJECT;
	    }else if(token === LEFT_BRACKET){
	      this.push();
	      if (this.value) {
	        this.value = this.value[this.key] = [];
	      } else {
	        this.value = [];
	      }
	      this.key = 0;
	      this.mode = ARRAY;
	      this.state = VALUE;
	    }else if(token === RIGHT_BRACE){
	      if (this.mode === OBJECT) {
	        this.pop();
	      } else {
	        return this.parseError(token, value);
	      }
	    }else if(token === RIGHT_BRACKET){
	      if (this.mode === ARRAY) {
	        this.pop();
	      } else {
	        return this.parseError(token, value);
	      }
	    }else {
	      return this.parseError(token, value);
	    }
	  }else if(this.state === KEY){
	    if (token === STRING) {
	      this.key = value;
	      this.state = COLON;
	    } else if (token === RIGHT_BRACE) {
	      this.pop();
	    } else {
	      return this.parseError(token, value);
	    }
	  }else if(this.state === COLON){
	    if (token === COLON) { this.state = VALUE; }
	    else { return this.parseError(token, value); }
	  }else if(this.state === COMMA){
	    if (token === COMMA) {
	      if (this.mode === ARRAY) { this.key++; this.state = VALUE; }
	      else if (this.mode === OBJECT) { this.state = KEY; }

	    } else if (token === RIGHT_BRACKET && this.mode === ARRAY || token === RIGHT_BRACE && this.mode === OBJECT) {
	      this.pop();
	    } else {
	      return this.parseError(token, value);
	    }
	  }else {
	    return this.parseError(token, value);
	  }
	};

	Parser.C = C;

	jsonparse = Parser;
	return jsonparse;
}

var through = {exports: {}};

var hasRequiredThrough;

function requireThrough () {
	if (hasRequiredThrough) return through.exports;
	hasRequiredThrough = 1;
	(function (module, exports) {
		var Stream = require$$0$3;

		// through
		//
		// a stream that does nothing but re-emit the input.
		// useful for aggregating a series of changing but not ending streams into one stream)

		module.exports = through;
		through.through = through;

		//create a readable writable stream.

		function through (write, end, opts) {
		  write = write || function (data) { this.queue(data); };
		  end = end || function () { this.queue(null); };

		  var ended = false, destroyed = false, buffer = [], _ended = false;
		  var stream = new Stream();
		  stream.readable = stream.writable = true;
		  stream.paused = false;

		//  stream.autoPause   = !(opts && opts.autoPause   === false)
		  stream.autoDestroy = !(opts && opts.autoDestroy === false);

		  stream.write = function (data) {
		    write.call(this, data);
		    return !stream.paused
		  };

		  function drain() {
		    while(buffer.length && !stream.paused) {
		      var data = buffer.shift();
		      if(null === data)
		        return stream.emit('end')
		      else
		        stream.emit('data', data);
		    }
		  }

		  stream.queue = stream.push = function (data) {
		//    console.error(ended)
		    if(_ended) return stream
		    if(data === null) _ended = true;
		    buffer.push(data);
		    drain();
		    return stream
		  };

		  //this will be registered as the first 'end' listener
		  //must call destroy next tick, to make sure we're after any
		  //stream piped from here.
		  //this is only a problem if end is not emitted synchronously.
		  //a nicer way to do this is to make sure this is the last listener for 'end'

		  stream.on('end', function () {
		    stream.readable = false;
		    if(!stream.writable && stream.autoDestroy)
		      process.nextTick(function () {
		        stream.destroy();
		      });
		  });

		  function _end () {
		    stream.writable = false;
		    end.call(stream);
		    if(!stream.readable && stream.autoDestroy)
		      stream.destroy();
		  }

		  stream.end = function (data) {
		    if(ended) return
		    ended = true;
		    if(arguments.length) stream.write(data);
		    _end(); // will emit or queue
		    return stream
		  };

		  stream.destroy = function () {
		    if(destroyed) return
		    destroyed = true;
		    ended = true;
		    buffer.length = 0;
		    stream.writable = stream.readable = false;
		    stream.emit('close');
		    return stream
		  };

		  stream.pause = function () {
		    if(stream.paused) return
		    stream.paused = true;
		    return stream
		  };

		  stream.resume = function () {
		    if(stream.paused) {
		      stream.paused = false;
		      stream.emit('resume');
		    }
		    drain();
		    //may have become paused again,
		    //as drain emits 'data'.
		    if(!stream.paused)
		      stream.emit('drain');
		    return stream
		  };
		  return stream
		} 
	} (through));
	return through.exports;
}

var hasRequiredJSONStream;

function requireJSONStream () {
	if (hasRequiredJSONStream) return JSONStream;
	hasRequiredJSONStream = 1;

	var Parser = requireJsonparse()
	  , through = requireThrough();

	var bufferFrom = Buffer.from && Buffer.from !== Uint8Array.from;

	/*

	  the value of this.stack that creationix's jsonparse has is weird.

	  it makes this code ugly, but his problem is way harder that mine,
	  so i'll forgive him.

	*/

	JSONStream.parse = function (path, map) {
	  var header, footer;
	  var parser = new Parser();
	  var stream = through(function (chunk) {
	    if('string' === typeof chunk)
	      chunk = bufferFrom ? Buffer.from(chunk) : new Buffer(chunk);
	    parser.write(chunk);
	  },
	  function (data) {
	    if(data)
	      stream.write(data);
	    if (header)
	        stream.emit('header', header);
	    if (footer)
	      stream.emit('footer', footer);
	    stream.queue(null);
	  });

	  if('string' === typeof path)
	    path = path.split('.').map(function (e) {
	      if (e === '$*')
	        return {emitKey: true}
	      else if (e === '*')
	        return true
	      else if (e === '') // '..'.split('.') returns an empty string
	        return {recurse: true}
	      else
	        return e
	    });
	  if(!path || !path.length)
	    path = null;

	  parser.onValue = function (value) {
	    if (!this.root)
	      stream.root = value;

	    if(! path) return

	    var i = 0; // iterates on path
	    var j  = 0; // iterates on stack
	    var emitKey = false;
	    var emitPath = false;
	    while (i < path.length) {
	      var key = path[i];
	      var c;
	      j++;

	      if (key && !key.recurse) {
	        c = (j === this.stack.length) ? this : this.stack[j];
	        if (!c) return
	        if (! check(key, c.key)) {
	          setHeaderFooter(c.key, value);
	          return
	        }
	        emitKey = !!key.emitKey;
	        emitPath = !!key.emitPath;
	        i++;
	      } else {
	        i++;
	        var nextKey = path[i];
	        if (! nextKey) return
	        while (true) {
	          c = (j === this.stack.length) ? this : this.stack[j];
	          if (!c) return
	          if (check(nextKey, c.key)) {
	            i++;
	            if (!Object.isFrozen(this.stack[j]))
	              this.stack[j].value = null;
	            break
	          } else {
	            setHeaderFooter(c.key, value);
	          }
	          j++;
	        }
	      }

	    }

	    // emit header
	    if (header) {
	      stream.emit('header', header);
	      header = false;
	    }
	    if (j !== this.stack.length) return
	    var actualPath = this.stack.slice(1).map(function(element) { return element.key }).concat([this.key]);
	    var data = value;
	    if(null != data)
	      if(null != (data = map ? map(data, actualPath) : data)) {
	        if (emitKey || emitPath) {
	          data = { value: data };
	          if (emitKey)
	            data["key"] = this.key;
	          if (emitPath)
	            data["path"] = actualPath;
	        }

	        stream.queue(data);
	      }
	    if (this.value) delete this.value[this.key];
	    for(var k in this.stack)
	      if (!Object.isFrozen(this.stack[k]))
	        this.stack[k].value = null;
	  };
	  parser._onToken = parser.onToken;

	  parser.onToken = function (token, value) {
	    parser._onToken(token, value);
	    if (this.stack.length === 0) {
	      if (stream.root) {
	        if(!path)
	          stream.queue(stream.root);
	        stream.root = null;
	      }
	    }
	  };

	  parser.onError = function (err) {
	    if(err.message.indexOf("at position") > -1)
	      err.message = "Invalid JSON (" + err.message + ")";
	    stream.emit('error', err);
	  };

	  return stream

	  function setHeaderFooter(key, value) {
	    // header has not been emitted yet
	    if (header !== false) {
	      header = header || {};
	      header[key] = value;
	    }

	    // footer has not been emitted yet but header has
	    if (footer !== false && header === false) {
	      footer = footer || {};
	      footer[key] = value;
	    }
	  }
	};

	function check (x, y) {
	  if ('string' === typeof x)
	    return y == x
	  else if (x && 'function' === typeof x.exec)
	    return x.exec(y)
	  else if ('boolean' === typeof x || 'object' === typeof x)
	    return x
	  else if ('function' === typeof x)
	    return x(y)
	  return false
	}

	JSONStream.stringify = function (op, sep, cl, indent) {
	  indent = indent || 0;
	  if (op === false){
	    op = '';
	    sep = '\n';
	    cl = '';
	  } else if (op == null) {

	    op = '[\n';
	    sep = '\n,\n';
	    cl = '\n]\n';

	  }

	  //else, what ever you like

	  var stream
	    , first = true
	    , anyData = false;
	  stream = through(function (data) {
	    anyData = true;
	    try {
	      var json = JSON.stringify(data, null, indent);
	    } catch (err) {
	      return stream.emit('error', err)
	    }
	    if(first) { first = false ; stream.queue(op + json);}
	    else stream.queue(sep + json);
	  },
	  function (data) {
	    if(!anyData)
	      stream.queue(op);
	    stream.queue(cl);
	    stream.queue(null);
	  });

	  return stream
	};

	JSONStream.stringifyObject = function (op, sep, cl, indent) {
	  indent = indent || 0;
	  if (op === false){
	    op = '';
	    sep = '\n';
	    cl = '';
	  } else if (op == null) {

	    op = '{\n';
	    sep = '\n,\n';
	    cl = '\n}\n';

	  }

	  //else, what ever you like

	  var first = true;
	  var anyData = false;
	  var stream = through(function (data) {
	    anyData = true;
	    var json = JSON.stringify(data[0]) + ':' + JSON.stringify(data[1], null, indent);
	    if(first) { first = false ; this.queue(op + json);}
	    else this.queue(sep + json);
	  },
	  function (data) {
	    if(!anyData) this.queue(op);
	    this.queue(cl);

	    this.queue(null);
	  });

	  return stream
	};
	return JSONStream;
}

var JsonAdapter_1;
var hasRequiredJsonAdapter;

function requireJsonAdapter () {
	if (hasRequiredJsonAdapter) return JsonAdapter_1;
	hasRequiredJsonAdapter = 1;
	const jsonpath = requireSimpleJsonpath();
	const JSONStream = requireJSONStream();

	class JsonAdapter {
	  async parse(rawData) {
	    if (typeof rawData === "object") {
	      return rawData;
	    }
	    return JSON.parse(rawData);
	  }

	  async stream(path = "$") {
	    return JSONStream.parse(path.replace("$.", ""));
	  }

	  getRoot(json, path = "$") {
	    return jsonpath.value(json, path);
	  }

	  getValue(object, path) {
	    return jsonpath.value(object, path);
	  }
	}

	JsonAdapter_1 = JsonAdapter;
	return JsonAdapter_1;
}

var validator = {};

var util = {};

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	(function (exports) {

		const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
		const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
		const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
		const regexName = new RegExp('^' + nameRegexp + '$');

		const getAllMatches = function(string, regex) {
		  const matches = [];
		  let match = regex.exec(string);
		  while (match) {
		    const allmatches = [];
		    allmatches.startIndex = regex.lastIndex - match[0].length;
		    const len = match.length;
		    for (let index = 0; index < len; index++) {
		      allmatches.push(match[index]);
		    }
		    matches.push(allmatches);
		    match = regex.exec(string);
		  }
		  return matches;
		};

		const isName = function(string) {
		  const match = regexName.exec(string);
		  return !(match === null || typeof match === 'undefined');
		};

		exports.isExist = function(v) {
		  return typeof v !== 'undefined';
		};

		exports.isEmptyObject = function(obj) {
		  return Object.keys(obj).length === 0;
		};

		/**
		 * Copy all the properties of a into b.
		 * @param {*} target
		 * @param {*} a
		 */
		exports.merge = function(target, a, arrayMode) {
		  if (a) {
		    const keys = Object.keys(a); // will return an array of own properties
		    const len = keys.length; //don't make it inline
		    for (let i = 0; i < len; i++) {
		      if (arrayMode === 'strict') {
		        target[keys[i]] = [ a[keys[i]] ];
		      } else {
		        target[keys[i]] = a[keys[i]];
		      }
		    }
		  }
		};
		/* exports.merge =function (b,a){
		  return Object.assign(b,a);
		} */

		exports.getValue = function(v) {
		  if (exports.isExist(v)) {
		    return v;
		  } else {
		    return '';
		  }
		};

		// const fakeCall = function(a) {return a;};
		// const fakeCallNoReturn = function() {};

		exports.isName = isName;
		exports.getAllMatches = getAllMatches;
		exports.nameRegexp = nameRegexp; 
	} (util));
	return util;
}

var hasRequiredValidator;

function requireValidator () {
	if (hasRequiredValidator) return validator;
	hasRequiredValidator = 1;

	const util = requireUtil();

	const defaultOptions = {
	  allowBooleanAttributes: false, //A tag can have attributes without any value
	  unpairedTags: []
	};

	//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
	validator.validate = function (xmlData, options) {
	  options = Object.assign({}, defaultOptions, options);

	  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
	  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
	  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
	  const tags = [];
	  let tagFound = false;

	  //indicates that the root tag has been closed (aka. depth 0 has been reached)
	  let reachedRoot = false;

	  if (xmlData[0] === '\ufeff') {
	    // check for byte order mark (BOM)
	    xmlData = xmlData.substr(1);
	  }
	  
	  for (let i = 0; i < xmlData.length; i++) {

	    if (xmlData[i] === '<' && xmlData[i+1] === '?') {
	      i+=2;
	      i = readPI(xmlData,i);
	      if (i.err) return i;
	    }else if (xmlData[i] === '<') {
	      //starting of tag
	      //read until you reach to '>' avoiding any '>' in attribute value
	      let tagStartPos = i;
	      i++;
	      
	      if (xmlData[i] === '!') {
	        i = readCommentAndCDATA(xmlData, i);
	        continue;
	      } else {
	        let closingTag = false;
	        if (xmlData[i] === '/') {
	          //closing tag
	          closingTag = true;
	          i++;
	        }
	        //read tagname
	        let tagName = '';
	        for (; i < xmlData.length &&
	          xmlData[i] !== '>' &&
	          xmlData[i] !== ' ' &&
	          xmlData[i] !== '\t' &&
	          xmlData[i] !== '\n' &&
	          xmlData[i] !== '\r'; i++
	        ) {
	          tagName += xmlData[i];
	        }
	        tagName = tagName.trim();
	        //console.log(tagName);

	        if (tagName[tagName.length - 1] === '/') {
	          //self closing tag without attributes
	          tagName = tagName.substring(0, tagName.length - 1);
	          //continue;
	          i--;
	        }
	        if (!validateTagName(tagName)) {
	          let msg;
	          if (tagName.trim().length === 0) {
	            msg = "Invalid space after '<'.";
	          } else {
	            msg = "Tag '"+tagName+"' is an invalid name.";
	          }
	          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
	        }

	        const result = readAttributeStr(xmlData, i);
	        if (result === false) {
	          return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
	        }
	        let attrStr = result.value;
	        i = result.index;

	        if (attrStr[attrStr.length - 1] === '/') {
	          //self closing tag
	          const attrStrStart = i - attrStr.length;
	          attrStr = attrStr.substring(0, attrStr.length - 1);
	          const isValid = validateAttributeString(attrStr, options);
	          if (isValid === true) {
	            tagFound = true;
	            //continue; //text may presents after self closing tag
	          } else {
	            //the result from the nested function returns the position of the error within the attribute
	            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
	            //this gives us the absolute index in the entire xml, which we can use to find the line at last
	            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
	          }
	        } else if (closingTag) {
	          if (!result.tagClosed) {
	            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
	          } else if (attrStr.trim().length > 0) {
	            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
	          } else if (tags.length === 0) {
	            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
	          } else {
	            const otg = tags.pop();
	            if (tagName !== otg.tagName) {
	              let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
	              return getErrorObject('InvalidTag',
	                "Expected closing tag '"+otg.tagName+"' (opened in line "+openPos.line+", col "+openPos.col+") instead of closing tag '"+tagName+"'.",
	                getLineNumberForPosition(xmlData, tagStartPos));
	            }

	            //when there are no more tags, we reached the root level.
	            if (tags.length == 0) {
	              reachedRoot = true;
	            }
	          }
	        } else {
	          const isValid = validateAttributeString(attrStr, options);
	          if (isValid !== true) {
	            //the result from the nested function returns the position of the error within the attribute
	            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
	            //this gives us the absolute index in the entire xml, which we can use to find the line at last
	            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
	          }

	          //if the root level has been reached before ...
	          if (reachedRoot === true) {
	            return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
	          } else if(options.unpairedTags.indexOf(tagName) !== -1); else {
	            tags.push({tagName, tagStartPos});
	          }
	          tagFound = true;
	        }

	        //skip tag text value
	        //It may include comments and CDATA value
	        for (i++; i < xmlData.length; i++) {
	          if (xmlData[i] === '<') {
	            if (xmlData[i + 1] === '!') {
	              //comment or CADATA
	              i++;
	              i = readCommentAndCDATA(xmlData, i);
	              continue;
	            } else if (xmlData[i+1] === '?') {
	              i = readPI(xmlData, ++i);
	              if (i.err) return i;
	            } else {
	              break;
	            }
	          } else if (xmlData[i] === '&') {
	            const afterAmp = validateAmpersand(xmlData, i);
	            if (afterAmp == -1)
	              return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
	            i = afterAmp;
	          }else {
	            if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
	              return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
	            }
	          }
	        } //end of reading tag text value
	        if (xmlData[i] === '<') {
	          i--;
	        }
	      }
	    } else {
	      if ( isWhiteSpace(xmlData[i])) {
	        continue;
	      }
	      return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
	    }
	  }

	  if (!tagFound) {
	    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
	  }else if (tags.length == 1) {
	      return getErrorObject('InvalidTag', "Unclosed tag '"+tags[0].tagName+"'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
	  }else if (tags.length > 0) {
	      return getErrorObject('InvalidXml', "Invalid '"+
	          JSON.stringify(tags.map(t => t.tagName), null, 4).replace(/\r?\n/g, '')+
	          "' found.", {line: 1, col: 1});
	  }

	  return true;
	};

	function isWhiteSpace(char){
	  return char === ' ' || char === '\t' || char === '\n'  || char === '\r';
	}
	/**
	 * Read Processing insstructions and skip
	 * @param {*} xmlData
	 * @param {*} i
	 */
	function readPI(xmlData, i) {
	  const start = i;
	  for (; i < xmlData.length; i++) {
	    if (xmlData[i] == '?' || xmlData[i] == ' ') {
	      //tagname
	      const tagname = xmlData.substr(start, i - start);
	      if (i > 5 && tagname === 'xml') {
	        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
	      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
	        //check if valid attribut string
	        i++;
	        break;
	      } else {
	        continue;
	      }
	    }
	  }
	  return i;
	}

	function readCommentAndCDATA(xmlData, i) {
	  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
	    //comment
	    for (i += 3; i < xmlData.length; i++) {
	      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
	        i += 2;
	        break;
	      }
	    }
	  } else if (
	    xmlData.length > i + 8 &&
	    xmlData[i + 1] === 'D' &&
	    xmlData[i + 2] === 'O' &&
	    xmlData[i + 3] === 'C' &&
	    xmlData[i + 4] === 'T' &&
	    xmlData[i + 5] === 'Y' &&
	    xmlData[i + 6] === 'P' &&
	    xmlData[i + 7] === 'E'
	  ) {
	    let angleBracketsCount = 1;
	    for (i += 8; i < xmlData.length; i++) {
	      if (xmlData[i] === '<') {
	        angleBracketsCount++;
	      } else if (xmlData[i] === '>') {
	        angleBracketsCount--;
	        if (angleBracketsCount === 0) {
	          break;
	        }
	      }
	    }
	  } else if (
	    xmlData.length > i + 9 &&
	    xmlData[i + 1] === '[' &&
	    xmlData[i + 2] === 'C' &&
	    xmlData[i + 3] === 'D' &&
	    xmlData[i + 4] === 'A' &&
	    xmlData[i + 5] === 'T' &&
	    xmlData[i + 6] === 'A' &&
	    xmlData[i + 7] === '['
	  ) {
	    for (i += 8; i < xmlData.length; i++) {
	      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
	        i += 2;
	        break;
	      }
	    }
	  }

	  return i;
	}

	const doubleQuote = '"';
	const singleQuote = "'";

	/**
	 * Keep reading xmlData until '<' is found outside the attribute value.
	 * @param {string} xmlData
	 * @param {number} i
	 */
	function readAttributeStr(xmlData, i) {
	  let attrStr = '';
	  let startChar = '';
	  let tagClosed = false;
	  for (; i < xmlData.length; i++) {
	    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
	      if (startChar === '') {
	        startChar = xmlData[i];
	      } else if (startChar !== xmlData[i]) ; else {
	        startChar = '';
	      }
	    } else if (xmlData[i] === '>') {
	      if (startChar === '') {
	        tagClosed = true;
	        break;
	      }
	    }
	    attrStr += xmlData[i];
	  }
	  if (startChar !== '') {
	    return false;
	  }

	  return {
	    value: attrStr,
	    index: i,
	    tagClosed: tagClosed
	  };
	}

	/**
	 * Select all the attributes whether valid or invalid.
	 */
	const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

	//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

	function validateAttributeString(attrStr, options) {
	  //console.log("start:"+attrStr+":end");

	  //if(attrStr.trim().length === 0) return true; //empty string

	  const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
	  const attrNames = {};

	  for (let i = 0; i < matches.length; i++) {
	    if (matches[i][1].length === 0) {
	      //nospace before attribute name: a="sd"b="saf"
	      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(matches[i]))
	    } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
	      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' is without value.", getPositionFromMatch(matches[i]));
	    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
	      //independent attribute: ab
	      return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(matches[i]));
	    }
	    /* else if(matches[i][6] === undefined){//attribute without value: ab=
	                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
	                } */
	    const attrName = matches[i][2];
	    if (!validateAttrName(attrName)) {
	      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(matches[i]));
	    }
	    if (!attrNames.hasOwnProperty(attrName)) {
	      //check for duplicate attribute.
	      attrNames[attrName] = 1;
	    } else {
	      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(matches[i]));
	    }
	  }

	  return true;
	}

	function validateNumberAmpersand(xmlData, i) {
	  let re = /\d/;
	  if (xmlData[i] === 'x') {
	    i++;
	    re = /[\da-fA-F]/;
	  }
	  for (; i < xmlData.length; i++) {
	    if (xmlData[i] === ';')
	      return i;
	    if (!xmlData[i].match(re))
	      break;
	  }
	  return -1;
	}

	function validateAmpersand(xmlData, i) {
	  // https://www.w3.org/TR/xml/#dt-charref
	  i++;
	  if (xmlData[i] === ';')
	    return -1;
	  if (xmlData[i] === '#') {
	    i++;
	    return validateNumberAmpersand(xmlData, i);
	  }
	  let count = 0;
	  for (; i < xmlData.length; i++, count++) {
	    if (xmlData[i].match(/\w/) && count < 20)
	      continue;
	    if (xmlData[i] === ';')
	      break;
	    return -1;
	  }
	  return i;
	}

	function getErrorObject(code, message, lineNumber) {
	  return {
	    err: {
	      code: code,
	      msg: message,
	      line: lineNumber.line || lineNumber,
	      col: lineNumber.col,
	    },
	  };
	}

	function validateAttrName(attrName) {
	  return util.isName(attrName);
	}

	// const startsWithXML = /^xml/i;

	function validateTagName(tagname) {
	  return util.isName(tagname) /* && !tagname.match(startsWithXML) */;
	}

	//this function returns the line number for the character at the given index
	function getLineNumberForPosition(xmlData, index) {
	  const lines = xmlData.substring(0, index).split(/\r?\n/);
	  return {
	    line: lines.length,

	    // column number is last line's length + 1, because column numbering starts at 1:
	    col: lines[lines.length - 1].length + 1
	  };
	}

	//this function returns the position of the first character of match within attrStr
	function getPositionFromMatch(match) {
	  return match.startIndex + match[1].length;
	}
	return validator;
}

var OptionsBuilder = {};

var hasRequiredOptionsBuilder;

function requireOptionsBuilder () {
	if (hasRequiredOptionsBuilder) return OptionsBuilder;
	hasRequiredOptionsBuilder = 1;
	const defaultOptions = {
	    preserveOrder: false,
	    attributeNamePrefix: '@_',
	    attributesGroupName: false,
	    textNodeName: '#text',
	    ignoreAttributes: true,
	    removeNSPrefix: false, // remove NS from tag name or attribute name if true
	    allowBooleanAttributes: false, //a tag can have attributes without any value
	    //ignoreRootElement : false,
	    parseTagValue: true,
	    parseAttributeValue: false,
	    trimValues: true, //Trim string values of tag and attributes
	    cdataPropName: false,
	    numberParseOptions: {
	      hex: true,
	      leadingZeros: true,
	      eNotation: true
	    },
	    tagValueProcessor: function(tagName, val) {
	      return val;
	    },
	    attributeValueProcessor: function(attrName, val) {
	      return val;
	    },
	    stopNodes: [], //nested tags will not be parsed even for errors
	    alwaysCreateTextNode: false,
	    isArray: () => false,
	    commentPropName: false,
	    unpairedTags: [],
	    processEntities: true,
	    htmlEntities: false,
	    ignoreDeclaration: false,
	    ignorePiTags: false,
	    transformTagName: false,
	    transformAttributeName: false,
	    updateTag: function(tagName, jPath, attrs){
	      return tagName
	    },
	    // skipEmptyListItem: false
	};
	   
	const buildOptions = function(options) {
	    return Object.assign({}, defaultOptions, options);
	};

	OptionsBuilder.buildOptions = buildOptions;
	OptionsBuilder.defaultOptions = defaultOptions;
	return OptionsBuilder;
}

var xmlNode;
var hasRequiredXmlNode;

function requireXmlNode () {
	if (hasRequiredXmlNode) return xmlNode;
	hasRequiredXmlNode = 1;

	class XmlNode{
	  constructor(tagname) {
	    this.tagname = tagname;
	    this.child = []; //nested tags, text, cdata, comments in order
	    this[":@"] = {}; //attributes map
	  }
	  add(key,val){
	    // this.child.push( {name : key, val: val, isCdata: isCdata });
	    if(key === "__proto__") key = "#__proto__";
	    this.child.push( {[key]: val });
	  }
	  addChild(node) {
	    if(node.tagname === "__proto__") node.tagname = "#__proto__";
	    if(node[":@"] && Object.keys(node[":@"]).length > 0){
	      this.child.push( { [node.tagname]: node.child, [":@"]: node[":@"] });
	    }else {
	      this.child.push( { [node.tagname]: node.child });
	    }
	  };
	}

	xmlNode = XmlNode;
	return xmlNode;
}

var DocTypeReader;
var hasRequiredDocTypeReader;

function requireDocTypeReader () {
	if (hasRequiredDocTypeReader) return DocTypeReader;
	hasRequiredDocTypeReader = 1;
	const util = requireUtil();

	//TODO: handle comments
	function readDocType(xmlData, i){
	    
	    const entities = {};
	    if( xmlData[i + 3] === 'O' &&
	         xmlData[i + 4] === 'C' &&
	         xmlData[i + 5] === 'T' &&
	         xmlData[i + 6] === 'Y' &&
	         xmlData[i + 7] === 'P' &&
	         xmlData[i + 8] === 'E')
	    {    
	        i = i+9;
	        let angleBracketsCount = 1;
	        let hasBody = false, comment = false;
	        let exp = "";
	        for(;i<xmlData.length;i++){
	            if (xmlData[i] === '<' && !comment) { //Determine the tag type
	                if( hasBody && isEntity(xmlData, i)){
	                    i += 7; 
	                    let entityName, val;
	                    [entityName, val,i] = readEntityExp(xmlData,i+1);
	                    if(val.indexOf("&") === -1) //Parameter entities are not supported
	                        entities[ validateEntityName(entityName) ] = {
	                            regx : RegExp( `&${entityName};`,"g"),
	                            val: val
	                        };
	                }
	                else if( hasBody && isElement(xmlData, i))  i += 8;//Not supported
	                else if( hasBody && isAttlist(xmlData, i))  i += 8;//Not supported
	                else if( hasBody && isNotation(xmlData, i)) i += 9;//Not supported
	                else if( isComment)                         comment = true;
	                else                                        throw new Error("Invalid DOCTYPE");

	                angleBracketsCount++;
	                exp = "";
	            } else if (xmlData[i] === '>') { //Read tag content
	                if(comment){
	                    if( xmlData[i - 1] === "-" && xmlData[i - 2] === "-"){
	                        comment = false;
	                        angleBracketsCount--;
	                    }
	                }else {
	                    angleBracketsCount--;
	                }
	                if (angleBracketsCount === 0) {
	                  break;
	                }
	            }else if( xmlData[i] === '['){
	                hasBody = true;
	            }else {
	                exp += xmlData[i];
	            }
	        }
	        if(angleBracketsCount !== 0){
	            throw new Error(`Unclosed DOCTYPE`);
	        }
	    }else {
	        throw new Error(`Invalid Tag instead of DOCTYPE`);
	    }
	    return {entities, i};
	}

	function readEntityExp(xmlData,i){
	    //External entities are not supported
	    //    <!ENTITY ext SYSTEM "http://normal-website.com" >

	    //Parameter entities are not supported
	    //    <!ENTITY entityname "&anotherElement;">

	    //Internal entities are supported
	    //    <!ENTITY entityname "replacement text">
	    
	    //read EntityName
	    let entityName = "";
	    for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"' ); i++) {
	        // if(xmlData[i] === " ") continue;
	        // else 
	        entityName += xmlData[i];
	    }
	    entityName = entityName.trim();
	    if(entityName.indexOf(" ") !== -1) throw new Error("External entites are not supported");

	    //read Entity Value
	    const startChar = xmlData[i++];
	    let val = "";
	    for (; i < xmlData.length && xmlData[i] !== startChar ; i++) {
	        val += xmlData[i];
	    }
	    return [entityName, val, i];
	}

	function isComment(xmlData, i){
	    if(xmlData[i+1] === '!' &&
	    xmlData[i+2] === '-' &&
	    xmlData[i+3] === '-') return true
	    return false
	}
	function isEntity(xmlData, i){
	    if(xmlData[i+1] === '!' &&
	    xmlData[i+2] === 'E' &&
	    xmlData[i+3] === 'N' &&
	    xmlData[i+4] === 'T' &&
	    xmlData[i+5] === 'I' &&
	    xmlData[i+6] === 'T' &&
	    xmlData[i+7] === 'Y') return true
	    return false
	}
	function isElement(xmlData, i){
	    if(xmlData[i+1] === '!' &&
	    xmlData[i+2] === 'E' &&
	    xmlData[i+3] === 'L' &&
	    xmlData[i+4] === 'E' &&
	    xmlData[i+5] === 'M' &&
	    xmlData[i+6] === 'E' &&
	    xmlData[i+7] === 'N' &&
	    xmlData[i+8] === 'T') return true
	    return false
	}

	function isAttlist(xmlData, i){
	    if(xmlData[i+1] === '!' &&
	    xmlData[i+2] === 'A' &&
	    xmlData[i+3] === 'T' &&
	    xmlData[i+4] === 'T' &&
	    xmlData[i+5] === 'L' &&
	    xmlData[i+6] === 'I' &&
	    xmlData[i+7] === 'S' &&
	    xmlData[i+8] === 'T') return true
	    return false
	}
	function isNotation(xmlData, i){
	    if(xmlData[i+1] === '!' &&
	    xmlData[i+2] === 'N' &&
	    xmlData[i+3] === 'O' &&
	    xmlData[i+4] === 'T' &&
	    xmlData[i+5] === 'A' &&
	    xmlData[i+6] === 'T' &&
	    xmlData[i+7] === 'I' &&
	    xmlData[i+8] === 'O' &&
	    xmlData[i+9] === 'N') return true
	    return false
	}

	function validateEntityName(name){
	    if (util.isName(name))
		return name;
	    else
	        throw new Error(`Invalid entity name ${name}`);
	}

	DocTypeReader = readDocType;
	return DocTypeReader;
}

var strnum;
var hasRequiredStrnum;

function requireStrnum () {
	if (hasRequiredStrnum) return strnum;
	hasRequiredStrnum = 1;
	const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
	const numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
	// const octRegex = /^0x[a-z0-9]+/;
	// const binRegex = /0x[a-z0-9]+/;

	 
	const consider = {
	    hex :  true,
	    // oct: false,
	    leadingZeros: true,
	    decimalPoint: "\.",
	    eNotation: true,
	    //skipLike: /regex/
	};

	function toNumber(str, options = {}){
	    options = Object.assign({}, consider, options );
	    if(!str || typeof str !== "string" ) return str;
	    else if(str==="0") return 0;

	    let trimmedStr  = str.trim();

	    if(options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
	    else if (options.hex && hexRegex.test(trimmedStr)) {
	        return parse_int(trimmedStr, 16);
	    // }else if (options.oct && octRegex.test(str)) {
	    //     return Number.parseInt(val, 8);
	    }else if (trimmedStr.search(/[eE]/)!== -1) { //eNotation
	        const notation = trimmedStr.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/); 
	        // +00.123 => [ , '+', '00', '.123', ..
	        if(notation){
	            // console.log(notation)
	            if(options.leadingZeros){ //accept with leading zeros
	                trimmedStr = (notation[1] || "") + notation[3];
	            }else {
	                if(notation[2] === "0" && notation[3][0]=== ".");else {
	                    return str;
	                }
	            }
	            return options.eNotation ? Number(trimmedStr) : str;
	        }else {
	            return str;
	        }
	    // }else if (options.parseBin && binRegex.test(str)) {
	    //     return Number.parseInt(val, 2);
	    }else {
	        //separate negative sign, leading zeros, and rest number
	        const match = numRegex.exec(trimmedStr);
	        // +00.123 => [ , '+', '00', '.123', ..
	        if(match){
	            const sign = match[1];
	            const leadingZeros = match[2];
	            let numTrimmedByZeros = trimZeros(match[3]); //complete num without leading zeros
	            //trim ending zeros for floating number
	            
	            if(!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str; //-0123
	            else if(!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str; //0123
	            else if(options.leadingZeros && leadingZeros===str) return 0; //00
	            
	            else {//no leading zeros or leading zeros are allowed
	                const num = Number(trimmedStr);
	                const numStr = "" + num;

	                if(numStr.search(/[eE]/) !== -1){ //given number is long and parsed to eNotation
	                    if(options.eNotation) return num;
	                    else return str;
	                }else if(trimmedStr.indexOf(".") !== -1){ //floating number
	                    if(numStr === "0" && (numTrimmedByZeros === "") ) return num; //0.0
	                    else if(numStr === numTrimmedByZeros) return num; //0.456. 0.79000
	                    else if( sign && numStr === "-"+numTrimmedByZeros) return num;
	                    else return str;
	                }
	                
	                if(leadingZeros){
	                    return (numTrimmedByZeros === numStr) || (sign+numTrimmedByZeros === numStr) ? num : str
	                }else  {
	                    return (trimmedStr === numStr) || (trimmedStr === sign+numStr) ? num : str
	                }
	            }
	        }else { //non-numeric string
	            return str;
	        }
	    }
	}

	/**
	 * 
	 * @param {string} numStr without leading zeros
	 * @returns 
	 */
	function trimZeros(numStr){
	    if(numStr && numStr.indexOf(".") !== -1){//float
	        numStr = numStr.replace(/0+$/, ""); //remove ending zeros
	        if(numStr === ".")  numStr = "0";
	        else if(numStr[0] === ".")  numStr = "0"+numStr;
	        else if(numStr[numStr.length-1] === ".")  numStr = numStr.substr(0,numStr.length-1);
	        return numStr;
	    }
	    return numStr;
	}

	function parse_int(numStr, base){
	    //polyfill
	    if(parseInt) return parseInt(numStr, base);
	    else if(Number.parseInt) return Number.parseInt(numStr, base);
	    else if(window && window.parseInt) return window.parseInt(numStr, base);
	    else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")
	}

	strnum = toNumber;
	return strnum;
}

var ignoreAttributes;
var hasRequiredIgnoreAttributes;

function requireIgnoreAttributes () {
	if (hasRequiredIgnoreAttributes) return ignoreAttributes;
	hasRequiredIgnoreAttributes = 1;
	function getIgnoreAttributesFn(ignoreAttributes) {
	    if (typeof ignoreAttributes === 'function') {
	        return ignoreAttributes
	    }
	    if (Array.isArray(ignoreAttributes)) {
	        return (attrName) => {
	            for (const pattern of ignoreAttributes) {
	                if (typeof pattern === 'string' && attrName === pattern) {
	                    return true
	                }
	                if (pattern instanceof RegExp && pattern.test(attrName)) {
	                    return true
	                }
	            }
	        }
	    }
	    return () => false
	}

	ignoreAttributes = getIgnoreAttributesFn;
	return ignoreAttributes;
}

var OrderedObjParser_1;
var hasRequiredOrderedObjParser;

function requireOrderedObjParser () {
	if (hasRequiredOrderedObjParser) return OrderedObjParser_1;
	hasRequiredOrderedObjParser = 1;
	///@ts-check

	const util = requireUtil();
	const xmlNode = requireXmlNode();
	const readDocType = requireDocTypeReader();
	const toNumber = requireStrnum();
	const getIgnoreAttributesFn = requireIgnoreAttributes();

	// const regx =
	//   '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
	//   .replace(/NAME/g, util.nameRegexp);

	//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
	//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

	class OrderedObjParser{
	  constructor(options){
	    this.options = options;
	    this.currentNode = null;
	    this.tagsNodeStack = [];
	    this.docTypeEntities = {};
	    this.lastEntities = {
	      "apos" : { regex: /&(apos|#39|#x27);/g, val : "'"},
	      "gt" : { regex: /&(gt|#62|#x3E);/g, val : ">"},
	      "lt" : { regex: /&(lt|#60|#x3C);/g, val : "<"},
	      "quot" : { regex: /&(quot|#34|#x22);/g, val : "\""},
	    };
	    this.ampEntity = { regex: /&(amp|#38|#x26);/g, val : "&"};
	    this.htmlEntities = {
	      "space": { regex: /&(nbsp|#160);/g, val: " " },
	      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
	      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
	      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
	      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
	      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
	      "cent" : { regex: /&(cent|#162);/g, val: "¢" },
	      "pound" : { regex: /&(pound|#163);/g, val: "£" },
	      "yen" : { regex: /&(yen|#165);/g, val: "¥" },
	      "euro" : { regex: /&(euro|#8364);/g, val: "€" },
	      "copyright" : { regex: /&(copy|#169);/g, val: "©" },
	      "reg" : { regex: /&(reg|#174);/g, val: "®" },
	      "inr" : { regex: /&(inr|#8377);/g, val: "₹" },
	      "num_dec": { regex: /&#([0-9]{1,7});/g, val : (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
	      "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val : (_, str) => String.fromCharCode(Number.parseInt(str, 16)) },
	    };
	    this.addExternalEntities = addExternalEntities;
	    this.parseXml = parseXml;
	    this.parseTextData = parseTextData;
	    this.resolveNameSpace = resolveNameSpace;
	    this.buildAttributesMap = buildAttributesMap;
	    this.isItStopNode = isItStopNode;
	    this.replaceEntitiesValue = replaceEntitiesValue;
	    this.readStopNodeData = readStopNodeData;
	    this.saveTextToParentTag = saveTextToParentTag;
	    this.addChild = addChild;
	    this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
	  }

	}

	function addExternalEntities(externalEntities){
	  const entKeys = Object.keys(externalEntities);
	  for (let i = 0; i < entKeys.length; i++) {
	    const ent = entKeys[i];
	    this.lastEntities[ent] = {
	       regex: new RegExp("&"+ent+";","g"),
	       val : externalEntities[ent]
	    };
	  }
	}

	/**
	 * @param {string} val
	 * @param {string} tagName
	 * @param {string} jPath
	 * @param {boolean} dontTrim
	 * @param {boolean} hasAttributes
	 * @param {boolean} isLeafNode
	 * @param {boolean} escapeEntities
	 */
	function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
	  if (val !== undefined) {
	    if (this.options.trimValues && !dontTrim) {
	      val = val.trim();
	    }
	    if(val.length > 0){
	      if(!escapeEntities) val = this.replaceEntitiesValue(val);
	      
	      const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
	      if(newval === null || newval === undefined){
	        //don't parse
	        return val;
	      }else if(typeof newval !== typeof val || newval !== val){
	        //overwrite
	        return newval;
	      }else if(this.options.trimValues){
	        return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
	      }else {
	        const trimmedVal = val.trim();
	        if(trimmedVal === val){
	          return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
	        }else {
	          return val;
	        }
	      }
	    }
	  }
	}

	function resolveNameSpace(tagname) {
	  if (this.options.removeNSPrefix) {
	    const tags = tagname.split(':');
	    const prefix = tagname.charAt(0) === '/' ? '/' : '';
	    if (tags[0] === 'xmlns') {
	      return '';
	    }
	    if (tags.length === 2) {
	      tagname = prefix + tags[1];
	    }
	  }
	  return tagname;
	}

	//TODO: change regex to capture NS
	//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
	const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?', 'gm');

	function buildAttributesMap(attrStr, jPath, tagName) {
	  if (this.options.ignoreAttributes !== true && typeof attrStr === 'string') {
	    // attrStr = attrStr.replace(/\r?\n/g, ' ');
	    //attrStr = attrStr || attrStr.trim();

	    const matches = util.getAllMatches(attrStr, attrsRegx);
	    const len = matches.length; //don't make it inline
	    const attrs = {};
	    for (let i = 0; i < len; i++) {
	      const attrName = this.resolveNameSpace(matches[i][1]);
	      if (this.ignoreAttributesFn(attrName, jPath)) {
	        continue
	      }
	      let oldVal = matches[i][4];
	      let aName = this.options.attributeNamePrefix + attrName;
	      if (attrName.length) {
	        if (this.options.transformAttributeName) {
	          aName = this.options.transformAttributeName(aName);
	        }
	        if(aName === "__proto__") aName  = "#__proto__";
	        if (oldVal !== undefined) {
	          if (this.options.trimValues) {
	            oldVal = oldVal.trim();
	          }
	          oldVal = this.replaceEntitiesValue(oldVal);
	          const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
	          if(newVal === null || newVal === undefined){
	            //don't parse
	            attrs[aName] = oldVal;
	          }else if(typeof newVal !== typeof oldVal || newVal !== oldVal){
	            //overwrite
	            attrs[aName] = newVal;
	          }else {
	            //parse
	            attrs[aName] = parseValue(
	              oldVal,
	              this.options.parseAttributeValue,
	              this.options.numberParseOptions
	            );
	          }
	        } else if (this.options.allowBooleanAttributes) {
	          attrs[aName] = true;
	        }
	      }
	    }
	    if (!Object.keys(attrs).length) {
	      return;
	    }
	    if (this.options.attributesGroupName) {
	      const attrCollection = {};
	      attrCollection[this.options.attributesGroupName] = attrs;
	      return attrCollection;
	    }
	    return attrs
	  }
	}

	const parseXml = function(xmlData) {
	  xmlData = xmlData.replace(/\r\n?/g, "\n"); //TODO: remove this line
	  const xmlObj = new xmlNode('!xml');
	  let currentNode = xmlObj;
	  let textData = "";
	  let jPath = "";
	  for(let i=0; i< xmlData.length; i++){//for each char in XML data
	    const ch = xmlData[i];
	    if(ch === '<'){
	      // const nextIndex = i+1;
	      // const _2ndChar = xmlData[nextIndex];
	      if( xmlData[i+1] === '/') {//Closing Tag
	        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
	        let tagName = xmlData.substring(i+2,closeIndex).trim();

	        if(this.options.removeNSPrefix){
	          const colonIndex = tagName.indexOf(":");
	          if(colonIndex !== -1){
	            tagName = tagName.substr(colonIndex+1);
	          }
	        }

	        if(this.options.transformTagName) {
	          tagName = this.options.transformTagName(tagName);
	        }

	        if(currentNode){
	          textData = this.saveTextToParentTag(textData, currentNode, jPath);
	        }

	        //check if last tag of nested tag was unpaired tag
	        const lastTagName = jPath.substring(jPath.lastIndexOf(".")+1);
	        if(tagName && this.options.unpairedTags.indexOf(tagName) !== -1 ){
	          throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
	        }
	        let propIndex = 0;
	        if(lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1 ){
	          propIndex = jPath.lastIndexOf('.', jPath.lastIndexOf('.')-1);
	          this.tagsNodeStack.pop();
	        }else {
	          propIndex = jPath.lastIndexOf(".");
	        }
	        jPath = jPath.substring(0, propIndex);

	        currentNode = this.tagsNodeStack.pop();//avoid recursion, set the parent tag scope
	        textData = "";
	        i = closeIndex;
	      } else if( xmlData[i+1] === '?') {

	        let tagData = readTagExp(xmlData,i, false, "?>");
	        if(!tagData) throw new Error("Pi Tag is not closed.");

	        textData = this.saveTextToParentTag(textData, currentNode, jPath);
	        if( (this.options.ignoreDeclaration && tagData.tagName === "?xml") || this.options.ignorePiTags);else {
	  
	          const childNode = new xmlNode(tagData.tagName);
	          childNode.add(this.options.textNodeName, "");
	          
	          if(tagData.tagName !== tagData.tagExp && tagData.attrExpPresent){
	            childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
	          }
	          this.addChild(currentNode, childNode, jPath);

	        }


	        i = tagData.closeIndex + 1;
	      } else if(xmlData.substr(i + 1, 3) === '!--') {
	        const endIndex = findClosingIndex(xmlData, "-->", i+4, "Comment is not closed.");
	        if(this.options.commentPropName){
	          const comment = xmlData.substring(i + 4, endIndex - 2);

	          textData = this.saveTextToParentTag(textData, currentNode, jPath);

	          currentNode.add(this.options.commentPropName, [ { [this.options.textNodeName] : comment } ]);
	        }
	        i = endIndex;
	      } else if( xmlData.substr(i + 1, 2) === '!D') {
	        const result = readDocType(xmlData, i);
	        this.docTypeEntities = result.entities;
	        i = result.i;
	      }else if(xmlData.substr(i + 1, 2) === '![') {
	        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
	        const tagExp = xmlData.substring(i + 9,closeIndex);

	        textData = this.saveTextToParentTag(textData, currentNode, jPath);

	        let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
	        if(val == undefined) val = "";

	        //cdata should be set even if it is 0 length string
	        if(this.options.cdataPropName){
	          currentNode.add(this.options.cdataPropName, [ { [this.options.textNodeName] : tagExp } ]);
	        }else {
	          currentNode.add(this.options.textNodeName, val);
	        }
	        
	        i = closeIndex + 2;
	      }else {//Opening tag
	        let result = readTagExp(xmlData,i, this.options.removeNSPrefix);
	        let tagName= result.tagName;
	        const rawTagName = result.rawTagName;
	        let tagExp = result.tagExp;
	        let attrExpPresent = result.attrExpPresent;
	        let closeIndex = result.closeIndex;

	        if (this.options.transformTagName) {
	          tagName = this.options.transformTagName(tagName);
	        }
	        
	        //save text as child node
	        if (currentNode && textData) {
	          if(currentNode.tagname !== '!xml'){
	            //when nested tag is found
	            textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
	          }
	        }

	        //check if last tag was unpaired tag
	        const lastTag = currentNode;
	        if(lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1 ){
	          currentNode = this.tagsNodeStack.pop();
	          jPath = jPath.substring(0, jPath.lastIndexOf("."));
	        }
	        if(tagName !== xmlObj.tagname){
	          jPath += jPath ? "." + tagName : tagName;
	        }
	        if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
	          let tagContent = "";
	          //self-closing tag
	          if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
	            if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
	              tagName = tagName.substr(0, tagName.length - 1);
	              jPath = jPath.substr(0, jPath.length - 1);
	              tagExp = tagName;
	            }else {
	              tagExp = tagExp.substr(0, tagExp.length - 1);
	            }
	            i = result.closeIndex;
	          }
	          //unpaired tag
	          else if(this.options.unpairedTags.indexOf(tagName) !== -1){
	            
	            i = result.closeIndex;
	          }
	          //normal tag
	          else {
	            //read until closing tag is found
	            const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
	            if(!result) throw new Error(`Unexpected end of ${rawTagName}`);
	            i = result.i;
	            tagContent = result.tagContent;
	          }

	          const childNode = new xmlNode(tagName);
	          if(tagName !== tagExp && attrExpPresent){
	            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
	          }
	          if(tagContent) {
	            tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
	          }
	          
	          jPath = jPath.substr(0, jPath.lastIndexOf("."));
	          childNode.add(this.options.textNodeName, tagContent);
	          
	          this.addChild(currentNode, childNode, jPath);
	        }else {
	  //selfClosing tag
	          if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
	            if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
	              tagName = tagName.substr(0, tagName.length - 1);
	              jPath = jPath.substr(0, jPath.length - 1);
	              tagExp = tagName;
	            }else {
	              tagExp = tagExp.substr(0, tagExp.length - 1);
	            }
	            
	            if(this.options.transformTagName) {
	              tagName = this.options.transformTagName(tagName);
	            }

	            const childNode = new xmlNode(tagName);
	            if(tagName !== tagExp && attrExpPresent){
	              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
	            }
	            this.addChild(currentNode, childNode, jPath);
	            jPath = jPath.substr(0, jPath.lastIndexOf("."));
	          }
	    //opening tag
	          else {
	            const childNode = new xmlNode( tagName);
	            this.tagsNodeStack.push(currentNode);
	            
	            if(tagName !== tagExp && attrExpPresent){
	              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
	            }
	            this.addChild(currentNode, childNode, jPath);
	            currentNode = childNode;
	          }
	          textData = "";
	          i = closeIndex;
	        }
	      }
	    }else {
	      textData += xmlData[i];
	    }
	  }
	  return xmlObj.child;
	};

	function addChild(currentNode, childNode, jPath){
	  const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
	  if(result === false);else if(typeof result === "string"){
	    childNode.tagname = result;
	    currentNode.addChild(childNode);
	  }else {
	    currentNode.addChild(childNode);
	  }
	}

	const replaceEntitiesValue = function(val){

	  if(this.options.processEntities){
	    for(let entityName in this.docTypeEntities){
	      const entity = this.docTypeEntities[entityName];
	      val = val.replace( entity.regx, entity.val);
	    }
	    for(let entityName in this.lastEntities){
	      const entity = this.lastEntities[entityName];
	      val = val.replace( entity.regex, entity.val);
	    }
	    if(this.options.htmlEntities){
	      for(let entityName in this.htmlEntities){
	        const entity = this.htmlEntities[entityName];
	        val = val.replace( entity.regex, entity.val);
	      }
	    }
	    val = val.replace( this.ampEntity.regex, this.ampEntity.val);
	  }
	  return val;
	};
	function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
	  if (textData) { //store previously collected data as textNode
	    if(isLeafNode === undefined) isLeafNode = currentNode.child.length === 0;
	    
	    textData = this.parseTextData(textData,
	      currentNode.tagname,
	      jPath,
	      false,
	      currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
	      isLeafNode);

	    if (textData !== undefined && textData !== "")
	      currentNode.add(this.options.textNodeName, textData);
	    textData = "";
	  }
	  return textData;
	}

	//TODO: use jPath to simplify the logic
	/**
	 * 
	 * @param {string[]} stopNodes 
	 * @param {string} jPath
	 * @param {string} currentTagName 
	 */
	function isItStopNode(stopNodes, jPath, currentTagName){
	  const allNodesExp = "*." + currentTagName;
	  for (const stopNodePath in stopNodes) {
	    const stopNodeExp = stopNodes[stopNodePath];
	    if( allNodesExp === stopNodeExp || jPath === stopNodeExp  ) return true;
	  }
	  return false;
	}

	/**
	 * Returns the tag Expression and where it is ending handling single-double quotes situation
	 * @param {string} xmlData 
	 * @param {number} i starting index
	 * @returns 
	 */
	function tagExpWithClosingIndex(xmlData, i, closingChar = ">"){
	  let attrBoundary;
	  let tagExp = "";
	  for (let index = i; index < xmlData.length; index++) {
	    let ch = xmlData[index];
	    if (attrBoundary) {
	        if (ch === attrBoundary) attrBoundary = "";//reset
	    } else if (ch === '"' || ch === "'") {
	        attrBoundary = ch;
	    } else if (ch === closingChar[0]) {
	      if(closingChar[1]){
	        if(xmlData[index + 1] === closingChar[1]){
	          return {
	            data: tagExp,
	            index: index
	          }
	        }
	      }else {
	        return {
	          data: tagExp,
	          index: index
	        }
	      }
	    } else if (ch === '\t') {
	      ch = " ";
	    }
	    tagExp += ch;
	  }
	}

	function findClosingIndex(xmlData, str, i, errMsg){
	  const closingIndex = xmlData.indexOf(str, i);
	  if(closingIndex === -1){
	    throw new Error(errMsg)
	  }else {
	    return closingIndex + str.length - 1;
	  }
	}

	function readTagExp(xmlData,i, removeNSPrefix, closingChar = ">"){
	  const result = tagExpWithClosingIndex(xmlData, i+1, closingChar);
	  if(!result) return;
	  let tagExp = result.data;
	  const closeIndex = result.index;
	  const separatorIndex = tagExp.search(/\s/);
	  let tagName = tagExp;
	  let attrExpPresent = true;
	  if(separatorIndex !== -1){//separate tag name and attributes expression
	    tagName = tagExp.substring(0, separatorIndex);
	    tagExp = tagExp.substring(separatorIndex + 1).trimStart();
	  }

	  const rawTagName = tagName;
	  if(removeNSPrefix){
	    const colonIndex = tagName.indexOf(":");
	    if(colonIndex !== -1){
	      tagName = tagName.substr(colonIndex+1);
	      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
	    }
	  }

	  return {
	    tagName: tagName,
	    tagExp: tagExp,
	    closeIndex: closeIndex,
	    attrExpPresent: attrExpPresent,
	    rawTagName: rawTagName,
	  }
	}
	/**
	 * find paired tag for a stop node
	 * @param {string} xmlData 
	 * @param {string} tagName 
	 * @param {number} i 
	 */
	function readStopNodeData(xmlData, tagName, i){
	  const startIndex = i;
	  // Starting at 1 since we already have an open tag
	  let openTagCount = 1;

	  for (; i < xmlData.length; i++) {
	    if( xmlData[i] === "<"){ 
	      if (xmlData[i+1] === "/") {//close tag
	          const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
	          let closeTagName = xmlData.substring(i+2,closeIndex).trim();
	          if(closeTagName === tagName){
	            openTagCount--;
	            if (openTagCount === 0) {
	              return {
	                tagContent: xmlData.substring(startIndex, i),
	                i : closeIndex
	              }
	            }
	          }
	          i=closeIndex;
	        } else if(xmlData[i+1] === '?') { 
	          const closeIndex = findClosingIndex(xmlData, "?>", i+1, "StopNode is not closed.");
	          i=closeIndex;
	        } else if(xmlData.substr(i + 1, 3) === '!--') { 
	          const closeIndex = findClosingIndex(xmlData, "-->", i+3, "StopNode is not closed.");
	          i=closeIndex;
	        } else if(xmlData.substr(i + 1, 2) === '![') { 
	          const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
	          i=closeIndex;
	        } else {
	          const tagData = readTagExp(xmlData, i, '>');

	          if (tagData) {
	            const openTagName = tagData && tagData.tagName;
	            if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length-1] !== "/") {
	              openTagCount++;
	            }
	            i=tagData.closeIndex;
	          }
	        }
	      }
	  }//end for loop
	}

	function parseValue(val, shouldParse, options) {
	  if (shouldParse && typeof val === 'string') {
	    //console.log(options)
	    const newval = val.trim();
	    if(newval === 'true' ) return true;
	    else if(newval === 'false' ) return false;
	    else return toNumber(val, options);
	  } else {
	    if (util.isExist(val)) {
	      return val;
	    } else {
	      return '';
	    }
	  }
	}


	OrderedObjParser_1 = OrderedObjParser;
	return OrderedObjParser_1;
}

var node2json = {};

var hasRequiredNode2json;

function requireNode2json () {
	if (hasRequiredNode2json) return node2json;
	hasRequiredNode2json = 1;

	/**
	 * 
	 * @param {array} node 
	 * @param {any} options 
	 * @returns 
	 */
	function prettify(node, options){
	  return compress( node, options);
	}

	/**
	 * 
	 * @param {array} arr 
	 * @param {object} options 
	 * @param {string} jPath 
	 * @returns object
	 */
	function compress(arr, options, jPath){
	  let text;
	  const compressedObj = {};
	  for (let i = 0; i < arr.length; i++) {
	    const tagObj = arr[i];
	    const property = propName(tagObj);
	    let newJpath = "";
	    if(jPath === undefined) newJpath = property;
	    else newJpath = jPath + "." + property;

	    if(property === options.textNodeName){
	      if(text === undefined) text = tagObj[property];
	      else text += "" + tagObj[property];
	    }else if(property === undefined){
	      continue;
	    }else if(tagObj[property]){
	      
	      let val = compress(tagObj[property], options, newJpath);
	      const isLeaf = isLeafTag(val, options);

	      if(tagObj[":@"]){
	        assignAttributes( val, tagObj[":@"], newJpath, options);
	      }else if(Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode){
	        val = val[options.textNodeName];
	      }else if(Object.keys(val).length === 0){
	        if(options.alwaysCreateTextNode) val[options.textNodeName] = "";
	        else val = "";
	      }

	      if(compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
	        if(!Array.isArray(compressedObj[property])) {
	            compressedObj[property] = [ compressedObj[property] ];
	        }
	        compressedObj[property].push(val);
	      }else {
	        //TODO: if a node is not an array, then check if it should be an array
	        //also determine if it is a leaf node
	        if (options.isArray(property, newJpath, isLeaf )) {
	          compressedObj[property] = [val];
	        }else {
	          compressedObj[property] = val;
	        }
	      }
	    }
	    
	  }
	  // if(text && text.length > 0) compressedObj[options.textNodeName] = text;
	  if(typeof text === "string"){
	    if(text.length > 0) compressedObj[options.textNodeName] = text;
	  }else if(text !== undefined) compressedObj[options.textNodeName] = text;
	  return compressedObj;
	}

	function propName(obj){
	  const keys = Object.keys(obj);
	  for (let i = 0; i < keys.length; i++) {
	    const key = keys[i];
	    if(key !== ":@") return key;
	  }
	}

	function assignAttributes(obj, attrMap, jpath, options){
	  if (attrMap) {
	    const keys = Object.keys(attrMap);
	    const len = keys.length; //don't make it inline
	    for (let i = 0; i < len; i++) {
	      const atrrName = keys[i];
	      if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
	        obj[atrrName] = [ attrMap[atrrName] ];
	      } else {
	        obj[atrrName] = attrMap[atrrName];
	      }
	    }
	  }
	}

	function isLeafTag(obj, options){
	  const { textNodeName } = options;
	  const propCount = Object.keys(obj).length;
	  
	  if (propCount === 0) {
	    return true;
	  }

	  if (
	    propCount === 1 &&
	    (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)
	  ) {
	    return true;
	  }

	  return false;
	}
	node2json.prettify = prettify;
	return node2json;
}

var XMLParser_1;
var hasRequiredXMLParser;

function requireXMLParser () {
	if (hasRequiredXMLParser) return XMLParser_1;
	hasRequiredXMLParser = 1;
	const { buildOptions} = requireOptionsBuilder();
	const OrderedObjParser = requireOrderedObjParser();
	const { prettify} = requireNode2json();
	const validator = requireValidator();

	class XMLParser{
	    
	    constructor(options){
	        this.externalEntities = {};
	        this.options = buildOptions(options);
	        
	    }
	    /**
	     * Parse XML dats to JS object 
	     * @param {string|Buffer} xmlData 
	     * @param {boolean|Object} validationOption 
	     */
	    parse(xmlData,validationOption){
	        if(typeof xmlData === "string");else if( xmlData.toString){
	            xmlData = xmlData.toString();
	        }else {
	            throw new Error("XML data is accepted in String or Bytes[] form.")
	        }
	        if( validationOption){
	            if(validationOption === true) validationOption = {}; //validate with default options
	            
	            const result = validator.validate(xmlData, validationOption);
	            if (result !== true) {
	              throw Error( `${result.err.msg}:${result.err.line}:${result.err.col}` )
	            }
	          }
	        const orderedObjParser = new OrderedObjParser(this.options);
	        orderedObjParser.addExternalEntities(this.externalEntities);
	        const orderedResult = orderedObjParser.parseXml(xmlData);
	        if(this.options.preserveOrder || orderedResult === undefined) return orderedResult;
	        else return prettify(orderedResult, this.options);
	    }

	    /**
	     * Add Entity which is not by default supported by this library
	     * @param {string} key 
	     * @param {string} value 
	     */
	    addEntity(key, value){
	        if(value.indexOf("&") !== -1){
	            throw new Error("Entity value can't have '&'")
	        }else if(key.indexOf("&") !== -1 || key.indexOf(";") !== -1){
	            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'")
	        }else if(value === "&"){
	            throw new Error("An entity with value '&' is not permitted");
	        }else {
	            this.externalEntities[key] = value;
	        }
	    }
	}

	XMLParser_1 = XMLParser;
	return XMLParser_1;
}

var orderedJs2Xml;
var hasRequiredOrderedJs2Xml;

function requireOrderedJs2Xml () {
	if (hasRequiredOrderedJs2Xml) return orderedJs2Xml;
	hasRequiredOrderedJs2Xml = 1;
	const EOL = "\n";

	/**
	 * 
	 * @param {array} jArray 
	 * @param {any} options 
	 * @returns 
	 */
	function toXml(jArray, options) {
	    let indentation = "";
	    if (options.format && options.indentBy.length > 0) {
	        indentation = EOL;
	    }
	    return arrToStr(jArray, options, "", indentation);
	}

	function arrToStr(arr, options, jPath, indentation) {
	    let xmlStr = "";
	    let isPreviousElementTag = false;

	    for (let i = 0; i < arr.length; i++) {
	        const tagObj = arr[i];
	        const tagName = propName(tagObj);
	        if(tagName === undefined) continue;

	        let newJPath = "";
	        if (jPath.length === 0) newJPath = tagName;
	        else newJPath = `${jPath}.${tagName}`;

	        if (tagName === options.textNodeName) {
	            let tagText = tagObj[tagName];
	            if (!isStopNode(newJPath, options)) {
	                tagText = options.tagValueProcessor(tagName, tagText);
	                tagText = replaceEntitiesValue(tagText, options);
	            }
	            if (isPreviousElementTag) {
	                xmlStr += indentation;
	            }
	            xmlStr += tagText;
	            isPreviousElementTag = false;
	            continue;
	        } else if (tagName === options.cdataPropName) {
	            if (isPreviousElementTag) {
	                xmlStr += indentation;
	            }
	            xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
	            isPreviousElementTag = false;
	            continue;
	        } else if (tagName === options.commentPropName) {
	            xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
	            isPreviousElementTag = true;
	            continue;
	        } else if (tagName[0] === "?") {
	            const attStr = attr_to_str(tagObj[":@"], options);
	            const tempInd = tagName === "?xml" ? "" : indentation;
	            let piTextNodeName = tagObj[tagName][0][options.textNodeName];
	            piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : ""; //remove extra spacing
	            xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr}?>`;
	            isPreviousElementTag = true;
	            continue;
	        }
	        let newIdentation = indentation;
	        if (newIdentation !== "") {
	            newIdentation += options.indentBy;
	        }
	        const attStr = attr_to_str(tagObj[":@"], options);
	        const tagStart = indentation + `<${tagName}${attStr}`;
	        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
	        if (options.unpairedTags.indexOf(tagName) !== -1) {
	            if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
	            else xmlStr += tagStart + "/>";
	        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
	            xmlStr += tagStart + "/>";
	        } else if (tagValue && tagValue.endsWith(">")) {
	            xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
	        } else {
	            xmlStr += tagStart + ">";
	            if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
	                xmlStr += indentation + options.indentBy + tagValue + indentation;
	            } else {
	                xmlStr += tagValue;
	            }
	            xmlStr += `</${tagName}>`;
	        }
	        isPreviousElementTag = true;
	    }

	    return xmlStr;
	}

	function propName(obj) {
	    const keys = Object.keys(obj);
	    for (let i = 0; i < keys.length; i++) {
	        const key = keys[i];
	        if(!obj.hasOwnProperty(key)) continue;
	        if (key !== ":@") return key;
	    }
	}

	function attr_to_str(attrMap, options) {
	    let attrStr = "";
	    if (attrMap && !options.ignoreAttributes) {
	        for (let attr in attrMap) {
	            if(!attrMap.hasOwnProperty(attr)) continue;
	            let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
	            attrVal = replaceEntitiesValue(attrVal, options);
	            if (attrVal === true && options.suppressBooleanAttributes) {
	                attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
	            } else {
	                attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
	            }
	        }
	    }
	    return attrStr;
	}

	function isStopNode(jPath, options) {
	    jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
	    let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
	    for (let index in options.stopNodes) {
	        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName) return true;
	    }
	    return false;
	}

	function replaceEntitiesValue(textValue, options) {
	    if (textValue && textValue.length > 0 && options.processEntities) {
	        for (let i = 0; i < options.entities.length; i++) {
	            const entity = options.entities[i];
	            textValue = textValue.replace(entity.regex, entity.val);
	        }
	    }
	    return textValue;
	}
	orderedJs2Xml = toXml;
	return orderedJs2Xml;
}

var json2xml;
var hasRequiredJson2xml;

function requireJson2xml () {
	if (hasRequiredJson2xml) return json2xml;
	hasRequiredJson2xml = 1;
	//parse Empty Node as self closing node
	const buildFromOrderedJs = requireOrderedJs2Xml();
	const getIgnoreAttributesFn = requireIgnoreAttributes();

	const defaultOptions = {
	  attributeNamePrefix: '@_',
	  attributesGroupName: false,
	  textNodeName: '#text',
	  ignoreAttributes: true,
	  cdataPropName: false,
	  format: false,
	  indentBy: '  ',
	  suppressEmptyNode: false,
	  suppressUnpairedNode: true,
	  suppressBooleanAttributes: true,
	  tagValueProcessor: function(key, a) {
	    return a;
	  },
	  attributeValueProcessor: function(attrName, a) {
	    return a;
	  },
	  preserveOrder: false,
	  commentPropName: false,
	  unpairedTags: [],
	  entities: [
	    { regex: new RegExp("&", "g"), val: "&amp;" },//it must be on top
	    { regex: new RegExp(">", "g"), val: "&gt;" },
	    { regex: new RegExp("<", "g"), val: "&lt;" },
	    { regex: new RegExp("\'", "g"), val: "&apos;" },
	    { regex: new RegExp("\"", "g"), val: "&quot;" }
	  ],
	  processEntities: true,
	  stopNodes: [],
	  // transformTagName: false,
	  // transformAttributeName: false,
	  oneListGroup: false
	};

	function Builder(options) {
	  this.options = Object.assign({}, defaultOptions, options);
	  if (this.options.ignoreAttributes === true || this.options.attributesGroupName) {
	    this.isAttribute = function(/*a*/) {
	      return false;
	    };
	  } else {
	    this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
	    this.attrPrefixLen = this.options.attributeNamePrefix.length;
	    this.isAttribute = isAttribute;
	  }

	  this.processTextOrObjNode = processTextOrObjNode;

	  if (this.options.format) {
	    this.indentate = indentate;
	    this.tagEndChar = '>\n';
	    this.newLine = '\n';
	  } else {
	    this.indentate = function() {
	      return '';
	    };
	    this.tagEndChar = '>';
	    this.newLine = '';
	  }
	}

	Builder.prototype.build = function(jObj) {
	  if(this.options.preserveOrder){
	    return buildFromOrderedJs(jObj, this.options);
	  }else {
	    if(Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1){
	      jObj = {
	        [this.options.arrayNodeName] : jObj
	      };
	    }
	    return this.j2x(jObj, 0, []).val;
	  }
	};

	Builder.prototype.j2x = function(jObj, level, ajPath) {
	  let attrStr = '';
	  let val = '';
	  const jPath = ajPath.join('.');
	  for (let key in jObj) {
	    if(!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
	    if (typeof jObj[key] === 'undefined') {
	      // supress undefined node only if it is not an attribute
	      if (this.isAttribute(key)) {
	        val += '';
	      }
	    } else if (jObj[key] === null) {
	      // null attribute should be ignored by the attribute list, but should not cause the tag closing
	      if (this.isAttribute(key)) {
	        val += '';
	      } else if (key === this.options.cdataPropName) {
	        val += '';
	      } else if (key[0] === '?') {
	        val += this.indentate(level) + '<' + key + '?' + this.tagEndChar;
	      } else {
	        val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
	      }
	      // val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
	    } else if (jObj[key] instanceof Date) {
	      val += this.buildTextValNode(jObj[key], key, '', level);
	    } else if (typeof jObj[key] !== 'object') {
	      //premitive type
	      const attr = this.isAttribute(key);
	      if (attr && !this.ignoreAttributesFn(attr, jPath)) {
	        attrStr += this.buildAttrPairStr(attr, '' + jObj[key]);
	      } else if (!attr) {
	        //tag value
	        if (key === this.options.textNodeName) {
	          let newval = this.options.tagValueProcessor(key, '' + jObj[key]);
	          val += this.replaceEntitiesValue(newval);
	        } else {
	          val += this.buildTextValNode(jObj[key], key, '', level);
	        }
	      }
	    } else if (Array.isArray(jObj[key])) {
	      //repeated nodes
	      const arrLen = jObj[key].length;
	      let listTagVal = "";
	      let listTagAttr = "";
	      for (let j = 0; j < arrLen; j++) {
	        const item = jObj[key][j];
	        if (typeof item === 'undefined') ; else if (item === null) {
	          if(key[0] === "?") val += this.indentate(level) + '<' + key + '?' + this.tagEndChar;
	          else val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
	          // val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
	        } else if (typeof item === 'object') {
	          if(this.options.oneListGroup){
	            const result = this.j2x(item, level + 1, ajPath.concat(key));
	            listTagVal += result.val;
	            if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
	              listTagAttr += result.attrStr;
	            }
	          }else {
	            listTagVal += this.processTextOrObjNode(item, key, level, ajPath);
	          }
	        } else {
	          if (this.options.oneListGroup) {
	            let textValue = this.options.tagValueProcessor(key, item);
	            textValue = this.replaceEntitiesValue(textValue);
	            listTagVal += textValue;
	          } else {
	            listTagVal += this.buildTextValNode(item, key, '', level);
	          }
	        }
	      }
	      if(this.options.oneListGroup){
	        listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
	      }
	      val += listTagVal;
	    } else {
	      //nested node
	      if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
	        const Ks = Object.keys(jObj[key]);
	        const L = Ks.length;
	        for (let j = 0; j < L; j++) {
	          attrStr += this.buildAttrPairStr(Ks[j], '' + jObj[key][Ks[j]]);
	        }
	      } else {
	        val += this.processTextOrObjNode(jObj[key], key, level, ajPath);
	      }
	    }
	  }
	  return {attrStr: attrStr, val: val};
	};

	Builder.prototype.buildAttrPairStr = function(attrName, val){
	  val = this.options.attributeValueProcessor(attrName, '' + val);
	  val = this.replaceEntitiesValue(val);
	  if (this.options.suppressBooleanAttributes && val === "true") {
	    return ' ' + attrName;
	  } else return ' ' + attrName + '="' + val + '"';
	};

	function processTextOrObjNode (object, key, level, ajPath) {
	  const result = this.j2x(object, level + 1, ajPath.concat(key));
	  if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
	    return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
	  } else {
	    return this.buildObjectNode(result.val, key, result.attrStr, level);
	  }
	}

	Builder.prototype.buildObjectNode = function(val, key, attrStr, level) {
	  if(val === ""){
	    if(key[0] === "?") return  this.indentate(level) + '<' + key + attrStr+ '?' + this.tagEndChar;
	    else {
	      return this.indentate(level) + '<' + key + attrStr + this.closeTag(key) + this.tagEndChar;
	    }
	  }else {

	    let tagEndExp = '</' + key + this.tagEndChar;
	    let piClosingChar = "";
	    
	    if(key[0] === "?") {
	      piClosingChar = "?";
	      tagEndExp = "";
	    }
	  
	    // attrStr is an empty string in case the attribute came as undefined or null
	    if ((attrStr || attrStr === '') && val.indexOf('<') === -1) {
	      return ( this.indentate(level) + '<' +  key + attrStr + piClosingChar + '>' + val + tagEndExp );
	    } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
	      return this.indentate(level) + `<!--${val}-->` + this.newLine;
	    }else {
	      return (
	        this.indentate(level) + '<' + key + attrStr + piClosingChar + this.tagEndChar +
	        val +
	        this.indentate(level) + tagEndExp    );
	    }
	  }
	};

	Builder.prototype.closeTag = function(key){
	  let closeTag = "";
	  if(this.options.unpairedTags.indexOf(key) !== -1){ //unpaired
	    if(!this.options.suppressUnpairedNode) closeTag = "/";
	  }else if(this.options.suppressEmptyNode){ //empty
	    closeTag = "/";
	  }else {
	    closeTag = `></${key}`;
	  }
	  return closeTag;
	};

	Builder.prototype.buildTextValNode = function(val, key, attrStr, level) {
	  if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
	    return this.indentate(level) + `<![CDATA[${val}]]>` +  this.newLine;
	  }else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
	    return this.indentate(level) + `<!--${val}-->` +  this.newLine;
	  }else if(key[0] === "?") {//PI tag
	    return  this.indentate(level) + '<' + key + attrStr+ '?' + this.tagEndChar; 
	  }else {
	    let textValue = this.options.tagValueProcessor(key, val);
	    textValue = this.replaceEntitiesValue(textValue);
	  
	    if( textValue === ''){
	      return this.indentate(level) + '<' + key + attrStr + this.closeTag(key) + this.tagEndChar;
	    }else {
	      return this.indentate(level) + '<' + key + attrStr + '>' +
	         textValue +
	        '</' + key + this.tagEndChar;
	    }
	  }
	};

	Builder.prototype.replaceEntitiesValue = function(textValue){
	  if(textValue && textValue.length > 0 && this.options.processEntities){
	    for (let i=0; i<this.options.entities.length; i++) {
	      const entity = this.options.entities[i];
	      textValue = textValue.replace(entity.regex, entity.val);
	    }
	  }
	  return textValue;
	};

	function indentate(level) {
	  return this.options.indentBy.repeat(level);
	}

	function isAttribute(name /*, options*/) {
	  if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
	    return name.substr(this.attrPrefixLen);
	  } else {
	    return false;
	  }
	}

	json2xml = Builder;
	return json2xml;
}

var fxp;
var hasRequiredFxp;

function requireFxp () {
	if (hasRequiredFxp) return fxp;
	hasRequiredFxp = 1;

	const validator = requireValidator();
	const XMLParser = requireXMLParser();
	const XMLBuilder = requireJson2xml();

	fxp = {
	  XMLParser: XMLParser,
	  XMLValidator: validator,
	  XMLBuilder: XMLBuilder
	};
	return fxp;
}

var XmlAdapter_1;
var hasRequiredXmlAdapter;

function requireXmlAdapter () {
	if (hasRequiredXmlAdapter) return XmlAdapter_1;
	hasRequiredXmlAdapter = 1;
	const { Transform } = require$$0$3;
	const { XMLParser } = requireFxp();
	const jsonpath = requireSimpleJsonpath();

	class XmlAdapter {
	  async parse(rawData) {
	    const parser = new XMLParser({
	      ignoreAttributes: false,
	      attributesGroupName: "_attr",
	      attributeNamePrefix: "",
	      allowBooleanAttributes: true
	    });
	    return parser.parse(rawData);
	  }

	  async stream() {
	    throw new Error("xml does not support streaming");
	  }

	  getRoot(xml, path = "$") {
	    return jsonpath.value(xml, path);
	  }

	  getValue(xml, path) {
	    return jsonpath.value(xml, path);
	  }
	}

	XmlAdapter_1 = XmlAdapter;
	return XmlAdapter_1;
}

var AdapterFactory_1;
var hasRequiredAdapterFactory;

function requireAdapterFactory () {
	if (hasRequiredAdapterFactory) return AdapterFactory_1;
	hasRequiredAdapterFactory = 1;
	const { adapt } = requireAdapter();
	const CsvAdapter = requireCsvAdapter();
	const JsonAdapter = requireJsonAdapter();
	const XmlAdapter = requireXmlAdapter();

	const CONTENT_TYPE_MAPPING = {
	  json: JsonAdapter,
	  xml: XmlAdapter,
	  csv: CsvAdapter
	};

	class AdapterFactory {
	  constructor() {
	    this.adapters = { ...CONTENT_TYPE_MAPPING };
	  }

	  register(format, adapter) {
	    this.adapters[format] = adapter;
	  }

	  get(format, config) {
	    const Adapter = this.adapters[format];
	    if (!Adapter) {
	      throw new Error(`Unsupported format: ${format}`);
	    }
	    return new AdapterWrapper(new Adapter(config));
	  }
	}

	class AdapterWrapper {
	  constructor(adapter) {
	    this.adapter = adapter;
	  }

	  async stream(path = "$", params) {
	    return await this.adapter.stream(path, params);
	  }

	  async adapt(rawData, root, responseMapping, transformerFactory, params) {
	    return await adapt(this.adapter, rawData, root, responseMapping, transformerFactory, params);
	  }
	}

	AdapterFactory_1 = AdapterFactory;
	return AdapterFactory_1;
}

var DefaultTransformer_1;
var hasRequiredDefaultTransformer;

function requireDefaultTransformer () {
	if (hasRequiredDefaultTransformer) return DefaultTransformer_1;
	hasRequiredDefaultTransformer = 1;
	class DefaultTransformer {
	  transform(value) {
	    return value;
	  }
	}

	DefaultTransformer_1 = DefaultTransformer;
	return DefaultTransformer_1;
}

var LowercaseTransformer_1;
var hasRequiredLowercaseTransformer;

function requireLowercaseTransformer () {
	if (hasRequiredLowercaseTransformer) return LowercaseTransformer_1;
	hasRequiredLowercaseTransformer = 1;
	class LowercaseTransformer {
	  transform(value) {
	    if (value === null || value === undefined || value === "") {
	      return undefined;
	    }
	    return value.toLowerCase();
	  }
	}

	LowercaseTransformer_1 = LowercaseTransformer;
	return LowercaseTransformer_1;
}

var UppercaseTransformer_1;
var hasRequiredUppercaseTransformer;

function requireUppercaseTransformer () {
	if (hasRequiredUppercaseTransformer) return UppercaseTransformer_1;
	hasRequiredUppercaseTransformer = 1;
	class UppercaseTransformer {
	  transform(value) {
	    if (value === null || value === undefined || value === "") {
	      return undefined;
	    }
	    return value.toUpperCase();
	  }
	}

	UppercaseTransformer_1 = UppercaseTransformer;
	return UppercaseTransformer_1;
}

var MultipleTransformer_1;
var hasRequiredMultipleTransformer;

function requireMultipleTransformer () {
	if (hasRequiredMultipleTransformer) return MultipleTransformer_1;
	hasRequiredMultipleTransformer = 1;
	class MultipleTransformer {
	  constructor(transformers) {
	    this.transformers = transformers;
	  }

	  transform(value) {
	    if (value === null || value === undefined || value === "") {
	      return undefined;
	    }
	    return this.transformers.reduce((value, transformer) => {
	      return transformer.transform(value);
	    }, value);
	  }
	}

	MultipleTransformer_1 = MultipleTransformer;
	return MultipleTransformer_1;
}

var TrimTransformer_1;
var hasRequiredTrimTransformer;

function requireTrimTransformer () {
	if (hasRequiredTrimTransformer) return TrimTransformer_1;
	hasRequiredTrimTransformer = 1;
	class TrimTransformer {
	  transform(value) {
	    if (value === null || value === undefined || value === "") {
	      return undefined;
	    }
	    return value.trim();
	  }
	}

	TrimTransformer_1 = TrimTransformer;
	return TrimTransformer_1;
}

var TransformerFactory_1;
var hasRequiredTransformerFactory;

function requireTransformerFactory () {
	if (hasRequiredTransformerFactory) return TransformerFactory_1;
	hasRequiredTransformerFactory = 1;
	const DefaultTransformer = requireDefaultTransformer();
	const LowercaseTransformer = requireLowercaseTransformer();
	const UppercaseTransformer = requireUppercaseTransformer();
	const MultipleTransformer = requireMultipleTransformer();
	const TrimTransformer = requireTrimTransformer();

	class TransformerFactory {
	  constructor() {
	    this.transformers = {
	      default: new DefaultTransformer(),
	      lowercase: new LowercaseTransformer(),
	      uppercase: new UppercaseTransformer(),
	      trim: new TrimTransformer()
	    };
	  }
	  register(name, transformer) {
	    this.transformers[name] = transformer;
	  }

	  get(type) {
	    if (type.includes("|")) {
	      const transformerTypes = type.split("|");
	      const transformers = transformerTypes
	        .map(transformerType => this.transformers[transformerType])
	        .filter(transformer => transformer !== undefined);

	      if (transformers.length === 0) {
	        return this.transformers.default;
	      } else if (transformers.length === 1) {
	        return transformers[0];
	      }

	      return new MultipleTransformer(transformers);
	    }

	    return this.transformers[type] || this.transformers.default;
	  }

	  static load(config, transformerTypes = {}) {
	    const transformerFactory = new TransformerFactory();

	    Object.entries(config.transformers || {}).forEach(([name, transformerReference]) => {
	      const TransformerType = transformerTypes[transformerReference.type];
	      if (!TransformerType) {
	        throw new Error(`Invalid transformer type: ${transformerReference.type}`);
	      }
	      transformerFactory.register(name, new TransformerType(transformerReference));
	    });

	    return transformerFactory;
	  }
	}

	TransformerFactory_1 = TransformerFactory;
	return TransformerFactory_1;
}

var DateTransformer_1;
var hasRequiredDateTransformer;

function requireDateTransformer () {
	if (hasRequiredDateTransformer) return DateTransformer_1;
	hasRequiredDateTransformer = 1;
	const moment = requireMoment();

	class DateTransformer {
	  constructor(mapping = {}) {
	    this.mapping = mapping;
	  }

	  transform(value) {
	    if (value === null || value === undefined || value === "") {
	      return undefined;
	    }
	    return moment(value, this.mapping.pattern || "YYYY-MM-DD'T'HH:mm:ss").format(
	      this.mapping.format || "YYYY-MM-DD HH:mm:ss Z"
	    );
	  }
	}

	DateTransformer_1 = DateTransformer;
	return DateTransformer_1;
}

var ReplaceTransformer_1;
var hasRequiredReplaceTransformer;

function requireReplaceTransformer () {
	if (hasRequiredReplaceTransformer) return ReplaceTransformer_1;
	hasRequiredReplaceTransformer = 1;
	class ReplaceTransformer {
	  constructor(mapping) {
	    this.mapping = mapping;
	  }

	  transform(value) {
	    if (!value) return value;
	    return (this.mapping.replace || {})[value] || this.mapping.defaultValue;
	  }
	}

	ReplaceTransformer_1 = ReplaceTransformer;
	return ReplaceTransformer_1;
}

var RemoveTransformer_1;
var hasRequiredRemoveTransformer;

function requireRemoveTransformer () {
	if (hasRequiredRemoveTransformer) return RemoveTransformer_1;
	hasRequiredRemoveTransformer = 1;
	class RemoveTransformer {
	  constructor(mapping) {
	    this.mapping = mapping;
	  }

	  transform(value) {
	    if (!value) return value;

	    let newValue = value;
	    this.mapping.list.forEach(item => {
	      newValue = newValue.replaceAll(item, "");
	    });
	    return newValue;
	  }
	}

	RemoveTransformer_1 = RemoveTransformer;
	return RemoveTransformer_1;
}

var transformer;
var hasRequiredTransformer;

function requireTransformer () {
	if (hasRequiredTransformer) return transformer;
	hasRequiredTransformer = 1;
	const DefaultTransformer = requireDefaultTransformer();
	const DateTransformer = requireDateTransformer();
	const ReplaceTransformer = requireReplaceTransformer();
	const RemoveTransformer = requireRemoveTransformer();

	transformer = { DefaultTransformer, DateTransformer, ReplaceTransformer, RemoveTransformer };
	return transformer;
}

var TransformerTypes;
var hasRequiredTransformerTypes;

function requireTransformerTypes () {
	if (hasRequiredTransformerTypes) return TransformerTypes;
	hasRequiredTransformerTypes = 1;
	const { DateTransformer, ReplaceTransformer, RemoveTransformer } = requireTransformer();

	const TRANSFORMER_TYPES = {
	  date: DateTransformer,
	  replace: ReplaceTransformer,
	  remove: RemoveTransformer
	};

	TransformerTypes = TRANSFORMER_TYPES;
	return TransformerTypes;
}

var Input;
var hasRequiredInput;

function requireInput () {
	if (hasRequiredInput) return Input;
	hasRequiredInput = 1;
	function readStdIn() {
	    return new Promise(resolve => {
	      let inputString = "";
	  
	      const stdin = process.openStdin();
	  
	      stdin.on("data", function (data) {
	        inputString += data;
	      });
	  
	      stdin.on("end", function () {
	        resolve(inputString);
	      });
	    });
	  }
	  
	  Input = { readStdIn };
	return Input;
}

var MapExecutor;
var hasRequiredMapExecutor;

function requireMapExecutor () {
	if (hasRequiredMapExecutor) return MapExecutor;
	hasRequiredMapExecutor = 1;
	const { Transform } = require$$0$3;
	const AdapterFactory = requireAdapterFactory();
	const TransformerFactory = requireTransformerFactory();
	const TRANSFORMER_TYPES = requireTransformerTypes();
	const { readStdIn } = requireInput();

	async function mapExecutor(config) {
	  
	  const stream = config.stream;
	  const format = config.format;

	  const transformerFactory = TransformerFactory.load(config, TRANSFORMER_TYPES);

	  const adapterFactory = new AdapterFactory();
	  const adapter = adapterFactory.get(format, config);

	  const onError = e => {
	    console.error(e.message.red);
	    process.exit(1);
	  };

	  if (stream) {
	    const parser = await adapter.stream(config.root?.path, config);
	    const adapterTransformer = new AdapterTransformer(adapter, config, transformerFactory);
	    process.stdin
	      .pipe(parser)
	      .on("error", onError)
	      .pipe(adapterTransformer)
	      .on("error", onError)
	      .pipe(process.stdout)
	      .on("error", onError);
	    return;
	  }

	  try {
	    const inputString = await readStdIn();
	    const output = await adapter.adapt(inputString, config.root, config.mapping, transformerFactory, config);
	    console.log(JSON.stringify(output, null, 2));
	  } catch (e) {
	    console.error(e.message.red);
	  }
	}

	class AdapterTransformer extends Transform {
	  constructor(adapter, mapping, transformerFactory) {
	    super({ objectMode: true, readableObjectMode: true, writableObjectMode: true });
	    this.adapter = adapter;
	    this.mapping = mapping;
	    this.transformerFactory = transformerFactory;
	  }

	  _transform(chunk, _, callback) {
	    this.adapter
	      .adapt(chunk, undefined, this.mapping.mapping, this.transformerFactory)
	      .then(output => callback(null, JSON.stringify(output, null, 2)));
	  }
	}

	MapExecutor = { mapExecutor };
	return MapExecutor;
}

var hasRequiredExecutable;

function requireExecutable () {
	if (hasRequiredExecutable) return executable$1;
	hasRequiredExecutable = 1;
	requireLib();
	const { mapExecutor } = requireMapExecutor();

	process.title = "aux4-adapter";

	(async () => {
	  const args = process.argv.slice(2);

	  try {
	    const [action, format, delimiter, columns, options, transformers, mapping] = args;

	    if (action !== "map") {
	      console.error(`Unknown action: ${action}. Expected "map".`.red);
	      process.exit(1);
	    }

	    const config = {
	      format: format || "",
	      delimiter: delimiter || ",",
	      columns: columns || "",
	      options: options ? JSON.parse(options) : {},
	      transformers: transformers ? JSON.parse(transformers) : [],
	      mapping: mapping ? JSON.parse(mapping) : {}
	    };

	    await mapExecutor(config);
	  } catch (e) {
	    console.error(e.message.red);
	    process.exit(1);
	  }
	})();
	return executable$1;
}

var executableExports = requireExecutable();
var executable = /*@__PURE__*/getDefaultExportFromCjs(executableExports);

module.exports = executable;
