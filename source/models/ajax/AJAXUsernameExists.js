/**
* UsernameExists Ajax GET used to see if the username already exists
* parameter username
*/
enyo.kind({
  name: 'AJAX.UsernameExists'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/user/username/exists'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      this.owner.bubble(this.fireEvent, {exists: false, response: inSender.xhrResponse, message: 'Username is available.'});
  }
  , processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {exists: true, response: inSender.xhrResponse, response: inResponse, message: 'Problem checking Username with server.'});
      }
  }
});




