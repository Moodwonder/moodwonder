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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsUniversalRenderer = __webpack_require__(1);

	var _utilsUniversalRenderer2 = _interopRequireDefault(_utilsUniversalRenderer);

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var _routesJs = __webpack_require__(7);

	var _routesJs2 = _interopRequireDefault(_routesJs);

	var _baseHtml = __webpack_require__(27);

	var _baseHtml2 = _interopRequireDefault(_baseHtml);

	exports['default'] = (0, _utilsUniversalRenderer2['default'])(_altInstance2['default'], _routesJs2['default'], _baseHtml2['default']);
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = UniversalRenderer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _iso = __webpack_require__(2);

	var _iso2 = _interopRequireDefault(_iso);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _reactRouter2 = _interopRequireDefault(_reactRouter);

	var renderToMarkup = function renderToMarkup(alt, routes, state, url) {
	  var markup = undefined;

	  _reactRouter2['default'].run(routes, url, function (Handler) {
	    alt.bootstrap(state);
	    var content = _react2['default'].renderToString(_react2['default'].createElement(Handler));
	    markup = _iso2['default'].render(content, alt.flush());
	  });
	  return markup;
	};

	function UniversalRenderer(alt, routes, html) {
	  var render = undefined;

	  if (typeof window === 'undefined') {

	    if (html) {
	      render = function (state, url) {
	        var markup = renderToMarkup(alt, routes, state, url);
	        return html.replace('CONTENT', markup);
	      };
	    } else {
	      render = function (state, url) {
	        return renderToMarkup(alt, routes, state, url);
	      };
	    }
	  } else {
	    render = _iso2['default'].bootstrap(function (state, _, container) {
	      alt.bootstrap(state);
	      _reactRouter2['default'].run(routes, _reactRouter2['default'].HistoryLocation, function (Handler) {
	        var node = _react2['default'].createElement(Handler);
	        _react2['default'].render(node, container);
	      });
	    });
	  }

	  return render;
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("iso");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _alt = __webpack_require__(6);

	var _alt2 = _interopRequireDefault(_alt);

	// This creates the alt variable in a singleton way
	exports['default'] = new _alt2['default']();
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("alt");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _componentsAppReact = __webpack_require__(8);

	var _componentsAppReact2 = _interopRequireDefault(_componentsAppReact);

	var _componentsIndexReact = __webpack_require__(15);

	var _componentsIndexReact2 = _interopRequireDefault(_componentsIndexReact);

	var _componentsLoginReact = __webpack_require__(16);

	var _componentsLoginReact2 = _interopRequireDefault(_componentsLoginReact);

	var _componentsLogoutReact = __webpack_require__(17);

	var _componentsLogoutReact2 = _interopRequireDefault(_componentsLogoutReact);

	var _componentsSignupReact = __webpack_require__(18);

	var _componentsSignupReact2 = _interopRequireDefault(_componentsSignupReact);

	var _componentsCustomsurveyReact = __webpack_require__(21);

	var _componentsCustomsurveyReact2 = _interopRequireDefault(_componentsCustomsurveyReact);

	var _componentsSurveyReact = __webpack_require__(22);

	var _componentsSurveyReact2 = _interopRequireDefault(_componentsSurveyReact);

	var routes = _react2['default'].createElement(
	  _reactRouter.Route,
	  { name: 'app', path: '/', handler: _componentsAppReact2['default'] },
	  _react2['default'].createElement(_reactRouter.Route, { name: 'login', handler: _componentsLoginReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { name: 'logout', handler: _componentsLogoutReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { name: 'index', handler: _componentsIndexReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { name: 'signup', handler: _componentsSignupReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { name: 'customsurvey', handler: _componentsCustomsurveyReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { name: 'survey', handler: _componentsSurveyReact2['default'] }),
	  _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsIndexReact2['default'] })
	);

	exports['default'] = routes;
	module.exports = exports['default'];

/***/ },
/* 8 */
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

	var _reactRouter = __webpack_require__(4);

	var _componentsNavigationReact = __webpack_require__(9);

	var _componentsNavigationReact2 = _interopRequireDefault(_componentsNavigationReact);

	var App = (function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(_componentsNavigationReact2['default'], null),
	        _react2['default'].createElement(_reactRouter.RouteHandler, null)
	      );
	    }
	  }]);

	  return App;
	})(_react2['default'].Component);

	exports['default'] = App;
	module.exports = exports['default'];

