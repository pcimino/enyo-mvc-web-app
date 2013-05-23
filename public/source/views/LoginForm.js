enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.LoginForm",
		kind: "FittableRows",
		fit: true,
		bindings: [{
			from: ".$.username.value",
      to: ".app.controllers.login.data",
			kind: "enyo.InputBinding"
		},{
			from: ".$.password.value",
      to: ".app.controllers.login.data",
			kind: "enyo.InputBinding"
		}],
    controller: 'Bootplate.logincontroller',
		components: [{
			name: "toolbar",
			kind: "onyx.Toolbar"
		}, {
			kind: "enyo.Scroller",
			fit: true,
			components: [
        {
				kind: "onyx.InputDecorator",
				components: [{
					name: "username",
					kind: "onyx.Input",
					placeholder: "Username"
				},{
					name: "password",
					kind: "onyx.Input",
					placeholder: "Password"
				},
        {
          kind: "onyx.Button",
          content: "Login",
          classes: "onyx-blue",
          handlers: {
            onclick: 'login'
          },
          login: function () {
            this.inherited(arguments);
            this.bubble('onLogin');
            return true;
          }
        },
        {
          kind: "enyo.Control",
          content: "New User Signup",
          styles: "color:blue;text-decoration;underline;",
          handlers: {
            onclick: 'userSignup'
          },
          login: function () {
            this.inherited(arguments);
            this.bubble('onUserSignup');
            return true;
          }
        },
        {
          kind: "enyo.Control",
          content: "Forgot My Password",
          styles: "color:blue;text-decoration;underline;",
          handlers: {
            onclick: 'forgotPassword'
          },
          login: function () {
            this.inherited(arguments);
            this.bubble('onForgotPassword');
            return true;
          }
        }
      ]
			}]
		}]
	});

});
