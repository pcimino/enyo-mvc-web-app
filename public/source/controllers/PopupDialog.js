/**
* Popup Dialog kind used for displaying modal messages to the user
*
* - messageChanged: function()
* - getValue: function()
* - hidePopup: function()
* - showPopup: function()
* - showMessage: function(messageText)
*/
enyo.kind({
    name: "PopupDialog"
    , kind: onyx.Popup
    , centered: true
    , floating: true
    , modal: true
    , autoDismiss: true
    , style: "text-align: center; color:black;padding: 10px;background: #C9C9C9;"
    , published: {
        messageText: ""
    }
    , components: [
        {name: "message", style: "font-size: 26px; padding: 6px; text-align: center; color:black;"},
        {kind: "onyx.Button", content: "Close", ontap: "hidePopup"} // should be able to do this inline
    ]
    // because popups are lazily created, initialize properties that effect components
    // in componentsReady rather than create.
    , componentsReady: function() {
        this.inherited(arguments);
        this.messageChanged();
    }
    , messageChanged: function() {
        // check to ensure we have this component has been created before updating it.
        if (this.$.message) {
            this.$.message.setContent(this.messageText);
        }
    }
    , getValue: function() {
        return _this.$.input.getValue();
    }
    , hidePopup: function() {
        this.hide();
    }
    , showPopup: function() {
        this.show();
    }
    , showMessage: function(messageText) {
        this.messageText = messageText;
        this.$.message.setContent(this.messageText);
        this.show();
    }
});


