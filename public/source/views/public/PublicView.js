// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control
enyo.kind({
  name: 'Bootplate.PublicView'
  , kind: "Bootplate.ParentView"
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
      this.bubble('onIsUserValidated');
  }
  , setupHeaderContent: function() {
      if (this.$.headerContainer) this.$.headerContainer.destroy();
      this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.PublicHeaderView'});
  }
  , setupBodyContent: function() {
      this.inherited(arguments);
      this.body = this.$.bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
      this.$.bodyContainer.$.bodyContent.setupBodyContent(this.$.bodyContainer);

    /* Alternative
      var content = new Bootplate.LoginContent({name:'bodyContent'});
      content.setupBodyContent(this);
      content.renderInto(this.$.bodyContainer);
    */
  }
  , setupFooterContent: function() {
      if (this.$.footerContainer) this.$.footerContainer.destroy();
      this.footer = this.createComponent({name: 'footerContainer', kind: 'Bootplate.PublicFooterView'});
  }
});
