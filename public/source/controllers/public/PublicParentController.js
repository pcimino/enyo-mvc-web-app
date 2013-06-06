// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
enyo.kind({
  name: "Bootplate.PublicParentController",
  kind: "enyo.Controller",
  autoLoad: true,
  published: {
      ajaxBaseURL: 'http://localhost'
    , ajaxBasePort: '3000'
  },
  data: {},
  handlers: {
      onLogin: 'login'
    , onForgotPassword: 'forgotPassword'
    , onUserSignup: 'userSignup'
  },
  // Login
  login: function () {
    console.log("login");
    new Bootplate.LoginApp({name: "loginApp"}).renderInto(document.body);
    console.log("done");
  },
  // ForgotPassword
  forgotPassword: function () {
    console.log("forgotPassword");
    new Bootplate.ForgotPasswordApp({name: "forgotPasswordApp"}).renderInto(document.body);
    console.log("done");
  },
  // UserSignup
  userSignup: function () {
    console.log("userSignup");
    new Bootplate.UserSignupApp({name: "userSignupApp"}).renderInto(document.body);
    console.log("done");
  }
});