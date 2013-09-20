/**
* GetMessageThreads JSONP request to resend verification email
*/
enyo.kind({
  name: 'JSONP.GetMessageThreads'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/messageThread'
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
        this.owner.bubble(this.fireEvent, {messageThread: inResponse});
      }
  }
});








