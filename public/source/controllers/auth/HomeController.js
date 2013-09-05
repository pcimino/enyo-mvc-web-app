/**
* Home Controller
* Common handlers for the authenticated pages
*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.HomeController"
    , kind: "Bootplate.ParentController"
    , handlers: {
        onLogout: 'logout'
        , onUserDetails: 'userDetails'
    }
    // Logout
    , logout: function () {
        console.log("logout handler");
        // clear out the session data
        mvcApp.data = {};
        var ajaxLogout = new AJAX.Logout({owner:this, fireEvent:'onIsUserValidated'});
        ajaxLogout.makeRequest({})
    }
    , userDetails: function () {
        // load the user's information
        var ajaxUserDetails = new AJAX.UserDetails({owner:this, fireEvent:'onUserDetails'});
        ajaxUserDetails.makeRequest({id:mvcApp.data.userData._id});
    }
    , userDetailsResult: function (inSender, inEvent) {
        if (inEvent.userDetails) {
          mvcApp.data.userDetails = inEvent.userDetails;
        }
    }
  });
});



