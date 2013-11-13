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


/**
* This is the Login Page content kind.
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.LoginPage'
    , kind: 'Bootplate.PublicPage'
    , id: 'loginPage'
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(owner);
        owner.createComponent(
          { name: "username"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Username"
            , owner: owner  // http://jsfiddle.net/pcimino/Cxa2U
          }
        );

        this.insertBreak(owner);

        owner.createComponent({kind: enyo.Checkbox
          , checked:true
          , name: 'showPassword'
          , onActivate: 'passwordCheckboxChanged'
          , content:'Hide Password'
          , classes:"form-input-box form-field-left-margin"
          , owner:owner
          , handlers: {
             onActivate: 'passwordCheckboxChanged' // TODO the onActivate defined above should work, not sure why I had to add the handler here
          }
          , passwordCheckboxChanged: function() {
              var ch = owner.$.showPassword.getChecked();
              if (ch) {
                owner.$.password.setType('password');
              } else {
                owner.$.password.setType('text');
              }
            }
        });

        this.insertBreak(owner);
        owner.createComponent(
          { name: "password"
            , type: 'password'
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Password"
            , owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button"
            , content: "Login"
            , classes: "onyx-blue form-field-left-margin"
            ,  owner: owner
            , handlers: {
              onclick: 'login'
            }
            , login: function() {
              mvcApp.waterfall('onLogin', {username: owner.$.username.value, password: owner.$.password.value});
              return true;
            }
          }
        );

      // only call this on navigation, not initial load
        owner.render();
    } // end setupPageBody
  });
});
















