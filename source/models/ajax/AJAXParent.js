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
      if (mvcApp.debugNetworkCalls) {
        console.log('AJAX.Parent constructor ' + this.method + ":" + this.rest);
        console.log('Properties ', props);
      }
  }
  , makeRequest: function(params) {
      if (mvcApp.debugNetworkCalls) {
        console.log('AJAX.Parent makeRequest ' + this.method + ":" + this.rest);
        console.log('Parameters ' + JSON.stringify(params));
      }

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
      if (mvcApp.debugNetworkCalls) {
        console.log('AJAX.Parent processResponse ' + this.method + ":" + this.rest);
        console.log(inResponse);
        console.log(inSender.xhrResponse);
      }
  }
  , processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'System Error', 'System Error');
      if (mvcApp.debugNetworkCalls) {
        console.log('AJAX.Parent processError ' + this.method + ":" + this.rest);
        console.log(inResponse);
        console.log(inSender.xhrResponse);
      }
  }
  , processErrorMessage: function(inSender, inResponse, titleText, messageText) {
      var responseContent = inResponse;
      if (inSender.xhrResponse && inSender.xhrResponse.body) {
        responseContent = inSender.xhrResponse;
        var tmpMessage = JSON.parse(inSender.xhrResponse.body).message;
        if (tmpMessage) messageText = tmpMessage;
      }
      // verify session
      mvcApp.waterfall('onIsUserValidated');

      if (this.fireEvent) this.owner.bubble(this.fireEvent, {response: responseContent, title: titleText, message: messageText});
      if (this.errorEvent) this.owner.bubble(this.errorEvent, {response: responseContent, title: titleText, message: messageText});

      if (mvcApp.debugNetworkCalls) {
        console.log('AJAX.Parent processErrorMessage ' + this.method + ":" + this.rest);
        console.log('AJAX.Parent processErrorMessage ' + titleText + ":" + messageText);
        console.log(JSON.stringify(responseContent, null, 2));
      }
  }
});












