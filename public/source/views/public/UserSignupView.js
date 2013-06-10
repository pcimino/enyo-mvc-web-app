enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.UserSignupView",
    kind: "Bootplate.PublicParentView",
    id: 'loginView',
    tag: 'body', // give it a specific html tag
    classes: "onyx",
    controller: 'Bootplate.UserSignupController',
    published: {
      validUsername: false
    },
    bindings: [
      {
			  from: ".$.validUsername.value",
        to: ".userSignupApp.controllers.validUsername.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.username.value",
        to: ".userSignupApp.controllers.userSignup.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.password.value",
        to: ".userSignupApp.controllers.userSignup.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.vPassword.value",
        to: ".userSignupApp.controllers.userSignup.data",
			  kind: "enyo.InputBinding"
		  }
    ],
    usernameChanged: function() {
      this.bubble('onCheckUsername');
    },
    validUsernameChanged: function() {
      if (this.validUsername) {
        this.$.bodyContainer.$.username.addClass(form-input-confirm-box);
      } else {
        this.$.bodyContainer.$.username.addClass(form-input-error-box);
      }
    },
    setupBodyContent: function() {
      this.inherited(arguments);
      //if (this.$.bodyContainer) this.$.bodyContainer.destroy();
      //this.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});
        this.$.bodyContainer.createComponent(
            { name: "username",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Username",
              onchange: function() {this.bubble('onCheckUsername');}
            }
        );
        this.$.bodyContainer.createComponent({ tag: "br"});
        this.$.bodyContainer.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password"
            }
        );
        this.$.bodyContainer.createComponent({ tag: "br"});
        this.$.bodyContainer.createComponent(
            { name: "vPassword",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Verify Password"
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
