/**
* This is the authenticated view kind.
*
* - setupHeaderContent() sets up the header
* - setupBodyContent() sets up the body
* - setupFooterContent() sets up the footer
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.HomeView"
    , kind: "Bootplate.ParentView"
    , create: function() {
        this.inherited(arguments);
        this.setupHeaderContent();
        this.setupBodyContent();
        this.setupFooterContent();
    }
    , setupHeaderContent: function() {
        this.inherited(arguments);
        if (this.$.headerContainer) this.$.headerContainer.destroy();
        this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthHeaderView'});
    }
    , setupBodyContent: function() {
        this.inherited(arguments);
        this.pageContainer = this.createComponent({name:'pageContainer', fit: true, classes: "enyo-center container-height", owner: this});

        this.navigation = this.header.createComponent({name:'topNav', kind: 'Bootplate.AuthNavigation', owner: this});
        this.navigation.setupTopNav(this.pageContainer);
        this.navigation.setupLeftNav(this.pageContainer);

        var bodyContainer = this.pageContainer.createComponent({kind: enyo.Scroller, name:'bodyContainer', fit: true, classes: "body-height enyo-center", owner: this});
        var bodyContent = bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
        bodyContent.setupBodyContent(bodyContainer);

    }
    , setupFooterContent: function() {
        this.inherited(arguments);

        this.navigation.setupRightNav(this.pageContainer);
        this.navigation.setupBottomNav(this.pageContainer);

        if (this.$.footerContainer) this.$.footerContainer.destroy();
        this.footer = this.pageContainer.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthFooterView', owner: this.pageContainer});

    }
  });
});











