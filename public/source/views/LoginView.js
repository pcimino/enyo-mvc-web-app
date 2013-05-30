enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.LoginView",
    kind: "enyo.FittableRows",
    classes: "fittable-sample-box enyo-fit",
    tag: 'body',
    fit: true,
    bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.password.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }
    ],
    controller: 'Bootplate.logincontroller',
    components: [
      {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
        {name:'headerLeftContent', content: "header-left", classes: "fittable-sample-box fittable-sample-mlr"},
			  {name:'headerCenterContent', content: "header-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
			  {name:'headerRightContent', content: "header-right", classes: "fittable-sample-box fittable-sample-mlr"}
		  ]},
      {name:'bodyContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb enyo-center", components: [
        {kind: "onyx.InputDecorator", components: [
          { content: "Username:", allowHtml: true},
          { name: "username",
					  kind: "onyx.Input",
            fit: true,
            classes: "fittable-sample-box fittable-sample-mlr",
					  placeholder: "Username"
				  },
          { content: "Password:", allowHtml: true},
          { name: "password",
					  kind: "onyx.Input",
            fit: true,
            classes: "fittable-sample-box fittable-sample-mlr",
					  placeholder: "Password"
				  },
          { kind: "onyx.Button",
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
          { kind: "enyo.Control",
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
          { content: "<br>", allowHtml: true},
          { kind: "enyo.Control",
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
        ]},
      ]},
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
        {name:'footerLeftContent', content: "footer-left", classes: "fittable-sample-box fittable-sample-mlr"},
			  {name:'footerCenterContent', content: "footer-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
			  {name:'footerRightContent', content: "footer-right", classes: "fittable-sample-box fittable-sample-mlr"},
        {name: 'Bootplate.footerview',kind: 'Bootplate.FooterView'}
		  ]}
	  ]
  });
});
