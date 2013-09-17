/**
* This is the publicly accessible Navigation kind
*
* - setupTopNav() Implements this for the top navigation
* - setupBottompNav() Implements this for the bottom navigation
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
      // float right comes first, otherwise Mozilla pushes it down vertically
      this.createLinkButton(topNavToolbar, 'login', 'Login', 'button-float-right');
      this.createLinkButton(topNavToolbar, 'userSignup', 'New User Signup');

  }
  , setupBottomNav: function(owner) {
      this.inherited(arguments);
      var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'bottomNavToolbar', owner: owner});

      // need to create buttons that behave as links
      this.createLinkButton(topNavToolbar, 'resendEmail', 'Resend My Verification Email');
      this.createLinkButton(topNavToolbar, 'forgotPassword', 'Reset My Password');
  }
});







