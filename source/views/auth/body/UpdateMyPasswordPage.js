
/**
* UpdateMyPasswordPage kind for suthenticated user to update their password
*
* - setupPageBody() Implemented setup method
*/
enyo.ready(function () {
  enyo.kind({
    name: 'Bootplate.UpdateMyPasswordPage'
    , kind: 'Bootplate.AuthPage'
    , id: 'updateMyPasswordPage'
    , handlers: {
       onUpdateUserStatus: 'updateUserStatus'
    }
    , published: {
      usernameRef : {}
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.insertFormSpace(owner);
        owner.createComponent({kind: enyo.Checkbox
          , checked:true
          , name: 'showPassword'
          , onActivate: 'passwordCheckboxChanged'
          , content:'Hide Passwords'
          , classes:"form-input-box form-field-left-margin"
          , owner:owner
          , handlers: {
             onActivate: 'passwordCheckboxChanged' // TODO the onActivate defined above should work, not sure why I had to add the handler here
          }
          , passwordCheckboxChanged: function() {
              var ch = owner.$.showPassword.getChecked();
              if (ch) {
                owner.$.cPassword.setType('password');
                owner.$.vPassword.setType('password');
                owner.$.newPassword.setType('password');
              } else {
                owner.$.cPassword.setType('text');
                owner.$.vPassword.setType('text');
                owner.$.newPassword.setType('text');
              }
            }
        });


        this.insertBreak(owner);
        owner.createComponent(
          { name: "cPassword"
            , kind: "onyx.Input"
            , type: 'password'
            , classes:"form-input-box form-field-left-margin form-top-margin"
            , placeholder: "Current Password"
            , owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { name: "newPassword"
            , kind: "onyx.Input"
            , type: 'password'
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "New Password"
            , owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { name: "vPassword"
            , kind: "onyx.Input"
            , type: 'password'
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Verify Password"
            , owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button"
           , content: "Update"
           , classes: "onyx-blue form-field-left-margin"
           , owner: owner
           , handlers: {
             onclick: 'updateUser'
           }
           , updateUser: function () {
             var user = {id:mvcApp.data.user._id, cPassword:owner.$.cPassword.value, password:owner.$.newPassword.value, vPassword:owner.$.vPassword.value};
             mvcApp.waterfall('onUserUpdate', user);
             return true;
           }
          }
        );

        owner.render();
      } // end setupPageBody
  });
});


















