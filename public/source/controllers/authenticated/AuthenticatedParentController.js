// Put common navigation methods in here
//
// Enyo 2.x has a Routes class, which is really the way to go, still need to figure that out
// in the mean time the parent has routing methods
enyo.kind({
  name: "Bootplate.AuthenticatedParentController",
  kind: "enyo.Controller",
  autoLoad: true,
  published: {
    ajaxBaseURL: 'http://localhost',
    ajaxBasePort: '3000'
	},
  data: {},
  handlers: {
      onLogin: 'logout'
    , onReadUserInfo: 'readUserInfo'
    , onReadUserList: 'readUserList'
    , onUpdateUserInfo: 'updateUserInfo'
    , onDeleteUser: 'deleteUser'
  },
  // Logout
  logout: function () {
    console.log("logout");
    new Bootplate.LoginApp({name: "loginApp"}).renderInto(document.body);
    console.log("done");
  },
  // ReadUserInfo
  readUserInfo: function () {
    console.log("readUserInfo");
    new Bootplate.ReadUserInfoApp({name: "readUserInfoApp"}).renderInto(document.body);
    console.log("done");
  },
  // ReadUserList
  readUserList: function () {
    console.log("readUserList");
    new Bootplate.ReadUserListApp({name: "readUserListApp"}).renderInto(document.body);
    console.log("done");
  },
  // UpdateUserInfo
  updateUserInfo: function () {
    console.log("updateUserInfo");
    new Bootplate.UpdateUserInfoApp({name: "updateUserInfoApp"}).renderInto(document.body);
    console.log("done");
  },
  // DeleteUser
  deleteUser: function () {
    console.log("deleteUser");
    new Bootplate.DeleteUserApp({name: "deleteUserApp"}).renderInto(document.body);
    console.log("done");
  }
});