/***/ },
/* 9 */
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

	var _reactRouter = __webpack_require__(4);

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsUserActions = __webpack_require__(11);

	var _actionsUserActions2 = _interopRequireDefault(_actionsUserActions);

	var _storesUserStore = __webpack_require__(14);

	var _storesUserStore2 = _interopRequireDefault(_storesUserStore);

	var Navigation = (function (_React$Component) {
	  _inherits(Navigation, _React$Component);

	  function Navigation(props) {
	    var _this = this;

	    _classCallCheck(this, Navigation);

	    _get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).call(this, props);

	    this._onChange = function () {
	      _this.setState({
	        user: _storesUserStore2['default'].getState().user
	      });
	    };

	    this._onLogout = function () {
	      _actionsUserActions2['default'].logout();
	    };

	    this.state = _storesUserStore2['default'].getState();
	  }

	  _createClass(Navigation, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _storesUserStore2['default'].listen(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _storesUserStore2['default'].unlisten(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var loginOrOut = undefined;
	      if (this.state.user.get('authenticated')) {
	        loginOrOut = _react2['default'].createElement(
	          'span',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { onClick: this._onLogout, className: 'navigation__item', to: 'logout' },
	            'Logout'
	          )
	        );
	      } else {
	        loginOrOut = _react2['default'].createElement(
	          'span',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { className: 'navigation__item', to: 'login' },
	            'Log in'
	          ),
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'signup', className: 'navigation__item', activeClassName: 'navigation__item--active' },
	            'Signup'
	          )
	        );
	      }
	      return _react2['default'].createElement(
	        'nav',
	        { className: 'navigation', role: 'navigation' },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/', className: 'navigation__item', activeClassName: 'navigation__item--active' },
	          'Moodwonder'
	        ),
	        loginOrOut,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: 'survey', className: 'navigation__item', activeClassName: 'navigation__item--active' },
	          'Engagement Survey'
	        ),
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: 'customsurvey', className: 'navigation__item', activeClassName: 'navigation__item--active' },
	          'Create Custom Survey'
	        )
	      );
	    }
	  }]);

	  return Navigation;
	})(_react2['default'].Component);

	exports['default'] = Navigation;

	Navigation.propTypes = { user: _react2['default'].PropTypes.instanceOf(_immutable2['default'].Map) };
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var _utilsUserWebAPIUtils = __webpack_require__(12);

	var _utilsUserWebAPIUtils2 = _interopRequireDefault(_utilsUserWebAPIUtils);

	/**
	 * UserActions
	 */

	var UserActions = (function () {
	  function UserActions() {
	    _classCallCheck(this, UserActions);
	  }

	  _createClass(UserActions, [{
	    key: 'manuallogin',

	    // login function
	    value: function manuallogin(data) {
	      var _this = this;

	      this.dispatch();
	      _utilsUserWebAPIUtils2['default'].manuallogin(data).then(function (response, textStatus) {
	        if (response.status == 'success') {
	          // Dispatch another event for successful login
	          console.log(response);
	          _this.actions.loginsuccess(response.user);
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'usersignup',

	    // user registration function 
	    value: function usersignup(data) {
	      var _this2 = this;

	      this.dispatch();
	      _utilsUserWebAPIUtils2['default'].usersignup(data).then(function (response, textStatus) {
	        if (textStatus === 'success') {
	          // Dispatch another event for successful login
	          _this2.actions.signupsuccess(data.email);
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'loginsuccess',
	    value: function loginsuccess(email) {
	      this.dispatch(email);
	    }
	  }, {
	    key: 'signupsuccess',
	    value: function signupsuccess(email) {
	      this.dispatch(email);
	    }
	  }, {
	    key: 'logout',

	    // logout function 
	    value: function logout() {
	      var _this3 = this;

	      this.dispatch();
	      _utilsUserWebAPIUtils2['default'].logout().then(function (response, textStatus) {
	        if (textStatus === 'success') {
	          // Dispatch another event for successful login
	          _this3.actions.logoutsuccess();
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'logoutsuccess',
	    value: function logoutsuccess() {
	      this.dispatch();
	    }
	  }]);

	  return UserActions;
	})();

	exports['default'] = _altInstance2['default'].createActions(UserActions);
	module.exports = exports['default'];

	// Dispatch another event for a bad login

	// Dispatch another event for a bad login

	// Dispatch another event for a bad login

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	var utils = {
	  /*
	   * @param {Object} payload to be sent to server
	   * @return {Promise}
	   */
	  manuallogin: function manuallogin(data) {
	    return _jquery2['default'].ajax({
	      url: '/login',
	      type: 'POST',
	      contentType: 'application/json',
	      data: JSON.stringify(data)
	    });
	  },

	  usersignup: function usersignup(data) {
	    return _jquery2['default'].ajax({
	      url: '/usersignup',
	      type: 'POST',
	      contentType: 'application/json',
	      data: JSON.stringify(data)
	    });
	  },

	  /*
	   * @return {Promise}
	   */
	  logout: function logout() {
	    return _jquery2['default'].ajax({
	      url: '/logout',
	      type: 'GET'
	    });
	  },

	  /*
	   * @param {Object} payload to be sent to server
	   * @return {Promise}
	   */
	  signup: function signup(data) {
	    return _jquery2['default'].ajax({
	      url: '/signup',
	      type: 'POST',
	      contentType: 'application/json',
	      data: JSON.stringify(data)
	    });
	  }

	};

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsUserActions = __webpack_require__(11);

	var _actionsUserActions2 = _interopRequireDefault(_actionsUserActions);

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	/**
	 * UserStore
	 */

	var UserStore = (function () {
	  function UserStore() {
	    _classCallCheck(this, UserStore);

	    this.user = _immutable2['default'].Map({});

	    this.on('init', this.bootstrap);
	    this.on('bootstrap', this.bootstrap);

	    this.bindListeners({
	      handleLoginAttempt: _actionsUserActions2['default'].MANUALLOGIN,
	      handleLoginSuccess: _actionsUserActions2['default'].LOGINSUCCESS,
	      handleLogoutAttempt: _actionsUserActions2['default'].LOGOUT,
	      handleLogoutSuccess: _actionsUserActions2['default'].LOGOUTSUCCESS,
	      handleSignupSuccess: _actionsUserActions2['default'].SIGNUPSUCCESS,
	      handleSignupAttempt: _actionsUserActions2['default'].USERSIGNUP
	    });
	  }

	  _createClass(UserStore, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      if (!_immutable2['default'].Map.isMap(this.user)) {
	        this.user = _immutable2['default'].fromJS(this.user);
	      }
	    }
	  }, {
	    key: 'handleLoginAttempt',
	    value: function handleLoginAttempt() {
	      this.user = this.user.set('isWaiting', true);
	      this.emitChange();
	    }
	  }, {
	    key: 'handleSignupAttempt',
	    value: function handleSignupAttempt() {
	      this.user = this.user.set('isSignupWaiting', true);
	      this.emitChange();
	    }
	  }, {
	    key: 'handleSignupSuccess',
	    value: function handleSignupSuccess() {
	      this.user = this.user.merge({ isSignupWaiting: false, registration: true });
	      this.emitChange();
	    }
	  }, {
	    key: 'handleLoginSuccess',
	    value: function handleLoginSuccess(data) {
	      this.user = this.user.merge({ isWaiting: false, authenticated: true });
	      sessionStorage.setItem('isAuthenticated', true);
	      //sessionStorage.setItem('currentUser', JSON.stringify({'email':'test@email.com','name':'test'}));
	      sessionStorage.setItem('currentUser', JSON.stringify(data));
	      this.emitChange();
	    }
	  }, {
	    key: 'handleLogoutAttempt',
	    value: function handleLogoutAttempt() {
	      this.user = this.user.set('isWaiting', true);
	      this.emitChange();
	    }
	  }, {
	    key: 'handleLogoutSuccess',
	    value: function handleLogoutSuccess() {
	      this.user = this.user.merge({ isWaiting: false, authenticated: false });
	      sessionStorage.removeItem('isAuthenticated');
	      sessionStorage.removeItem('currentUser');
	      this.emitChange();
	    }
	  }]);

	  return UserStore;
	})();

	// Export newly created Store
	exports['default'] = _altInstance2['default'].createStore(UserStore, 'UserStore');
	module.exports = exports['default'];

/***/ },
/* 15 */
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

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var Index = (function (_React$Component) {
	  _inherits(Index, _React$Component);

	  function Index(props) {
	    _classCallCheck(this, Index);

	    _get(Object.getPrototypeOf(Index.prototype), 'constructor', this).call(this, props);
	  }

	  _createClass(Index, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'vote' },
	        _react2['default'].createElement(
	          'h1',
	          null,
	          'Moodwonder'
	        )
	      );
	    }
	  }]);

	  return Index;
	})(_react2['default'].Component);

	exports['default'] = Index;

	Index.propTypes = {
	  topics: _react2['default'].PropTypes.instanceOf(_immutable2['default'].OrderedMap),
	  newTopic: _react2['default'].PropTypes.string
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
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

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsUserActions = __webpack_require__(11);

	var _actionsUserActions2 = _interopRequireDefault(_actionsUserActions);

	var _storesUserStore = __webpack_require__(14);

	var _storesUserStore2 = _interopRequireDefault(_storesUserStore);

	var Login = (function (_React$Component) {
	  _inherits(Login, _React$Component);

	  function Login(props) {
	    var _this = this;

	    _classCallCheck(this, Login);

	    _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).call(this, props);

	    this._onChange = function () {
	      _this.setState({
	        user: _storesUserStore2['default'].getState().user,
	        validate: _storesUserStore2['default'].getState().validate
	      });
	    };

	    this._onLoginSubmit = function () {
	      var email = _react2['default'].findDOMNode(_this.refs.email).value.trim();
	      var password = _react2['default'].findDOMNode(_this.refs.password).value.trim();

	      if (!email || !password) {
	        return;
	      }

	      _actionsUserActions2['default'].manuallogin({
	        email: email,
	        password: password
	      });
	    };

	    this.state = _storesUserStore2['default'].getState();
	  }

	  _createClass(Login, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _storesUserStore2['default'].listen(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _storesUserStore2['default'].unlisten(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var renderedResult = undefined;
	      if (this.state.user.get('authenticated')) {
	        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	        renderedResult = _react2['default'].createElement(
	          'span',
	          null,
	          _react2['default'].createElement(
	            'h3',
	            { className: 'login__header' },
	            'Welcome ',
	            currentUser.name
	          )
	        );
	      } else {
	        if (this.state.user.get('isWaiting')) {
	          renderedResult = _react2['default'].createElement(
	            'h3',
	            { className: 'login__header' },
	            'Waiting ...'
	          );
	        } else {
	          renderedResult = _react2['default'].createElement(
	            'div',
	            { className: 'login__container' },
	            _react2['default'].createElement(
	              'fieldset',
	              { className: 'login__fieldset' },
	              _react2['default'].createElement(
	                'h3',
	                null,
	                'Login here..'
	              ),
	              _react2['default'].createElement(
	                'span',
	                null,
	                'Email : '
	              ),
	              _react2['default'].createElement('input', { type: 'email', ref: 'email', placeholder: 'email' }),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'span',
	                null,
	                'Password : '
	              ),
	              _react2['default'].createElement('input', { type: 'password', ref: 'password', placeholder: 'password' }),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'button',
	                { onClick: this._onLoginSubmit },
	                'Login'
	              )
	            )
	          );
	        }
	      }
	      return _react2['default'].createElement(
	        'div',
	        { className: 'login' },
	        renderedResult
	      );
	    }
	  }]);

	  return Login;
	})(_react2['default'].Component);

	exports['default'] = Login;

	Login.propTypes = { user: _react2['default'].PropTypes.instanceOf(_immutable2['default'].Map) };
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var Logout = (function (_React$Component) {
	  _inherits(Logout, _React$Component);

	  function Logout() {
	    _classCallCheck(this, Logout);

	    _get(Object.getPrototypeOf(Logout.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Logout, [{
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "div",
	        { className: "logout" },
	        _react2["default"].createElement(
	          "h3",
	          { className: "logout__header" },
	          "You have been logged out."
	        )
	      );
	    }
	  }]);

	  return Logout;
	})(_react2["default"].Component);

	exports["default"] = Logout;
	module.exports = exports["default"];

