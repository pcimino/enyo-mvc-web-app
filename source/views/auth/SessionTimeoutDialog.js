
/**
* Popup for telling user session is about to end
*
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.SessionTimeoutDialog'
    , kind: 'onyx.Popup'
    , centered: true
    , float: true
    , id: 'sessionTimeoutDialog'
    , style: 'height:45%; width:45%; '
    , autoDismiss: false
    , published : {
        timeRemaining: 60000
        , checkInterval: 1000
        , intervalKey: ''
    }
    , handlers: {
        onCheckRemainingSessionTime: 'checkRemainingSessionTime'
    }
    , components:[
        {content:'Your session will end in 60 seconds.', name: "countDownText", style: "margin-top: 10%;margin-left: 20%;"}
        , { kind: "onyx.Button"
            , content: "Logout Now"
            , name: "logoutNow"
            , classes: "onyx-blue"
            , style: "margin-top: 10%;margin-left: 10%;"
            , ontap: 'logoutNow'
        }
        , { kind: "onyx.Button"
            , content: "Return to Session"
            , name: "continueSession"
            , classes: "onyx-blue"
            , style: "margin-top: 10%;margin-left: 30%;"
            , ontap: 'continueSession'
        }

    ]
    , startTimer: function() {
        this.timeRemaining = mvcApp.sessionTimeRemaining;
      if (this.intervalKey) { clearInterval(this.intervalKey); }
        this.intervalKey = setInterval(function(){ mvcApp.authView.waterfall('onCheckRemainingSessionTime'); }, this.checkInterval );
    }
    , checkRemainingSessionTime: function(inSender, inEvent) {
        this.timeRemaining -= this.checkInterval;
        var remainingSec =
        this.$.countDownText.setContent("Your session will end in " + (this.timeRemaining/1000) + " seconds.");
        if (this.timeRemaining <= 0) {
            clearInterval(this.intervalKey);
            mvcApp.controllers.authController.logout();
            this.hide();
        }
    }
    , logoutNow: function(inSender, inEvent) {
        clearInterval(this.intervalKey);
        mvcApp.controllers.authController.logout();
        this.hide();
    }
    , continueSession: function(inSender, inEvent) {
        clearInterval(this.intervalKey);
        mvcApp.authView.waterfall('onGetSessionTimeout');
        this.hide();
    }
  });
});






