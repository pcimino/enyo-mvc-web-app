// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.UpdateUserInfoApp",
	kind: "enyo.Application",
	controllers: [{
		name: "updateUserInfo",
		kind: "Bootplate.UpdateUserInfoController"
	}],
  view: "Bootplate.UpdateUserInfoView"
});
