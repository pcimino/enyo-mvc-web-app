/**
* AdminUserManagementContent
*
* - setupBodyContent() Implemented setup method
*/
enyo.ready(function () {
  enyo.kind({
    name: "Bootplate.AdminUserManagementContent"
    , kind: "Bootplate.ParentContent"
    , id: 'adminUserManagementContent'
    , authFlag: true // used to help determine if user has access to this page
    , bindings: [

    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
        if (!mvcApp.adminFlag) {
          mvcApp.controllers.routes.trigger({location:'/home'});
        }
        // populate the list
    }
    , setupBodyContent: function(owner) {
        this.insertFormSpace(owner);

        this.insertInternalLink(owner, 'updateUserInfo', 'Update User');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'home', 'Home');
        this.insertBreak(owner);
        this.insertInternalLink(owner, 'logout', 'Logout');

        owner.render();
      } // end setupBodyContent
  });
});










