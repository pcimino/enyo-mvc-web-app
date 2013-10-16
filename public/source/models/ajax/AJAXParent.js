/**
* Parent for the AJAX requests, provides default success and error handlers
*
* - buildBaseURL() creates the base URL
* - makeRequest() Processes the request
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.Parent'
  , kind: 'enyo.Ajax'
  , handleAs: "json"
  , dataType: "json"
  , contentType:"application/json"
  , url: ''
  , callback: '?'
  , cacheBust: false
  , data: {}
  , xhrFields: {withCredentials : true}
  , published: {
     owner: null
     , fireEvent: null
     , errorEvent: null
  }
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log("AJAX.Parent " + this.fireEvent)
  }
  , makeRequest: function(params) {
      console.log('AJAX.Parent makeRequest ' + JSON.stringify(params));
      this.url = this.buildBaseURL() + this.rest;

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      if (this.method == 'GET') {
        this.data = params;
      } else {
        this.postBody = JSON.stringify(params);
      }
      this.go(this.data);
  }
  , buildBaseURL: function() {
      return mvcApp.getAjaxBaseURL() + ':' + mvcApp.getAjaxBasePort();
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








