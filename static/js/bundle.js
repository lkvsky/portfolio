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
	    this.attachEvents();
	}

	Portfolio.prototype.attachEvents = function () {
	    var icons = $('.js_app-icon'),
	        close = $('.app-info-close'),
	        navLinks = $('.js_nav-link');

	    icons.on('click', this.openAppInfo.bind(this));
	    close.on('click', this.closeAppInfo.bind(this));
	    navLinks.on('click', this.onNavLinkClick.bind(this));

	}

	Portfolio.prototype.openAppInfo = function (evt) {
	    var appIconInfoString = $(evt.currentTarget).closest('.js_app-icon').data('info'),
	        appInfoWrapper = $('.app-info'),
	        appInfoTexts = $('.js_app-info-text'),
	        iphoneSvg = $('.iphone-svg').closest('div');

	    appInfoTexts.filter('[data-info="' + appIconInfoString + '"]').removeClass('hide');
	    appInfoWrapper.removeClass('collapsed');
	    iphoneSvg.addClass('shake');
	}

	Portfolio.prototype.closeAppInfo = function (evt) {
	    var appInfo = $('.app-info'),
	        appInfoTexts = $('.js_app-info-text'),
	        iphoneSvg = $('.iphone-svg').closest('div');

	    appInfoTexts.addClass('hide');
	    appInfo.addClass('collapsed');
	    iphoneSvg.removeClass('shake');
	}

	Portfolio.prototype.onNavLinkClick = function (evt) {
	    var icon = $(evt.currentTarget),
	        targetSection = $('.' + icon.data('scroll'));

	    $('html, body').animate({
	        scrollTop: targetSection.offset().top - 50
	    }, 300);
	}

	module.exports = Portfolio;

/***/ }
/******/ ]);