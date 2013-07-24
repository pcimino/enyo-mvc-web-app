// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control
enyo.kind({
  name: 'Bootplate.ParentView'
  , kind: "enyo.FittableRows"
  , classes: "onyx"
  , tag: 'body'
  , fit: true
  , classes: "onyx"
  , showMessage: function(messageText) {
      mvcApp.$.popupDialog.showMessage(messageText);

  }
  , setupBodyContent: function() {
      if (!mvcApp.$.popupDialog) {
        this.createComponent({name:'popupDialog', kind: "PopupDialog", owner: mvcApp});
      }
      this.createComponent({name:'bodyContainer', fit: true, classes: "body-height enyo-center body-margin"});
  }
});
