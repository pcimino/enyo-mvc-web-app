enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.UpdateMyPasswordContent"
    , kind: "Bootplate.ParentContent"
    , id: 'updateUserInfoContent'
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
    , updateUserStatus: function(inSender, inEvent) {
        // more kludging
        if (inEvent.exists == 'reset') {
          this.usernameRef.removeClass("text-input-confirm-box");
          this.usernameRef.removeClass("text-input-error-box");
        } else {
          if (inEvent.exists == true) {
            this.usernameRef.addClass("text-input-error-box");
          } else {
            this.usernameRef.addClass("text-input-confirm-box");
          }
        }
        return true;
    }
    , setupBodyContent: function(owner) {

        this.insertBreak(owner);
        owner.createComponent(
          { name: "cPassword",
            kind: "onyx.Input",
            classes:"form-input-box form-field-left-margin",
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

        this.insertBreak(owner);
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserList', 'Search For Users');

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'deleteUser', 'Delete User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'home', 'Home');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
      } // end setupBodyContent
  });
});


