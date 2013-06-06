enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.DeleteUserInfoView",
    kind: "Bootplate.AuthenticatedParentView",
    id: 'loginView',
    tag: 'body', // give it a specific html tag
    classes: "onyx",
    controller: 'Bootplate.DeleteUserInfoController',
    bindings: [
      {
			  from: ".$.username.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  },{
			  from: ".$.password.value",
        to: ".app.controllers.login.data",
			  kind: "enyo.InputBinding"
		  }
    ],
    create: function() {
      this.inherited(arguments);
      this.setupHeaderContent();
      this.setupBodyContent();
      this.setupFooterContent();
    },
    setupBodyContent: function() {
      this.createComponent({name:'bodyContainer', fit: true, classes: "enyo-center body-margin"});
      this.$.bodyContainer.createComponent({ content: "Delete User Info view"});
    }
  });
});
