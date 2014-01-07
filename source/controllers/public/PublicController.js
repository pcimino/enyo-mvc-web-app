/**
* Public Controller kind
* Common handlers for the public (unauth) pages
*
* - login: function()
*      Params: username password
* - loginResult: function(inSender, inEvent)
* - forgotPassword: function()
*      Params: username
* - forgotPasswordResult: function(inSender, inEvent)
* - resendEmail: function()
*      Params: username
* - resendEmailResult: function(inSender, inEvent)
* - checkUsername: function()
* - checkUsernameResult: function(inSender, inEvent)
* - checkEmail: function()
* - checkEmailResult: function(inSender, inEvent)
* - userSignup: function()
* - userSignupResult: function(inSender, inEvent)
* - checkDB: function(inSender, inEvent)
* - checkDBResult: function(inSender, inEvent)
*/
enyo.kind({
  name: "Bootplate.PublicController"
  , kind: "Bootplate.ParentController"
  , solved: false
  , handlers: {
     onLogin: 'login'
     , onLoginResult: 'loginResult'
     , onForgotPassword: 'forgotPassword'
     , onForgotPasswordResult: 'forgotPasswordResult'
     , onResendEmail: 'resendEmail'
     , onResendEmailResult: 'resendEmailResult'
     , onUserSignup: 'userSignup'
     , onUserSignupResult: 'userSignupResult'
     , onCheckEmailForSignupResult: 'checkEmailForSignupResult'
     , onCheckUsernameForSignupResult: 'checkUsernameForSignupResult'
     , onCheckDB: 'checkDB'
     , onCheckDBResult: 'checkDBResult'
     , onPuzzleSolved: 'puzzleSolved'
  }
  // Login
  , login: function(inSender, inEvent) {
      var ajaxLogin = new AJAX.Login({owner:this, fireEvent:'onLoginResult'});
      ajaxLogin.makeRequest({username:inEvent.username , password:inEvent.password});
  }
  , loginResult: function(inSender, inEvent) {
      if (inEvent.authenticated) {
        mvcApp.data.user = inEvent.userdata;
        mvcApp.username = mvcApp.data.username;
        mvcApp.data.username = '';
        mvcApp.data.password = '';
        // display the authenticated home page
        mvcApp.setAuthView();
      } else {
        mvcApp.showWarningMessage("Login failed", inEvent.message);
      };
  }
  // ForgotPassword
  , forgotPassword: function(inSender, inEvent) {
    var jsonpResetPassword = new JSONP.ResetPassword({owner:this, fireEvent:'onForgotPasswordResult'});
    jsonpResetPassword.makeRequest({username:inEvent.username});
  }
  // Forgot Passsword Result
  , forgotPasswordResult: function(inSender, inEvent) {
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
      mvcApp.showErrorMessage("Email Problem", "We had trouble sending your email. Please try again later or contact your system administrator.");
    }
  }
  // Resend  Verification Email
  , resendEmail: function(inSender, inEvent) {
      var jsonpResendVerificationEmail = new JSONP.ResendVerificationEmail({owner:this, fireEvent:'onResendEmailResult'});
      jsonpResendVerificationEmail.makeRequest({username:inEvent.username});
  }
  // Resend  Verification Email Result
  , resendEmailResult: function(inSender, inEvent) {
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
      mvcApp.showErrorMessage("Email Problem", "We had trouble sending your email. Please try again later or contact your system administrator.");
    }
  }
  // UserSignup
  , userSignup: function(inSender, inEvent) {
      mvcApp.data.createNewUser = true;
      this.checkEmailForSignup(inSender, inEvent);
  }
  // Check email availability
  , checkEmailForSignup: function(inSender, inEvent) {
      var ajaxEmailExists = new AJAX.EmailExists({owner:this, fireEvent:'onCheckEmailForSignupResult'});
      ajaxEmailExists.makeRequest({email:mvcApp.data.email, newEmail:mvcApp.data.email});
  }
  , checkEmailForSignupResult: function(inSender, inEvent) {
      if (!inEvent.exists && mvcApp.data.createNewUser) {
        this.checkUsernameForSignup(inSender, inEvent);
      } else {
        mvcApp.showErrorMessage('Error creating account', 'Email already exists');
      }
  }
  // Check Username availability
  , checkUsernameForSignup: function(inSender, inEvent) {
      mvcApp.waterfall('onCheckUsernameResult', {exists:'reset'});
      var ajaxUsernameExists = new AJAX.UsernameExists({owner:this, fireEvent:'onCheckUsernameForSignupResult'});
      ajaxUsernameExists.makeRequest({username:mvcApp.data.name});
  }
  , checkUsernameForSignupResult: function(inSender, inEvent) {
      if (!inEvent.exists && mvcApp.data.createNewUser) {
        mvcApp.data.createNewUser = '';
        // create the user
        var ajaxUserSignup = new AJAX.UserSignup({owner:this, fireEvent:'onUserSignupResult', errorEvent:'onErrorSystemMessages'});
        ajaxUserSignup.makeRequest({username:mvcApp.data.username, name:mvcApp.data.name, email:mvcApp.data.email, password:mvcApp.data.password, vPassword:mvcApp.data.vPassword, betaCode:mvcApp.data.betaCode});
      } else {
        mvcApp.showErrorMessage('Error creating account', 'Username already exists');
      }
  }
  // UserSignupResult
  , userSignupResult: function(inSender, inEvent) {
      if (inEvent.userdata && inEvent.userdata.hashed_password) {
        mvcApp.broadcast.displayClass = 'success';
        mvcApp.broadcast.message = "You have successfully created your account " + mvcApp.data.username +". Please check your " + mvcApp.data.email + " email account to verify this address. You will then be able to login.";
        mvcApp.data.createNewUser = '';
        mvcApp.data.username = '';
        mvcApp.data.email = '';
        mvcApp.data.password = '';
        mvcApp.data.vPassword = '';
        mvcApp.data.betaCode = '';
        mvcApp.controllers.routes.trigger({location:'/publicBroadcastMessage'});
      } else {
        mvcApp.showInfoMessage(inEvent.message);
      }

  }
  // check database connection
  , checkDB: function(inSender, inEvent) {
      var checkDB = new JSONP.CheckDB({owner:this, fireEvent:'onCheckDBResult'});
      checkDB.makeRequest({});
  }
  , checkDBResult: function(inSender, inEvent) {
      if (!inEvent.dbAvailable) {
        mvcApp.broadcast.displayClass = 'error';
        mvcApp.showErrorMessage("Cannot connect to the Database", "We're experiencing networking issues, please try again later.");
      } else {
        // mvcApp.showInfoMessage("Database is up.", "Database is up.");
      }
  }
  // Captch puzzle solved
  , puzzleSolved: function(inSender, inEvent) {
      this.$.solved = true;
    console.log(this.$.solved)
  }
});





















