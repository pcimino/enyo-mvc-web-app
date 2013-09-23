// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* This SystemMessageContent kind, restricted to administrators
* used to create system messages which appear on the home page
*
* - setupBodyContent() Impemented method
*/
var AAA
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.SystemMessageContent"
    , kind: "Bootplate.ParentContent"
    , id: 'systemMessageContent'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
    , handlers: {
       onGetSystemMessagesAdminScreen: 'getSystemMessagesAdminScreen'
      , onLoadSystemMessagesAdminScreen: 'loadSystemMessagesAdminScreen'
    }
    /*
    , components: [
				{content:'System Messages', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;"}
				, {name: "systemMessageList"
          , kind: "macfja.DynamicList"
          , defaultRowHeight: 50
          , style: "width:80%; margin-left:10%; height: 250px; border: 1px solid grey"
          , onSetupRow: "setupRow"
          , onRowTap:"rowTap"
          , classes:"form-input-box form-top-margin"
        }
    ]
    */

    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {
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
          { name: "message",
            kind: "onyx.Input",
            classes:"form-input-box ",
            placeholder: "Message",
            owner: this
            , style: "width:80%; margin-left:10%; "
          }
        );
        this.insertBreak(owner);
        this.createComponent(
          { kind: "onyx.Button",
            content: "Send System Message",
            classes: "onyx-blue ",
            owner: this,
            ontap: 'sendSysMessage'
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
    } // end setupBodyContent
    , checkboxChanged : function() {
        console.log('Checkbox value ' + this.$.showArchivedCheckbox.getChecked());
        // reload the message list
        this.getSystemMessagesAdminScreen();
    }
    , getSystemMessagesAdminScreen: function() {
        // load the system message
        var jsonpGetSysMessages = new JSONP.GetSystemMessages({owner:this, fireEvent:'onLoadSystemMessagesAdminScreen'});
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
          {content: "Created: " + inEvent.context.createDate}
          , {content: "Subject: " + inEvent.context.subject}
          , {content: "Message: " + inEvent.context.message}
          , {kind: "onyx.Button", content: "Archive", ontap: 'archiveMessage', id: 'archiveMessage_'+inEvent.context._id, owner: this}
          , {kind: "onyx.Button", content: "Delete", ontap: 'deleteMessage', name: 'deleteMessage_'+inEvent.context._id, owner: this}
        ]};
    }
    , archiveMessage: function(inSender, inEvent) {
        var objId = (inSender.name.substring(inSender.name.indexOf('archiveMessage_') + ("archiveMessage_").length)).trim();
        // archive the system message
        var ajaxArchiveSysMessage = new AJAX.ArchiveSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen'});
        ajaxArchiveSysMessage.makeRequest({systemMessageId: objId});
    }
    , deleteMessage: function(inSender, inEvent) {
        var objId = (inSender.name.substring(inSender.name.indexOf('deleteMessage_') + ("deleteMessage_").length)).trim();
        // delete the system message
        var ajaxDeleteSysMessage = new AJAX.DeleteSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen'});
        ajaxDeleteSysMessage.makeRequest({systemMessageId: objId});
    }
    , sendSysMessage: function(inSender, inEvent) {
        var subject = this.$.subject.getValue();
        var message = this.$.message.getValue();
        if (subject && subject)
        // archive the system message
        var ajaxSysMessage = new AJAX.SendSystemMessage({owner:this, fireEvent:'onGetSystemMessagesAdminScreen'});
        ajaxSysMessage.makeRequest({subject: subject, message:message });
    }

  });
});









