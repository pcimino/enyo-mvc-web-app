
/**
* MessagingDialog kind,
* used to display a dialog for the user to archive, unarchive, reply to a message thread
*
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.NewMessageDialog'
    , kind: 'onyx.Popup'
    , centered: true
    , float: true
    , id: 'newMessageDialog'
    , style: 'height:55%; width:75%; '
    , published : {
        messageThread:''
    }
    , components:[
      {name: 'nameContainer', "kind":"FittableColumns","components": [
          {"content":"To: ","classes":"list-item-margin bold-text"}
        , {name: "toUsername", "content":"test", style: "margin-left: 1%;"}
        ]}
        , {content:this.subject, name:'subjectLine', style: "margin-left: 5%;margin-bottom: 10px;padding-top: 30px;"}
        , { tag: "br", kind: 'enyo.Control'}
        , { name: "subjectText"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Subject"
            , style: "width:90%; margin-left:5%; "
        }
        , { tag: "br", kind: 'enyo.Control'}
        , { tag: "br", kind: 'enyo.Control'}
        , { name: "messageText"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Message Text"
            , style: "width:90%; margin-left:5%; "
        }

        , { tag: "br", kind: 'enyo.Control'}
        , { tag: "br", kind: 'enyo.Control'}
        , { kind: "onyx.Button"
            , content: "Send Message"
            , name: "SendMessage"
            , classes: "onyx-blue "
            , ontap: 'sendMessage'
            , style: "margin-left:5%; "
        }
        , { kind: "onyx.Button"
            , content: "Cancel"
            , name: "Cancel"
            , classes: "onyx-blue "
            , ontap: 'cancel'
            , style: "margin-left:5%; "
        }
    ]
    , setupDialog: function(messageThreadData) {
        // clear the message and reset the buttons (This object is reused)
        this.$.subjectText.setValue('');
        this.$.messageText.setValue('');
        this.$.toUsername.setContent(messageThreadData.toUsername);
        messageThreadData.fromUserId = mvcApp.data.user._id;
        messageThreadData.fromUsername = mvcApp.data.user.username;
        messageThreadData.subject = '';
        messageThreadData.messages = [];

        this.messageThread = messageThreadData;
    }
    , componentsReady: function() {
        this.inherited(arguments);
    }
    , sendMessage: function() {
        var messageText = this.$.messageText.getValue();
        if (messageText && messageText.length > 0) {
          this.messageThread.subject = this.$.subjectText.getValue();
          this.messageThread.message = messageText;
          // unarchive the message thread
          var ajaxMessage = new AJAX.SendMessage({owner:this, fireEvent:'onLoadMessageThreadsUserScreen', errorEvent:'onErrorSystemMessages'});
          ajaxMessage.makeRequest(this.messageThread);
          this.hide();
        } else {
          mvcApp.showWarningMessage('Missing Data', 'Enter a message before sending');
        }
    }
    , cancel: function() {
        this.hide();
    }
  })
});




