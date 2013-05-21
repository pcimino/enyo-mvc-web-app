enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.ForgotPasswordController",
		kind: "enyo.Controller",
		data: {},
    handlers: {
      onRequestPassword: 'requestPassword',
      onCancel: 'cancel'
    },
    // requestPassword
    requestPassword: function () {
    },
    // cancel
    cancel: function () {
    }
	});
});
