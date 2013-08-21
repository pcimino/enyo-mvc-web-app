enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.ReadUserInfoContent"
    , kind: "Bootplate.ParentContent"
    , id: 'readUserInfoContent'
    , bindings: [

    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        this.bubble('onIsUserValidated', {auth:true});
    }
    , setupBodyContent: function(owner) {

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserList', 'Search For Users');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'updateUserInfo', 'Update User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'deleteUser', 'Delete User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'home', 'Home');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
      } // end setupBodyContent
  });
});
