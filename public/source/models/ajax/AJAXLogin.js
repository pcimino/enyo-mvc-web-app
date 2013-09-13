/**
* Login Kind for POST login data
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.Login'
  , kind: 'AJAX.Parent'
  , method:'POST'
  , rest:'/api/v1/session/login'
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.Login processResponse ');
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
      console.log(JSON.stringify(inResponse, null, 2));
  }
  , processError: function(inSender, inResponse) {
      console.log('AJAX.Login processError');
      if (this.fireEvent) {
        var messageStr = 'Problem authenticating this username and password.';
        if (inSender.xhrResponse && inSender.xhrResponse.body) {
          messageStr = JSON.parse(inSender.xhrResponse.body).message;
          if (messageStr.length == 0) {
            messageStr = 'Database error, please check that this is not a duplicate Username.';
          }
        };
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, response: inResponse, message: messageStr});
      }
  }
});


