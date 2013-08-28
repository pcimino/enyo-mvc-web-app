/**
* This ajax checks to see if the user is logged in.
* Responds with a 200 if successful
*/
enyo.kind({
  name: 'JSONP.CheckAuth'
  , kind: 'JSONP.Parent'
  , rest:'/api/auth'
  , constructor: function (props) {
      this.inherited(arguments);
  }
});
