enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.ForgotPasswordView",
    kind: "Bootplate.ParentView",
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
    create: function() {
      this.inherited(arguments);
      this.setupHeaderContent();
      this.setupBodyContent();
      this.setupFooterContent();
    },
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

      this.$.bodyContainer.createComponent({
      tag: 'p',
      allowHtml: true,
      classes:"form-field-left-margin href-link",
      content: '<a href="#" onclick="this.onUserSignup">New User Signup test</a>'	});


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
          }
      );
      this.$.bodyContainer.createComponent(
          { kind: "enyo.Control",
            content: "Forgot My Password",
            classes:"form-field-left-margin href-link",
            handlers: {
              onclick: 'forgotPassword'
            },
            forgotPassword: function () {
              this.bubble('onForgotPassword');
              return true;
            }
          }
        );
  }
  });
});
