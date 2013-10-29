// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* MessagePage kind,
* used to create and send messages between users
*
* - setupPageBody() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.MessageCenterPage"
    , kind: "Bootplate.ParentPage"
    , id: 'messagePage'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
    , handlers: {
        onGetTermsAndConditionssUserScreen: 'getTermsAndConditionssUserScreen'
        , onLoadTermsAndConditionssUserScreen: 'loadTermsAndConditionssUserScreen'
    }
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.createComponent(
          { name: "messagingDialog"
            , kind: "Bootplate.MessagingDialog"
            , owner: this
          }
        );
        this.createComponent({content:'Send a New Message', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent({ kind: "onyx.Button"
            , content: "Send a Message"
            , name: "SendNewMessage"
            , classes: "onyx-blue button-link "
            , style: "margin-left:10%; "
            , owner: owner
            , tag: 'a'
            , attributes: {
              href: '#/sendMessage'
            }
        });
        this.insertBreak(owner);

        this.insertBreak(this);

    /////////////////////
    // T&C messages
    /////////////////////
        this.createComponent({content:'Terms & Conditions', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});
        this.createComponent({kind: enyo.Checkbox, name: 'showArchivedCheckbox', onActivate: 'checkboxChanged', content:'Show Archived Messages', style: "margin-left: 10%;margin-bottom: 10px;", owner:this});
        this.createComponent({name: "termsAndConditionsList"
            , kind: "macfja.DynamicList"
            , defaultRowHeight: 20
            , style: "width:80%; margin-left:10%; height: 150px; border: 1px solid grey"
            , onSetupRow: "setupRow"
            , classes:"form-input-box form-top-margin"
            , owner: this
          });
          owner.render();

        // populate the list
        this.getTermsAndConditionssUserScreen();
    } // end setupPageBody
    /////////////////////
    // T&C messages
    /////////////////////
    , checkboxChanged : function() {
        // reload the message list
        this.getTermsAndConditionssUserScreen();
    }
    , getTermsAndConditionssUserScreen: function() {
        // load the system message
        var jsonpGetSysMessages = new JSONP.GetTermsAndConditionss({owner:this, fireEvent:'onLoadTermsAndConditionssUserScreen', errorEvent:'onErrorTermsAndConditionss'});
        jsonpGetSysMessages.makeRequest({archiveFlag: this.$.showArchivedCheckbox.getChecked()});
    }
    // Display system messages
    , loadTermsAndConditionssUserScreen: function(inSender, inEvent) {
        this.$.termsAndConditionsList.setItems(inEvent);
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
        var ajaxArchiveSysMessage = new AJAX.ArchiveTermsAndConditions({owner:this, fireEvent:'onGetTermsAndConditionssUserScreen', errorEvent:'onErrorTermsAndConditionss'});
        ajaxArchiveSysMessage.makeRequest({termsAndConditionsId: objId});
    }
  });
});




















