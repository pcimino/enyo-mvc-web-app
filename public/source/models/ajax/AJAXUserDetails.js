/**
* UserDetails AJAX requests: Retrieve the user details
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.UserDetails'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/user'
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.UserDetails processResponse ');
      if (inResponse) {
        console.log(JSON.stringify(inResponse))
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, {response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
      // console.log(JSON.stringify(inResponse, null, 2));
  }
});





