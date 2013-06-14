enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.UserSignupContext"
    , kind: "enyo.Control"
    , id: 'userSignupContext'
    , published: {
        validUsername: false
    }
    , bindings: [
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
      ]
    , usernameChanged: function() {
        console.log('onCheckUsername')
        this.bubble('onCheckUsername');
      }
    , inputChange: function(inSender, inEvent){
		    console.log("inputChange", inSender.getValue(), inEvent);
	    }
    , validUsernameChanged: function() {
        if (this.validUsername) {
          this.$.bodyContainer.$.username.addClass(form-input-confirm-box);
        } else {
          this.$.bodyContainer.$.username.addClass(form-input-error-box);
        }
      }
    , setupBodyContext: function(owner) {
        owner.$.bodyContainer.destroyComponents();
        owner.$.bodyContainer.createComponent(
            { name: "username",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Username",
              onchange: 'usernameChanged',
              onkeypress: 'usernameChanged',
              ontap: 'usernameChanged',
              owner: owner
            }
        );
        owner.$.bodyContainer.createComponent({ tag: "br"});
        owner.$.bodyContainer.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password",
              owner: owner
            }
        );
        owner.$.bodyContainer.createComponent({ tag: "br"});
        owner.$.bodyContainer.createComponent(
            { name: "vPassword",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Verify Password",
              owner: owner
            }
        );
        owner.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

        owner.$.bodyContainer.createComponent({ kind: "enyo.Control",
              content: "Cancel",
              classes:"form-field-left-margin href-link",
              owner: owner,
              handlers: {
                onclick: 'login'
              },
              login: function () {
                owner.bubble('onLogin');
                return true;
              }
            }
        );
        owner.$.bodyContainer.createComponent(
            { kind: "enyo.Control",
              content: "Forgot My Password",
              classes:"form-field-left-margin href-link",
              owner: owner,
              handlers: {
                onclick: 'forgotPassword'
              },
              forgotPassword: function () {
                owner.bubble('onForgotPassword');
                return true;
              }
            }
          );
      } // end setupBodyContext
  });
});

