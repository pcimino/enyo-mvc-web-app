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
      this.url = this.buildBaseURL() + this.rest;
      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      this.go({});
	}
	, processError: function(inSender, inResponse) {
      console.log('JSONP.Parent processError');
	}
	, processResponse: function(inSender, inResponse) {
      console.log('JSONP.Parent processResponse');
	}
});