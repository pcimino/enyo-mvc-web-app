/**
* This is the publicly accessible view kind. Upon rendering, fires two events, one to check to see if the
*    database is up and running, the other to see if the user is already logged in. One issue with the mvc bootplate app
*    is using is as an authenticated browser app, a refresh will load the default view and wipe out the browser session data
*    but the user is still logged in, so we check, if authenticated, reload the user data and redirect to the user's hoe page
*
* - setupHeaderContent() sets up the header
* - setupBodyContent() sets up the body
* - setupFooterContent() sets up the footer
*/
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
      this.inherited(arguments);
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
      this.inherited(arguments);
      if (this.$.footerContainer) this.$.footerContainer.destroy();
      this.footer = this.createComponent({name: 'footerContainer', kind: 'Bootplate.PublicFooterView', owner: this});

      // TODO need a better way to add bottom nav
      // var navigation = this.footer.createComponent({name:'bottomNav', kind: 'Bootplate.PublicNavigation', addBefore:null});
      // navigation.setupBottomNav(this.footer);
  }
});








