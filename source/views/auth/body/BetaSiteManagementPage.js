
/**
* This is the page for managing beta mode on the site kind, displays the authenticated user's home page
*
* - setupPageBody() Implemented child method
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.BetaSiteManagementPage'
    , kind: 'Bootplate.AuthPage'
    , id: 'betaSiteManagementPage'
    , handlers: {
       onGetBetaStatusResult: 'getBetaStatusResult'
      , onSendBetaInviteResult: 'sendBetaInviteResult'
      , onUpdateBetaStatusResult: 'updateBetaStatusResult'
    }
    , components:[
        { tag: "br", kind: 'enyo.Control'},
          {name: 'betaStatus', kind: "onyx.RadioGroup", onActivate:"tabActivated", style: "margin-left:5%; ", controlClasses: "onyx-tabbutton", components: [
          {name:'openSignupButton', content: "Open Signup"},
          {name:'betaSignupButton', content: "Beta Invite Only Signup" }
        ]},
        { tag: "br", kind: 'enyo.Control'},
        { name: "email",
          kind: "onyx.Input",
          classes:"form-input-box ",
          placeholder: "Email Address",
          style: "width:50%; margin-left:5%; "
        },
        { tag: "br", kind: 'enyo.Control'},
        { kind: "onyx.Button",
          content: "Send Beta Invite",
          name: "SendBeta",
          classes: "onyx-blue ",
          ontap: 'sendBeta',
          style: "margin-left:5%; "
        }
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        this.getBetaStatus();
    }
    , setupPageBody: function(owner) {
        owner.render();
    } // end setupPageBody
    , sendBeta: function() {
        var email = this.$.email.getValue();
        if (email && email.length > 0) {
          var ajaxMessage = new AJAX.SendBetaInvite({owner:this, fireEvent:'onSendBetaInviteResult', errorEvent:'onErrorSystemMessages'});
          ajaxMessage.makeRequest({email:email});
        } else {
          mvcApp.showWarningMessage('Missing Data', 'Enter an Email Address before sending');
        }
    }
    , sendBetaInviteResult: function(inSender, inEvent) {
        mvcApp.showInfoMessage(inEvent.message);
    }
    , getBetaStatus: function() {
        var ajaxMessage = new JSONP.GetBetaStatus({owner:this, fireEvent:'onGetBetaStatusResult', errorEvent:'onErrorSystemMessages'});
        ajaxMessage.makeRequest({});
    }
    , getBetaStatusResult: function(inSender, inEvent) {
        if (inEvent.status) {
          this.$.betaSignupButton.setActive(true);
        } else {
          this.$.openSignupButton.setActive(true);
        }
    }
    , tabActivated: function(inSender, inEvent) {
        if (inEvent.originator.getActive()) {
          var status = inEvent.originator.name == 'betaSignupButton';
          var ajaxMessage = new AJAX.UpdateBetaStatus({owner:this, fireEvent:'onUpdateBetaStatusResult', errorEvent:'onErrorSystemMessages'});
          ajaxMessage.makeRequest({status:status});
        }
    }
    , updateBetaStatusResult: function(inSender, inEvent) {
        mvcApp.showWarningMessage(inEvent.message);
    }

  });
});





