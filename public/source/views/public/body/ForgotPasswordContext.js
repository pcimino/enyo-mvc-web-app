enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ForgotPasswordContext"
    , kind: "enyo.Control"
    , id: 'forgotPasswordContext'
    , bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }
    ]
    , setupBodyContext: function(owner) {
        owner.$.bodyContainer.destroyComponents();
        owner.$.bodyContainer.createComponent(
          { name: "username",
					  kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
					  placeholder: "Username"
				  }
        );
        owner.$.bodyContainer.createComponent({ tag: "br"});
        owner.$.bodyContainer.createComponent(
          { kind: "onyx.Button",
            content: "Request Password reset",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'passwordReset'
            },
            passwordReset: function () {
              owner.bubble('onPasswordReset');
              return true;
            }
          }
        );
        owner.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

        owner.$.bodyContainer.createComponent({ kind: "enyo.Control",
          content: "Cancel",
          classes:"form-field-left-margin href-link",
          handlers: {
            onclick: 'login'
          },
          login: function () {
          owner.bubble('onLogin');
            return true;
          }
        });
        owner.$.bodyContainer.createComponent({ kind: "enyo.Control",
          content: "New User Signup",
          classes:"form-field-left-margin href-link",
          handlers: {
            onclick: 'userSignup'
          },
          userSignup: function () {
            owner.bubble('onUserSignup');
            return true;
          }
        });
      } // end setupBodyContext
  });
});
