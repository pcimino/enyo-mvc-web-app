/**
* This is the AdminUpdateUserContent for Administrators
*
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.AdminUpdateUserContent"
    , kind: "Bootplate.ParentContent"
    , id: 'adminUpdateUserContent'
    , authFlag: true // used to help determine if user has access to this page
    , handlers: {

    }
    , published: {

    }
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupBodyContent: function(owner) {
        this.insertFormSpace(owner);


        this.insertBreak(owner);
        owner.createComponent(
          { kind: "onyx.Button",
           content: "Update",
           classes: "onyx-blue form-field-left-margin",
           owner: owner,
           handlers: {
             onclick: 'updateUser'
           },
           updateUser: function() {
             mvcApp.waterfall('onUserUpdate');
             return true;
           }
          }
        );

        owner.render();
      } // end setupBodyContent
  });
});















