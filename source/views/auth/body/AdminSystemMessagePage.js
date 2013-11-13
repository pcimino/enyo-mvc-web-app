// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* This AdminSystemMessagePage kind, restricted to administrators
* used to create system messages which appear on the home page
*
* - setupPageBody() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.AdminSystemMessagePage'
    , kind: 'Bootplate.AuthPage'
    , id: 'adminSystemMessagePage'
    , published : {
      listRef:''
    }
    , handlers: {
       onGetSystemMessagesAdminScreen: 'getSystemMessagesAdminScreen'
      , onLoadSystemMessagesAdminScreen: 'loadSystemMessagesAdminScreen'
    }

    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.createComponent({content:'System Messages', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
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
            , content: "Send System Message"
            , classes: "onyx-blue "
            , owner: this
            , ontap: 'sendSysMessage'
            , style: "margin-left:10%; "
          }
        );
      this.insertBreak(this);
      this.insertBreak(this);
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
        this.getSystemMessagesAdminScreen();
    } // end setupPageBody
    , checkboxChanged : function() {
        // reload the message list
        this.getSystemMessagesAdminScreen();
    }
    , getSystemMessagesAdminScreen: function() {
        // clear inputs
        this.$.subject.setValue('');
        this.$.message.setValue('');
        // load the system message
        var jsonpGetSysMessages = new JSONP.GetSystemMessages({owner:this, fireEvent:'onLoadSystemMessagesAdminScreen', errorEvent:'onErrorSystemMessages'});
        jsonpGetSysMessages.makeRequest({archiveFlag: this.$.showArchivedCheckbox.getChecked()});
    }
    // Dsiplay system messages
    , loadSystemMessagesAdminScreen: function(inSender, inEvent) {
        this.$.systemMessageList.setItems(inEvent);
        return true;
    }
    , setupRow: function(inSender, inEvent) {
        inEvent.template="<div style=\"border: 2px solid #000; font-size: 20px; padding: 10px;\">{$label}</div>";
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
            , {kind: "onyx.Button", content: "Archive", ontap: 'archiveMessage', disabled:inEvent.context.archiveFlag, id: 'archiveMessage_'+inEvent.context._id, owner: this, classes:'list-item-margin'}
            , {kind: "onyx.Button", content: "Delete", ontap: 'deleteMessage', name: 'deleteMessage_'+inEvent.context._id, owner: this, classes:'list-item-margin'}
        ]};
    }
    , archiveMessage: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('archiveMessage_') + ("archiveMessage_").length)).trim();
        // archive the system message
        if (objId) {
          var ajaxArchiveSysMessage = new AJAX.ArchiveSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen', errorEvent:'onErrorSystemMessages'});
          ajaxArchiveSysMessage.makeRequest({systemMessageId: objId});
        }
    }
    , deleteMessage: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('deleteMessage_') + ("deleteMessage_").length)).trim();
        // delete the system message
        if (objId) {
          var ajaxDeleteSysMessage = new AJAX.DeleteSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen', errorEvent:'onErrorSystemMessages'});
          ajaxDeleteSysMessage.makeRequest({systemMessageId: objId});
        }
    }
    , sendSysMessage: function(inSender, inEvent) {
        var subject = this.$.subject.getValue();
        var message = this.$.message.getValue();
        if (subject && subject)
        // send the system message
        if (subject && subject.length > 0 && message && message.length > 0) {
          var ajaxSysMessage = new AJAX.SendSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen', errorEvent:'onErrorSystemMessages'});
          ajaxSysMessage.makeRequest({subject: subject, message:message });
        } else {
          mvcApp.showErrorMessage('Missing Data', 'Enter the subject and message before sending.');
        }
    }

  });
});



