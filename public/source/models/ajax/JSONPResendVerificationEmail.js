/**
* JSONP request to resend verification email
*/
enyo.kind({
  name: 'JSONP.ResendVerificationEmail'
  , kind: 'AJAX.Parent'
  , rest:'/api/v1/verify/resend'
  , constructor: function (props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      this.inherited(arguments);
      console.log('JSONP.ResendVerificationEmail processResponse ');
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, inResponse);
      }
  }
  , processError: function(inSender, inResponse) {
      this.inherited(arguments);
      console.log('JSONP.ResendVerificationEmail processError');
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {email: ''});
      }
  }
});



