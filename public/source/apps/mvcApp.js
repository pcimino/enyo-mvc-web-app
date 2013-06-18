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
  , published: {
      publicView:''
      , authView:''
  }
  , setView: function(assignedViewObj) {
    mvcApp.view = assignedViewObj;
    mvcApp.render();
  }
  , create: function() {
    this.setPublicView(new Bootplate.PublicView({name: "publicView"}));
    this.setAuthView(new Bootplate.HomeView({name: "homeView"}));
  }
});
