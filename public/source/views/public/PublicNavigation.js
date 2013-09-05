enyo.kind({
  name: 'Bootplate.PublicNavigation'
  , kind: "enyo.Component"
  , create: function() {
      this.inherited(arguments);
  }
  , setupTopNav: function(owner) {
    var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'topNavToolbar', owner: owner});

    topNavToolbar.createComponent({ kind: "onyx.Button", content: "New User Signup", classes: "onyx-blue",
            handlers: {
              onclick: 'userSignupButton'
            },
            userSignupButton: function () {
              mvcApp.controllers.routes.trigger({location:'/userSignup'});
              return true;
            }
          }
    );
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Resend My Verification Email", classes: "onyx-blue",
            handlers: {
              onclick: 'userSignupButton'
            },
            userSignupButton: function () {
              mvcApp.controllers.routes.trigger({location:'/resendEmail'});
              return true;
            }
          }
    );
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Reset My Password", classes: "onyx-blue",
            handlers: {
              onclick: 'userSignupButton'
            },
            userSignupButton: function () {
              mvcApp.controllers.routes.trigger({location:'/forgotPassword'});
              return true;
            }
          }
    );
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Login", classes: "onyx-blue button-float-right",
            handlers: {
              onclick: 'userSignupButton'
            },
            userSignupButton: function () {
              mvcApp.controllers.routes.trigger({location:'/login'});
              return true;
            }
          }
    );
  }
  , setupLeftNav: function(owner) {
  }
  , setupRightNav: function(owner) {
  }
  , setupBottomNav: function(owner) {
  }
});


