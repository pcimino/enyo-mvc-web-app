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
    , id: 'updateUserInfoContent'
    , authFlag: true // used to help determine if user has access to this page
    , handlers: {
       onUpdateUserStatus: 'updateUserStatus'
    }
    , published: {
      usernameRef : {}
    }
    /*, bindings: [
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
      }
    ]*/
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








