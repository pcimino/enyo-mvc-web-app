enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.DeleteUserContent"
    , kind: "Bootplate.ParentContent"
    , id: 'deleteUserContent'
    , bindings: [

    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserList', 'Search For Users');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'updateUserInfo', 'Update User');

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'home', 'Home');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
    } // end setupBodyContent
  });
});
