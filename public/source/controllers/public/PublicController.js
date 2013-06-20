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
  , data: {}
  , handlers: {
     onLogin: 'login'
     , onForgotPassword: 'forgotPassword'
     , onUserSignup: 'userSignup'
     , onCheckDB: 'checkDB'
     , onCheckDBResult: 'checkDBResult'
  }
  // Login
  , login: function () {
    console.log("login");
    mvcApp.setView(mvcApp.getAuthView());
    console.log("done");
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
    var checkDB = new JSONP.CheckDB({method:'GET', rest:'/db', owner:this, fireEvent:'onCheckDBResult'});
    checkDB.makeRequest({});
  }
  , checkDBResult: function (inSender, inEvent) {
      console.log("checkDBResult");
      if (!inEvent.dbAvailable) {
        mvcApp.controllers.routes.trigger({location:'/systemUnavailable'});
      }
  }
});