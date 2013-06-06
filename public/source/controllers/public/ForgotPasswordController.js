enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.ForgotPasswordController",
		kind: "Bootplate.PublicParentController",
		data: {},
    handlers: {
      onPasswordReset: 'passwordReset',
      onCancel: 'cancel'
    },
    // requestPassword
    passwordReset: function () {
    },
    // cancel
    cancel: function () {
    }
	});
});
