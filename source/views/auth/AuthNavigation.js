/**
* This is the Navigation kind when the user is authenticated
*
* - showAdminOptions() Responds to the onShowAdminOptions event to show the admin toolbar
* - hideAdminOptions() Responds to the onHideAdminOptions event to hide the admin toolbar
* - setupTopNav() Implements this for the top navigation
* - setupBottompNav() Implements this for the bottom navigation, used for administrative links
*/
enyo.kind({
  name: 'Bootplate.AuthNavigation'
  , kind: "Bootplate.Navigation"
  , create: function() {
      this.inherited(arguments);
  }
  , handlers: {
      onShowAdminOptions: 'showAdminOptions'
      , onHideAdminOptions: 'hideAdminOptions'
      , onUpdateBetaSettings: 'updateBetaSettings'
  }
  , published: {
      adminNavToolbar : ''
  }
  , setupTopNav: function(owner) {
      this.inherited(arguments);
      var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'topNavToolbar', owner: owner});

      // need to create buttons that behave as links
      // float right comes first, otherwise Mozilla pushes it down vertically
      this.createLinkButton(topNavToolbar, 'logout', 'Logout', 'button-float-right');
      this.createLinkButton(topNavToolbar, 'updateMyUserInfo', 'Update My Info', 'button-float-right');
      this.createLinkButton(topNavToolbar, 'updateMyPassword', 'Update My Password', 'button-float-right');

      this.createLinkButton(topNavToolbar, 'home', 'Home');
      this.createLinkButton(topNavToolbar, 'message', 'Message Center');
  }
  , setupBottomNav: function(owner) {
      this.inherited(arguments);
      this.setAdminNavToolbar(owner.createComponent({kind: "onyx.Toolbar", name: 'adminNavToolbar', showing: false, owner: owner}));

      /** Begin Admin navs, need a way to show/hide this*/
      this.createLinkButton(this.adminNavToolbar, 'adminUserManagementInfo', 'Manage User Info');
      this.createLinkButton(this.adminNavToolbar, 'adminSystemMessage', 'System Message');
      this.createLinkButton(this.adminNavToolbar, 'adminTermsAndConditions', 'Terms & Conditions');
      this.createLinkButton(this.adminNavToolbar, 'betaSiteManagement', 'Manage Beta');
      this.updateBetaSettings();
  }
  , showAdminOptions: function() {
      if (this.adminNavToolbar) {
        this.adminNavToolbar.show();
        this.adminNavToolbar.render();
      }
    }
  , hideAdminOptions: function() {
      if (this.adminNavToolbar) {
        this.adminNavToolbar.hide();
        this.adminNavToolbar.render();
      }
  }
  , updateBetaSettings: function() {
      if (mvcApp.betaTools == true || mvcApp.betaSiteSignup == true) {
        this.adminNavToolbar.$.betaSiteManagement.show();
      } else {
        this.adminNavToolbar.$.betaSiteManagement.hide();
      }
  }
});

















