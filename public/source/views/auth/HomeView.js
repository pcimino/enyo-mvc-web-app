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
        var pageContainer = this.createComponent({name:'pageContainer', fit: true, classes: "enyo-center container-height", owner: this});

        var navigation = this.header.createComponent({name:'topNav', kind: 'Bootplate.AuthNavigation', owner: this});
        navigation.setupTopNav(pageContainer);
        navigation.setupLeftNav(pageContainer);

        var bodyContainer = pageContainer.createComponent({name:'bodyContainer', fit: true, classes: "body-height enyo-center", owner: this});
        var bodyContent = bodyContainer.createComponent({name:'bodyContent', kind: 'Bootplate.HomeContent'});
        bodyContent.setupBodyContent(bodyContainer);

        navigation.setupRightNav(pageContainer);
        navigation.setupBottomNav(pageContainer);
    }
    , setupFooterContent: function() {
        this.inherited(arguments);
        if (this.$.footerContainer) this.$.footerContainer.destroy();
        this.footer = this.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthFooterView'});
    }
  });
});









