// Put common navigation methods in here
enyo.kind({
  name: "Bootplate.ParentController",
  kind: "enyo.Controller",
  autoLoad: true,
  data: {},
  handlers: {
    onLogin: 'login',
    onForgotPassword: 'forgotPassword',
    onUserSignup: 'userSignup',
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