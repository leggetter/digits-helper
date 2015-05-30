/**
 * Digits Helper constructor
 * 
 * @param {string} consumerKey Twitter consumer key
 * @param {string} digitsElId The element ID of the Digits SDK element
 * @param {DigitsHelperListener} The listener.
 */
function DigitsHelper(consumerKey, digitsElId, listener) {
  this.digits = null;
  
  this.consumerKey = consumerKey;
  this.listener = listener;
  
  document.getElementById(digitsElId).onload = this._digitsScriptLoaded.bind(this);
}

/**
 * Start the login process using Digits. {@link DigitsHelperListener.loggedIn} will be called if the login succeeds,
 * {@link DigitsHelperListener.loginFailed} will be called if it fails.
 */
DigitsHelper.prototype.login = function() {
  this.digits.logIn()
    .done(this._onLogin.bind(this))
    .fail(this._onLoginFailed.bind(this));
};

/**
 * Get the current login status. {@link DigitsHelperListener.loginStatus} will be called 
 * if the login status retrieval succeeds, {@link DigitsHelperListener.loginStatusFailed} will be called if it fails.
 */
DigitsHelper.prototype.getLoginStatus = function() {
  this.digits.getLoginStatus()
    .done(this._onLoginStatus.bind(this))
    .fail(this._onLoginStatusFailure.bind(this));
};

/*
 * @private
 *
 * loginResponse = {
 *   oauth_echo_headers: {
 *     'X-Verify-Credentials-Authorization': string (HTTP Request header)
 *     'X-Auth-Service-Provider': string (HTTP Request Url)
 *   }
 * }
 *
 */
DigitsHelper.prototype._onLogin = function(loginResponse) {
  var oAuthEchoHeaders = loginResponse.oauth_echo_headers;
  
  // You must POST these headers to your server to safely invoke Digits' API
  // and get the logged-in user's data. You will not be able to call it directly
  // from the browser.
  var credentials = oAuthEchoHeaders['X-Verify-Credentials-Authorization'];
  var apiUrl = oAuthEchoHeaders['X-Auth-Service-Provider'];
              
  var oAuthHeaders = {
      apiUrl: apiUrl,
      headers: credentials
    };
  
  this.listener.loggedIn(this, oAuthHeaders); 
};

/*
 * @private
 *
 * error = {
 *   type: string,
 *   message: string
 * }
 *
 * Note: type == 'abort' means the user closed the Login flow
 */
DigitsHelper.prototype._onLoginFailed = function(error){
  this.listener.loginFailed(this, error); 
}; 

/*
 * @private
 * 
 * error = {
 *   type: string,
 *   message: string
 * }
 */
DigitsHelper.prototype._onLoginStatusFailure = function(error){
  this.listener.loginStatusFailed(this, error);
};

/*
 * loginStatusResponse = {
 *   status: string ["unknown"|"not_authorized"|"authorized"],
 *   oauth_echo_headers: {
 *     'X-Verify-Credentials-Authorization': string (HTTP Request header)
 *     'X-Auth-Service-Provider': string (HTTP Request Url)
 *   } 
 * }
 *
 *    unknown:          User is not logged in to Digits, may or may not have authorized your app
 *    not_authorized:   User is logged in to Digits but has not authorized your app yet.
 *    authorized:       User is logged in to Digits and has authorized your app.
 *
 *    NOTE: The OAuth Echo headers will only be returned if User has authorized your app.
 */
DigitsHelper.prototype._onLoginStatus = function(loginStatusResponse){
  this.listener.loginStatus(this, loginStatusResponse);
};

/**
 * Sets the reference to the Twitter Digits SDK object.
 * 
 * This is called internally, however there is the opportunity to set this manually for scenarios such as testing.
 * 
 * @param {Object} The Twitter Digits SDK object.
 */
DigitsHelper.prototype.setDigits = function(digits) {
  this.digits = digits;
};

/** @private */
DigitsHelper.prototype._digitsScriptLoaded = function() {
  var self = this;
  
  self.setDigits(Digits);
  
  self.listener.loaded(self);
    
  /* Initialize Digits SDK using your application's consumer key. */
  self.digits.init({ consumerKey: self.consumerKey })
    .done(function(){
      self.listener.initialized(self);
    })
    .fail(function(){
      self.listener.initializationFailed(self);
    });  
};