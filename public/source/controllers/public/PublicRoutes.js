enyo.kind({
	kind: 'Bootplate.Routes'
  , name: 'Bootplate.PublicRoutes'
  , routes: [
    , { path: '/login2',
		    handler: 'login2'
	  }
  ]
	,	loadBodyContent: function (kindByName, renderFlag) {
      if (mvcApp.view && mvcApp.view.$ && mvcApp.view.$.bodyContainer) {
        var owner = mvcApp.view.$.bodyContainer;
        owner.destroyClientControls();
        owner.createComponent({name:'bodyContent', kind: kindByName});
        owner.$.bodyContent.setupBodyContent(owner, renderFlag);
      }
  }
  , login2: function () {
      console.log("login 2 router");
      this.loadBodyContent('Bootplate.LoginContent', true);
  }
});
