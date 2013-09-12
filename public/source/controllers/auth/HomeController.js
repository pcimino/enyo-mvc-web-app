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
        , onUserUpdate: 'updateuserInfo'
        , onUserUpdateResult: 'userUpdateResult'
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
            mvcApp.setPublicView();
		    }, 300);
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
    , updateuserInfo: function() {
        // load the user's information
        var ajaxUserUpdate = new AJAX.UserUpdate({owner:this, fireEvent:'onUserUpdateResult'});
        ajaxUserUpdate.makeRequest({id:mvcApp.data.user._id, username:mvcApp.data.newUsername, name:mvcApp.data.newName, email:mvcApp.data.newEmail, cPassword:mvcApp.data.cPassword, password:mvcApp.data.newPassword, vPassword:mvcApp.data.vPassword});
    }
    , userUpdateResult: function(inSender, inEvent) {
        if (inEvent.userdata) {
          mvcApp.data.user = inEvent.userdata;
          mvcApp.setGravatarEmail(mvcApp.data.user.email);
          var alertMessage = 'Your information has been successfully updated.';
          if (mvcApp.data.user.newEmail) {
            alertMessage = alertMessage + ' Check your email account ' + mvcApp.data.user.newEmail + ' and click the link to verify the address.';
          }
          mvcApp.showMessage(alertMessage);
        } else if (inEvent.message) {
          mvcApp.showMessage(inEvent.message);
        }
    }
  });
});







