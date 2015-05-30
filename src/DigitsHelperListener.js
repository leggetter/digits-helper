/**
 * Listener definition for all {@link DigitsHelper} callbacks.
 * 
 * @interface
 */
function DigitsHelperListener() {	}

/**
 * Called when the SDK is loaded
 * 
 * @param {DigitsHelper} helper The helper instance.
 */
DigitsHelperListener.prototype.loaded = function(helper) {};

/**
 * Called when the Digits SDK has initialised using Twitter consumer key
 * 
 * @param {DigitsHelper} helper The helper instance.
 */      
DigitsHelperListener.prototype.initialized = function(helper) {};

/**
 * Called when the Digits SDK failed to initialize
 * 
 * @param {DigitsHelper} helper The helper instance.
 */      
DigitsHelperListener.prototype.initializationFailed = function(helper) {};

/**
 * Called upon successful login in using Digits
 * 
 * @param {DigitsHelper} helper The helper instance.
 * @param {Object} oAuthHeaders
 */       
DigitsHelperListener.prototype.loggedIn = function(helper, oAuthHeaders) {};
      
/**
 * Called when login fails
 * 
 * @param {DigitsHelper} helper The helper instance.
 * @param {Object} error error information related to the login failure.
 * @param {string} error.type
 * @param {string} error.message
 */
DigitsHelperListener.prototype.loginFailed = function(helper, error) {};
      
/**
 * Success callback following a call to {@link DigitsHelper.getLoginStatus}.
 * 
 * @param {DigitsHelper} helper The helper instance.
 * @param {Object} loginStatusResponse
 * @param {string} login.status the status of the login
 *                    unknown - User is not logged in to Digits, may or may not have authorized your app
 *                    not_authorized - User is logged in to Digits but has not authorized your app yet.
 *                    authorized - User is logged in to Digits and has authorized your app.
 * @param {Object} loginStatusResponse.oauth_echo_headers The headers
 * @param {string} loginStatusResponse.oauth_echo_headers['X-Verify-Credentials-Authorization']
 *                    HTTP Request header
 * @param {string} loginStatusResponse.oauth_echo_headers['X-Auth-Service-Provider']
 *                    HTTP Request Url
 */
DigitsHelperListener.prototype.loginStatus = function(helper, loginStatusResponse) {};

/**
 * Failure callback following a call to {@link DigitsHelper.getLoginStatus}.
 * 
 * @param {DigitsHelper} helper The helper instance.
 * @param {Object} error Error information related to the login status retrieval failure.
 * @param {string} error.type
 * @param {string} error.message
 */      
DigitsHelperListener.prototype.loginStatusFailed = function(helper, error) {};