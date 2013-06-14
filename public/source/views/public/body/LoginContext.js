enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.LoginContext"
    , kind: "enyo.Control"
    , id: 'loginContext'
    , bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }
      , {
			  from: ".$.password.value",
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
              placeholder: "Username",
              owner: owner  // http://jsfiddle.net/pcimino/Cxa2U/
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
            { kind: "onyx.Button",
              content: "Login",
              classes: "onyx-blue form-field-left-margin",
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
        owner.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

        owner.$.bodyContainer.createComponent(
          {
				    tag: 'a'
				    , id: 'tagUserSignup'
				    , attributes: {
					      href: '#/userSignup'
				    }
            , content: 'New User Signup'
            , classes:"form-field-left-margin"
			    }
        );
        owner.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

        owner.$.bodyContainer.createComponent(
          {
            tag: 'a'
            , id: 'tagForgotPassword'
            , attributes: {
                href: '#/forgotPassword'
            }
            , content: 'Reset My Password'
            , classes:"form-field-left-margin"
          }
        );
      } // end setupBodyContext
  });
});