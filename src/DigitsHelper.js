function DigitsHelper(key, digitsElId, listener) {
  this.digits = null;
  
  this.consumerKey = key;
  this.listener = listener;
  
  document.getElementById(digitsElId).onload = this._digitsScriptLoaded.bind(this);
}

DigitsHelper.prototype.login = function() {
  this.digits.logIn()
    .done(this._onLogin.bind(this))
    .fail(this._onLoginFailed.bind(this));
};

DigitsHelper.prototype.getLoginStatus = function() {
  this.digits.getLoginStatus()
    .done(this._onLoginStatus.bind(this))
    .fail(this._onLoginStatusFailure.bind(this));
};

/*
 * loginResponse = {
 *   oauth_echo_headers: {
 *     'X-Verify-Credentials-Authorization': string (HTTP Request header)
 *     'X-Auth-Service-Provider': string (HTTP Request Url)
 *   }
 * }
 *
 */
DigitsHelper.prototype._onLogin = function(loginResponse){
  println('oAuthEcho Headers: ', loginResponse);
  
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

DigitsHelper.prototype.setDigits = function(digits) {
  this.digits = digits;
};

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