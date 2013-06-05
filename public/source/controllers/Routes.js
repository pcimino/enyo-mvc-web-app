
enyo.kind({
	kind: 'enyo.Router',
	name: 'Bootplate.Routes',
	routes: [{
		path: '/',
		'default': true,
		handler: 'login'
	}, {
		path: '/login',
		'default': true,
		handler: 'login'
	}, {
		path: '/userSignup',
		'default': true,
		handler: 'userSignup'
	}, {
		path: '/forgotPassword',
		'default': true,
		handler: 'forgotPassword'
	}],
	// Set a property on our global controller
	login: function () {
		// Still need to figure out how this wiring works
        // BootPlate.LoginController.setRoute(this.current);
	},
	userSignup: function () {
		// Still need to figure out how this wiring works
        // BootPlate.UserSignupController.setRoute(this.current);
	},
	forgotPassword: function () {
		// Still need to figure out how this wiring works
        // BootPlate.ForgotPassword.setRoute(this.current);
	}
});
