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
    , usernameChanged: function() {
        console.log('onCheckUsername')
        this.bubble('onCheckUsername');
      }
    , inputChange: function(inSender, inEvent){
		    console.log("inputChange", inSender.getValue(), inEvent);
	    }
    , validUsernameChanged: function() {
        if (this.validUsername) {
          this.$.bodyContainer.$.username.addClass(form-input-confirm-box);
        } else {
          this.$.bodyContainer.$.username.addClass(form-input-error-box);
        }
      }
    , setupBodyContent: function(owner) {
        owner.createComponent(
            { name: "username",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Username",
              onchange: 'usernameChanged',
              onkeypress: 'usernameChanged',
              ontap: 'usernameChanged',
              owner: owner
            }
        );
        this.insertBreak(owner);
        owner.createComponent(
            { name: "password",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Password",
              owner: owner
            }
        );
        this.insertBreak(owner);
        owner.createComponent(
            { name: "vPassword",
              kind: "onyx.Input",
              classes:"form-input-box form-field-left-margin",
              placeholder: "Verify Password",
              owner: owner
            }
        );
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'login2', 'Cancel');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'forgotPassword', 'Reset My Password');

        owner.render();
      } // end setupBodyContent
  });
});

