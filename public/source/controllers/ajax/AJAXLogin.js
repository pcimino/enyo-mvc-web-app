
enyo.kind({
  name: 'AJAX.Login'
  , kind: 'AJAX.Parent'
  , method:'POST'
  , rest:'/api/v1/session/login'
  , constructor: function (props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , processError: function(inSender, inResponse) {
      console.log('AJAX.Login processError');
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {authenticated: false, message: 'Problem authenticating this username and password.'});
      }
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.Login processResponse ');
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, {authenticated: false, message: 'Problem contacting the server, please try again later.'});
      }
      console.log(JSON.stringify(inResponse, null, 2));
  }

});