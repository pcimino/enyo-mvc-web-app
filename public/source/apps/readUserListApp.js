// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js

enyo.kind({
	name: "Bootplate.ReadUserListApp",
	kind: "enyo.Application",
	controllers: [{
		name: "readUserList",
		kind: "Bootplate.ReadUserListController"
	}],
  view: "Bootplate.ReadUserListView"
});
