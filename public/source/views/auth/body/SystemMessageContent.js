// http://macfja.github.io/enyo2-lib/onyx/dynamiclist.html

/**
* This SystemMessageContent kind, restricted to administrators
* used to create system messages which appear on the home page
*
* - setupBodyContent() Impemented method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.SystemMessageContent"
    , kind: "Bootplate.ParentContent"
    , id: 'systemMessageContent'
    , authFlag: true // used to help determine if user has access to this page
    , published : {
      listRef:''
    }
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
        this.listRef = owner.createComponent({
          name: "userList"
          , style: "height: 250px; border: 1px solid; width:75%;margin-left:15%;"
          , kind: "enyo.List"
          , classes:"form-input-box form-top-margin"
          , owner: owner
          , handlers: {

          }
        });

        owner.render();
    } // end setupBodyContent
  });
});










