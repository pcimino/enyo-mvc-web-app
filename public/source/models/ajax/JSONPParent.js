/**
* Parent for the JSONP requests, provides default success and error handlers
*
* - buildBaseURL() creates the base URL
* - makeRequest() Processes the request
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'JSONP.Parent'
  , kind: 'enyo.JsonpRequest'
  , autoLoad: true
  , published: {
     owner: null
     , fireEvent: null
     , errorEvent: null
     , url: null
  }
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      // console.log(this.fireEvent)
  }
  , buildBaseURL: function() {
      return mvcApp.getAjaxBaseURL() + ':' + mvcApp.getAjaxBasePort();
  }
  // check database connection
  , makeRequest: function(params) {
      this.url = this.buildBaseURL() + this.rest;

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      // sending this in the body and on the URI
      this.go(params);
  }
  , processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        if (inResponse) {
          this.owner.bubble(this.fireEvent, inResponse);
        } else {
          this.owner.bubble(this.fireEvent, inSender.xhrResponse);
        }
      }
  }
  , processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'System Error', 'System Error');
  }
  , processErrorMessage: function(inSender, inResponse, titleText, messageText) {
      var responseContent = inResponse;
      if (inSender.xhrResponse && inSender.xhrResponse.body) {
        responseContent = inSender.xhrResponse;
        var tmpMessage = JSON.parse(inSender.xhrResponse.body).message;
        if (tmpMessage) messageText = tmpMessage;
      }
      if (this.fireEvent) this.owner.bubble(this.fireEvent, {response: responseContent, title: titleText, message: messageText});
      if (this.errorEvent) this.owner.bubble(this.errorEvent, {response: responseContent, title: titleText, message: messageText});
  }
});











