/**
* This is the UserSignupPage kind
*/
var gUserSignupPage = {}; // hate globals, having issues with dynamic components
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.UserSignupPage'
    , kind: 'Bootplate.PublicPage'
    , id: 'userSignupPage'
    , handlers: {
       onUsernameStatus: 'usernameStatus'
      , onEmailStatus: 'emailStatus'
      , onShowBetaSignup: 'showBetaSignup'
      , onPuzzleSolved: 'puzzleSolved'
    }
    , published: {
        usernameRef : {}
        , emailRef : {}
        , betaCode : {}
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        gUserSignupPage = this;
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
    , setupPageBody: function(owner) {
        // this.insertFormSpace(this);
        var lWidth = window.innerWidth / 3;

        owner.createComponent({name: 'enyoCaptcha'
                             , kind: 'tld.EnyoCaptcha'
                             , successDisplayText: 'Captcha solved!'
                             , width:lWidth, height:250
                             , owner: this
                             , callback: this.puzzleSolved
                             , classes:"form-input-box"});

        this.insertBreak(owner);

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
      // Why doesn't the "handlers : {}" definition above work?
      // presumably the ownership chain on the dynamic components
      owner.handlers.onUsernameStatus = this.usernameStatus;
      owner.handlers.onEmailStatus = this.emailStatus;

      this.insertBreak(owner);
      owner.createComponent(
        { name: "name"
          , kind: "onyx.Input"
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Name"
          , owner: owner
        }
      );
      this.bindInputData(owner.$.name);

      this.insertBreak(owner);
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
                mvcApp.waterfall('onCheckEmail', {email:owner.$.email.value, newEmail:owner.$.email.value, errorEvent:'onErrorSystemMessages'});
              }
              return true;
          }
        }
      );
      this.bindInputData(owner.$.email);

      this.insertBreak(owner);
      this.betaCode = owner.createComponent(
        { name: "betaCode"
          , kind: "onyx.Input"
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Beta Invite Code"
          , owner: owner
          , showing: false
        }
      );
      this.bindInputData(owner.$.betaCode);
      this.insertBreak(owner);

      owner.createComponent({kind: enyo.Checkbox
        , checked:true
        , name: 'showPassword'
        , onActivate: 'passwordCheckboxChanged'
        , content:'Hide Password'
        , classes:"form-input-box form-field-left-margin"
        , owner:owner
        , handlers: {
           onActivate: 'passwordCheckboxChanged' // TODO the onActivate defined above should work, not sure why I had to add the handler here
        }
        , passwordCheckboxChanged: function() {
            var ch = owner.$.showPassword.getChecked();
            if (ch) {
              owner.$.password.setType('password');
              owner.$.vPassword.setType('password');
            } else {
              owner.$.password.setType('text');
              owner.$.vPassword.setType('text');
            }
          }
      });

      // bind taken care of in usernameChanged() : this.bindInputData(owner.$.username);
      this.insertBreak(owner);
      owner.createComponent(
        { name: "password"
          , kind: "onyx.Input"
          , type:'password'
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Password"
          , owner: owner
        }
      );

      this.bindInputData(owner.$.password);
      this.insertBreak(owner);
      owner.createComponent(
        { name: "vPassword"
          , kind: "onyx.Input"
          , type:'password'
          , classes:"form-input-box form-field-left-margin"
          , placeholder: "Verify Password"
          , owner: owner
        }
      );
      this.bindInputData(owner.$.vPassword);

      this.insertBreak(owner);


      owner.createComponent(
        { kind: "onyx.Button"
         , content: "Sign Up"
         , classes: "onyx-blue form-field-left-margin"
         , owner: owner
         , handlers: {
           onclick: 'signup'
         }
         , signup: function() {
           console.log("AAAAAAAA " + gUserSignupPage.$.enyoCaptcha.getPassed());
             if (gUserSignupPage.$.enyoCaptcha.getPassed()) {
               mvcApp.waterfall('onUserSignup', {username:owner.$.username.value, errorEvent:'onErrorSystemMessages'});
               return true;
             } else {
               mvcApp.showErrorMessage("Complete Captcha", "Please solve the puzzle so we know you're not a robot.");
               return false;
             }
         }
        }
      );

      this.insertBreak(owner);
      this.insertBreak(owner);
      this.insertInternalLink(owner, this.rndLink('login'), 'Cancel');

      owner.render();
    } // end setupPageBody
    , showBetaSignup: function() {
        if (mvcApp.betaSiteSignup) {
          this.betaCode.show();
        } else {
          this.betaCode.hide();
        }
        this.betaCode.render();
    }
    // Captch puzzle solved
    , puzzleSolved: function(inSender, inEvent) {
        // TODO having issues with dynamically created components firing events
      console.log("UserSignupPage puzzleSolved");
      this.bubble('onPuzzleSolvedController');
    }
  });
});


























