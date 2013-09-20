/**
* This is the HomeContent kind, displays the authenticated user's home page
*
* - setupBodyContent() Implemented child method
*/
enyo.ready(function() {
  enyo.kind({
    name: "Bootplate.HomeContent"
    , kind: "Bootplate.ParentContent"
    , id: 'homeContent'
    , authFlag: true // used to help determine if user has access to this page
    , bindings: [
    ]
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);

        // retrieve system messages
        mvcApp.authView.waterfall('onGetSystemMessages');
    }
    , setupBodyContent: function(owner) {
        owner.render();
    } // end setupBodyContent
  });
});













