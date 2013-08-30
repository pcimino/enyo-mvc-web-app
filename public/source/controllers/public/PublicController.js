var AAA={}
/**
* Public Controller
* Common handlers for the public (unauth) pages
*/
enyo.kind({
  name: "Bootplate.PublicController"
  , kind: "Bootplate.ParentController"
  , handlers: {
     onLogin: 'login'
     , onLoginResult: 'loginResult'
     , onCheckUsername: 'checkUsername'
     , onCheckUsernameResult: 'checkUsernameResult'
     , onForgotPassword: 'forgotPassword'
     , onForgotPasswordResult: 'forgotPasswordResult'
     , onResendEmail: 'resendEmail'
     , onResendEmailResult: 'resendEmailResult'
     , onUserSignup: 'userSignup'
     , onUserSignupResult: 'userSignupResult'
     , onCheckUsername: 'checkUsername'
     , onCheckDB: 'checkDB'
     , onCheckDBResult: 'checkDBResult'
  }
  // Login
  , login: function () {
      var ajaxLogin = new AJAX.Login({owner:this, fireEvent:'onLoginResult'});
    // ensure unique request  by adding a random number
    // TODO can probably remove this, trying to figure out CORS issue and multiple posts with same data might be masking something
    ajaxLogin.makeRequest({username:mvcApp.data.username , password:mvcApp.data.password, rndNo : Math.random()});
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
    var jsonpResetPassword = new JSONP.ResetPassword({owner:this, fireEvent:'onForgotPasswordResult'});
    jsonpResetPassword.makeRequest({username:mvcApp.data.username});
  }
  // Forgot Passsword Result
  , forgotPasswordResult: function (inSender, inEvent) {
    console.log("forgotPasswordResult")
    if (inEvent.email && inEvent.email.length) {
      mvcApp.broadcast.displayClass = 'success';

      var emailAddr = inEvent.email;
      if (inEvent.newEmail) {
        emailAddr = inEvent.email + ' and ' + inEvent.newEmail;
      }
      mvcApp.broadcast.message = "We reset your password and sent you an email. Please check your " + emailAddr + " email account to verify this address. You will then be able to login.";
      mvcApp.data.username = '';
      mvcApp.controllers.routes.trigger({location:'/publicBroadcastMessage'});
    } else {
      mvcApp.showMessage("We had trouble sending your email. Please try again later or contact your system administrator.");
    }
  }
  // Resend  Verification Email
  , resendEmail: function () {
      var jsonpResendVerificationEmail = new JSONP.ResendVerificationEmail({owner:this, fireEvent:'onResendEmailResult'});
      jsonpResendVerificationEmail.makeRequest({username:mvcApp.data.username});
  }
  // Resend  Verification Email Result
  , resendEmailResult: function (inSender, inEvent) {
    console.log("PublicController resendEmailResult ");
    if (inEvent.email && inEvent.email.length) {
      mvcApp.broadcast.displayClass = 'success';
      var emailAddr = inEvent.email;
      if (inEvent.newEmail) {
        emailAddr = inEvent.email + ' and ' + inEvent.newEmail;
      }
      mvcApp.broadcast.message = "We have resent your verification email. Please check your " + emailAddr + " email account to verify this address. You will then be able to login.";
      mvcApp.data.username = '';
      mvcApp.controllers.routes.trigger({location:'/publicBroadcastMessage'});
    } else {
      //mvcApp.showMessage("We had trouble sending your email. Please try again later or contact your system administrator.");
    mvcApp.showMessage("We had trouble sending your email. Please try again later or contact your system administrator.");
    }
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
      if (inEvent.userdata && inEvent.userdata.hashed_password) {
        mvcApp.broadcast.displayClass = 'success';
        mvcApp.broadcast.message = "You have successfully created your account " + mvcApp.data.username +". Please check your " + mvcApp.data.email + " email account to verify this address. You will then be able to login.";
        mvcApp.data.createNewUser = '';
        mvcApp.data.username = '';
        mvcApp.data.email = '';
        mvcApp.data.password = '';
        mvcApp.data.vPassword = '';
        mvcApp.controllers.routes.trigger({location:'/publicBroadcastMessage'});
      } else {
        mvcApp.showMessage(inEvent.message);
      }

  }
  // check database connection
  , checkDB: function (inSender, inEvent) {
      var checkDB = new JSONP.CheckDB({owner:this, fireEvent:'onCheckDBResult'});
      checkDB.makeRequest({});
  }
  , checkDBResult: function (inSender, inEvent) {
      if (!inEvent.dbAvailable) {
        mvcApp.broadcast.displayClass = 'error';
        mvcApp.broadcast.message = "The system is currently unavailable. Please try again later.";
        mvcApp.controllers.routes.trigger({location:'/publicBroadcastMessage'});
        mvcApp.showMessage("Cannot connect to the Database.");
      } else {
        // mvcApp.showMessage("Database is up.");
      }
  }
});



