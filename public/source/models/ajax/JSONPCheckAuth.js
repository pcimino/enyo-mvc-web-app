/**
* CheckAuthJSONP kind: checks to see if the user is logged in.
* Responds with a 200 if successful
*/
enyo.kind({
  name: 'JSONP.CheckAuth'
  , kind: 'JSONP.Parent'
  , rest:'/api/auth'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {response: '200', username: inResponse.username});
      }
  }
});



