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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Portfolio = __webpack_require__(1),
	    portfoilioInstance = new Portfolio();

	portfoilioInstance.init();


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Portfolio() { }

	Portfolio.prototype.init = function () {
	    document.addEventListener('DOMContentLoaded', this.attachEvents.bind(this))
	}

	Portfolio.prototype.attachEvents = function () {
	    var icons = document.getElementsByClassName('app-icon'),
	        close = document.getElementsByClassName('app-info-close')[0];

	    for (i = 0; i < icons.length; i++) {
	        icons[i].addEventListener('click', this.openAppInfo.bind(this));
	    }

	    close.addEventListener('click', this.closeAppInfo.bind(this));
	}

	Portfolio.prototype.openAppInfo = function (evt) {
	    var appInfo = document.getElementsByClassName('app-info')[0];

	    appInfo.classList.remove('collapsed');
	}

	Portfolio.prototype.closeAppInfo = function (evt) {
	    var appInfo = document.getElementsByClassName('app-info')[0];

	    appInfo.classList.add('collapsed');
	}

	module.exports = Portfolio;

/***/ }
/******/ ]);