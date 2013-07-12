enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.HomeView"
    , kind: "Bootplate.ParentView"
    , controller: 'Bootplate.HomeController'
    , bindings: [

    ]
    , create: function() {
      this.inherited(arguments);
      this.setupHeaderContent();
      this.setupBodyContent();
      this.setupFooterContent();
    }
    , setupHeaderContent: function() {
      if (this.$.headerContainer) this.$.headerContainer.destroy();
      this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthHeaderView'});
    }
    , setupBodyContent: function() {
        this.inherited(arguments);
        this.$.bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
        this.$.bodyContainer.$.bodyContent.setupBodyContent(this.$.bodyContainer);
    }
    , setupFooterContent: function() {
          if (this.$.footerContainer) this.$.footerContainer.destroy();
          this.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthFooterView'});
    }
  });
});
