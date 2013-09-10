/**
* UpdateMyPasswordContent kind for suthenticated user to update their password
*
* - setupBodyContent() Implemented setup method
*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.UpdateMyPasswordContent"
    , kind: "Bootplate.ParentContent"
    , id: 'updateUserInfoContent'
    , authFlag: true // used to help determine if user has access to this page
    , handlers: {
       onUpdateUserStatus: 'updateUserStatus'
    }
    , published: {
      usernameRef : {}
    }
    , bindings: [
      {
        from: ".$.cPassword.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
        from: ".$.password.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
        from: ".$.vPassword.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      }
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {

        this.insertFormSpace(owner);
        owner.createComponent(
          { name: "cPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin form-top-margin",
            placeholder: "Current Password",
            owner: owner
          }
        );
        this.bindInputData(owner.$.cPassword);

        this.insertBreak(owner);
        owner.createComponent(
          { name: "password",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "New Password",
            owner: owner
          }
        );
        this.bindInputData(owner.$.password);

        this.insertBreak(owner);
        owner.createComponent(
          { name: "vPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
            placeholder: "Verify Password",
            owner: owner
          }
        );
        this.bindInputData(owner.$.vPassword);

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
             mvcApp.waterfall('onUserUpdate');
             return true;
           }
          }
        );

        owner.render();
      } // end setupBodyContent
  });
});








