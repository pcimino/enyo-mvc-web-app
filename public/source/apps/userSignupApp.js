// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.UserSignupApp",
	kind: "enyo.Application",
	controllers: [{
		name: "userSignup",
		kind: "Bootplate.UserSignupController"
	}],
  view: "Bootplate.UserSignupView"
});
