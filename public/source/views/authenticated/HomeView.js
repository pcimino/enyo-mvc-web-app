enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.HomeView"
    , kind: "enyo.FittableRows"
    , classes: "onyx"
    , tag: 'body'
    , fit: true
    , classes: "onyx"
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
      this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthenticatedHeaderView'});
    }
    , setupBodyContent: function() {
        this.createComponent({name:'popupDialog', kind: "PopupDialog"});
        this.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});

        this.$.bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
        this.$.bodyContainer.$.bodyContent.setupBodyContent(this.$.bodyContainer);
    }
    , setupFooterContent: function() {
          if (this.$.footerContainer) this.$.footerContainer.destroy();
          this.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthenticatedFooterView'});
    }
  });
});
