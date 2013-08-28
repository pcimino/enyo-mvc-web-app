/**
* JSONP request to resend verification email
*/
enyo.kind({
  name: 'JSONP.ResendVerificationEmail'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/verify/resend'
  , constructor: function (props) {
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





