enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.UpdateUserInfoView",
    kind: "Bootplate.ParentView",
    id: 'loginView',
    tag: 'body', // give it a specific html tag
    classes: "onyx",
    controller: 'Bootplate.UserSignupController',
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
      this.$.bodyContainer.createComponent({ content: "Update User view"});
    }
  });
});
