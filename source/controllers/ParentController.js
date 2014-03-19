// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
/**
* Parent Controller kind
*
* - isUserValidated: function(inSender, inEvent)
* - isUserValidatedResult: function(inSender, inEvent)
* - reloadUser: function(inSender, inEvent)
* - checkAdmin: function(inSender, inEvent)
* - checkAdminResult: function(inSender, inEvent)
*/
enyo.kind({
  name: "Bootplate.ParentController",
  kind: "enyo.Controller",
  autoLoad: true,
  published: {
     ajaxBaseURL: 'http://localhost',
     ajaxBasePort: '3000',
     auth : false,
     role : 'user'
  },
  // Will this work or will the subclsses overwrite?
  handlers: {
     onIsUserValidated: 'isUserValidated',
     onIsUserValidatedResult: 'isUserValidatedResult',
     onCheckAdmin: 'checkAdmin',
     onCheckAdminResult: 'checkAdminResult',
     onReloadUser: 'reloadUser',
     onCheckUsername: 'checkUsername',
     onCheckUsernameResult: 'checkUsernameResult',
     onCheckEmail: 'checkEmail',
     onCheckEmailResult: 'checkEmailResult',
     onLoadTermsAndConditions:'loadTermsAndConditions',
     onLoadTermsAndConditionsResult:'loadTermsAndConditionsResult',
     onCheckBetaStatus: 'checkBetaStatus',
     onCheckBetaStatusResult: 'checkBetaStatusResult'
  },
  // see if the user is already logged in
  //TODO Causing a loop, since the result can cause the /home or /login call, which calls routes which calls this...hmmmmm
  isUserValidated: function(inSender, inEvent) {
      this.auth = inEvent.auth;
      this.role = inEvent.role;

      var checkAuth = new JSONP.CheckAuth({owner:this, fireEvent:'onIsUserValidatedResult'});
      checkAuth.makeRequest({});
  },
  isUserValidatedResult: function(inSender, inEvent) {
      if (inEvent.response == '200') {
        // user is validated
        if (!this.auth) {
          // user is logged in but tried to go to a public page, redirect to home
          // this checks the bodyPage for the authFlag, if both conditions match then no need to switch views
          if (mvcApp.isAuthView() !== true) {
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
          mvcApp.setGravatarEmail('');
          mvcApp.setPublicView();
          mvcApp.controllers.routes.trigger({location:'/loginEvent'});
          mvcApp.showWarningMessage("Session Ended", "Your session has expired, please login.");
        }
      }
      this.checkBetaStatus();
  },
  loadTermsAndConditions: function() {
        // retrieve terms and conditions
        var jsonpGetSysMessages = new JSONP.GetTermsAndConditions({owner:this, fireEvent:'onLoadTermsAndConditionsResult', errorEvent:'onErrorTermsAndConditions'});
        jsonpGetSysMessages.makeRequest({archiveFlag: false});
  },
  loadTermsAndConditionsResult: function(inSender, inEvent) {
      mvcApp.data.terms = inEvent.length;
      if (mvcApp.data.terms && mvcApp.data.terms > 0) {
        mvcApp.controllers.routes.trigger({location:'/termsAndConditions'});
      }
  },
  reloadUser: function(inSender, inEvent) {
      if (inEvent.userdata) {
        mvcApp.data.user = inEvent.userdata;
        mvcApp.username = mvcApp.data.user.username;
        mvcApp.data.username = '';
        mvcApp.data.password = '';
        mvcApp.setGravatarEmail(mvcApp.data.user.email);

        mvcApp.authView.waterfall('onSetupGravatar');
        // reload admin rights
        this.checkAdmin(inSender, inEvent);
      }
  },
  // check database connection
  checkAdmin: function(inSender, inEvent) {
      var checkAdmin = new JSONP.CheckAdmin({owner:this, fireEvent:'onCheckAdminResult'});
      checkAdmin.makeRequest({});
  },
  checkAdminResult: function(inSender, inEvent) {
      if (inEvent.message == 'Success') {
        mvcApp.setAdminFlag(true);
      } else {
        mvcApp.setAdminFlag(false);
      }
  },
  // Check Username availability
  checkUsername: function(inSender, inEvent) {
      mvcApp.waterfall('onCheckUsernameResult', {exists:'reset'});
      var ajaxUsernameExists = new AJAX.UsernameExists({owner:this, fireEvent:'onCheckUsernameResult'});
      ajaxUsernameExists.makeRequest({username:inEvent.username});
  },
  // Check Username Result
  checkUsernameResult: function(inSender, inEvent) {
      mvcApp.view.body.waterfall('onUsernameStatus', inEvent);
      return true;
  },
  // Check Email availability
  checkEmail: function(inSender, inEvent) {
      mvcApp.waterfall('onCheckEmailResult', {exists:'reset'});
      var ajaxEmailExists = new AJAX.EmailExists({owner:this, fireEvent:'onCheckEmailResult'});
      ajaxEmailExists.makeRequest({email:inEvent.email, newEmail:inEvent.newEmail});
  },
  // Check Email Result
  checkEmailResult: function(inSender, inEvent) {
      mvcApp.view.body.waterfall('onEmailStatus', inEvent);
      return true;
  },
  checkBetaStatus: function() {
      var ajaxMessage = new JSONP.GetBetaStatus({owner:this, fireEvent:'onCheckBetaStatusResult', errorEvent:'onErrorSystemMessages'});
      ajaxMessage.makeRequest({});
  },
  checkBetaStatusResult: function(inSender, inEvent) {
      mvcApp.setBetaSiteSignup(inEvent.status);
  }
});






















