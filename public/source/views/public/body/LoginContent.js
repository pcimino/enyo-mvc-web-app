enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.LoginContent"
    , kind: "Bootplate.ParentContent"
    , id: 'loginContent'
    , bindings: [
      { from: ".$.username.value"
        , to: ".app.controllers.login.data"
        , kind: "enyo.InputBinding"
      }
      , { from: ".$.password.value"
          , to: ".app.controllers.login.data"
          , kind: "enyo.InputBinding"
      }
    ]
    , setupBodyContent: function(owner, renderFlag) {
        owner.createComponent(
            { name: "username",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Username",
              owner: owner  // http://jsfiddle.net/pcimino/Cxa2U/
            }
        );
        this.insertBreak(owner);
        owner.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password",
              owner: owner
            }
        );
        this.insertBreak(owner);
        owner.createComponent(
            { kind: "onyx.Button",
              content: "Login",
              classes: "onyx-blue form-field-left-margin",
              owner: owner,
              handlers: {
                onclick: 'login'
              },
              login: function () {
                mvcApp.waterfall('onLogin');
                return true;
              }
            }
        );

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'userSignup', 'New User Signup');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'forgotPassword', 'Reset My Password');

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();
      } // end setupBodyContent
  });
});