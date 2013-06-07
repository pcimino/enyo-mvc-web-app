// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js
//
// Maybe 2.3 will make this a sinlge app with configuration for switching views?
// http://forums.enyojs.com/discussion/comment/6928/#Comment_6928
enyo.kind({
	name: "Bootplate.LoginApp",
	kind: "enyo.Application",
	controllers: [{
		name: "login",
		kind: "Bootplate.LoginController"
	}],
  published: {
    view:'Bootplate.LoginView'
  }
});
