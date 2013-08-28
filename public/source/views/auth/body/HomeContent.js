enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.HomeContent"
    , kind: "Bootplate.ParentContent"
    , id: 'homeContent'
    , handlers: {
        onShowAdminOptions: 'showAdminOptions'
        , onHideAdminOptions: 'hideAdminOptions'
    }
    , bindings: [
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , showAdminOptions: function() {
      console.log("showAdminOptions");
        this.$.adminBreak.show();
        this.$.adminUpdateUserLink.show();
    }
    , hideAdminOptions: function() {
      console.log("hideAdminOptions");
        this.$.adminBreak.hide();
        this.$.adminUpdateUserLink.hide();
    }
    , setupBodyContent: function(owner) {
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserList', 'Search For Users');
        this.insertBreak(owner, 'adminBreak');
        this.insertInternalLink(owner, 'updateUserInfo', 'Update User', 'adminUpdateUserLink');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'deleteUser', 'Delete User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
    } // end setupBodyContent
  });
});

