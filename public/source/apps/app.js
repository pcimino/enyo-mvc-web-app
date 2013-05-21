// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js
/* TODO
  popup ?
  Logger popup display console ? Does console.log write to the browser console?
*/
enyo.kind({
	name: "Bootplate.Application",
	kind: "enyo.Application",
	controllers: [{
		name: "login",
		kind: "Bootplate.LoginController"
	}],
	view: "Bootplate.LoginView",
	login: function (sender, event) {
		var data = this.controllers.login.get("data");
		//TODO
	}
});
