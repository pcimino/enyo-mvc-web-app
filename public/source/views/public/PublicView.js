// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control

enyo.kind({
  name: 'Bootplate.PublicView'
  , kind: "enyo.FittableRows"
  , classes: "onyx"
  , tag: 'body'
  , fit: true
  , classes: "onyx"
  , dbAvailable: false
  , controller: 'Bootplate.PublicController'
  , create: function() {
    this.inherited(arguments);
    this.setupHeaderContent();
    this.setupBodyContent();
    this.setupFooterContent();
  }
  , bindings: [
      /* Was trying to bind and it did appear to work initially, now broken
      , {
        from: ".mvcApp.controllers.login.dbAvailable",
        to: ".dbAvailable"
      }*/
  ]
  , rendered: function() {
      this.inherited(arguments);
      this.bubble('onCheckDB');
  }
  , dbAvailable: function() {
        // this.$.popupDialog.show();
        // this.$.popupDialog.setMessage("Database is up.");
  }
  , dbNotAvailable: function() {
      this.$.popupDialog.show();
      this.$.popupDialog.setMessage("Database is down.");
  }
    /*, dbAvailableChanged: function() {
     if (this.dbAvailable) {
      alert('dbAvailable bind');
     } else {
       alert('dbNotAvailable bind');
     }
    }*/
  , setupHeaderContent: function() {
      if (this.$.headerContainer) this.$.headerContainer.destroy();
      this.createComponent({name: 'headerContainer', kind: 'Bootplate.PublicHeaderView'});
  }
  , setupBodyContent: function() {
      this.createComponent({name:'popupDialog', kind: "PopupDialog"});
      this.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});

    //new Bootplate.LoginContent({name: "bodyContent"}).renderInto(this.$.bodyContainer);
    this.$.bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
    this.$.bodyContainer.$.bodyContent.setupBodyContent(this.$.bodyContainer);

    /* Alternative
      var content = new Bootplate.LoginContent({name:'bodyContent'});
      content.setupBodyContent(this);
      content.renderInto(this.$.bodyContainer);
    */
  }
  , setupFooterContent: function() {
      if (this.$.footerContainer) this.$.footerContainer.destroy();
      this.createComponent({name: 'footerContainer', kind: 'Bootplate.PublicFooterView'});
  }
});
