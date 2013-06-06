enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.LoginView",
    kind: "Bootplate.PublicParentView",
    id: 'loginView',
    dbAvailable: '',
    tag: 'body', // give it a specific html tag
    classes: "onyx",
    controller: 'Bootplate.LoginController',
    handlers: {
      onDbAvailable : 'dbAvailable',
      onDbNotAvailable : 'dbNotAvailable',
    },
    bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.password.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }, {
        from: ".loginController.dbAvailable", //.loginApp.controllers.login.dbAvailable
        to: ".dbAvailable"
      }
    ],
    create: function() {
      this.inherited(arguments);
      this.setupHeaderContent();
      this.setupBodyContent();
      this.setupFooterContent();

    },
    rendered: function() {
      this.inherited(arguments);
      this.bubble('onCheckDB');
    },
    dbAvailableChanged: function() {
     if (this.dbAvailable) {
      alert('dbAvailable');
     } else {
       alert('dbNotAvailable');
     }
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
          { name: "password",
					  kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
					  placeholder: "Password"
				  }
      );
      this.$.bodyContainer.createComponent({ tag: "br"});
      this.$.bodyContainer.createComponent(
          { kind: "onyx.Button",
            content: "Login",
            classes: "onyx-blue form-field-left-margin",
            handlers: {
              onclick: 'login'
            },
            login: function () {
              this.bubble('onLogin');
              return true;
            }
          }
      );
      this.$.bodyContainer.createComponent({ tag: "br", classes:"form-field-left-margin"});

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
