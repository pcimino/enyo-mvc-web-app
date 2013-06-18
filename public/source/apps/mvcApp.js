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
		  name: "publicRoutes",
		  kind: "Bootplate.PublicRoutes"
	  }
    , {
		  name: "authRoutes",
		  kind: "Bootplate.AuthRoutes"
	  }
    , {
		  name: "adminRoutes",
		  kind: "Bootplate.AdminRoutes"
	  }
  ]
  , view:'Bootplate.PublicView'
  , published: {
    publicView:''
    , authenticatedView:''
  }
  , setView: function(assignedViewObj) {
    mvcApp.view = assignedViewObj;
    mvcApp.render();
  }
  , create: function() {
    this.setPublicView(new Bootplate.PublicView({name: "PublicView"}));
    this.setAuthenticatedView(new Bootplate.HomeView({name: "HomeView"}));
  }
});
