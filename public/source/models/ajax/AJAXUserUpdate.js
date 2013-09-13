/**
* UserUpdate Ajax POST for creating a new user
*/
enyo.kind({
  name: 'AJAX.UserUpdate'
  , kind: 'AJAX.Parent'
  , method:'PUT'
  , rest:'/api/v1/user'
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.UserUpdate processResponse ');
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
      console.log('AJAX.UserUpdate processError');
      if (this.fireEvent) {
        var messageStr = 'Problem updating this user.';
        if (inSender.xhrResponse && inSender.xhrResponse.body) {
          messageStr = JSON.parse(inSender.xhrResponse.body).message;
        }
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, message: messageStr});
      }
  }
});




