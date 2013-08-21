
enyo.kind({
  name: 'AJAX.UserDetails'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/user'
  , constructor: function (props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.UserDetails processResponse ');
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
      console.log('AJAX.UserDetails processError');
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {authenticated: false, response: inSender.xhrResponse, response: inResponse, message: 'Problem authenticating this username and password.'});
      }
  }
});