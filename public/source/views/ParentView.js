// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control
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
      mvcApp.$.popupDialog.showMessage(messageText);
  }
  , setupBodyContent: function() {

  }
});

