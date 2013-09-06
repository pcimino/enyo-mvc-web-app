// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control
enyo.kind({
  name: 'Bootplate.PublicView'
  , kind: "Bootplate.ParentView"
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
      mvcApp.waterfall('onCheckDB');
      mvcApp.waterfall('onIsUserValidated');
  }
  , setupHeaderContent: function() {
      if (this.$.headerContainer) this.$.headerContainer.destroy();
      this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.PublicHeaderView'});
  }
  , setupBodyContent: function() {
      this.inherited(arguments);
      var pageContainer = this.createComponent({name:'pageContainer', fit: true, classes: "enyo-center container-height", owner: this});

      var navigation = this.header.createComponent({name:'topNav', kind: 'Bootplate.PublicNavigation', owner: this});
      navigation.setupTopNav(pageContainer);
      navigation.setupLeftNav(pageContainer);

      var bodyContainer = pageContainer.createComponent({name:'bodyContainer', fit: true, classes: "body-height enyo-center", owner: this});


      var bodyContent = bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.LoginContent'});
      bodyContent.setupBodyContent(bodyContainer);

      navigation.setupRightNav(pageContainer);
      navigation.setupBottomNav(pageContainer);
  }
  , setupFooterContent: function() {
      if (this.$.footerContainer) this.$.footerContainer.destroy();
      this.footer = this.createComponent({name: 'footerContainer', kind: 'Bootplate.PublicFooterView', owner: this});

      // TODO need a better way to add bottom nav
      // var navigation = this.footer.createComponent({name:'bottomNav', kind: 'Bootplate.PublicNavigation', addBefore:null});
      // navigation.setupBottomNav(this.footer);
  }
});






