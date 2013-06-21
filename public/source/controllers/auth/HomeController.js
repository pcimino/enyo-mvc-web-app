enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.HomeController"
		, kind: "Bootplate.ParentController"
		, data: {}
    , handlers: {
        onLogin2: 'logout'
    }
    // Logout
    , logout: function () {
      console.log("logout");
      // TODO end session

      mvcApp.setPublicView();
      console.log("done");
    }
	});
});
