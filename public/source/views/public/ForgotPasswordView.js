enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.ForgotPasswordView",
    kind: "Bootplate.PublicParentView",
    id: 'loginView',
    tag: 'body', // give it a specific html tag
    classes: "onyx",
    controller: 'Bootplate.ForgotPasswordController',
    bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }
    ],
    setupBodyContent: function() {
      this.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});
      this.$.bodyContainer.createComponent(
          { name: "username",
					  kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
					  placeholder: "Username"
				  }
      );
      this.$.bodyContainer.createComponent({ tag: "br"});
      this.$.bodyContainer.createComponent(
          { kind: "onyx.Button",
            content: "Request Password reset",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'passwordReset'
            },
            passwordReset: function () {
              this.bubble('onPasswordReset');
              return true;
            }
          }
      );
      this.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

      this.$.bodyContainer.createComponent({ kind: "enyo.Control",
        content: "Cancel",
        classes:"form-field-left-margin href-link",
        handlers: {
          onclick: 'login'
        },
        login: function () {
        this.bubble('onLogin');
          return true;
        }
      });
      this.$.bodyContainer.createComponent({ kind: "enyo.Control",
        content: "New User Signup",
        classes:"form-field-left-margin href-link",
        handlers: {
          onclick: 'userSignup'
        },
        userSignup: function () {
          this.bubble('onUserSignup');
          return true;
        }
      });

  }
  });
});
