(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("allihoopa", [], factory);
	else if(typeof exports === 'object')
		exports["allihoopa"] = factory();
	else
		root["allihoopa"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	// This file is the entry point for Webpack, and is used to set up the global
	// Allihoopa object when the SDK is loaded through <script> tags from CDN.

	if (window.Allihoopa) {
	    console.warn('window.Allihoopa already defined');
	}

	window.Allihoopa = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var config_1 = __webpack_require__(2);
	exports.setup = config_1.setup;
	var auth_1 = __webpack_require__(3);
	exports.authenticate = auth_1.authenticate;
	var DropAPI_1 = __webpack_require__(5);
	exports.upload = DropAPI_1.uploadResource;
	exports.dropUpload = DropAPI_1.dropPiece;
	var PieceData_1 = __webpack_require__(7);
	exports.DropPiece = PieceData_1.DropPiece;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var CURRENT_OPTIONS = null;
	/**
	 * Configure the Allihoopa SDK.
	 */
	function setup(options) {
	    if (CURRENT_OPTIONS !== null) {
	        throw new Error('Can not configure the Allihoopa SDK more than once');
	    }
	    if (!options) {
	        throw new Error('Options to setup() not provided');
	    }
	    if (!options.app || typeof options.app !== 'string') {
	        throw new Error('Field `app` of configuration is missing or invalid');
	    }
	    if (!options.apiKey || typeof options.apiKey !== 'string') {
	        throw new Error('Field `apiKey` of configuration is missing or invalid');
	    }
	    CURRENT_OPTIONS = options;
	}
	exports.setup = setup;
	function getApplicationIdentifier() {
	    if (CURRENT_OPTIONS === null) {
	        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
	    }
	    return CURRENT_OPTIONS.app;
	}
	exports.getApplicationIdentifier = getApplicationIdentifier;
	function getAPIKey() {
	    if (CURRENT_OPTIONS === null) {
	        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
	    }
	    return CURRENT_OPTIONS.apiKey;
	}
	exports.getAPIKey = getAPIKey;
	function getWebDomain() {
	    return 'allihoopa.com';
	}
	exports.getWebDomain = getWebDomain;
	function getAPIDomain() {
	    return 'api.allihoopa.com';
	}
	exports.getAPIDomain = getAPIDomain;
	/// Should only be used for testing
	function clearConfiguration() {
	    CURRENT_OPTIONS = null;
	}
	exports.clearConfiguration = clearConfiguration;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var config_1 = __webpack_require__(2);
	var cookie_1 = __webpack_require__(4);
	/**
	 * Open an authentication window for Allihoopa. The callback will be called with
	 * `true` if the user successfully logged in, or `false` if the user cancelled
	 * login by e.g. closing the window.
	 */
	function authenticate(callback) {
	    cookie_1.clearCookie(getAuthCookieName());
	    var popup = window.open("https://" + config_1.getWebDomain() + "/account/login?response_type=token&client_id=" + config_1.getApplicationIdentifier() + "&redirect_type=postmessage", 'allihoopa_auth', 'width=420,height=600');
	    if (!popup) {
	        console.warn('Could not open the popup window');
	        if (callback) {
	            callback(false);
	        }
	        return;
	    }
	    var eventListener;
	    var pollTimer;
	    var callbackFired = false;
	    var cleanupListeners = function () {
	        window.removeEventListener('message', eventListener);
	        window.clearInterval(pollTimer);
	    };
	    var callCallback = function (value) {
	        if (!callbackFired) {
	            callbackFired = true;
	            if (callback) {
	                callback(value);
	            }
	        }
	    };
	    eventListener = function (event) {
	        if (event.data.substr(0, 10) === 'allihoopa:') {
	            saveAuthCookie(event.data.substr(10));
	            cleanupListeners();
	            callCallback(true);
	        }
	    };
	    pollTimer = window.setInterval(function () {
	        if (popup.closed) {
	            cleanupListeners();
	            // There is a possible race condition where the window might close
	            // itself *before* the postMessage arrives.
	            //
	            // This setInterval gives the message 100ms to arrive before
	            // considering the auth cancelled.
	            setInterval(function () { return callCallback(false); }, 100);
	        }
	    }, 100);
	    window.addEventListener('message', eventListener, false);
	}
	exports.authenticate = authenticate;
	function getAuthCookieName() {
	    return "ah-auth-" + config_1.getApplicationIdentifier();
	}
	function saveAuthCookie(data) {
	    cookie_1.setPersistentCookie(getAuthCookieName(), data);
	}
	function getAuthCookie() {
	    return cookie_1.getCookie(getAuthCookieName());
	}
	exports.getAuthCookie = getAuthCookie;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	function getCookie(name) {
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = cookies[i].trim();
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) === (name + '=')) {
	                return decodeURIComponent(cookie.substring(name.length + 1));
	            }
	        }
	    }
	    return null;
	}
	exports.getCookie = getCookie;
	function setPersistentCookie(key, value) {
	    document.cookie = key + "=" + encodeURIComponent(value) + ";max-age=1209600";
	}
	exports.setPersistentCookie = setPersistentCookie;
	function clearCookie(key) {
	    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
	exports.clearCookie = clearCookie;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var graphql_1 = __webpack_require__(6);
	function uploadResource(data, completionCallback, progressCallback) {
	    getUrls(1, function (result) {
	        if (result.status === 'OK') {
	            var url_1 = result.data[0];
	            uploadFile(url_1, data, function (result) {
	                if (result.status === 'OK') {
	                    completionCallback({ status: 'OK', data: url_1 });
	                }
	                else {
	                    completionCallback(result);
	                }
	            }, function (progress) { progressCallback(progress); });
	        }
	        else {
	            completionCallback(result);
	        }
	    });
	}
	exports.uploadResource = uploadResource;
	function getUrls(count, callback) {
	    var query = "\n        mutation ($count: Int!) {\n            uploadUrls(count: $count) {\n                urls\n            }\n        }";
	    graphql_1.graphQLQuery(query, { count: count }, function (result) {
	        if (result.status === 'OK') {
	            callback({ status: 'OK', data: result.data.uploadUrls.urls });
	        }
	        else {
	            callback(result);
	        }
	    });
	}
	exports.getUrls = getUrls;
	function uploadFile(url, data, completionCallback, progressCallback) {
	    if (!url) {
	        throw new Error('No file url');
	    }
	    var xhr = new XMLHttpRequest();
	    xhr.open('PUT', url);
	    xhr.setRequestHeader('Content-type', ' ');
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4 && xhr.status === 200) {
	            completionCallback({ status: 'OK', data: null });
	        }
	        else if (xhr.readyState === 4) {
	            completionCallback({
	                status: 'ERROR',
	                error: new Error('Could not upload file. Status = ' + xhr.status + ' ' + xhr.responseText) });
	        }
	    };
	    xhr.upload.onprogress = function (e) {
	        if (e.lengthComputable) {
	            progressCallback(Math.round((e.loaded / e.total) * 100));
	        }
	    };
	    xhr.send(data);
	}
	exports.uploadFile = uploadFile;
	function dropPiece(piece, callback) {
	    var query = "\n        mutation ($piece: PieceInput!) {\n            dropPiece(piece: $piece) {\n                piece {\n                    url\n                    title\n                    coverImage(position: 10 withFallback: true) {\n                        url\n                    }\n                }\n            }\n        }";
	    graphql_1.graphQLQuery(query, { piece: piece }, function (result) {
	        if (result.status === 'OK') {
	            callback({ status: 'OK', data: result.data.dropPiece.piece });
	        }
	        else {
	            callback(result);
	        }
	    });
	}
	exports.dropPiece = dropPiece;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var auth_1 = __webpack_require__(3);
	var config_1 = __webpack_require__(2);
	function graphQLQuery(query, variables, callback) {
	    var url = "https://" + config_1.getAPIDomain() + "/v1/graphql";
	    var xhr = new XMLHttpRequest();
	    xhr.open('POST', url);
	    xhr.responseType = 'json';
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.setRequestHeader('Allihoopa-API-Key', config_1.getAPIKey());
	    var authCookie = auth_1.getAuthCookie();
	    if (authCookie) {
	        var accessToken = JSON.parse(authCookie);
	        xhr.setRequestHeader('ph-access-token', accessToken.access_token);
	    }
	    xhr.onload = function () {
	        if (xhr.status === 200) {
	            callback({ status: 'OK', data: xhr.response.data });
	        }
	        else {
	            callback({ status: 'ERROR', error: new Error(xhr.response) });
	        }
	    };
	    xhr.send(JSON.stringify({ query: query, variables: variables }));
	}
	exports.graphQLQuery = graphQLQuery;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var DropPiece = (function () {
	    function DropPiece(data) {
	        this.stems = data.stems;
	        this.presentation = data.presentation;
	        this.attribution = data.attribution;
	        this.musicalMetadata = data.musicalMetadata;
	        var errors = [];
	        this.validate(errors);
	        if (errors.length) {
	            throw new Error("Invalid piece created: " + errors.join(', '));
	        }
	    }
	    DropPiece.prototype.validate = function (errors) {
	        this.validateStems(errors);
	        this.validatePresentation(errors);
	        this.validateAttribution(errors);
	        this.validateMusicalMetadata(errors);
	    };
	    DropPiece.prototype.validateStems = function (errors) {
	        if (!this.stems) {
	            errors.push('Missing `stems` field');
	            return;
	        }
	        if (!this.stems.mixStem) {
	            errors.push('Missing `mixStem` field on `stems`');
	            return;
	        }
	        if (!(this.stems.mixStem instanceof Function)) {
	            errors.push('`mixStem` field on `stems` must be a function');
	        }
	    };
	    DropPiece.prototype.validatePresentation = function (errors) {
	        if (!this.presentation) {
	            errors.push('Missing `presentation` field');
	            return;
	        }
	        if (!this.presentation.title) {
	            errors.push('Missing `title` field on `presentation`');
	        }
	        else if (!this.presentation.title.length) {
	            errors.push('Field `title` field on `presentation` can not be empty');
	        }
	        else if (this.presentation.title.length > 50) {
	            errors.push('Field `title` field on `presentation` can not be more than 50 characters');
	        }
	        if (this.presentation.coverImage && !(this.presentation.coverImage instanceof Function)) {
	            errors.push('`coverImage` field on `presentation` must be a function');
	        }
	        if (this.presentation.preview && !(this.presentation.preview instanceof Function)) {
	            errors.push('`preview` field on `presentation` must be a function');
	        }
	    };
	    DropPiece.prototype.validateAttribution = function (errors) {
	        if (this.attribution) {
	            var pieces = this.attribution.basedOnPieces;
	            if (pieces === undefined) {
	                errors.push('Missing field `basedOnPieces` on `attribution`');
	                return;
	            }
	            if (!(pieces instanceof Array)) {
	                errors.push('`basedOnPieces` field on `attribution` must be an array');
	                return;
	            }
	            for (var i = 0; i < pieces.length; ++i) {
	                if (!(typeof pieces[i] === 'string')) {
	                    errors.push('`basedOnPieces` field on `attribution` must be an array of strings');
	                    break;
	                }
	            }
	        }
	    };
	    DropPiece.prototype.validateMusicalMetadata = function (errors) {
	        if (!this.musicalMetadata) {
	            errors.push('Missing field `musicalMetadata`');
	            return;
	        }
	        validateNumber(this.musicalMetadata.lengthMicroseconds, 'field `lengthMicroseconds` of `musicalMetadata`', 1, 1200000000, errors);
	        if (this.musicalMetadata.tempo) {
	            var tempo = this.musicalMetadata.tempo;
	            validateNumber(tempo.fixed, 'field `fixed` of `tempo` on `musicalMetadata`', 1, 999.999, errors);
	        }
	        if (this.musicalMetadata.loop) {
	            var loop = this.musicalMetadata.loop;
	            validateNumber(loop.startMicroseconds, 'field `startMicroseconds` of `loop` on `musicalMetadata`', 0, this.musicalMetadata.lengthMicroseconds, errors);
	            validateNumber(loop.endMicroseconds, 'field `endMicroseconds` of `loop` on `musicalMetadata`', 0, this.musicalMetadata.lengthMicroseconds, errors);
	            if (isFinite(loop.startMicroseconds) && isFinite(loop.endMicroseconds) && loop.startMicroseconds >= loop.endMicroseconds) {
	                errors.push('Field `loop` on `musicalMetadata`: the start must come before the end');
	            }
	        }
	        if (this.musicalMetadata.timeSignature) {
	            var ts = this.musicalMetadata.timeSignature;
	            if (!ts.fixed) {
	                errors.push('Field `fixed` of `timeSignature` on `musicalMetadata` must be set');
	            }
	            else {
	                if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].indexOf(ts.fixed.upper) === -1) {
	                    errors.push('Field `upper` of `fixed` of `timeSignature` on `musicalMetadata` must be an integer between 1 and 16');
	                }
	                if ([2, 4, 8, 16].indexOf(ts.fixed.lower) === -1) {
	                    errors.push('Field `lower` of `fixed` of `timeSignature` on `musicalMetadata` must be either 2, 4, 8, or 16');
	                }
	            }
	        }
	    };
	    return DropPiece;
	}());
	exports.DropPiece = DropPiece;
	function validateNumber(value, msg, min, max, errors) {
	    if (value === undefined) {
	        errors.push("Missing " + msg);
	    }
	    else if (!isFinite(value)) {
	        errors.push(msg + " must be a number");
	    }
	    else if (value > max) {
	        errors.push(msg + " too high: it must be lower than " + max);
	    }
	    else if (value < min) {
	        errors.push(msg + " too low: it must be higher than " + min);
	    }
	}


/***/ }
/******/ ])
});
;