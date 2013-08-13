// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
enyo.kind({
  name: "Bootplate.PublicController"
  , kind: "Bootplate.ParentController"
  , autoLoad: true
  , published: {
     ajaxBaseURL: 'http://localhost'
     , ajaxBasePort: '3000'
  }
  , dbAvailable: false
  , handlers: {
     onLogin: 'login'
     , onLoginResult: 'loginResult'
     , onCheckUsername: 'checkUsername'
     , onCheckUsernameResult: 'checkUsernameResult'
     , onForgotPassword: 'forgotPassword'
     , onUserSignup: 'userSignup'
     , onCheckUsername: 'checkUsername'
     , onCheckDB: 'checkDB'
     , onCheckDBResult: 'checkDBResult'
  }
  // Login
  , login: function () {
      var ajaxLogin = new AJAX.Login({owner:this, fireEvent:'onLoginResult'});
      ajaxLogin.makeRequest({username:mvcApp.data.username , password:mvcApp.data.password});
  }
  , loginResult: function (inSender, inEvent) {
      if (inEvent.authenticated) {
        mvcApp.data.userData = inEvent.userdata;
        mvcApp.data.username = '';
        mvcApp.data.password = '';
        // display the authenticated home page
        mvcApp.setAuthView();
      } else {
        mvcApp.publicView.showMessage(inEvent.message);
      };
  }
  // ForgotPassword
  , forgotPassword: function () {
    console.log("PublicController forgotPassword");
    //new Bootplate.ForgotPasswordApp({name: "forgotPasswordApp"}).renderInto(document.body);
    console.log("done");
  }
  // Check Username availability
  , checkUsername: function () {
      mvcApp.waterfall('onCheckUsernameResult', {exists:'reset'});
      var ajaxUsernameExists = new AJAX.UsernameExists({owner:this, fireEvent:'onCheckUsernameResult'});
      ajaxUsernameExists.makeRequest({username:mvcApp.data.username});
  }
  // Check Username Result
  , checkUsernameResult: function (inSender, inEvent) {
      mvcApp.view.body.waterfall('onUsernameStatus', inEvent);
      return true;
  }
  // UserSignup
  , userSignup: function () {
    console.log("PublicController userSignup");
    //new Bootplate.UserSignupApp({name: "userSignupApp"}).renderInto(document.body);
  }
  // check database connection
  , checkDB: function (inSender, inEvent) {
      var checkDB = new JSONP.CheckDB({owner:this, fireEvent:'onCheckDBResult'});
      checkDB.makeRequest({});
  }
  , checkDBResult: function (inSender, inEvent) {
      console.log("checkDBResult");
      if (!inEvent.dbAvailable) {
        mvcApp.controllers.routes.trigger({location:'/systemUnavailable'});
        mvcApp.publicView.showMessage("Cannot connect to the Database.");
      } else {
        // mvcApp.publicView.showMessage("Database is up.");
      }
  }
});