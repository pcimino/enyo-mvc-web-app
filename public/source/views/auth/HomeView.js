/**
* This is the authenticated view kind.
*
* - setupHeaderPage() sets up the header
* - setupPageBody() sets up the body
* - setupFooterPage() sets up the footer
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.HomeView"
    , kind: "Bootplate.ParentView"
    , create: function() {
        this.inherited(arguments);
        this.setupHeaderPage();
        this.setupPageBody();
        this.setupFooterPage();
    }
    , setupHeaderPage: function() {
        this.inherited(arguments);
        if (this.$.headerContainer) this.$.headerContainer.destroy();
        this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthHeaderView'});
    }
    , setupPageBody: function() {
        this.inherited(arguments);
        this.pageContainer = this.createComponent({name:'pageContainer', fit: true, classes: "enyo-center container-height", owner: this});

        this.navigation = this.header.createComponent({name:'topNav', kind: 'Bootplate.AuthNavigation', owner: this});
        this.navigation.setupTopNav(this.pageContainer);
        this.navigation.setupLeftNav(this.pageContainer);

        var bodyContainer = this.pageContainer.createComponent({kind: enyo.Scroller, name:'bodyContainer', fit: true, classes: "body-height enyo-center", owner: this});
        var bodyPage = bodyContainer.createComponent({name:'bodyPage', kind: 'Bootplate.HomePage'});
        bodyPage.setupPageBody(bodyContainer);

    }
    , setupFooterPage: function() {
        this.inherited(arguments);

        this.navigation.setupRightNav(this.pageContainer);
        this.navigation.setupBottomNav(this.pageContainer);

        if (this.$.footerContainer) this.$.footerContainer.destroy();
        this.footer = this.pageContainer.createComponent({name: 'footerContainer', kind: 'Bootplate.AuthFooterView', owner: this.pageContainer});
    }
  });
});












