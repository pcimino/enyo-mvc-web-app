
/**
* Parent for the JSONP requests, provides default success and error handlers
*
* - buildBaseURL() creates the base URL
* - makeRequest() Processes the request
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'JSONP.Parent',
  kind: 'enyo.JsonpRequest',
  autoLoad: true,
  published: {
     owner: null,
     method: 'GET',
     fireEvent: null,
     errorEvent: null,
     url: null
  },
  constructor: function(props) {
      this.inherited(arguments);
      if (mvcApp.debugNetworkCalls) {
        console.log('JSONP.Parent constructor ' + this.method + ":" + this.rest);
        console.log('Properties ', props);
      }
  },
  buildBaseURL: function() {
      return mvcApp.getAjaxBaseURL() + ':' + mvcApp.getAjaxBasePort();
  },
  // check database connection
  makeRequest: function(params) {
      if (mvcApp.debugNetworkCalls) {
        console.log('JSONP.Parent makeRequest ' + this.method + ":" + this.rest);
        console.log('Parameters ' + JSON.stringify(params));
      }

      this.url = this.buildBaseURL() + this.rest;

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      // sending this in the body and on the URI
      this.go(params);
  },
  processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        if (inResponse) {
          this.owner.bubble(this.fireEvent, inResponse);
        } else {
          this.owner.bubble(this.fireEvent, inSender.xhrResponse);
        }
      }
      if (mvcApp.debugNetworkCalls) {
        console.log('JSONP.Parent processResponse ' + this.method + ":" + this.rest);
        console.log(this.fireEvent);
        console.log(this.errorEvent);
        console.log(inResponse);
        console.log(inSender.xhrResponse);
      }
  },
  processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'System Error', 'System Error');
      if (mvcApp.debugNetworkCalls) {
        console.log('JSONP.Parent processError ' + "GET:" + this.rest);
        console.log(inResponse);
        console.log(inSender.xhrResponse);
      }
  },
  processErrorMessage: function(inSender, inResponse, titleText, messageText) {
      var responseContent = inResponse;
      if (inSender.xhrResponse && inSender.xhrResponse.body) {
        responseContent = inSender.xhrResponse;
        var tmpMessage = JSON.parse(inSender.xhrResponse.body).message;
        if (tmpMessage) { messageText = tmpMessage; }
      }
      if (this.fireEvent) { this.owner.bubble(this.fireEvent, {response: responseContent, title: titleText, message: messageText}); }
      if (this.errorEvent) { this.owner.bubble(this.errorEvent, {response: responseContent, title: titleText, message: messageText}); }

      if (mvcApp.debugNetworkCalls) {
        console.log('JSONP.Parent processErrorMessage ' + this.method + ":" + this.rest);
        console.log(this.fireEvent);
        console.log(this.errorEvent);
        console.log('JSONP.Parent processErrorMessage ' + titleText + ":" + messageText);
        console.log(JSON.stringify(responseContent, null, 2));
      }
  }
});

















