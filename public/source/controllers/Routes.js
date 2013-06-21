enyo.kind({
	kind: 'enyo.Router'
  , name: 'Bootplate.Routes'
  , routes: [
    { path: '/',
		  'default': true,
		   handler: 'checkLogin', change:'true'
	  }
    , { path: '/login',
		    handler: 'login', change:'true'
	  }
    , { path: '/authenticate',
		    handler: 'authenticate', change:'true'
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
    , { path: '/home'
        , handler: 'home'
	  }
    , { path: '/readUserInfo'
        , handler: 'readUserInfo'
	  }
    , { path: '/readUserList'
        , handler: 'readUserList'
	  }
    , { path: '/updateUserInfo'
        , handler: 'updateUserInfo'
	  }
  ]
	,	loadBodyContent: function (kindByName, renderFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: kindByName});
        owner.$.bodyContent.setupBodyContent(owner, renderFlag);
      }
  }
  , logout: function () {
      console.log("logout router");
      this.loadBodyContent('Bootplate.LoginContent', true);
  }
  , deleteUser: function () {
      console.log("deleteUser router");
      this.loadBodyContent('Bootplate.DeleteUserContent', false);
	}
	, readUserInfo: function () {
		  console.log("readUserInfo router");
      this.loadBodyContent('Bootplate.ReadUserInfoContent', false);
	}
	, readUserList: function () {
		  console.log("readUserList router");
      this.loadBodyContent('Bootplate.ReadUserListContent', true);
	}
	, updateUserInfo: function () {
		  console.log("updateUserInfo router");
      this.loadBodyContent('Bootplate.UpdateUserInfoContent', false);
	}
  , home: function () {
		  console.log("home router");
      this.loadBodyContent('Bootplate.HomeContent', false);
	}
  , checkLogin: function () {
      console.log("checkLogin router");
    // TODO if logged in go to /home, otherwise to /login
      this.loadBodyContent('Bootplate.LoginContent', true);
  }
  , login: function () {
      console.log("login router");
      this.loadBodyContent('Bootplate.LoginContent', true);
	}
  , userSignup: function () {
      console.log("userSignup router");
      this.loadBodyContent('Bootplate.UserSignupContent', false);
	}
  , forgotPassword: function () {
      console.log("forgotPassword router");
      this.loadBodyContent('Bootplate.ForgotPasswordContent', false);
  }
  , systemUnavailable: function () {
      console.log("systemUnavailable router");
      this.loadBodyContent('Bootplate.SystemUnavailableContent', true);
  }
  , authenticate: function () {
      console.log("authenticate router");
      this.loadBodyContent('Bootplate.HomeContent', true);
  }

});
