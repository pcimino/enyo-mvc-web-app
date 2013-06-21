// https://github.com/tastejs/todomvc/tree/gh-pages/labs/dependency-examples/enyo_backbone/js
//
// Maybe 2.3 will make this a sinlge app with configuration for switching views?
// http://forums.enyojs.com/discussion/comment/6928/#Comment_6928
enyo.kind({
	name: "Bootplate.MvcApp",
	kind: "enyo.Application",
	controllers: [
    {
		  name: "login",
		  kind: "Bootplate.PublicController"
	  }
    , {
		  name: "routes",
		  kind: "Bootplate.Routes"
	  }
  ]
  , view:'Bootplate.PublicView'
  , publicView:''
  , authView:''
  , create: function() {
    this.publicView =new Bootplate.PublicView({name: "publicView"});
    this.authView = new Bootplate.HomeView({name: "homeView"});
  }
  , setPublicView: function() {
    mvcApp.view = this.publicView;
    mvcApp.render();
    window.location.hash = '/login'
  }
  , setAuthView: function() {
    mvcApp.view = this.authView;
    mvcApp.render();
    window.location.hash = '/home'
  }
});
