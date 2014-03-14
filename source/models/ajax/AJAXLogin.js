
/**
* Login Kind for POST login data
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.Login',
  kind: 'AJAX.Parent',
  method:'POST',
  rest:'/api/v1/session/login',
  constructor: function(props) {
      this.inherited(arguments);
  },
  processResponse: function(inSender, inResponse) {
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {authenticated: true, userdata: inResponse});
        }
      } else {
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
  },
  processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'Login Error', 'Problem authenticating this username and password.');
  }
});





