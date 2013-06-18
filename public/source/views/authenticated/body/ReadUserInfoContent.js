enyo.ready(function () {
	enyo.kind({
	  name: "Bootplate.ReadUserInfoContent"
    , kind: "Bootplate.ParentContent"
    , id: 'readUserInfoContent'
    , bindings: [

    ]
    , setupBodyContent: function(owner) {
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserList', 'Search For Users');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
      } // end setupBodyContent
  });
});
