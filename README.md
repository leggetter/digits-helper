# Digits Helper

A helper wrapper for [Digits by Twitter](https://digits.com).

The DigitsHelper wraps up using the Digits library into a simple object. To use it you create a new `DigitsHelper` object and pass in a listener. This saves you having to work out the login flow required when directly using the `Digits` object.

## Installation

Include the Digits SDK and the Digits Helper library.

```html
<script id="digits_sdk_js" src="https://cdn.digits.com/1/sdk.js" async></script>
<script id="digits_helper_js" src="https://leggetter.github.io/digits-helper/src/DigitsHelper.js" async></script>
```

*Note that the official Digits documentation shows using `async` so this has also been assumed within the `Digits` helper library.*

You can also install from bower:

```
bower install digits-helper --save
```

## Usage

Define a listener:

```js
var listener = {
  loaded: function(helper) {
    // Digits SDK has loaded
  },
  
  initialized: function(helper) {
    // Digits SDK has initialised using Twitter consumer key
  },
  
  initializationFailed: function(helper) {
    // Digits SDK failed to initialize
  },
  
  loggedIn: function(helper, oAuthHeaders) {
    // Successfully logged in using Digits
  },
  
  loginFailed: function(helper, error) {
    // Failed to login
  },
  
  loginStatus: function(helper, loginStatusResponse) {
    // Success callback following a call to DigitsHelper.getLoginStatus()
  },
  
  loginStatusFailed: function(helper, error) {
    // Failure callback following a call to DigitsHelper.getLoginStatus()
  }
};
```

Wait for the Digits Helper library to load and initialise the `DigitsHelper`:

```js
function digitsHelperLoaded() {
	// Used by the helper to detect when the Digits SDK has loaded
	var digitsElementId = 'digits_sdk_js';
	var twitterConsumerKey = 'YOUR_TWITTER_CONSUMER_KEY';
	
  // Remember to pass in the listener
  var digitsHelper = new DigitsHelper(twitterConsumerKey, digitsElementId, listener);
}

document.getElementById('#digits_helper_js').onload = digitsHelperLoaded;
```

## Reference

* [Official Digits Web documentation](https://dev.twitter.com/twitter-kit/web/digits)