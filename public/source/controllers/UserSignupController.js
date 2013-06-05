enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.UserSignupController",
		kind: "Bootplate.ParentController",
		data: {},
    handlers: {
      onUserSignup: 'userSignup',
      onCheckUsername: 'checkUsername',
      onCancel: 'cancel'
    },
    // signup
    userSignup: function () {
    },
    // CheckUsername
    checkUsername: function () {
    },
    // Cancel
    cancel: function () {
    }
	});
});

/*
for modifying username input field when name is available
.removeClass
.addClass

form-input-error-box
form-input-confirm-box
*/