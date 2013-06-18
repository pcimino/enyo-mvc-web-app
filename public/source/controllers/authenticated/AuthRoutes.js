enyo.kind({
	kind: 'enyo.Router',
	name: 'Bootplate.AuthRoutes',
	routes: [
      {path: '/logout',
		handler: 'logout'
	  }
      , {
		path: '/home',
		'default': true,
		handler: 'home'
	  }
    ],
  // test to see if we're in the correct controller
  // if not, redirect tot he correct route
  verifyRoute: function() {
    //TODO Need to figure out paths in auth versus public
    // maybe the contxt in the Routes controller???
//    if (mvcApp) {
      // active session
//    } else
    {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        return true;
      } else {
//        mvcApp.$.routes.trigger({location:'/login'})
      }
    }
    return false;
  },
 
	logout: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("logout router");
    if (this.verifyPublicRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
      owner.$.bodyContent.setupBodyContent(owner, false);
    }
	},
	home: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("home router");
    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
      owner.$.bodyContent.setupBodyContent(owner, false);
    }
	}
});
