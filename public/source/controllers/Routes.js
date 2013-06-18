enyo.kind({
	kind: 'enyo.Router'
  , name: 'Bootplate.Routes'
  , routes: [
    { path: '/',
		  'default': true,
		   handler: 'login'
	  }
    , { path: '/login',
		    handler: 'loginNav'
	  }
    , { path: '/systemUnavailable',
		    handler: 'systemUnavailable'
	  }
    , { path: '/userSignup',
		    handler: 'userSignup'
	  }
    , { path: '/forgotPassword',
		    handler: 'forgotPassword'
	  }
    , { path: '/logout',
		    handler: 'logout'
	  }
      , { path: '/deleteUser'
        , handler: 'deleteUser'
	    }
    , { path: '/logout'
		, handler: 'logout'
	  }
    , { path: '/home'
        , 'default': true
        , handler: 'home'
	  }
  ]
	,	handle: function (path) {
      this.inherited(arguments);
    var stripPath = path;
    if (path.indexOf('?') > 0) {
      stripPath = path.slice(0, path.indexOf('?'));
      console.log(stripPath);
    }

			// fast track is to check against static routes first
			if (this._handle_static(stripPath)) {
				return;
			}
			// then we check against dynamic paths in this simple scheme
			else if (this._handle_dynamic(stripPath)) {
				/* do nothing */
			}
			else {
				this._handle_default(stripPath);
			}
		}
  // test to see if we're in the correct controller
  // if not, redirect tot he correct route
  , verifyRoute: function() {
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
  }
  , login: function () {
      console.log("login router");
      if (this.verifyRoute()) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
        owner.$.bodyContent.setupBodyContent(owner, false);
      }
  }
  , loginNav: function () {
      console.log("loginNav router");
      if (this.verifyRoute()) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
        owner.$.bodyContent.setupBodyContent(owner, true);
      }
	}
  , userSignup: function () {
      console.log("userSignup router");
      if (this.verifyRoute()) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: 'Bootplate.UserSignupContent'});
        owner.$.bodyContent.setupBodyContent(owner);
      } else {
        mvcApp.$.routes.trigger({location:'/loginNav'})
      }
	}
  , forgotPassword: function () {
      console.log("forgotPassword router");

      if (this.verifyRoute()) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: 'Bootplate.ForgotPasswordContent'});
        owner.$.bodyContent.setupBodyContent(owner);
      } else {
        mvcApp.$.routes.handle('/login');
      }
  }
  , logout: function () {
      console.log("logout router");
      mvcApp.$.routes.trigger({location:'/login'});
  }
  , systemUnavailable: function () {
      console.log("systemUnavailable router");
      if (this.verifyRoute()) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: 'Bootplate.SystemUnavailableContent'});
        owner.$.bodyContent.setupBodyContent(owner, true);
      }
  }
  , deleteUser: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
    console.log("deleteUser router");
    if (this.verifyRoute()) {
      var owner = mvcApp.view.$.bodyContainer;
      owner.destroyClientControls();
      owner.createComponent({name:'bodyContent', kind: 'Bootplate.DeleteUserContent'});
      owner.$.bodyContent.setupBodyContent(owner, false);
    }
	}
	, logout: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
        console.log("logout router");
        mvcApp.setView(mvcApp.getPublicView());
	}
  , home: function () {
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
