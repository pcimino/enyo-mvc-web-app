// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
enyo.kind({
  name: "Bootplate.ParentController",
  kind: "enyo.Controller",
  autoLoad: true,
  published: {
    ajaxBaseURL: 'http://localhost',
    ajaxBasePort: '3000'
	},
  data: {},
  handlers: {
      onLogin: 'logout'
  },
  // Logout
  logout: function () {
    console.log("logout");
    // TODO end session
    mvcApp.$.routes.handle('/login')
    console.log("done");
  }
});