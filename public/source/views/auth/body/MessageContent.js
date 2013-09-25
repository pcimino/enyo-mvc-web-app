// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* MessageContent kind,
* used to create and send messages between users
*
* - setupBodyContent() Impemented method
*/
var AAA
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.MessageContent"
    , kind: "Bootplate.ParentContent"
    , id: 'messageContent'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
    , handlers: {
        onGetMessageThreadsUserScreen: 'getMessageThreadsUserScreen'
        , onLoadMessageThreadsUserScreen: 'loadMessageThreadsUserScreen'
        , onGetSystemMessagesUserScreen: 'getSystemMessagesUserScreen'
        , onLoadSystemMessagesUserScreen: 'loadSystemMessagesUserScreen'
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {
        this.createComponent({content:'Message Threads', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent(
          { name: "subject"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Subject"
            , owner: this
            , style: "width:10%; margin-left:10%; "
          }
        );
        this.insertBreak(owner);
        this.createComponent(
          { name: "message"
            , kind: "onyx.Input"
            , classes:"form-input-box "
            , placeholder: "Message"
            , owner: this
            , style: "width:80%; margin-left:10%; "
          }
        );
        this.insertBreak(owner);
        this.createComponent(
          { kind: "onyx.Button"
            , content: "Send Message"
            , classes: "onyx-blue "
            , owner: this
            , ontap: 'sendMessage'
            , style: "margin-left:10%; "
          }
        );
        this.insertBreak(this);
        this.insertBreak(this);
        this.createComponent({kind: enyo.Checkbox, name: 'showArchivedThreadsCheckbox', onActivate: 'threadCheckboxChanged', content:'Show Archived Message Threads', style: "margin-left: 10%;margin-bottom: 10px;", owner:this});
        this.createComponent({name: "messageThreadList"
          , kind: "macfja.DynamicList"
          , defaultRowHeight: 20
          , style: "width:80%; margin-left:10%; height: 150px; border: 1px solid grey"
          , onSetupRow: "setupMessageThreadRow"
          , onRowTap: "messageThreadTap"
          , classes:"form-input-box form-top-margin"
          , owner: this
        });
    /////////////////////
    // System messages
    /////////////////////
        this.createComponent({content:'System Messages', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent({kind: enyo.Checkbox, name: 'showArchivedCheckbox', onActivate: 'checkboxChanged', content:'Show Archived Messages', style: "margin-left: 10%;margin-bottom: 10px;", owner:this});
        this.createComponent({name: "systemMessageList"
            , kind: "macfja.DynamicList"
            , defaultRowHeight: 20
            , style: "width:80%; margin-left:10%; height: 150px; border: 1px solid grey"
            , onSetupRow: "setupRow"
            , classes:"form-input-box form-top-margin"
            , owner: this
          });
          owner.render();

        // populate the list
        this.getMessageThreadsUserScreen();
        this.getSystemMessagesUserScreen();
    } // end setupBodyContent

    , sendMessage: function(inSender, inEvent) {
        var subject = this.$.subject.getValue();
        var message = this.$.message.getValue();
        if (subject && subject.length > 0 && message && message.length > 0) {
          // archive the system message
          var ajaxSysMessage = new AJAX.SendSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen'});
          ajaxSysMessage.makeRequest({subject: subject, message:message });
        } else {
          mvcApp.showErrorMessage('Missing Data', 'Enter the subject and message before sending.');
        }
    }
    , threadCheckboxChanged : function() {
        console.log('Checkbox value ' + this.$.showArchivedThreadsCheckbox.getChecked());
        // reload the message list
        this.getMessageThreadsUserScreen();
    }
    , getMessageThreadsUserScreen: function() {
        // load the system message
        var jsonpGetMessageThreads = new JSONP.GetMessageThreads({owner:this, fireEvent:'onLoadMessageThreadsUserScreen'});
        jsonpGetMessageThreads.makeRequest({archiveFlag: this.$.showArchivedThreadsCheckbox.getChecked()});
    }
    // Display message threads
    , loadMessageThreadsUserScreen: function(inSender, inEvent) {
        this.$.messageThreadList.setItems(inEvent);
        return true;
    }
    , setupMessageThreadRow: function(inSender, inEvent) {
      // This is about to get messy, I want to dynamically add N rows of messages to the
      // row. Why Lists and scrollers can't take objects? I think the object for the row is predefined when setup
      // is called but can't add components to it
      // When using JSON.parse(string). keep in mind that this is valid:
      //   JSON.parse('{"kind":"onyx.Button","content":"Reply"}');
      // and these are NOT valid:
      //   JSON.parse("{'kind':'onyx.Button','content':'Reply'}");  String in double " instead of single '
      //   JSON.parse('{kind:"onyx.Button",content:"Reply"}');  Attributes and values must be quoted

      // build the rows of messages
      var messageContent = "";
      for (var i = 0; i < inEvent.context.messages.length; i++) {
        var from = inEvent.context.fromUsername;
        if ((i % 2) == 1) from = inEvent.context.toUsername;
        if (i > 0) messageContent = messageContent + ',';
        messageContent = messageContent + '{"kind":"FittableColumns","components": [';
        messageContent = messageContent + '{"content":"From: ","classes":"list-item-margin bold-text"}';
        messageContent = messageContent + ',{"content":"' + from + '"}';
        messageContent = messageContent + ',{"content":"Message: ","classes":"list-item-margin bold-text"}';
        messageContent = messageContent + ',{"content":"' + inEvent.context.messages[i] + '"}';
        messageContent = messageContent + ']}';
      }

      // start building the List Row string to parse
      var jsonStr = '{"components": [';
      jsonStr = jsonStr + '{"kind":"FittableColumns","components":[';
      jsonStr = jsonStr + '  {"content":"Subject: ","classes":"list-item-margin bold-text"}';
      jsonStr = jsonStr + '  , {"content":"' + inEvent.context.subject + '"}';
      jsonStr = jsonStr + ']}';
      jsonStr = jsonStr + ',{"kind":"FittableRows","components": [';
      jsonStr = jsonStr + messageContent;
      jsonStr = jsonStr + ']}'

      // have to present an action modal on click
      // 'this' doesn't work with the JSON string manipulation
      // jsonStr = jsonStr + ',{"kind":"onyx.Button","content":"Reply","ontap":"replyMessageThread","id":"replyMessageThread_'+inEvent.context._id+'","owner":"' + this + '","classes":"list-item-margin"}';
      // jsonStr = jsonStr + ',{"kind":"onyx.Button","content":"Archive","ontap":"archiveMessageThread","id":"archiveMessageThread_'+inEvent.context._id+'","owner":"' + this + '","classes":"list-item-margin"}';

      jsonStr = jsonStr + ']}';

      // Parse the
      var jsonObj = JSON.parse(jsonStr);
      inEvent.template = jsonObj;

        // alternatively, DynamicList supports html like this:
        //    inEvent.template="<div style=\"border: 2px solid #000; font-size: 20px; padding: 10px;\">" + inEvent.context.fromUsername + "</div>";
    }
    , messageThreadTap: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('replyMessageThread_') + ("replyMessageThread_").length)).trim();
      console.log('messageThreadTap ' + objId + ":" + JSON.stringify(inEvent))
    }
    , archiveMessageThread: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('archiveMessageThread_') + ("archiveMessageThread_").length)).trim();
        // archive the system message
        var ajaxMessage = new AJAX.ArchiveMessageThread({owner:this, fireEvent:'onGetSystemMessagesUserScreen'});
        ajaxMessage.makeRequest({messageThreadId: objId});
    }
    /////////////////////
    // System messages
    /////////////////////
    , checkboxChanged : function() {
        console.log('Checkbox value ' + this.$.showArchivedCheckbox.getChecked());
        // reload the message list
        this.getSystemMessagesUserScreen();
    }
    , getSystemMessagesUserScreen: function() {
        // load the system message
        var jsonpGetSysMessages = new JSONP.GetSystemMessages({owner:this, fireEvent:'onLoadSystemMessagesUserScreen'});
        jsonpGetSysMessages.makeRequest({archiveFlag: this.$.showArchivedCheckbox.getChecked()});
    }
    // Display system messages
    , loadSystemMessagesUserScreen: function(inSender, inEvent) {
        this.$.systemMessageList.setItems(inEvent);
        return true;
    }
    , setupRow: function(inSender, inEvent) {
        inEvent.template={components: [
          { kind: "FittableColumns", components: [
              {content: "Created: ", classes:'list-item-margin bold-text'}
            , {content: inEvent.context.createDate}
          ]}
          , { kind: "FittableColumns", components: [
              {content: "Subject: ", classes:'list-item-margin bold-text'}
              , {content: inEvent.context.subject}
              , {content: "Message: ", classes:'list-item-margin bold-text'}
              , {content: inEvent.context.message}
            ]}
            , {kind: "onyx.Button", content: "Archive", ontap: 'archiveMessage', id: 'archiveMessage_'+inEvent.context._id, owner: this, classes:'list-item-margin'}
        ]};
    }
    , archiveMessage: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('archiveMessage_') + ("archiveMessage_").length)).trim();
        // archive the system message
        var ajaxArchiveSysMessage = new AJAX.ArchiveSystemMessage({owner:this, fireEvent:'onGetSystemMessagesUserScreen'});
        ajaxArchiveSysMessage.makeRequest({systemMessageId: objId});
    }
  });
});
















