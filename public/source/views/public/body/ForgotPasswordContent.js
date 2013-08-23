enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.ForgotPasswordContent"
    , kind: "Bootplate.ParentContent"
    , id: 'forgotPasswordContent'
    , bindings: [
      {
        from: ".$.username.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      }
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        this.bubble('onIsUserValidated', {auth:false});
    }
    , setupBodyContent: function(owner) {

        owner.createComponent(
          { name: "username",
                      kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
                      placeholder: "Username"
                  }
        );
        // setup the binding between the input and the Controller data store
        this.bindInputData(owner.$.username);

        this.insertBreak(owner);
         owner.createComponent(
          { kind: "onyx.Button",
            content: "Resend my Verification Email",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'resendEmail'
            },
            resendEmail: function () {
              mvcApp.waterfall('onResendEmail');
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
            forgotPassword: function () {
              mvcApp.waterfall('onForgotPassword');
              return true;
            }
          }
        );
        this.insertBreak(owner);

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'login', 'Cancel');

        owner.render();
    } // end setupBodyContent
  });
});


