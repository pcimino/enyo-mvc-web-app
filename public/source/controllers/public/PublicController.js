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
     , onUserSignupResult: 'userSignupResult'
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
        console.log(inEvent.message);
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
      if (!inEvent.exists && mvcApp.data.createNewUser) {
        mvcApp.data.createNewUser = '';
        // create the user
        var ajaxUserSignup = new AJAX.UserSignup({owner:this, fireEvent:'onUserSignupResult'});
        ajaxUserSignup.makeRequest({username:mvcApp.data.username, name:mvcApp.data.name, email:mvcApp.data.email, password:mvcApp.data.password, vPassword:mvcApp.data.vPassword});
      }
      mvcApp.view.body.waterfall('onUsernameStatus', inEvent);
      return true;
  }
  // UserSignup
  , userSignup: function () {
    console.log("PublicController userSignup");
      mvcApp.data.createNewUser = true;
      this.checkUsername();
  }
  // UserSignupResult
  , userSignupResult: function (inSender, inEvent) {
    console.log("PublicController UserSignupResult");
      if (inEvent.response == '200') {
      console.log("Success");
      mvcApp.data.createNewUser = '';
      mvcApp.data.username = '';
      mvcApp.data.password = '';
      mvcApp.data.vPassword = '';
      } else {
        console.log("Failed " + inEvent.message);
        mvcApp.showMessage(inEvent.message);
      }

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
        mvcApp.showMessage("Cannot connect to the Database.");
      } else {
        // mvcApp.showMessage("Database is up.");
      }
  }
});