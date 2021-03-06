
/**
* This is the main app, all non-global objects reside within the app memory space
*/
enyo.kind({
    name: "Bootplate.MvcApp",
    kind: "enyo.Application",
    published: {
        ajaxBaseURL: 'http://localhost',
        ajaxBasePort: '3000',
        data: {}, username: '',
        adminFlag: '',
        gravatarEmail: '',
        broadcast: {displayClass:'', message: ''},
        wsSocketURL: 'ws://localhost',
        wsSocketPort: '3000',
        sessionCookieName: 'session',
        sessionTimeout: 99999999999,
        sessionTimeRemaining: 99999999999,
        sessionCheckInterval: 10000,
        sessionIntervalKey: '',
        debugNetworkCalls: true,
        showDeveloperTools: true,
        betaTools: true,  // if false, hide the Beta button UNLESS beta is active, then overridden by betaSiteSignup
        betaSiteSignup: false // set to true if beta is active, shows the beta code entry on user signup
    },
    components: [
        {  name: "publicController",
           kind: "Bootplate.PublicController"
        },
        { name: "authController",
            kind: "Bootplate.AuthController"
        },
        { name: "routes",
            kind: "Bootplate.Routes"
        }
  ],
  view:'Bootplate.PublicView',
  publicView:'',
  authView:'',
  create: function() {
      this.inherited(arguments);
      this.publicView = new Bootplate.PublicView({name: "publicView"});
      this.authView = new Bootplate.HomeView({name: "homeView"});
  },
  setPublicView: function() {
      mvcApp.view = this.publicView;
      mvcApp.render();
      window.location.hash = '/login';
  },
  setAuthView: function() {
      mvcApp.view = this.authView;
      mvcApp.render();
      window.location.hash = '/home';
      if (this.data && this.data.user) {
        mvcApp.setGravatarEmail(mvcApp.data.user.email);
      } else {
        mvcApp.setGravatarEmail('');
      }
  },
  isAuthView: function() {
      if (typeof this.view !== 'undefined') {
      if (typeof this.view.$ !== 'undefined') {
      if (typeof this.view.$.bodyContainer !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$ !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$.bodyPage !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$.bodyPage.authFlag !== 'undefined') {
        return this.view.$.bodyContainer.$.bodyPage.authFlag;
      }}}}}}
      return false;
  },
  showErrorMessage: function(title, messageText) {
      mvcApp.view.waterfall('onShowErrorMessage', {title: title, message: messageText});
  },
  showWarningMessage: function(title, messageText) {
      mvcApp.view.waterfall('onShowWarningMessage', {title: title, message: messageText});
  },
  showInfoMessage: function(title, messageText) {
      mvcApp.view.waterfall('onShowInfoMessage', {title: title, message: messageText});
  },
  showSystemMessage: function(title, messageText, messageId) {
      mvcApp.view.waterfall('onShowSystemMessage', {title: title, message: messageText, messageId: messageId});
  },
  adminFlagChanged: function(oldVal) {
      // if flag is true, this allows Admin links to be seen, but server will
      // still restrict functionality
      // each view implementing admin options will have to be responsible for show/hide
      // and look for hideAdminOptions and showAdminOptions events
      if (this.adminFlag) {
        mvcApp.authView.waterfall('onShowAdminOptions');
      } else {
        mvcApp.authView.waterfall('onHideAdminOptions');
      }
  },
  gravatarEmailChanged: function(oldVal) {
      mvcApp.authView.waterfall('onSetupGravatar');
  },
  betaSiteSignupChanged: function(oldVal) {
        mvcApp.view.waterfall('onShowBetaSignup');

        mvcApp.view.waterfall('onUpdateBetaSettings');
  },
  betaToolsChanged: function(oldVal) {
      mvcApp.view.waterfall('onUpdateBetaSettings');
  }
});

