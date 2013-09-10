/**
* UpdateUserInfoContent kind, displays the form for the user to update some of their information
* - updateUserStatus() used to display issues with username
* - setupBodyContent() Implemented setup method
*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.UpdateUserInfoContent"
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
        from: ".$.name.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
        from: ".$.email.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
        from: ".$.username.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
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
          this.insertFormSpace(owner);
          this.usernameRef = owner.createComponent(
          { name: "username"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Username"
            , owner: owner
            , handlers: {
                onblur: 'usernameChanged'
              , onkeyup: 'usernameChanged'
            }
            /**
            * When the username changes, check the lenght, if short remove any indicator classes
            * If longer than 3 characters, check availability, bubble the event up to the PublicController
            */
            , usernameChanged: function(inSender, inEvent) {
                mvcApp.data.username = this.value;
                if (!this.value || this.value.length < 4) {
                  this.removeClass("text-input-confirm-box");
                  this.removeClass("text-input-error-box");
                } else {
                  mvcApp.waterfall('onCheckChangeUsername');
                }
                return true;
            }
          }
        );
        this.bindInputData(owner.$.username);
        // Why doesn't the "handlers : {}"" definition above work?
        // owner.$.username.handlers.onUsernameStatus = 'usernameStatus';
        owner.handlers.onUsernameStatus = this.usernameStatus;

        owner.createComponent(
          { name: "name"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Name"
            , owner: owner
          }
        );
        this.bindInputData(owner.$.name);

        owner.createComponent(
          { name: "email"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Email"
            , owner: owner
          }
        );
        this.bindInputData(owner.$.email);

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







