enyo.kind({
	kind: 'enyo.Router',
	name: 'Bootplate.PublicRoutes',
	routes: [
      {path: '/',
		'default': true,
		handler: 'login'
	  }
      ,{path: '/login',
		handler: 'loginNav'
	  }
      , {path: '/userSignup',
		handler: 'userSignup'
	  }
      , {path: '/forgotPassword',
		handler: 'forgotPassword'
	  }
      , {path: '/',
		handler: 'home'
	  }
      , {path: '/logout',
		handler: 'logout'
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
	login: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("login router");
    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
      owner.$.bodyContent.setupBodyContent(owner, false);
    }
	},
	loginNav: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("loginNav router");
    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
      owner.$.bodyContent.setupBodyContent(owner, true);
    }
	},
	userSignup: function () {
		// Still need to figure out how this wiring works
        // BootPlate.UserSignupController.setRoute(this.current);
    console.log("userSignup router");
    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.UserSignupContent'});
      owner.$.bodyContent.setupBodyContent(owner);
    } else {
      mvcApp.$.routes.trigger({location:'/login'})
    }
	},
	forgotPassword: function () {
    console.log("forgotPassword router");

    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.ForgotPasswordContent'});
      owner.$.bodyContent.setupBodyContent(owner);
    } else {
      mvcApp.$.routes.handle('/login')
    }
	},
	logout: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("logout router");
    mvcApp.$.routes.trigger({location:'/login'})
	}
});
