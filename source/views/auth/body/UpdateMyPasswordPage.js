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
        owner.createComponent(
          { name: "cPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin form-top-margin",
            placeholder: "Current Password",
            owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { name: "newPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "New Password",
            owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { name: "vPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "Verify Password",
            owner: owner
          }
        );

        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button",
           content: "Update",
           classes: "onyx-blue form-field-left-margin",
           owner: owner,
           handlers: {
             onclick: 'updateUser'
           },
           updateUser: function () {
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















