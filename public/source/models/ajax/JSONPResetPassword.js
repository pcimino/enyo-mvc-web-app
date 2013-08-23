/**
* JSONP request to reset password and send email
*/
enyo.kind({
  name: 'JSONP.ResetPassword'
  , kind: 'AJAX.Parent'
  , rest:'/api/v1/password/sendNew'
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



