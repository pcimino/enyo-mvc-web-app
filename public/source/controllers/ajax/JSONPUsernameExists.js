enyo.kind({
  name: 'JSONP.UsernameExists'
    , kind: 'JSONP.Parent'
    , rest:'/api/v1/user/username/exists'
    , processError: function(inSender, inResponse) {
        this.inherited(arguments);
        console.log('JSONP.UsernameExists processError');
        if (this.fireEvent) {
          this.owner.bubble(this.fireEvent, {dbAvailable: false});
        }
      }
    , constructor: function (props) {
        this.inherited(arguments);
    }
    , processResponse: function(inSender, inResponse) {
        this.inherited(arguments);
        console.log('JSONP.UsernameExists processResponse ');
        this.owner.bubble(this.fireEvent, {exists: false, message: 'Username is available.'});
        console.log(JSON.stringify(inResponse, null, 2));
     }
});