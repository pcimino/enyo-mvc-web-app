/*
http://forums.enyojs.com/discussion/comment/7103/#Comment_7103

Is it possible to create new bindings dynamically in the view? like doing so:
var bind = new enyo.Binding({from: ".myApplication.controllers.ModelController." + attribute, to: ".$." + attribute + ".content"});
this.bindings.push(bind);


It should be, then you would call this.refreshBindings();

*/
    /*, bindings: [
      { from: ".$.username.value"
        , to: "mvcApp.controllers.publicController.test"
        , kind: "enyo.InputBinding"
      }
      , { from: ".$.password.value"
          , to: "mvcApp.data"
          , kind: "enyo.InputBinding"
      }
    ]*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.LoginContent"
    , kind: "Bootplate.ParentContent"
    , id: 'loginContent'
    , authFlag: false
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner, renderFlag) {
        owner.createComponent(
          { name: "username"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Username"
            , owner: owner  // http://jsfiddle.net/pcimino/Cxa2U
          }
        );

        // setup the binding between the input and the Controller data store
        this.bindInputData(owner.$.username);

        this.insertBreak(owner);
        owner.createComponent(
          { name: "password",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "Password",
            owner: owner
          }
        );
        this.bindInputData(owner.$.password);
        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button",
            content: "Login",
            classes: "onyx-blue form-field-left-margin",
            owner: owner,
            handlers: {
              onclick: 'login'
            },
            login: function () {
              mvcApp.waterfall('onLogin');
              return true;
            }
          }
        );

      // only call this on navigation, not initial load
        if (renderFlag) owner.render();
    } // end setupBodyContent
  });
});




