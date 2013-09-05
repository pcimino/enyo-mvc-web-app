
enyo.kind({
  name: 'Bootplate.AuthNavigation'
  , kind: "Bootplate.Navigation"
  , create: function() {
      this.inherited(arguments);
  }
  , setupTopNav: function(owner) {
      this.inherited(arguments);
      var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'topNavToolbar', owner: owner});
      var adminNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'adminNavToolbar', owner: owner});

      // need to create buttons that behave as links
      this.createLinkButton(topNavToolbar, 'home', 'Home');
      this.createLinkButton(topNavToolbar, 'updateMyUserInfo', 'Update My Info');
      this.createLinkButton(topNavToolbar, 'updateMyPassword', 'Update My Password');
      this.createLinkButton(topNavToolbar, 'logout', 'Logout', 'button-float-right');

      /** Begin Admin navs, need a way to show/hide this*/
      this.createLinkButton(adminNavToolbar, 'readUserInfo', 'Read User Info');
      this.createLinkButton(adminNavToolbar, 'readUserList', 'Search For Users');
      this.createLinkButton(adminNavToolbar, 'deleteUser', 'Delete User');
  }
  , setupLeftNav: function(owner) {
      this.inherited(arguments);
  }
  , setupRightNav: function(owner) {
      this.inherited(arguments);
  }
  , setupBottomNav: function(owner) {
      this.inherited(arguments);
  }
});




