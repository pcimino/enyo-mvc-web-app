/**
* Setup the navigation for the site. Any links in the page itself are part of the content
*
* The left & right navs might be used for a sliding pane
*/
enyo.kind({
  name: 'Bootplate.PublicNavigation'
  , kind: "Bootplate.Navigation"
  , create: function() {
      this.inherited(arguments);
  }
  , setupTopNav: function(owner) {
      this.inherited(arguments);
      var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'topNavToolbar', owner: owner});

      // need to create buttons that behave as links
      this.createLinkButton(topNavToolbar, 'userSignup', 'New User Signup');

      this.createLinkButton(topNavToolbar, 'login', 'Login', 'button-float-right');
  }
  , setupLeftNav: function(owner) {
      this.inherited(arguments);
  }
  , setupRightNav: function(owner) {
      this.inherited(arguments);
  }
  , setupBottomNav: function(owner) {
      this.inherited(arguments);
      var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'bottomNavToolbar', owner: owner});

      // need to create buttons that behave as links
      this.createLinkButton(topNavToolbar, 'resendEmail', 'Resend My Verification Email');
      this.createLinkButton(topNavToolbar, 'forgotPassword', 'Reset My Password');
  }
});




