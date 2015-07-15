module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactHelmet = __webpack_require__(28);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _helmconfigJs = __webpack_require__(29);

	var _helmconfigJs2 = _interopRequireDefault(_helmconfigJs);

	var Header = (function (_React$Component) {
	  function Header() {
	    _classCallCheck(this, Header);

	    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _inherits(Header, _React$Component);

	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_reactHelmet2['default'], {
	        title: 'Moodwonder',
	        meta: _helmconfigJs2['default'].meta,
	        link: _helmconfigJs2['default'].link
	      });
	    }
	  }]);

	  return Header;
	})(_react2['default'].Component);

	_react2['default'].renderToString(_react2['default'].createElement(Header, null));
	var header = _reactHelmet2['default'].rewind();

	exports['default'] = header;
	module.exports = exports['default'];

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 28:
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },

/***/ 29:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  link: [
	  // Add to homescreen for Chrome on Android
	  { "rel": "icon", "sizes": "192x192", "href": "" }, { "rel": "stylesheet", "href": "assets/styles/main.css" }],
	  meta: [{ "charset": "utf-8" },
	  // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
	  { "http-equiv": "X-UA-Compatible", "content": "IE=edge" },
	  //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
	  { "name": "description", "content": "A Moodwonder App" },
	  // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
	  // The width property controls the size of the viewport, the initial-scale property controls
	  // the zoom level when the page is first loaded
	  { "name": "viewport", "content": "width=device-width, initial-scale=1" },
	  // Add to homescreen for Chrome on Android
	  { "name": "mobile-web-app-capable", "content": "yes" },
	  // Add to homescreen for Safari on IOS
	  { "name": "apple-mobile-web-app-capable", "content": "yes" }, { "name": "apple-mobile-web-app-status-bar-style", "content": "black" }, { "name": "apple-mobile-web-app-title", "content": "Moodwonder" }]
	};

	exports["default"] = config;
	module.exports = exports["default"];

/***/ }

/******/ });