/***/ },
/* 18 */
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

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsSignupActions = __webpack_require__(19);

	var _actionsSignupActions2 = _interopRequireDefault(_actionsSignupActions);

	var _storesSignupStore = __webpack_require__(20);

	var _storesSignupStore2 = _interopRequireDefault(_storesSignupStore);

	var Signup = (function (_React$Component) {
	  _inherits(Signup, _React$Component);

	  function Signup(props) {
	    var _this = this;

	    _classCallCheck(this, Signup);

	    _get(Object.getPrototypeOf(Signup.prototype), 'constructor', this).call(this, props);

	    this._onChange = function () {
	      _this.setState({
	        user: _storesSignupStore2['default'].getState().user
	      });
	    };

	    this._onSignupSubmit = function () {
	      var email = _react2['default'].findDOMNode(_this.refs.email).value.trim();
	      var password = _react2['default'].findDOMNode(_this.refs.password).value.trim();
	      var name = _react2['default'].findDOMNode(_this.refs.name).value.trim();
	      if (!email || !password || !name) {
	        return;
	      }
	      _actionsSignupActions2['default'].usersignup({
	        email: email,
	        password: password,
	        name: name
	      });
	    };

	    this.state = _storesSignupStore2['default'].getState();
	  }

	  _createClass(Signup, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _storesSignupStore2['default'].listen(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _storesSignupStore2['default'].unlisten(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var renderedResult = undefined;
	      if (this.state.user.get('isRegistered')) {
	        renderedResult = _react2['default'].createElement(
	          'div',
	          { className: 'login__container' },
	          _react2['default'].createElement(
	            'fieldset',
	            { className: 'login__fieldset' },
	            _react2['default'].createElement(
	              'h3',
	              { className: 'login__header' },
	              'Registered successfully.'
	            ),
	            _react2['default'].createElement('br', null),
	            'Please proceed with ',
	            _react2['default'].createElement(
	              'a',
	              { href: 'login' },
	              'Login'
	            )
	          )
	        );
	      } else {
	        if (this.state.user.get('isSignupWaiting')) {
	          renderedResult = _react2['default'].createElement(
	            'h3',
	            { className: 'login__header' },
	            'Processing...'
	          );
	        } else {
	          renderedResult = _react2['default'].createElement(
	            'div',
	            { className: 'login__container' },
	            _react2['default'].createElement(
	              'fieldset',
	              { className: 'login__fieldset' },
	              _react2['default'].createElement(
	                'h3',
	                null,
	                'Signup here..'
	              ),
	              _react2['default'].createElement(
	                'span',
	                null,
	                'Name : '
	              ),
	              _react2['default'].createElement('input', { type: 'text', ref: 'name', placeholder: 'name' }),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'span',
	                null,
	                'Email : '
	              ),
	              _react2['default'].createElement('input', { type: 'email', ref: 'email', placeholder: 'email' }),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'span',
	                null,
	                'Password : '
	              ),
	              _react2['default'].createElement('input', { type: 'password', ref: 'password', placeholder: 'password' }),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'span',
	                null,
	                '* All fields are required.'
	              ),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement('br', null),
	              _react2['default'].createElement(
	                'button',
	                { onClick: this._onSignupSubmit },
	                'Register'
	              )
	            )
	          );
	        }
	      }
	      return _react2['default'].createElement(
	        'div',
	        { className: 'login' },
	        renderedResult
	      );
	    }
	  }]);

	  return Signup;
	})(_react2['default'].Component);

	exports['default'] = Signup;

	Signup.propTypes = { user: _react2['default'].PropTypes.instanceOf(_immutable2['default'].Map) };
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var _utilsUserWebAPIUtils = __webpack_require__(12);

	var _utilsUserWebAPIUtils2 = _interopRequireDefault(_utilsUserWebAPIUtils);

	/**
	 * SignupActions
	 */

	var SignupActions = (function () {
	  function SignupActions() {
	    _classCallCheck(this, SignupActions);
	  }

	  _createClass(SignupActions, [{
	    key: 'usersignup',

	    /**
	     *function to collect details from users
	     */
	    value: function usersignup(data) {
	      var _this = this;

	      this.dispatch();
	      _utilsUserWebAPIUtils2['default'].usersignup(data).then(function (response, textStatus) {
	        if (textStatus === 'success') {
	          // Dispatch another event for successful login
	          _this.actions.signupsuccess(data.email);
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'signupsuccess',
	    value: function signupsuccess(email) {
	      this.dispatch(email);
	    }
	  }]);

	  return SignupActions;
	})();

	exports['default'] = _altInstance2['default'].createActions(SignupActions);
	module.exports = exports['default'];

	// Dispatch another event for a bad login

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsSignupActions = __webpack_require__(19);

	var _actionsSignupActions2 = _interopRequireDefault(_actionsSignupActions);

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	/**
	 * SignupStore
	 */

	var SignupStore = (function () {
	  function SignupStore() {
	    _classCallCheck(this, SignupStore);

	    this.user = _immutable2['default'].Map({});

	    this.on('init', this.bootstrap);
	    this.on('bootstrap', this.bootstrap);

	    this.bindListeners({
	      handleSignupSuccess: _actionsSignupActions2['default'].SIGNUPSUCCESS,
	      handleSignupAttempt: _actionsSignupActions2['default'].USERSIGNUP
	    });
	  }

	  _createClass(SignupStore, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      if (!_immutable2['default'].Map.isMap(this.user)) {
	        this.user = _immutable2['default'].fromJS(this.user);
	      }
	    }
	  }, {
	    key: 'handleSignupAttempt',
	    value: function handleSignupAttempt() {
	      this.user = this.user.set('isSignupWaiting', true);
	      this.emitChange();
	    }
	  }, {
	    key: 'handleSignupSuccess',
	    value: function handleSignupSuccess() {
	      this.user = this.user.merge({ isSignupWaiting: false, isRegistered: true });
	      this.emitChange();
	    }
	  }]);

	  return SignupStore;
	})();

	// Export our newly created Store
	exports['default'] = _altInstance2['default'].createStore(SignupStore, 'SignupStore');
	module.exports = exports['default'];

/***/ },
/* 21 */
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

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _utilsUserWebAPIUtils = __webpack_require__(12);

	var _utilsUserWebAPIUtils2 = _interopRequireDefault(_utilsUserWebAPIUtils);

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	//import SurveyActions from 'actions/SurveyActions';
	//import SurveyStore from 'stores/SurveyStore';

	var List = (function (_React$Component) {
	    _inherits(List, _React$Component);

	    function List(props) {
	        _classCallCheck(this, List);

	        _get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, props);
	        this.state = {};
	    }

	    _createClass(List, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            (0, _jquery2['default'])('#addRadioOptionBtn').hide();
	            (0, _jquery2['default'])('#addCheckboxOptionBtn').hide();
	        }
	    }, {
	        key: '_removeQuestion',
	        value: function _removeQuestion(rIndex) {
	            //var rIndex = this.attr('data-index');
	            console.log(rIndex);
	            //$("qRow_"+rIndex).remove();
	        }
	    }, {
	        key: '_addQuestion',
	        value: function _addQuestion() {
	            var index = parseInt((0, _jquery2['default'])('.qRow').last().attr('data-index'));
	            index++;
	            var question = '';
	            question += '<div id="qRow_' + index + '" className="qRow" data-index="' + index + '">';
	            question += '<span>Question </span>';
	            question += '<input type="text" ref="question_' + index + '"/>';
	            question += '<br/><br/>';
	            question += '<span>Answer type </span>';
	            question += '<select ref="answertype_' + index + '">';
	            question += '<option value="radio">Radio</option>';
	            question += '<option value="Checkbox">Checkbox</option>';
	            question += '<option value="Textbox">Textbox</option>';
	            question += '<option value="Textarea">Textarea</option>';
	            question += '</select>';
	            question += '<br/><br/>';
	            question += '<button id="removeBtn_' + index + '" className="removeBtn" data-index="' + index + '" onClick={this._removeQuestion(' + index + ')}>Remove</button>';
	            question += '<span>--------------------------------------------------------------------</span>';
	            question += '</div>';

	            (0, _jquery2['default'])('#qContainer').append(question);
	        }
	    }, {
	        key: '_selectAnswerType',
	        value: function _selectAnswerType() {
	            var answerType = (0, _jquery2['default'])('#answertype_0').val();
	            var answerBox = '';
	            switch (answerType) {
	                case 'radio':
	                    (0, _jquery2['default'])('#addCheckboxOptionBtn').hide();
	                    (0, _jquery2['default'])('#addRadioOptionBtn').show();
	                    (0, _jquery2['default'])('#optContainer_0').html('');
	                    answerBox = '<input type="radio"><input type="text" placeHolder="Enter option name here">';
	                    break;
	                case 'checkbox':
	                    (0, _jquery2['default'])('#addRadioOptionBtn').hide();
	                    (0, _jquery2['default'])('#addCheckboxOptionBtn').show();
	                    (0, _jquery2['default'])('#optContainer_0').html('');
	                    answerBox = '<input type="checkbox"><input type="text" placeHolder="Enter option name here">';
	                    break;
	                case 'textbox':
	                    (0, _jquery2['default'])('#addRadioOptionBtn').hide();
	                    (0, _jquery2['default'])('#addCheckboxOptionBtn').hide();
	                    (0, _jquery2['default'])('#optContainer_0').html('');
	                    answerBox = 'Textbox';
	                    break;
	                case 'textarea':
	                    (0, _jquery2['default'])('#addRadioOptionBtn').hide();
	                    (0, _jquery2['default'])('#addCheckboxOptionBtn').hide();
	                    (0, _jquery2['default'])('#optContainer_0').html('');
	                    answerBox = 'Textarea';
	                    break;
	                default:
	                    break;
	            }
	            (0, _jquery2['default'])('#optContainer_0').append(answerBox);
	        }
	    }, {
	        key: '_addRadioOption',
	        value: function _addRadioOption() {
	            var answerBox = '<br/><input type="radio"><input type="text" placeHolder="Enter option name here"><a href="javascript:void(0)">Remove</a>';
	            (0, _jquery2['default'])('#optContainer_0').append(answerBox);
	        }
	    }, {
	        key: '_addCheckboxOption',
	        value: function _addCheckboxOption() {
	            var answerBox = '<br/><input type="checkbox"><input type="text" placeHolder="Enter option name here"><a href="javascript:void(0)">Remove</a>';
	            (0, _jquery2['default'])('#optContainer_0').append(answerBox);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var index = this.state.index;
	            return _react2['default'].createElement(
	                'div',
	                { className: 'login__container' },
	                _react2['default'].createElement(
	                    'fieldset',
	                    { className: 'login__fieldset' },
	                    _react2['default'].createElement(
	                        'span',
	                        { id: 'surveyTitle' },
	                        'Survey page.'
	                    ),
	                    _react2['default'].createElement('br', null),
	                    _react2['default'].createElement(
	                        'span',
	                        null,
	                        'Survey title : '
	                    ),
	                    _react2['default'].createElement('input', { type: 'text', ref: 'surveytitle' }),
	                    _react2['default'].createElement(
	                        'h4',
	                        null,
	                        'Enter Questions here..'
	                    ),
	                    _react2['default'].createElement(
	                        'div',
	                        { id: 'qContainer' },
	                        _react2['default'].createElement(
	                            'div',
	                            { id: 'qRow_0', className: 'qRow', 'data-index': '0' },
	                            _react2['default'].createElement(
	                                'span',
	                                null,
	                                'Question '
	                            ),
	                            _react2['default'].createElement('input', { type: 'text', ref: 'question_0' }),
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement(
	                                'span',
	                                null,
	                                'Answer type '
	                            ),
	                            _react2['default'].createElement(
	                                'select',
	                                { ref: 'answertype_0', id: 'answertype_0', onChange: this._selectAnswerType },
	                                _react2['default'].createElement(
	                                    'option',
	                                    { value: '0', selected: true },
	                                    'Select type'
	                                ),
	                                _react2['default'].createElement(
	                                    'option',
	                                    { value: 'radio' },
	                                    'Radio'
	                                ),
	                                _react2['default'].createElement(
	                                    'option',
	                                    { value: 'checkbox' },
	                                    'Checkbox'
	                                ),
	                                _react2['default'].createElement(
	                                    'option',
	                                    { value: 'textbox' },
	                                    'Textbox'
	                                ),
	                                _react2['default'].createElement(
	                                    'option',
	                                    { value: 'textarea' },
	                                    'Textarea'
	                                )
	                            ),
	                            _react2['default'].createElement('div', { id: 'optContainer_0' }),
	                            _react2['default'].createElement(
	                                'button',
	                                { id: 'addRadioOptionBtn', onClick: this._addRadioOption },
	                                'Add'
	                            ),
	                            _react2['default'].createElement(
	                                'button',
	                                { id: 'addCheckboxOptionBtn', onClick: this._addCheckboxOption },
	                                'Add'
	                            ),
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement(
	                                'span',
	                                null,
	                                '--------------------------------------------------------------------'
	                            )
	                        ),
	                        _react2['default'].createElement('br', null),
	                        _react2['default'].createElement('br', null)
	                    ),
	                    _react2['default'].createElement(
	                        'button',
	                        { onClick: this._addQuestion },
	                        'Add Question'
	                    ),
	                    _react2['default'].createElement('br', null),
	                    _react2['default'].createElement(
	                        'button',
	                        null,
	                        'Submit'
	                    )
	                )
	            );
	        }
	    }]);

	    return List;
	})(_react2['default'].Component);

	exports['default'] = List;
	module.exports = exports['default'];

