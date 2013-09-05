// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
var AAAB = {}
/**
* Parent Controller
*/
enyo.kind({
  name: "Bootplate.ParentController"
  , kind: "enyo.Controller"
  , autoLoad: true
  , published: {
     ajaxBaseURL: 'http://localhost'
     , ajaxBasePort: '3000'
     , auth : false
     , role : 'user'
  }
  // Will this work or will the subclsses overwrite?
  , handlers: {
     onIsUserValidated: 'isUserValidated'
     , onIsUserValidatedResult: 'isUserValidatedResult'
     , onCheckAdmin: 'checkAdmin'
     , onCheckAdminResult: 'checkAdminResult'
     , onReloadUser: 'reloadUser'
  }
  // see if the user is already logged in
  //TODO Causing a loop, since the result can cause the /home or /login call, which calls routes which calls this...hmmmmm
  , isUserValidated: function (inSender, inEvent) {
      this.auth = inEvent.auth;
      this.role = inEvent.role;

      var checkAuth = new JSONP.CheckAuth({owner:this, fireEvent:'onIsUserValidatedResult'});
      checkAuth.makeRequest({});
  }
  , isUserValidatedResult: function (inSender, inEvent) {
      if (inEvent.response == '200') {
        // user is validated
        if (!this.auth) {
          // user is logged in but tried to go to a public page, redirect to home
          // this checks the bodyContent for the authFlag, if both conditions match then no need to switch views
          if (mvcApp.isAuthView() != true) {
            mvcApp.setAuthView();
            mvcApp.controllers.routes.trigger({location:'/homeEvent'});
          }
          // retrieve and reload the users data
          if (!mvcApp.data.user) {
            // data was cleared, reload
            var userDetails = new AJAX.UserDetails({owner:this, fireEvent:'onReloadUser'});
            userDetails.makeRequest({username: inEvent.username});
          } else {
            this.checkAdmin();
          }
        }
      } else {
        if (this.auth) {
          // user is not logged in but tried to access am authorized page
          mvcApp.setPublicView();
          mvcApp.controllers.routes.trigger({location:'/loginEvent'});
        }
      }
  }
  , reloadUser: function (inSender, inEvent) {
      if (inEvent.userdata) {
        mvcApp.data.user = inEvent.userdata;
        mvcApp.username = mvcApp.data.user.username;
        mvcApp.data.username = '';
        mvcApp.data.password = '';
        mvcApp.setGravatarEmail(mvcApp.data.user.email);
    console.log("Fire onSetupGravatar")
        mvcApp.authView.waterfall('onSetupGravatar');
        // reload admin rights
        var checkAdmin = new JSONP.CheckAdmin({owner:this, fireEvent:'onCheckAdminResult'});
        checkAdmin.makeRequest({});
      }

  }
  // check database connection
  , checkAdmin: function (inSender, inEvent) {
      var checkAdmin = new JSONP.CheckAdmin({owner:this, fireEvent:'onCheckAdminResult'});
      checkAdmin.makeRequest({});
  }
  , checkAdminResult: function (inSender, inEvent) {
      if (inEvent.response == '200') {
        mvcApp.setAdminFlag(true);
      } else {
        mvcApp.setAdminFlag(false);
      }
  }
});






