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
  ]
  , loadBodyPage: function (kindByName, renderFlag, skipWaterfallFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
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
      mvcApp.data = {};
      mvcApp.waterfall('onLogout');
      return true;
  }
  , adminSystemMessage: function () {
      this.loadBodyPage('Bootplate.AdminSystemMessagePage', false);
  }
  , adminUserManagementInfo: function () {
      this.loadBodyPage('Bootplate.AdminUserManagementPage', false);
  }
  , message: function () {
      this.loadBodyPage('Bootplate.MessageCenterPage', true);
  }
  , sendMessage: function () {
      this.loadBodyPage('Bootplate.SendMessagePage', true);
  }
  , updateMyUserInfo: function () {
      this.loadBodyPage('Bootplate.UpdateMyUserInfoPage', false);
  }
  , updateMyPassword: function () {
      this.loadBodyPage('Bootplate.UpdateMyPasswordPage', false);
  }
  , home: function () {
      this.loadBodyPage('Bootplate.HomePage', false);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , homeEvent: function () {
      this.loadBodyPage('Bootplate.HomePage', false, true);
  }
  , checkLogin: function () {
      this.loadBodyPage('Bootplate.LoginPage', true);
  }
  , login: function () {
      this.loadBodyPage('Bootplate.LoginPage', true);
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , loginEvent: function () {
      this.loadBodyPage('Bootplate.LoginPage', true, true);
  }
  , userSignup: function () {
      this.loadBodyPage('Bootplate.UserSignupPage', false);
  }
  , forgotPassword: function () {
      this.loadBodyPage('Bootplate.VerifyResetRequestPage', false);
  }
  , resendEmail: function () {
      this.loadBodyPage('Bootplate.VerifyResetRequestPage', false);
  }
  , publicBroadcastMessage: function () {
      this.loadBodyPage('Bootplate.PublicMessageDisplayPage', true);
  }
  , authenticate: function () {
      this.loadBodyPage('Bootplate.HomePage', true);
  }
  , contactPublic: function () {
      this.loadBodyPage('Bootplate.ContactPage', true);
  }
});













