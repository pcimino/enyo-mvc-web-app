var AAA = {}
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.UserSignupContent"
    , kind: "Bootplate.ParentContent"
    , id: 'userSignupContent'
    , handlers: {
       onUsernameStatus: 'usernameStatus'
    }
    , published: {
      usernameRef : {}
    }
    , bindings: [
      {
        from: ".$.validUsername.value",
        to: ".mvcApp.data",
        kind: "enyo.InputBinding"
      },{
        from: ".$.username.value",
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
    , inputChange: function(inSender, inEvent){
        console.log("inputChange", inSender.getValue(), inEvent);
    }
    , usernameStatus: function(inSender, inEvent) {
      console.log('usernameStatus 1');
        if (inEvent.exists == 'reset') {
          console.log('usernameStatus 2');
          this.$.bodyContainer.$.username.removeClass("text-input-confirm-box");
          this.$.bodyContainer.$.username.removeClass("text-input-error-box");
        } else {
          console.log('usernameStatus 3');
          if (inEvent.exists == true) {
            this.$.bodyContainer.$.username.addClass("text-input-error-box");
          } else {
            this.$.bodyContainer.$.username.addClass("text-input-confirm-box");
          }
        }
        return true;
    }
    , setupBodyContent: function(owner) {
        owner.createComponent(
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
                mvcApp.waterfall('onCheckUsername');
              }
              return true;
          }
        }
      );
      this.bindInputData(owner.$.username);
      // Why doesn't the "handlers : {}"" definition above work?
      // owner.$.username.handlers.onUsernameStatus = 'usernameStatus';
      owner.handlers.onUsernameStatus = this.usernameStatus;

      // bind taken care of in usernameChanged() : this.bindInputData(owner.$.username);
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
        { name: "vPassword",
          kind: "onyx.Input",
          classes:"form-input-box form-field-left-margin",
          placeholder: "Verify Password",
          owner: owner
        }
      );
      this.bindInputData(owner.$.vPassword);
      this.insertBreak(owner);
      this.insertInternalLink(owner, 'login2', 'Cancel');
      this.insertBreak(owner);
      this.insertInternalLink(owner, 'forgotPassword', 'Reset My Password');

      owner.render();
    } // end setupBodyContent
  });
});

