enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ReadUserListContent"
    , kind: "Bootplate.ParentContent"
    , id: 'readUserListContent'
    , bindings: [

    ]
    , setupBodyContent: function(owner) {
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'updateUserList', 'Update User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
      } // end setupBodyContent
  });
});
