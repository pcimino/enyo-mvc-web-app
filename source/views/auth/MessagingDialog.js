
/**
* MessagingDialog kind,
* used to display a dialog for the user to archive, unarchive, reply to a message thread
*
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.MessagingDialog'
    , kind: 'onyx.Popup'
    , centered: true
    , float: true
    , id: 'messagingDialog'
    , style: 'height:55%; width:75%; '
    , published : {
        messageThread:''
    }
    , components:[
        {content:this.subject, name:'subjectLine', style: "margin-left: 5%;margin-bottom: 10px;padding-top: 30px;"}
        , {kind: 'enyo.FittableColumns', name:'messages', style: "margin-left: 5%;margin-bottom: 10px;padding-top: 30px;"}
        , { tag: "br", kind: 'enyo.Control'}
        , { name: "messageText"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Reply Message"
            , style: "width:90%; margin-left:5%; "
        }
        , { tag: "br", kind: 'enyo.Control'}
        , { tag: "br", kind: 'enyo.Control'}
        , { kind: "onyx.Button"
            , content: "Reply to Message"
            , name: "ReplyMessage"
            , classes: "onyx-blue "
            , ontap: 'replyMessage'
            , style: "margin-left:5%; "
        }
        , { kind: "onyx.Button"
            , content: "Archive Message Thread"
            , name: "ArchiveMessageThread"
            , classes: "onyx-blue "
            , ontap: 'archiveMessage'
            , style: "margin-left:5%; "
        }
        , { kind: "onyx.Button"
            , content: "Un-archive Message Thread"
            , name: "UnarchiveMessageThread"
            , classes: "onyx-blue "
            , ontap: 'unarchiveMessage'
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
        this.setMessageThread(messageThreadData);

        var archiveFlag = false;
        if (mvcApp.data.user._id == messageThreadData.fromUserId && messageThreadData.fromArchiveFlag) {
          archiveFlag = true;
        } else if (mvcApp.data.user._id == messageThreadData.toUserId && messageThreadData.toArchiveFlag) {
          archiveFlag = true;
        }

        // clear the message and reset the buttons (This object is reused)
        this.$.messageText.setValue('');

        if (archiveFlag) {
            this.$.ReplyMessage.setDisabled(true);
            this.$.ArchiveMessageThread.setDisabled(true);
            this.$.messageText.setDisabled(true);
            this.$.UnarchiveMessageThread.setDisabled(false);
        } else {
            this.$.ReplyMessage.setDisabled(false);
            this.$.ArchiveMessageThread.setDisabled(false);
            this.$.messageText.setDisabled(false);
            this.$.UnarchiveMessageThread.setDisabled(true);
        }
        this.$.subjectLine.setContent('Subject: ' + messageThreadData.subject);

        // build message list
        this.$.messages.destroyComponents();
        var messagePage = "";
        for (var i = 0; i < messageThreadData.messages.length; i++) {
          if ((i % 2) == 1) from = messageThreadData.toUsername;
          this.$.messages.createComponent(
            {"kind":"FittableColumns","components": [
              {"content":"From: ","classes":"list-item-margin bold-text"}
              ,{"content": messageThreadData.messages[i].from }
              ,{"content":"Message: ","classes":"list-item-margin bold-text"}
              ,{"content": messageThreadData.messages[i].message }
            ]});
        }
      this.$.messages.render()
    }
    , componentsReady: function() {
        this.inherited(arguments);
    }
    , replyMessage: function() {
        var messageText = this.$.messageText.getValue();
        if (messageText && messageText.length > 0) {
          // messages array contains object {from:'', message:''}
          // no real way to enforce this here
          this.messageThread.messages.push({from: mvcApp.data.user.username, message: messageText});
          // unarchive the message thread
          var ajaxMessage = new AJAX.UpdateMessageThread({owner:this, fireEvent:'onGetMessageThreadsUserScreen'});
          ajaxMessage.makeRequest(this.messageThread);
          this.hide();
        } else {
          mvcApp.showErrorMessage('Missing Data', 'Enter a message before sending');
        }
    }
    , archiveMessage: function() {
        // archive the message thread
        var ajaxMessage = new AJAX.ArchiveMessageThread({owner:this, fireEvent:'onGetMessageThreadsUserScreen'});
        ajaxMessage.makeRequest({messageThreadId: this.messageThread._id});
        this.hide();
    }
    , unarchiveMessage: function() {
        if (mvcApp.data.user._id == this.messageThread.fromUserId && this.messageThread.fromArchiveFlag) {
          this.messageThread.fromArchiveFlag = false;
        } else if (mvcApp.data.user._id == this.messageThread.toUserId && this.messageThread.toArchiveFlag) {
          this.messageThread.toArchiveFlag = false;
        }
        // unarchive the message thread
        var ajaxMessage = new AJAX.UpdateMessageThread({owner:this, fireEvent:'onGetMessageThreadsUserScreen', errorEvent:'onErrorSystemMessages'});
        ajaxMessage.makeRequest(this.messageThread);
        this.hide();
    }
    , cancel: function() {
        this.hide();
    }
  })
});




