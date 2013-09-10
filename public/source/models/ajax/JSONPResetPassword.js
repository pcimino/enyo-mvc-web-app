/**
* ResetPassword JSONP request to reset password and send email
*/
enyo.kind({
  name: 'JSONP.ResetPassword'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/password/sendNew'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, inResponse);
      }
  }
  , processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {email: ''});
      }
  }
});









