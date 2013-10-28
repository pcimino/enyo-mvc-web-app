/**
* Router kind
* Takes events form the URL hashtag, e.g. #/login path gets routed to the login handler
*
* TODO Is there an equivalent to routing with an argument. I could strip args off in the pre handler, but this
* makes the app interdependent on specialized server code
*
* - loadBodyPage(kindByName, skipWaterfallFlag)
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
    , { path: '/adminTermsAndConditions'
        , handler: 'adminTermsAndConditions'
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
  , loadBodyPage: function (kindByName, skipWaterfallFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        mvcApp.view.body = owner.createComponent({kind: kindByName, name:'bodyPage'});
        mvcApp.view.body.render();
        owner.$.bodyPage.setupPageBody(owner);
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
      this.loadBodyPage('Bootplate.AdminSystemMessagePage');
  }
  , adminTermsAndConditions: function () {
      this.loadBodyPage('Bootplate.AdminTermsAndConditionsPage');
  }
  , adminUserManagementInfo: function () {
      this.loadBodyPage('Bootplate.AdminUserManagementPage');
  }
  , message: function () {
      this.loadBodyPage('Bootplate.MessageCenterPage');
  }
  , sendMessage: function () {
      this.loadBodyPage('Bootplate.SendMessagePage');
  }
  , updateMyUserInfo: function () {
      this.loadBodyPage('Bootplate.UpdateMyUserInfoPage');
  }
  , updateMyPassword: function () {
      this.loadBodyPage('Bootplate.UpdateMyPasswordPage');
  }
  , home: function () {
      this.loadBodyPage('Bootplate.HomePage');
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , homeEvent: function () {
      this.loadBodyPage('Bootplate.HomePage', true);
  }
  , checkLogin: function () {
      this.loadBodyPage('Bootplate.LoginPage');
  }
  , login: function () {
      this.loadBodyPage('Bootplate.LoginPage');
  }
  // this is triggered by the isUserValidated event, purpose is to avoid loops
  , loginEvent: function () {
      this.loadBodyPage('Bootplate.LoginPage', true);
  }
  , userSignup: function () {
      this.loadBodyPage('Bootplate.UserSignupPage');
  }
  , forgotPassword: function () {
      this.loadBodyPage('Bootplate.VerifyResetRequestPage');
  }
  , resendEmail: function () {
      this.loadBodyPage('Bootplate.VerifyResetRequestPage');
  }
  , publicBroadcastMessage: function () {
      this.loadBodyPage('Bootplate.PublicMessageDisplayPage');
  }
  , authenticate: function () {
      this.loadBodyPage('Bootplate.HomePage');
  }
  , contactPublic: function () {
      this.loadBodyPage('Bootplate.ContactPage');
  }
  , developer: function () {
      this.loadBodyPage('Bootplate.DeveloperPage');
  }

});















