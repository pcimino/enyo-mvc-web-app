/**
* This is the authenticated view kind.
*
* - setupHeaderPage() sets up the header
* - setupPageBody() sets up the body
* - setupFooterPage() sets up the footer
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.HomeView'
    , kind: 'Bootplate.ParentView'
    , create: function() {
        this.inherited(arguments);
        this.setupHeaderPage();
        this.setupPageBody();
        this.setupFooterPage();
    }
    , handlers: {
        onDisplayTimeout: 'displayTimeout'
        , onGetSessionTimeout: 'getSessionTimeout'
        , onGetSessionTimeoutResult: 'getSessionTimeoutResult'
    }
    , rendered: function() {
        this.inherited(arguments);

        // setup logout timer
        this.getSessionTimeout();
    }
    , setupHeaderPage: function() {
        this.inherited(arguments);
        if (this.$.headerContainer) this.$.headerContainer.destroy();
        this.header = this.createComponent({name: 'headerContainer', kind: 'Bootplate.AuthHeaderView'});
    }
    , setupPageBody: function() {
        this.inherited(arguments);
        this.createComponent(
          { name: "timeoutDialog"
            , kind: "Bootplate.SessionTimeoutDialog"
            , owner: this
          }
        );
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
    , getSessionTimeout: function(inSender, inEvent) {
        clearInterval(mvcApp.sessionIntervalKey);
        mvcApp.sessionIntervalKey = '';
        // load the system message
        var jsonpGetSessionTimeout = new JSONP.GetSessionTimeout({owner:this, fireEvent:'onGetSessionTimeoutResult'});
        jsonpGetSessionTimeout.makeRequest({});
    }
    , getSessionTimeoutResult: function(inSender, inEvent) {
         mvcApp.sessionTimeout = inEvent.timeout;
         mvcApp.sessionTimeRemaining = inEvent.timeout - 60000;
         if (!mvcApp.sessionIntervalKey) {
           clearInterval(mvcApp.sessionIntervalKey);
           mvcApp.sessionIntervalKey = setInterval(function(){ mvcApp.authView.checkRemainingSessionTime() }, mvcApp.sessionCheckInterval);
         }
    }
    , checkRemainingSessionTime: function(inSender, inEvent) {
        mvcApp.sessionTimeRemaining -= mvcApp.sessionCheckInterval;
        if (mvcApp.sessionTimeRemaining <= 60000) {
            clearInterval(mvcApp.sessionIntervalKey);
            this.displayTimeout();
        }
    }
    , displayTimeout: function() {
        this.$.timeoutDialog.show();
        this.$.timeoutDialog.startTimer();
    }
  });
});















