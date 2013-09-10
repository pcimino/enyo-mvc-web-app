/**
* This is the parent view for all view kinds
* - showMessage() calls the popup
* - setupHeaderContent() should be implemented by each child
* - setupBodyContent() should be implemented by each child
* - setupFooterContent() should be implemented by each child
*/
enyo.kind({
  name: 'Bootplate.ParentView'
  , kind: "enyo.FittableRows"
  , classes: "onyx"
  , tag: 'body'
  , fit: true
  , classes: "onyx"
  , published : {
      header : {}
    , body: {}
    , footer: {}
  }
  , showMessage: function(messageText) {
      // TODO should this bubble an event?
      mvcApp.$.popupDialog.showMessage(messageText);
  }
  , setupHeaderContent: function() {
  }
  , setupBodyContent: function() {
  }
  , setupFooterContent: function() {
  }
});




