enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.HomeView"
    , kind: "Bootplate.ParentView"
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
        this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthHeaderView'});

        var navigation = this.header.createComponent({name:'topNav', kind: 'Bootplate.AuthNavigation'});
        navigation.setupTopNav(this.header);
    }
    , setupBodyContent: function() {
        this.inherited(arguments);
        this.createComponent({name:'bodyContainer', fit: true, classes: "body-height-auth enyo-center body-margin"});

        this.body = this.$.bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
        this.$.bodyContainer.$.bodyContent.setupBodyContent(this.$.bodyContainer);
    }
    , setupFooterContent: function() {
        if (this.$.footerContainer) this.$.footerContainer.destroy();
        this.footer = this.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthFooterView'});
    }
  });
});



