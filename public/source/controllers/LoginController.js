enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.LoginController",
		kind: "enyo.Controller",
		data: {},
    handlers: {
      onLogin: 'login',
      onForgotPassword: 'forgotPassword',
      onUserSignup: 'userSignup',
    },
    events: {
      onDispatchEvent: 'dispatchEvent'
    },
    // dispatchEvent
    dispatchEvent: function (inSender, inEvent) {
      console.log("dispatchEvent");
      console.log(inSender);
      console.log(inEvent);
    },
    // Login
    login: function () {
      console.log("login");
    },
    // ForgotPassword
    forgotPassword: function () {
      console.log("forgotPassword");
    },
    // UserSignup
    userSignup: function () {
      console.log("userSignup");
    }

	});
});
