/**
* Home Controller
* Common handlers for the authenticated pages
*
* - logout: function()
* - userDetails: function()
*      Params: id
* - userDetailsResult: function(inSender, inEvent)
*      Params: userDetails
* - updateuserInfo: function()
*      Params: User data object
* - userUpdateResult: function(inSender, inEvent)
*      Params: User data object
* - checkNewUsername: function()
*      Params: username
* - checkNewUsernameResult: function(inSender, inEvent)
* - onCheckNewEmail: function()
*       Params: newEmail
* - onCheckNewEmailResult: function(inSender, inEvent)
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.AuthController"
    , kind: "Bootplate.ParentController"
    , handlers: {
        onLogout: 'logout'
        , onUserDetails: 'userDetails'
        , onUserDetailsResult: 'userDetailsResult'
        , onUserUpdate: 'updateuserInfo'
        , onUserUpdateResult: 'userUpdateResult'
        , onCheckNewUsername: 'checkNewUsername'
        , onCheckNewUsernameResult: 'checkNewUsernameResult'
        , onCheckNewEmail: 'checkNewEmail'
        , onCheckNewEmailResult: 'checkNewEmailResult'
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
        clearInterval(mvcApp.sessionIntervalKey);
    }
    , userDetails: function(inSender, inEvent) {
        // load the user's information
console.log('AAAAAAAAAAAAAAAAAA ParentController.userDetails is this ever called?')
        var ajaxUserDetails = new AJAX.UserDetails({owner:this, fireEvent:'onUserDetailsResult'});
        ajaxUserDetails.makeRequest({id:inEvent.id});
    }
    , userDetailsResult: function(inSender, inEvent) {
        if (inEvent.userDetails) {
          mvcApp.data.user = inEvent.userDetails;
        }
    }
    , updateuserInfo: function(inSender, inEvent) {
        // load the user's information
        var ajaxUserUpdate = new AJAX.UserUpdate({owner:this, fireEvent:'onUserUpdateResult'});
        // ajaxUserUpdate.makeRequest({id:mvcApp.data.user._id, username:mvcApp.data.newUsername, name:mvcApp.data.newName, email:mvcApp.data.newEmail, cPassword:mvcApp.data.cPassword, password:mvcApp.data.newPassword, vPassword:mvcApp.data.vPassword});
        ajaxUserUpdate.makeRequest(inEvent);
    }
    , userUpdateResult: function(inSender, inEvent) {
        if (inEvent.userdata) {
            mvcApp.data.user = inEvent.userdata;
            mvcApp.setGravatarEmail(mvcApp.data.user.email);
            var alertTitle = 'Update Successful';
            var alertMessage = 'Your information has been successfully updated.';
            if (mvcApp.data.user.newEmail) {
              alertMessage = alertMessage + ' Check your email account ' + mvcApp.data.user.newEmail + ' and click the link to verify the address.';
              mvcApp.showWarningMessage("Verify your information", alertMessage);
            } else {
              mvcApp.showInfoMessage(alertTitle, alertMessage);
            }
        } else if (inEvent.message) {
            mvcApp.showErrorMessage("Error", inEvent.message);
        }
    }
    // Check Username availability
    , checkNewUsername: function(inSender, inEvent) {
        mvcApp.waterfall('onCheckUsernameResult', {exists:'reset'});
        var ajaxUsernameExists = new AJAX.UsernameExists({owner:this, fireEvent:'onCheckNewUsernameResult'});
        ajaxUsernameExists.makeRequest({username:inEvent.username});
    }
    // Check Username Result
    , checkNewUsernameResult: function(inSender, inEvent) {
        mvcApp.view.body.waterfall('onNewUsernameStatus', inEvent);
        return true;
    }
    // Check Email availability
    , checkNewEmail: function(inSender, inEvent) {
        mvcApp.waterfall('onCheckEmailResult', {exists:'reset'});
        var ajaxEmailExists = new AJAX.EmailExists({owner:this, fireEvent:'onCheckNewEmailResult'});
        ajaxEmailExists.makeRequest({newEmail:inEvent.newEmail});
    }
    // Check Email Result
    , checkNewEmailResult: function(inSender, inEvent) {
        mvcApp.view.body.waterfall('onNewEmailStatus', inEvent);
        return true;
    }
  });
});
















