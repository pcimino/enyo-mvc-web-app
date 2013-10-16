/**
* UpdateMessageThread AJAX requests: update a Message Thread
* takes parameter messageThreadId
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.UpdateMessageThread'
  , kind: 'AJAX.Parent'
  , method:'PUT'
  , rest:'/api/v1/messageThread'
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.UpdateMessageThread processResponse ');
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, inResponse);
        }
      } else {
        var event = this.fireEvent
        if (this.errorEvent) {
          event = this.errorEvent;
        }
        var messageText = 'Problem contacting the server, please try again later.';
        if (inSender.xhrResponse.message) {
          messageText = inSender.xhrResponse;
        }
        var titleText = ' Problem updating the database.';

        this.owner.bubble(event, {response: inSender.xhrResponse, title: titleText, message: messageText});
      }
      // console.log(JSON.stringify(inResponse, null, 2));
  }
});






