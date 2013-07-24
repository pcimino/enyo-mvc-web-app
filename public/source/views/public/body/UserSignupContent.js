var AAA = {}
enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.UserSignupContent"
    , kind: "Bootplate.ParentContent"
    , id: 'userSignupContent'
    , published: {
        validUsername: false
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
    , validUsernameChanged: function() {
        if (this.validUsername) {
          this.$.bodyContainer.$.username.addClass("text-input-confirm-box");
        } else {
          this.$.bodyContainer.$.username.addClass("text-input-error-box");
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
                console.log('onCheckUsername');
                  mvcApp.data.username = this.value;
                  if (!this.value || this.value.length < 4) {
                    this.removeClass("text-input-confirm-box");
                    this.removeClass("text-input-error-box");
                  } else {
                    // ?? this.bubbleUp('onCheckUsername');
                    mvcApp.waterfall('onCheckUsername');
                  }
                  return true;
              }
            }
        );
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

