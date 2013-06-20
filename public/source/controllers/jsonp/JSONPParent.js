enyo.kind({
  name: 'JSONP.Parent'
  , kind: 'enyo.JsonpRequest'
  , autoLoad: true
  , published: {
     ajaxBaseURL: 'http://localhost'
     , ajaxBasePort: '3000'
     , method: ''
     , rest: ''
     , owner: null
     , fireEvent: null
     , url: null
  }
	, constructor: function (props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  // check database connection
  , makeRequest: function (params) {
      console.log('processError ' + JSON.stringify(this.params));
      var checkDBUrl = this.ajaxBaseURL + ':' + this.ajaxBasePort + this.rest;
      this.url = checkDBUrl;
      console.log(checkDBUrl);

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");

      // send parameters the remote service using the 'go()' method
      this.go(params);
	}
	, processError: function(inSender, inResponse) {
      console.log('JSONP.Parent processError');
	}
	, processResponse: function(inSender, inResponse) {
      console.log('JSONP.Parent processResponse');
	}
});