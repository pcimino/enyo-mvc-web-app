enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ForgotPasswordContent"
    , kind: "Bootplate.ParentContent"
    , id: 'forgotPasswordContent'
    , bindings: [
      {
			  from: ".$.username.value",
        to: ".mvcApp.controllers.public.data",
			  kind: "enyo.InputBinding"
		  }
    ]
    , setupBodyContent: function(owner) {
        owner.createComponent(
          { name: "username",
					  kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
					  placeholder: "Username"
				  }
        );
        this.insertBreak(owner);
        owner.createComponent(
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
        this.insertBreak(owner);

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'login', 'Cancel');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'userSignup', 'New User Signup');

        owner.render();
      } // end setupBodyContent
  });
});
