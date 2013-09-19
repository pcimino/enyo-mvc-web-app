/**
* This is the UpdateMyUserInfoContent for authenticated users
*
* - updateUserStatus() displays username availability
* - setupBodyContent() Child implementation
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.UpdateMyUserInfoContent"
    , kind: "Bootplate.ParentContent"
    , id: 'updateMyUserInfoContent'
    , authFlag: true // used to help determine if user has access to this page
    , handlers: {
        onNewUsernameStatus: 'newUsernameStatus'
    }
    , published: {
      usernameRef : {}
    }
    , rendered: function() {
        this.inherited(arguments);
    }
    , newUsernameStatus: function(inSender, inEvent) {
          this.usernameRef.removeClass("text-input-confirm-box");
          this.usernameRef.removeClass("text-input-error-box");

          if (inEvent.exists == true) {
            this.usernameRef.addClass("text-input-error-box");
          } else {
            this.usernameRef.addClass("text-input-confirm-box");
          }
        return true;
    }
    , setupBodyContent: function(owner) {
          this.insertFormSpace(owner);
          this.usernameRef = owner.createComponent(
          { name: "newUsername"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin form-top-margin"
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
                mvcApp.data.newUsername = this.value;
                if (!this.value) {// || this.value.length < 4
                  this.removeClass("text-input-confirm-box");
                  this.removeClass("text-input-error-box");
                } else {
                  mvcApp.waterfall('onCheckNewUsername');
                }
                return true;
            }
          }
        );
        owner.createComponent({kind:"enyo.Control", classes:'info-text form-field-left-margin', content:'Modifying your username will require you to update or reset your password.'});


        this.bindInputData(owner.$.newUsername);
        // Why doesn't the "handlers : {}"" definition above work?
        // owner.$.username.handlers.onUsernameStatus = 'usernameStatus';
        owner.handlers.onUsernameStatus = this.usernameStatus;

        owner.createComponent(
          { name: "newName"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Name"
            , owner: owner
          }
        );
        this.bindInputData(owner.$.newName);

        this.insertBreak(owner);
        owner.createComponent(
          { name: "newEmail"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Email"
            , owner: owner
          }
        );
        this.bindInputData(owner.$.newEmail);

        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button",
           content: "Update",
           classes: "onyx-blue form-field-left-margin",
           owner: owner,
           handlers: {
             onclick: 'updateUser'
           },
           updateUser: function() {
             mvcApp.waterfall('onUserUpdate');
             return true;
           }
          }
        );

        owner.render();
      } // end setupBodyContent
  });
});













