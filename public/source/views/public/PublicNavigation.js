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
      this.createLinkButton(topNavToolbar, 'resendEmail', 'Resend My Verification Email');
      this.createLinkButton(topNavToolbar, 'forgotPassword', 'Reset My Password');
      this.createLinkButton(topNavToolbar, 'login', 'Login', 'button-float-right');

      /*
      topNavToolbar.createComponent({ kind: "onyx.Button", content: "New User Signup", classes: "onyx-blue",
              handlers: {
                onclick: 'userSignupButton'
              },
              userSignupButton: function () {
                mvcApp.controllers.routes.trigger({location:'/userSignup'});
                return true;
              }
            }
      );*/

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



