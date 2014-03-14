
/**
* UserUpdate Ajax POST for creating a new user
*/
enyo.kind({
  name: 'AJAX.AdminUserUpdate',
  kind: 'AJAX.Parent',
  method:'PUT',
  rest:'/api/v1/admin/user',
  constructor: function(props) {
      this.inherited(arguments);
  },
  processResponse: function(inSender, inResponse) {
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
  },
  processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        var messageStr = 'Problem updating this user.';
        if (inSender.xhrResponse && inSender.xhrResponse.body) {
          messageStr = JSON.parse(inSender.xhrResponse.body).message;
        }
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, message: messageStr});
      }
  }
});






