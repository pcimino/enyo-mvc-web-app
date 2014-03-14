/**
* Extends the parent, sets the authFlag
*/
enyo.ready(function() {
  enyo.kind({
    name: 'Bootplate.PublicPage'
    , kind: 'Bootplate.ParentPage'
    , id: 'publicPage'
    , published: {
        authFlag: false
    }
  });
});





