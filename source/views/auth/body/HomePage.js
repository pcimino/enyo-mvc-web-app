/**
* This is the HomePage kind, displays the authenticated user's home page
*
* - setupPageBody() Implemented child method
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.HomePage'
    , kind: 'Bootplate.AuthPage'
    , id: 'homePage'
    // This checks to see if the user is allowed on this page
    , rendered: function() {
        this.inherited(arguments);
    }
    , setupPageBody: function(owner) {
        owner.render();
    } // end setupPageBody
  });
});

















