
enyo.kind({
  name: 'AJAX.Logout'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/session/logout'
  , constructor: function (props) {
      this.inherited(arguments);
  }
  , processError: function(inSender, inResponse) {
      this.owner.bubble(this.fireEvent);
  }
  , processResponse: function(inSender, inResponse) {
      this.owner.bubble(this.fireEvent);
  }
});
