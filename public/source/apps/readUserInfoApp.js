// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.ReadUserInfoApp",
	kind: "enyo.Application",
	controllers: [{
		name: "readUserInfo",
		kind: "Bootplate.ReadUserInfoController"
	}],
  view: "Bootplate.ReadUserInfoView"
});
