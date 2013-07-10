var AAA= {}
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
     , onForgotPassword: 'forgotPassword'
     , onUserSignup: 'userSignup'
     , onCheckDB: 'checkDB'
     , onCheckDBResult: 'checkDBResult'
     , onLoginResult: 'loginResult'
     , onUserDetails: 'userDetails'
  }
  // Login
  , login: function () {
    console.log("login " + mvcApp.data.username + ":" + mvcApp.data.password);
    var ajaxLogin = new AJAX.Login({owner:this, fireEvent:'onLoginResult'});
    ajaxLogin.makeRequest({username:mvcApp.data.username , password:mvcApp.data.password});

    console.log("done");
  }
  , loginResult: function (inSender, inEvent) {
      console.log("loginResult");
      if (inEvent.authenticated) {
        mvcApp.data.userData = inEvent.userdata;
        mvcApp.data.username = '';
        mvcApp.data.password = '';
        // load the user's information
        // var ajaxUserDetails = new AJAX.UserDetails({owner:this, fireEvent:'onUserDetails'});
        // ajaxUserDetails.makeRequest({id:mvcApp.data.userData._id});

        // display the authenticated home page
        mvcApp.setAuthView();
      } else {
        mvcApp.publicView.showMessage(inEvent.message);
      }
  }
  , userDetails: function (inSender, inEvent) {
      console.log("userDetails ");
    if (inEvent.userDetails) {
      mvcApp.data.userDetails = inEvent.userDetails;
    }
  }
  // ForgotPassword
  , forgotPassword: function () {
    console.log("forgotPassword");
    //new Bootplate.ForgotPasswordApp({name: "forgotPasswordApp"}).renderInto(document.body);
    console.log("done");
  }
  // UserSignup
  , userSignup: function () {
    console.log("userSignup");
    //new Bootplate.UserSignupApp({name: "userSignupApp"}).renderInto(document.body);
    console.log("done");
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
        mvcApp.publicView.showMessage("Database is up.");
      }
  }
});