/***/ },
/* 22 */
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

	var _actionsSurveyActions = __webpack_require__(23);

	var _actionsSurveyActions2 = _interopRequireDefault(_actionsSurveyActions);

	var _storesSurveyStore = __webpack_require__(25);

	var _storesSurveyStore2 = _interopRequireDefault(_storesSurveyStore);

	var Survey = (function (_React$Component) {
	  _inherits(Survey, _React$Component);

	  function Survey(props) {
	    var _this = this;

	    _classCallCheck(this, Survey);

	    _get(Object.getPrototypeOf(Survey.prototype), 'constructor', this).call(this, props);

	    this._onChange = function () {
	      _this.setState({
	        questions: _storesSurveyStore2['default'].getState().questions
	      });
	    };

	    this._onSurveySubmit = function () {
	      var surveyResult = _this.state.questions.map(function (data, key) {
	        return { 'user_id': 1, 'engagementarea_id': data._id, 'ratting': _react2['default'].findDOMNode(_this.refs[data._id]).value.trim() };
	      });
	      _actionsSurveyActions2['default'].saveEngagementSurvey(surveyResult);
	    };

	    this.state = _storesSurveyStore2['default'].getState();
	  }

	  _createClass(Survey, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _actionsSurveyActions2['default'].getallquestions();
	      _storesSurveyStore2['default'].listen(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _storesSurveyStore2['default'].unlisten(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var items = this.state.questions.map(function (data, key) {
	        return _react2['default'].createElement(
	          'li',
	          null,
	          data.mood,
	          ' : ',
	          data.description,
	          '  ',
	          _react2['default'].createElement('input', { type: 'text', ref: data._id })
	        );
	      });
	      return _react2['default'].createElement(
	        'div',
	        { className: 'Survey-list' },
	        _react2['default'].createElement(
	          'ul',
	          null,
	          items
	        ),
	        _react2['default'].createElement(
	          'button',
	          { onClick: this._onSurveySubmit },
	          'Submit'
	        )
	      );
	    }
	  }]);

	  return Survey;
	})(_react2['default'].Component);

	exports['default'] = Survey;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var _utilsSurveyWebAPIUtils = __webpack_require__(24);

	var _utilsSurveyWebAPIUtils2 = _interopRequireDefault(_utilsSurveyWebAPIUtils);

	var SurveyActions = (function () {
	  function SurveyActions() {
	    _classCallCheck(this, SurveyActions);
	  }

	  _createClass(SurveyActions, [{
	    key: 'getallquestions',
	    value: function getallquestions() {
	      var _this = this;

	      this.dispatch();
	      _utilsSurveyWebAPIUtils2['default'].getEngagementSurvey().then(function (response) {
	        if (response) {
	          console.log(response);
	          _this.actions.getquestions(response);
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'getquestions',
	    value: function getquestions(data) {
	      this.dispatch(data);
	    }
	  }, {
	    key: 'saveEngagementSurvey',
	    value: function saveEngagementSurvey(surveyResult) {
	      var _this2 = this;

	      this.dispatch();
	      _utilsSurveyWebAPIUtils2['default'].saveEngagementSurveyResult(surveyResult).then(function (response) {
	        if (response) {
	          console.log(response);
	          _this2.actions.saveEngagementSuccess();
	        }
	      }, function () {});
	    }
	  }, {
	    key: 'saveEngagementSuccess',
	    value: function saveEngagementSuccess() {
	      this.dispatch({ 'success': '5' });
	    }
	  }]);

	  return SurveyActions;
	})();

	exports['default'] = _altInstance2['default'].createActions(SurveyActions);
	module.exports = exports['default'];

	// Dispatch another event for a bad request

	// Dispatch another event for a bad request

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	var utils = {
	  /*
	   * Get Engagement areas
	   */
	  getEngagementSurvey: function getEngagementSurvey() {
	    return _jquery2['default'].ajax({
	      url: '/getengagementsurvey',
	      type: 'GET',
	      contentType: 'application/json'
	    });
	  },
	  saveEngagementSurveyResult: function saveEngagementSurveyResult(surveyResult) {
	    return _jquery2['default'].ajax({
	      url: '/saveengagementsurveyresult',
	      type: 'POST',
	      contentType: 'application/json',
	      data: JSON.stringify(surveyResult)
	    });
	  }

	};

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _actionsSurveyActions = __webpack_require__(23);

	var _actionsSurveyActions2 = _interopRequireDefault(_actionsSurveyActions);

	var _utilsImmutableHelpers = __webpack_require__(26);

	var _altInstance = __webpack_require__(5);

	var _altInstance2 = _interopRequireDefault(_altInstance);

	var SurveyStore = (function () {
	  function SurveyStore() {
	    _classCallCheck(this, SurveyStore);

	    this.questions = _immutable2['default'].Map({});

	    this.on('init', this.bootstrap);

	    this.on('bootstrap', this.bootstrap);

	    this.bindListeners({
	      handleSurveys: _actionsSurveyActions2['default'].GETQUESTIONS
	    });
	  }

	  _createClass(SurveyStore, [{
	    key: 'bootstrap',
	    value: function bootstrap() {
	      if (!_immutable2['default'].OrderedMap.isOrderedMap(this.questions)) {
	        this.questions = (0, _utilsImmutableHelpers.fromJSOrdered)(this.questions);
	      }
	    }
	  }, {
	    key: 'handleSurveys',
	    value: function handleSurveys(data) {
	      this.questions = data;
	      console.log(this.questions);
	      this.emitChange();
	    }
	  }, {
	    key: 'handleEngageSuccess',
	    value: function handleEngageSuccess() {
	      this.questions = this.questions.merge({ EngageSuccess: true });
	      this.emitChange();
	    }
	  }]);

	  return SurveyStore;
	})();

	// Export our newly created Store
	exports['default'] = _altInstance2['default'].createStore(SurveyStore, 'SurveyStore');
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.fromJSGreedy = fromJSGreedy;
	exports.fromJSOrdered = fromJSOrdered;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _immutable = __webpack_require__(10);

	var _immutable2 = _interopRequireDefault(_immutable);

	function fromJSGreedy(js) {
	  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? _immutable2['default'].Seq(js).map(fromJSGreedy).toList() : _immutable2['default'].Seq(js).map(fromJSGreedy).toMap();
	}

	function fromJSOrdered(js) {
	  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? _immutable2['default'].Seq(js).map(fromJSGreedy).toList() : _immutable2['default'].Seq(js).map(fromJSGreedy).toOrderedMap();
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<!doctype html>\n<html lang=\"\">\n\n<head>\n    <title>TITLE</title>\n\n    META\n\n    LINK\n\n</head>\n<body>\n<div class=\"app\">CONTENT</div>\n\n<script type=\"text/javascript\" charset=\"utf-8\" src=\"assets/app.js\"></script>\n</body>\n</html>\n";

/***/ }
/******/ ]);