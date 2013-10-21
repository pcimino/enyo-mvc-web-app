/**
* EmailExists Ajax GET used to see if the email already exists
* parameter email
*/
enyo.kind({
  name: 'AJAX.EmailExists'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/user/email/exists'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      this.owner.bubble(this.fireEvent, {exists: false, response: inSender.xhrResponse, message: 'Email is available.'});
  }
  , processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {exists: true, response: inSender.xhrResponse, response: inResponse, message: 'Problem checking Email with server.'});
      }
  }
});







