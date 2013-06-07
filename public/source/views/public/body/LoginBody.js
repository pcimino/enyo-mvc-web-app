// Script used to setup the Login body content
setupLoginBodyContent: function(parent) {
        parent.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});
        parent.$.bodyContainer.createComponent(
            { name: "username",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Username"
            }
        );
        parent.$.bodyContainer.createComponent({ tag: "br"});
        parent.$.bodyContainer.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password"
            }
        );
        parent.$.bodyContainer.createComponent({ tag: "br"});
        parent.$.bodyContainer.createComponent(
            { kind: "onyx.Button",
              content: "Login",
              classes: "onyx-blue form-field-left-margin",
              handlers: {
                onclick: 'login'
              },
              login: function () {
                parent.bubble('onLogin');
                return true;
              }
            }
        );
        parent.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

        parent.$.bodyContainer.createComponent({ kind: "enyo.Control",
              content: "New User Signup",
              classes:"form-field-left-margin href-link",
              handlers: {
                onclick: 'userSignup'
              },
              userSignup: function () {
                parent.bubble('onUserSignup');
                return true;
              }
            }
        );
        parent.$.bodyContainer.createComponent(
            { kind: "enyo.Control",
              content: "Forgot My Password",
              classes:"form-field-left-margin href-link",
              handlers: {
                onclick: 'forgotPassword'
              },
              forgotPassword: function () {
                parent.bubble('onForgotPassword');
                return true;
              }
            }
          );
    }


