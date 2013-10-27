/**
* This is the UpdateMyUserInfoPage for authenticated users
*
* - updateUserStatus() displays username availability
* - setupPageBody() Child implementation
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.UpdateMyUserInfoPage"
    , kind: "Bootplate.ParentPage"
    , id: 'updateMyUserInfoPage'
    , authFlag: true // used to help determine if user has access to this page
    , handlers: {
        onNewUsernameStatus: 'newUsernameStatus'
        , onNewEmailStatus: 'newEmailStatus'
    }
    , published: {
        usernameRef : {}
        , emailRef : {}
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
    , newEmailStatus: function(inSender, inEvent) {
          this.emailRef.removeClass("text-input-confirm-box");
          this.emailRef.removeClass("text-input-error-box");

          if (inEvent.exists == true) {
            this.emailRef.addClass("text-input-error-box");
          } else {
            this.emailRef.addClass("text-input-confirm-box");
          }
        return true;
    }
    , setupPageBody: function(owner) {
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
                if (!this.value) {// || this.value.length < 4
                  this.removeClass("text-input-confirm-box");
                  this.removeClass("text-input-error-box");
                } else {
                  mvcApp.waterfall('onCheckNewUsername', {username:this.value});
                }
                return true;
            }
          }
        );
        owner.createComponent({kind:"enyo.Control", classes:'info-text form-field-left-margin', content:'Modifying your username will require you to update or reset your password.'});

        // TODO figure out and clean this up
        // Why don't the "handlers : {}"" definition above work?
        // presumably the ownership chain on the dynamic components
        owner.handlers.onUsernameStatus = this.usernameStatus;
        owner.handlers.onEmailStatus = this.emailStatus;

        owner.createComponent(
          { name: "newName"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Name"
            , owner: owner
          }
        );

        this.insertBreak(owner);
        this.emailRef = owner.createComponent(
          { name: "newEmail"
            , kind: "onyx.Input"
            , classes:"form-input-box form-field-left-margin"
            , placeholder: "Email"
            , owner: owner
            , handlers: {
                onblur: 'emailChanged'
              , onkeyup: 'emailChanged'
            }
            /**
            * When the username changes, check the lenght, if short remove any indicator classes
            * If longer than 3 characters, check availability, bubble the event up to the PublicController
            */
            , emailChanged: function(inSender, inEvent) {

                if (!this.value) {// || this.value.length < 4
                  this.removeClass("text-input-confirm-box");
                  this.removeClass("text-input-error-box");
                } else {
                  mvcApp.waterfall('onCheckNewEmail', {newEmail:this.value});
                }
                return true;
            }
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
           updateUser: function() {
             var user = {id:mvcApp.data.user._id, username:owner.$.newUsername.value, name:owner.$.newName.value, email:owner.$.newEmail.value};
             mvcApp.waterfall('onUserUpdate', user);
             return true;
           }
          }
        );

        owner.render();
      } // end setupPageBody
  });
});
















