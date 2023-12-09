/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ performance_test),
  "options": () => (/* binding */ options),
  "setup": () => (/* binding */ setup)
});

;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");;
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");;
;// CONCATENATED MODULE: ./tools/auth.ts

//* Required Variables processed from .env file:
var baseUrl = __ENV.TOKEN_URL;
var tokenEndpoint = __ENV.GET_TOKEN_URL;
var username = __ENV.USERNAME;
var auth_password = __ENV.PASSWORD;
var scope = __ENV.SCOPE;
var clientId = __ENV.CLIENT_ID;
var requestURL = "".concat(baseUrl).concat(tokenEndpoint, "?username=").concat(username, "&password=").concat(auth_password, "&grant_type=password&scope=").concat(scope, "&client_id=").concat(clientId, "&response_type=token");
//* Use this function to get the token for the API calls
function getApiToken() {
  var loginResponse = http_default().post(requestURL, {
    'Content-Type': 'x-www-form-urlencoded'
  });
  var responseObj = loginResponse.json();
  var token = responseObj.access_token;
  var Auth = {
    'Content-Type': 'application/json',
    Authorization: "Bearer ".concat(token)
  };
  console.log('---- Auth Login Successful! ✅');
  return Auth;
}
;// CONCATENATED MODULE: ./tools/endpoints.ts
//* List of Servers URL:
var QA_SERVER = __ENV.QA_SERVER;

//* List of Endpoints by service:
var User = {
  currentId: '/User/currentId'
};
;// CONCATENATED MODULE: ./tests/performance.test.ts





//* Preconditions
function setup() {
  console.log('🧪Starting Performance Tests...');
  var auth = getApiToken();
  return auth;
}

//* Test Config
var options = {
  // will perform 1 user per 1 second
  vus: 10,
  duration: '10s'
};

//* Performance Test:
/* harmony default export */ function performance_test(data) {
  var endpointCall = QA_SERVER + User.currentId;
  var res = http_default().get(endpointCall, {
    headers: data
  });
  (0,external_k6_namespaceObject.check)(res, {
    '✅ Status was 200': function StatusWas200(res) {
      return res.status == 200;
    },
    '✅ res has correct Data': function resHasCorrectData(res) {
      var _res$json;
      return ((_res$json = res.json()) === null || _res$json === void 0 ? void 0 : _res$json.toString().length) !== 0;
    }
  });
  console.log('✅ Response Body Defined:', res.json());
  (0,external_k6_namespaceObject.sleep)(1);
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=performance.test.js.map