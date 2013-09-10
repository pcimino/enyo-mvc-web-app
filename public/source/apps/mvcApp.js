/**
* This is the main app, all non-global objects reside within the app memory space
*/
enyo.kind({
    name: "Bootplate.MvcApp"
    , kind: "enyo.Application"
    , published: {
        ajaxBaseURL: 'http://localhost'
        , ajaxBasePort: '3000'
        , data: {}
        , username: ''
        , adminFlag: ''
        , gravatarEmail: ''
        , broadcast: {displayClass:'', message: ''}
        , wsSocketURL: 'ws://localhost'
        , wsSocketPort: '3000'
    }
    , controllers: [
        {  name: "publicController",
           kind: "Bootplate.PublicController"
        }
        , { name: "authController",
            kind: "Bootplate.HomeController"
        }
        , { name: "routes",
            kind: "Bootplate.Routes"
        }
  ]
  , view:'Bootplate.PublicView'
  , publicView:''
  , authView:''
  , create: function() {
      this.publicView = new Bootplate.PublicView({name: "publicView"});
      this.authView = new Bootplate.HomeView({name: "homeView"});
      this.createComponent({name:'popupDialog', kind: "PopupDialog", owner: this});
  }
  , setPublicView: function() {
      mvcApp.view = this.publicView;
      mvcApp.render();
      window.location.hash = '/login'
  }
  , setAuthView: function() {
      mvcApp.view = this.authView;
      mvcApp.render();
      window.location.hash = '/home'
      if (this.data && this.data.user) {
        mvcApp.setGravatarEmail(mvcApp.data.user.email);
      } else {
        mvcApp.setGravatarEmail('');
      }
  }
  , isAuthView: function() {
      if (typeof this.view !== 'undefined') {
      if (typeof this.view.$ !== 'undefined') {
      if (typeof this.view.$.bodyContainer !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$ !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$.bodyContent !== 'undefined') {
      if (typeof this.view.$.bodyContainer.$.bodyContent.authFlag !== 'undefined') {
        return this.view.$.bodyContainer.$.bodyContent.authFlag;
      }}}}}}
      return false;
  }
  , showMessage: function(messageText) {
      this.$.popupDialog.showMessage(messageText);
  }
  , adminFlagChanged: function(oldVal) {
      // if flag is true, this allows Admin links to be seen, but server will
      // still restrict functionality
      // each view implementing admin options will have to be responsible for show/hide
      // and look for hideAdminOptions and showAdminOptions events
      if (this.adminFlag) {
        mvcApp.authView.waterfall('onShowAdminOptions');
      } else {
        mvcApp.authView.waterfall('onHideAdminOptions');
      }
  }
  , gravatarEmailChanged: function(oldVal) {
      mvcApp.authView.waterfall('onSetupGravatar');
  }
});








