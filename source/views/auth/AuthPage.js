/**
* Extends the parent, sets the authFlag
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.AuthPage'
    , kind: 'Bootplate.ParentPage'
    , id: 'authPage'
    , published: {
        authFlag: true
    }
  });
});














