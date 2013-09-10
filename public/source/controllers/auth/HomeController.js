/**
* Home Controller
* Common handlers for the authenticated pages
*
* - logout: function()
* - userDetails: function()
* - userDetailsResult: function(inSender, inEvent)
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.HomeController"
    , kind: "Bootplate.ParentController"
    , handlers: {
        onLogout: 'logout'
        , onUserDetails: 'userDetails'
    }
    // Logout
    , logout: function() {
        console.log("logout handler");
        // clear out the session data
        mvcApp.data = {};
        var ajaxLogout = new AJAX.Logout({owner:this, fireEvent:'onIsUserValidated'});
        ajaxLogout.makeRequest({});
      	setTimeout(function() {
            // Kludgey: Timing issue, the logout occurs but the redirect checks logged in status prior to
            // logout completion, so make a delayed request to go back to login
            mvcApp.controllers.routes.trigger({location:'/login'});
		    }, 1000);
    }
    , userDetails: function() {
        // load the user's information
        var ajaxUserDetails = new AJAX.UserDetails({owner:this, fireEvent:'onUserDetails'});
        ajaxUserDetails.makeRequest({id:mvcApp.data.userData._id});
    }
    , userDetailsResult: function(inSender, inEvent) {
        if (inEvent.userDetails) {
          mvcApp.data.userDetails = inEvent.userDetails;
        }
    }
  });
});





