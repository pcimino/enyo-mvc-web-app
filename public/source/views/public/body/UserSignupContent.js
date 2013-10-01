/**
* This is the UserSignupContent kind
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.UserSignupContent"
    , kind: "Bootplate.ParentContent"
    , id: 'userSignupContent'
    , authFlag: false
    , handlers: {
       onUsernameStatus: 'usernameStatus'
      , onEmailStatus: 'emailStatus'
    }
    , published: {
      usernameRef : {}
      , emailRef : {}
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , inputChange: function(inSender, inEvent){
        console.log("inputChange", inSender.getValue(), inEvent);
    }
    , usernameStatus: function(inSender, inEvent) {
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
    , emailStatus: function(inSender, inEvent) {
        // more kludging
        if (inEvent.exists == 'reset') {
          this.emailRef.removeClass("text-input-confirm-box");
          this.emailRef.removeClass("text-input-error-box");
        } else {
          if (inEvent.exists == true) {
            this.emailRef.addClass("text-input-error-box");
          } else {
            this.emailRef.addClass("text-input-confirm-box");
          }
        }
        return true;
    }
    , setupBodyContent: function(owner) {
        this.insertFormSpace(this);
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
          * When the username changes, check the length, if short remove any indicator classes
          * If longer than 3 characters, check availability, bubble the event up to the PublicController
          */
          , usernameChanged: function(inSender, inEvent) {
              mvcApp.data.username = this.value;
              if (!this.value || this.value.length < 4) {
                this.removeClass("text-input-confirm-box");
                this.removeClass("text-input-error-box");
              } else {
                mvcApp.waterfall('onCheckUsername', {username:owner.$.username.value});
              }
              return true;
          }
        }
      );
      this.bindInputData(owner.$.username);
      // TODO figure out and clean this up
      // Why doesn't the "handlers : {}"" definition above work?
      // presumably the ownership chain on the dynamic components
      owner.handlers.onUsernameStatus = this.usernameStatus;
      owner.handlers.onEmailStatus = this.emailStatus;

      owner.createComponent(
        { name: "name"
          , kind: "onyx.Input"
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Name"
          , owner: owner
        }
      );
      this.bindInputData(owner.$.name);

      this.emailRef = owner.createComponent(
        { name: "email"
          , kind: "onyx.Input"
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Email"
          , owner: owner
          , handlers: {
              onblur: 'emailChanged'
            , onkeyup: 'emailChanged'
          }
          /**
          * When the email changes, check the length, if short remove any indicator classes
          * If longer than 3 characters, check availability, bubble the event up to the PublicController
          */
          , emailChanged: function(inSender, inEvent) {
              mvcApp.data.email = this.value;
              if (!this.value || this.value.length < 4) {
                this.removeClass("text-input-confirm-box");
                this.removeClass("text-input-error-box");
              } else {
                mvcApp.waterfall('onCheckEmail', {email:owner.$.email.value, newEmail:owner.$.email.value});
              }
              return true;
          }
        }
      );
      this.bindInputData(owner.$.email);

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
      owner.createComponent(
        { kind: "onyx.Button",
         content: "Sign Up",
         classes: "onyx-blue form-field-left-margin",
         owner: owner,
         handlers: {
           onclick: 'signup'
         },
         signup: function() {
           mvcApp.waterfall('onUserSignup');
           return true;
         }
        }
      );

      this.insertBreak(owner);
      this.insertBreak(owner);
      this.insertInternalLink(owner, this.rndLink('login'), 'Cancel');

      owner.render();
    } // end setupBodyContent
  });
});












