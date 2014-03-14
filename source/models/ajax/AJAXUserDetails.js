
/**
* UserDetails AJAX requests: Retrieve the user details
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.UserDetails',
  kind: 'AJAX.Parent',
  method:'GET',
  rest:'/api/v1/user',
  processResponse: function(inSender, inResponse) {
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, {response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
  }
});






