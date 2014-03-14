
/**
* This is the VerifyResetRequestPage kind used for when the user forgets their password,
*    or needs a verification email resend
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.VerifyResetRequestPage'
    , kind: 'Bootplate.PublicPage'
    , id: 'forgotPasswordPage'
    , bindings: [
      {
        from: '.$.username.value',
        to: '.mvcApp.data',
        kind: 'enyo.InputBinding'
      }
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(this);
        owner.createComponent(
          { name: "username",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "Username"
          }
        );
        // setup the binding between the input and the Controller data store
        // this.bindInputData(owner.$.username);

        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button",
            content: "Resend my Verification Email",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'resendEmail'
            },
            resendEmail: function() {
              mvcApp.waterfall('onResendEmail', {username: owner.$.username.value});
              return true;
            }
          }
        );
        owner.createComponent(
          { kind: "onyx.Button",
            content: "Request Password reset",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'forgotPassword'
            },
            forgotPassword: function() {
              mvcApp.waterfall('onForgotPassword', {username: owner.$.username.value});
              return true;
            }
          }
        );
        this.insertBreak(owner);

        this.insertBreak(owner);
        this.insertInternalLink(owner, this.rndLink('login'), 'Cancel');

        owner.render();
    } // end setupPageBody
  });
});














