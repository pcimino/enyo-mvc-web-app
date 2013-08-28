var AAB = {}
/**
* Router class
* Takes events form the URL hashtag, e.g. #/login path gets routed to the login handler
*/
enyo.kind({
    kind: 'enyo.Router'
  , name: 'Bootplate.Routes'
  , routes: [
    { path: '/'
      , 'default': true
      , handler: 'checkLogin'
      , change:'true'
    }
    , { path: '/login'
        , handler: 'login'
        , change:'true'
    }
    , { path: '/loginEvent'
        , handler: 'loginEvent'
        , change:'true'
    }
    , { path: '/authenticate'
        , handler: 'authenticate'
        , change:'true'
    }
    , { path: '/publicBroadcastMessage'
        , handler: 'publicBroadcastMessage'
    }
    , { path: '/userSignup'
        , handler: 'userSignup'
    }
    , { path: '/forgotPassword'
        , handler: 'forgotPassword'
    }
    , { path: '/resendEmail'
        , handler: 'resendEmail'
    }
    , { path: '/logout'
        , handler: 'logout'
        , change:'true'
    }
    , { path: '/deleteUser'
        , handler: 'deleteUser'
    }
    , { path: '/home'
        , handler: 'home'
    }
    , { path: '/homeEvent'
        , handler: 'homeEvent'
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
  , loadBodyContent: function (kindByName, renderFlag, skipWaterfallFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        console.log("loadBodyContent " + kindByName);
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        mvcApp.view.body = owner.createComponent({kind: kindByName, name:'bodyContent'});
        mvcApp.view.body.render();
        owner.$.bodyContent.setupBodyContent(owner, renderFlag);
    }
    // every navigation check the user validation
    // if they try to navigate to a page with out proper access, they get redirected
    if (!skipWaterfallFlag) {mvcApp.waterfall('onIsUserValidated');}
  }
  , logout: function () {
      console.log("logout router");
      //this.loadBodyContent('Bootplate.LoginContent', true);
      mvcApp.waterfall('onLogout');
      return true;
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
    console.log("home router ");
      this.loadBodyContent('Bootplate.HomeContent', false);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , homeEvent: function () {
    console.log("homeEvent router ");
      this.loadBodyContent('Bootplate.HomeContent', false, true);
  }
  , checkLogin: function () {
    //  console.log("checkLogin router");
    // TODO if logged in go to /home, otherwise to /login
      this.loadBodyContent('Bootplate.LoginContent', true);
  }
  , login: function () {
      console.log("login router");
      this.loadBodyContent('Bootplate.LoginContent', true);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , loginEvent: function () {
      console.log("loginEvent router");
      this.loadBodyContent('Bootplate.LoginContent', true, true);
  }
  , userSignup: function () {
      console.log("userSignup router");
      this.loadBodyContent('Bootplate.UserSignupContent', false);
  }
  , forgotPassword: function () {
      console.log("forgotPassword router");
      this.loadBodyContent('Bootplate.VerifyResetRequestContent', false);
  }
  , resendEmail: function () {
      console.log("resendEmail router");
      this.loadBodyContent('Bootplate.VerifyResetRequestContent', false);
  }
  , publicBroadcastMessage: function () {
      console.log("publicBroadcastMessage router");
      this.loadBodyContent('Bootplate.PublicMessageDisplayContent', true);
  }
  , authenticate: function () {
      console.log("authenticate router");
      this.loadBodyContent('Bootplate.HomeContent', true);
  }

});



