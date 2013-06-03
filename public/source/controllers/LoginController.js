enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.LoginController",
		kind: "enyo.Controller",
    autoLoad: true,
    data: {},
    handlers: {
      onLogin: 'login',
      onForgotPassword: 'forgotPassword',
      onUserSignup: 'userSignup',
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
