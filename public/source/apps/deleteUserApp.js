// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.DeleteUserApp",
	kind: "enyo.Application",
	controllers: [{
		name: "deleteUser",
		kind: "Bootplate.DeleteUserController"
	}],
  view: "Bootplate.DeleteUserView"
});
