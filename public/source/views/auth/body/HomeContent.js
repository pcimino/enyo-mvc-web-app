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
        this.$.adminReadUserInfoLink.show();
        this.$.adminReadUserListLink.show();
        this.$.adminUpdateUserLink.show();
        this.$.adminReadUserInfoBreak.show();
        this.$.adminReadUserListBreak.show();
        this.$.adminUpdateUserLink.show();
        this.$.adminDeleteUserLink.show();
    }
    , hideAdminOptions: function() {
      console.log("hideAdminOptions");
        this.$.adminReadUserInfoLink.hide();
        this.$.adminReadUserListLink.hide();
        this.$.adminUpdateUserLink.hide();
        this.$.adminReadUserInfoBreak.hide();
        this.$.adminReadUserListBreak.hide();
        this.$.adminUpdateUserLink.hide();
        this.$.adminDeleteUserLink.hide();
    }
    , setupBodyContent: function(owner) {

        this.insertBreak(owner);
        this.insertInternalLink(owner, 'updateMyUserInfo', 'Update My Info');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'updateMyPassword', 'Update My Password');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        // Administrative links
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'readUserInfo', 'Read User Info', 'adminReadUserInfoLink');
        this.insertBreak(owner, 'adminReadUserInfoBreak');
        this.insertInternalLink(owner, 'readUserList', 'Search For Users', 'adminReadUserListLink');
        this.insertBreak(owner, 'adminReadUserListBreak');
        this.insertInternalLink(owner, 'updateUserInfo', 'Update User', 'adminUpdateUserLink');
        this.insertBreak(owner, 'adminUpdatedUserBreak');
        this.insertInternalLink(owner, 'deleteUser', 'Delete User', 'adminDeleteUserLink');

        owner.render();
    } // end setupBodyContent
  });
});



