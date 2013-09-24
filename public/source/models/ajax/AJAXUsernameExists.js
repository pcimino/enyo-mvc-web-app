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
      // properties mapped to published attributes get set
      // console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.UsernameExists processResponse ');
      this.owner.bubble(this.fireEvent, {exists: false, response: inSender.xhrResponse, message: 'Username is available.'});
      // console.log(JSON.stringify(inResponse, null, 2));
  }
  , processError: function(inSender, inResponse) {
      console.log('AJAX.UsernameExists processError ' + this.fireEvent);
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {exists: true, response: inSender.xhrResponse, response: inResponse, message: 'Problem checking Username with server.'});
      }
  }
});




