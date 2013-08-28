// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods

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
     , onCheckAuthResult: 'checkAuthResult'
  }
  // see if the user is already logged in
  , isUserValidated: function (inSender, inEvent) {
      this.auth = inEvent.auth;
      this.role = inEvent.role;

      var checkAuth = new JSONP.CheckAuth({owner:this, fireEvent:'onIsUserValidatedResult'});
      checkAuth.makeRequest({});

      this.checkAdmin();
  }
  , isUserValidatedResult: function (inSender, inEvent) {
      if (inEvent.response == '200') {
        // user is validated
        if (!this.auth) {
          // user is logged in but tried to go to a public page, redirect to home
          mvcApp.controllers.routes.trigger({location:'/home'});
        }

        //TODO need to handle ADMIN rights
      } else {
        if (this.auth) {
          // user is not logged in but tried to access am authorized page
          mvcApp.controllers.routes.trigger({location:'/login'});
        }
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



