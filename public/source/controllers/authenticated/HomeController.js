enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.HomeController",
		kind: "Bootplate.AuthenticatedParentController",
		data: {},
    handlers: {
      onSomething: 'something'
    },
    // signup
    something: function () {
    }
	});
});
