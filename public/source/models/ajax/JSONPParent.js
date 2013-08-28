/**
* Parent for the JSONP requests, provides default success and error handlers
*/
enyo.kind({
  name: 'JSONP.Parent'
  , kind: 'enyo.JsonpRequest'
  , autoLoad: true
  , published: {
     owner: null
     , fireEvent: null
     , url: null
  }
  , constructor: function (props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , buildBaseURL: function() {
    return mvcApp.getAjaxBaseURL() + ':' + mvcApp.getAjaxBasePort();
  }
  // check database connection
  , makeRequest: function (params) {
      this.url = this.buildBaseURL() + this.rest;// + this.buildParams(params);

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      // sending this in the body and on the URI
      this.go(params);
  }
  , processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {response: '200'});
      }
  }
  , processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {response: inResponse});
      }
  }
  , buildParams: function(params) {
    console.log('buildParams')
    console.log(JSON.stringify(params))
      if (params && params.length > 0) {
        return Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
      }
      return "";
  }
});



