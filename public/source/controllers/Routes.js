/**
* Router kind
* Takes events form the URL hashtag, e.g. #/login path gets routed to the login handler
*
* TODO Is there an equivalent to routing with an argument. I could strip args off in the pre handler, but this
* makes the app interdependent on specialized server code
*
* - loadBodyPage(kindByName, renderFlag, skipWaterfallFlag)
* - logout()
* - message()
* - systemMessage()
* - userManagementInfo()
* - updateMyUserInfo()
* - updateMyPassword()
* - home()
* - homeEvent()
* - checkLogin()
* - login()
* - loginEvent()
* - userSignup()
* - forgotPassword()
* - resendEmail()
* - publicBroadcastMessage()
* - authenticate()
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
    , { path: '/message'
        , handler: 'message'
    }
    , { path: '/sendMessage'
        , handler: 'sendMessage'
    }
    , { path: '/adminSystemMessage'
        , handler: 'adminSystemMessage'
    }
    , { path: '/home'
        , handler: 'home'
    }
    , { path: '/homeEvent'
        , handler: 'homeEvent'
    }
    , { path: '/adminUserManagementInfo'
        , handler: 'adminUserManagementInfo'
    }
    , { path: '/updateMyUserInfo'
        , handler: 'updateMyUserInfo'
    }
    , { path: '/updateMyPassword'
        , handler: 'updateMyPassword'
    }
    , { path: '/contactPublic'
        , handler: 'contactPublic'
    }
    , { path: '/developer'
        , handler: 'developer'
    }
  ]
  , loadBodyPage: function (kindByName, renderFlag, skipWaterfallFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        console.log("loadBodyPage " + kindByName);
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        mvcApp.view.body = owner.createComponent({kind: kindByName, name:'bodyPage'});
        mvcApp.view.body.render();
        owner.$.bodyPage.setupPageBody(owner, renderFlag);
    }
    // every navigation check the user validation
    // if they try to navigate to a page with out proper access, they get redirected
    if (!skipWaterfallFlag) {mvcApp.waterfall('onIsUserValidated');}
  }
  , logout: function () {
      console.log("logout router");
      mvcApp.data = {};
      mvcApp.waterfall('onLogout');
      return true;
  }
  , adminSystemMessage: function () {
      console.log("adminSystemMessage router");
      this.loadBodyPage('Bootplate.AdminSystemMessagePage', false);
  }
  , adminUserManagementInfo: function () {
      console.log("userManagementInfo router");
      this.loadBodyPage('Bootplate.AdminUserManagementPage', false);
  }
  , message: function () {
      console.log("message router");
      this.loadBodyPage('Bootplate.MessageCenterPage', true);
  }
  , sendMessage: function () {
      console.log("sendMessage router");
      this.loadBodyPage('Bootplate.SendMessagePage', true);
  }
  , updateMyUserInfo: function () {
      console.log("updateMyUserInfo router");
      this.loadBodyPage('Bootplate.UpdateMyUserInfoPage', false);
  }
  , updateMyPassword: function () {
      console.log("updateMyPassword router");
      this.loadBodyPage('Bootplate.UpdateMyPasswordPage', false);
  }
  , home: function () {
    console.log("home router ");
      this.loadBodyPage('Bootplate.HomePage', false);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , homeEvent: function () {
    console.log("homeEvent router ");
      this.loadBodyPage('Bootplate.HomePage', false, true);
  }
  , checkLogin: function () {
    //  console.log("checkLogin router");
    // TODO if logged in go to /home, otherwise to /login
      this.loadBodyPage('Bootplate.LoginPage', true);
  }
  , login: function () {
      console.log("login router");
      this.loadBodyPage('Bootplate.LoginPage', true);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , loginEvent: function () {
      console.log("loginEvent router");
      this.loadBodyPage('Bootplate.LoginPage', true, true);
  }
  , userSignup: function () {
      console.log("userSignup router");
      this.loadBodyPage('Bootplate.UserSignupPage', false);
  }
  , forgotPassword: function () {
      console.log("forgotPassword router");
      this.loadBodyPage('Bootplate.VerifyResetRequestPage', false);
  }
  , resendEmail: function () {
      console.log("resendEmail router");
      this.loadBodyPage('Bootplate.VerifyResetRequestPage', false);
  }
  , publicBroadcastMessage: function () {
      console.log("publicBroadcastMessage router");
      this.loadBodyPage('Bootplate.PublicMessageDisplayPage', true);
  }
  , authenticate: function () {
      console.log("authenticate router");
      this.loadBodyPage('Bootplate.HomePage', true);
  }
  , contactPublic: function () {
      console.log("contactPublic router");
      this.loadBodyPage('Bootplate.ContactPage', true);
  }
  , developer: function () {
      this.loadBodyPage('Bootplate.DeveloperPage', true);
  }

});













