enyo.kind({
  name: 'Bootplate.AuthNavigation'
  , kind: "enyo.Component"
  , create: function() {
      this.inherited(arguments);
  }
  , setupTopNav: function(owner) {
    var topNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'topNavToolbar', owner: owner});
    var adminNavToolbar = owner.createComponent({kind: "onyx.Toolbar", name: 'adminNavToolbar', owner: owner});

    // need to create buttons that behave as links
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Home", classes: "onyx-blue", owner: topNavToolbar,
            handlers: {
              onclick: 'homeButton'
            },
            homeButton: function () {
              console.log("HOME BUTTON");
              mvcApp.controllers.routes.trigger({location:'/home'});
              return true;
            }
          }
    );
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Update My Info", classes: "onyx-blue", owner: topNavToolbar,
            handlers: {
              onclick: 'updateMyUserInfoButton'
            },
            updateMyUserInfoButton: function () {
              console.log("INFO BUTTON");
              mvcApp.controllers.routes.trigger({location:'/updateMyUserInfo'});
              return true;
            }
          }
    );
    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Update My Password", classes: "onyx-blue", owner: topNavToolbar,
            handlers: {
              onclick: 'updateMyPasswordButton'
            },
            updateMyPasswordButton: function () {
              console.log("PASSWORD BUTTON");
              mvcApp.controllers.routes.trigger({location:'/updateMyPassword'});
              return true;
            }
          }
    );

    topNavToolbar.createComponent({ kind: "onyx.Button", content: "Logout", classes: "onyx-blue button-float-right", owner: topNavToolbar,
            handlers: {
              onclick: 'logoutButton'
            },
            logoutButton: function () {console.log("CALLING LOGOUT");
              mvcApp.controllers.routes.trigger({location:'/logout'});
              return true;
            }
          }
    );

    /** Begin Admin navs, need a way to show/hide this*/
    adminNavToolbar.createComponent({ kind: "onyx.Button", content: "Read User Info", classes: "onyx-blue",
            handlers: {
              onclick: 'readUserInfoButton'
            },
            readUserInfoButton: function () {
              mvcApp.controllers.routes.trigger({location:'/readUserInfo'});
              return true;
            }
          }
    );
    adminNavToolbar.createComponent({ kind: "onyx.Button", content: "Search For Users", classes: "onyx-blue",
            handlers: {
              onclick: 'userSearchButton'
            },
            userSearchButton: function () {
              console.log("userSearchButton")
              mvcApp.controllers.routes.trigger({location:'/readUserList'});
              return true;
            }
          }
    );
    adminNavToolbar.createComponent({ kind: "onyx.Button", content: "Delete User", classes: "onyx-blue",
            handlers: {
              onclick: 'deleteUserButton'
            },
            deleteUserButton: function () {
              console.log("deleteUserButton")
              mvcApp.controllers.routes.trigger({location:'/deleteUser'});
              return true;
            }
          }
    );


  }
  , setupLeftNav: function(owner) {
  }
  , setupRightNav: function(owner) {
  }
  , setupBottomNav: function(owner) {
  }
});



