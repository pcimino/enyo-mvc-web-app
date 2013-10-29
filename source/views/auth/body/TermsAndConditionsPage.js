// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* This TermsAndConditionsPage kind,
*
* - setupPageBody() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.TermsAndConditionsPage"
    , kind: "Bootplate.ParentPage"
    , id: 'termsAndConditionsPage'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
    , handlers: {
       onGetTermsAndConditionsScreen: 'getTermsAndConditionsScreen'
      , onLoadTermsAndConditionsScreen: 'loadTermsAndConditionsScreen'
    }

    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        this.createComponent({content:'Terms & Conditions', style: "margin-left: 10%;margin-bottom: 10px;padding-top: 30px;", owner:this});

        this.insertBreak(this);
        this.createComponent({kind: enyo.Checkbox, name: 'showArchivedCheckbox', onActivate: 'checkboxChanged', content:'Show Accepted T&Cs', style: "margin-left: 10%;margin-bottom: 10px;", owner:this});
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
        this.getTermsAndConditionsScreen();
    } // end setupPageBody
    , checkboxChanged : function() {
        // reload the message list
        this.getTermsAndConditionsScreen();
    }
    , getTermsAndConditionsScreen: function() {
        // load the system message
        var jsonpGetSysMessages = new JSONP.GetTermsAndConditions({owner:this, fireEvent:'onLoadTermsAndConditionsScreen', errorEvent:'onErrorTermsAndConditions'});
        jsonpGetSysMessages.makeRequest({archiveFlag: this.$.showArchivedCheckbox.getChecked()});
    }
    // Dsiplay system messages
    , loadTermsAndConditionsScreen: function(inSender, inEvent) {
        this.$.termsAndConditionsList.setItems(inEvent);
        mvcApp.data.terms = inEvent.length;
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
              , {content: "Accepted on: ", classes:'list-item-margin bold-text'}
              , {content: inEvent.context.acceptedDate}
            ]}
          , {kind: "onyx.Button", content: "Accept", ontap: 'archiveMessage', accepted:inEvent.context.acceptedDate, id: 'archiveMessage_'+inEvent.context._id, owner: this, classes:'list-item-margin'}
        ]};
    }
    , archiveMessage: function(inSender, inEvent) {
        var objId = (inSender.id.substring(inSender.id.indexOf('archiveMessage_') + ("archiveMessage_").length)).trim();
      console.log(objId)
        // archive the system message
        if (objId) {
          if (!inSender.accepted) {
            console.log(1)
          var ajaxArchiveSysMessage = new AJAX.ArchiveTermsAndConditions({owner:this, fireEvent:'onGetTermsAndConditionsScreen', errorEvent:'onErrorTermsAndConditions'});
          ajaxArchiveSysMessage.makeRequest({termsAndConditionsId: objId});
          } else {
            console.log(2)
            this.getTermsAndConditionsScreen();
          }
        }
    }

  });
});





















