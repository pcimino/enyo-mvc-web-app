enyo.kind({
	kind: 'enyo.Router',
	name: 'Bootplate.AdminRoutes',
	routes: [
      {path: '/deleteUser',
		handler: 'deleteUser'
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
 
	deleteUser: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("deleteUser router");
    if (this.verifyPublicRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.DeleteUserContent'});
      owner.$.bodyContent.setupBodyContent(owner, false);
    }
	}
});
