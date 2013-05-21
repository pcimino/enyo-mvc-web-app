enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.LoginView",
		kind: "Bootplate.ParentView",
    [{
      name: 'Bootplate.loginform',
      kind: 'Bootplate.LoginForm'	},
    {
      name: 'Bootplate.footerview',
      kind: 'Bootplate.FooterView'	}]
});
