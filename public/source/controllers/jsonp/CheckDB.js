enyo.kind({
  name: 'JSONP.CheckDB'
  , kind: 'enyo.JsonpRequest'
  , autoLoad: true
  , published: {
     ajaxBaseURL: 'http://localhost'
     , ajaxBasePort: '3000'
     , method: ''
     , rest: ''
     , params: {}
  }
	, constructor: function (props) {
    this.inherited(arguments);
    if (props) {
      if (props.method) {
        this.method = props.method;
      }
      if (props.rest) {
        this.rest = props.rest;
      }
    }

  }
  // check database connection
  , makeRequest: function (params) {
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
      console.log('processError');
        mvcApp.view.dbNotAvailable();
        mvcApp.$.publicRoutes.trigger({location:'/systemUnavailable'});
	}
	, processResponse: function(inSender, inResponse) {
      console.log('processResponse');
      if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
        mvcApp.view.dbAvailable();
        // this is the right way: Set the value, which the view should be bound to and looking for changes
        //this.set("dbAvailable", true);
      } else {
        mvcApp.view.dbNotAvailable();
        mvcApp.$.publicRoutes.trigger({location:'/systemUnavailable'});
      }
      //console.log(JSON.stringify(inResponse, null, 2));
	}
});