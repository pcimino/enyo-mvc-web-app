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
      var checkDBUrl = this.ajaxBaseURL + ':' + this.ajaxBasePort + '/db';
      console.log(checkDBUrl);
      var jsonp = new enyo.JsonpRequest(
        { url: checkDBUrl
          , method: "GET"
        });

      // attach responders to the transaction object
      jsonp.response(this, "processResponse");
      jsonp.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      jsonp.go({});
	}
	, processError: function(inSender, inResponse) {
      console.log('processError');
      mvcApp.$.publicRoutes.trigger({location:'/systemUnavailable'});
	}
	, processResponse: function(inSender, inResponse) {
      console.log('processResponse');
      if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
        mvcApp.view.dbAvailable();
        // this is the right way: Set the value, which the view should be bound to and looking for changes
        this.set("dbAvailable", true);
      } else {
        mvcApp.view.dbNotAvailable();
        this.set("dbAvailable", false);
        mvcApp.$.publicRoutes.trigger({location:'/systemUnavailable'});
      }
      //console.log(JSON.stringify(inResponse, null, 2));
	}
});