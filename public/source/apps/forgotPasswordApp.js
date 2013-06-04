// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.ForgotPasswordApp",
	kind: "enyo.Application",
	controllers: [{
		name: "forgotPassword",
		kind: "Bootplate.ForgotPasswordController"
	}],
  view: "Bootplate.ForgotPasswordView"
});
