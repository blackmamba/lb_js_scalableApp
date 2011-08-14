// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Modifications
// Copyright 2011 Eric Bréchemier, Some Rights Reserved
// Copyright 2010-2011 Legal-Box SAS, All Rights Reserved
// Licensed under the BSD License
// http://creativecommons.org/licenses/BSD/
//
// * renamed file from goog/net/httpstatus.js to goog.net.HttpStatus.js
// * wrapped code in a function in a call to define for dependency management
//   using requireJS

/**
 * @fileoverview Constants for HTTP status codes.
 */

define(["./goog"], function(goog){

  goog.provide('goog.net.HttpStatus');


  /**
   * HTTP Status Codes defined in RFC 2616.
   * @see http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
   * @enum {number}
   */
  goog.net.HttpStatus = {
    // Informational 1xx
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,

    // Successful 2xx
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,

    // Redirection 3xx
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,

    // Client Error 4xx
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_ENTITY_TOO_LARGE: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUEST_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,

    // Server Error 5xx
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,

    /*
     * IE returns this code for 204 due to its use of URLMon, which returns this
     * code for 'Operation Aborted'. The status text is 'Unknown', the response
     * headers are ''. Known to occur on IE 6 on XP through IE9 on Win7.
     */
    QUIRK_IE_NO_CONTENT: 1223
  };

  return goog.net.HttpStatus;
});
