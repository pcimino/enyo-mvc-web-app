enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.LoginController"
		, kind: "Bootplate.PublicParentController"
    , dbAvailable: false
    , data: {}
    , handlers: {
      onCheckDB: 'checkDB'
     }
    // check database connection
    , checkDB: function (inSender, inEvent) {
        var checkDBUrl = this.ajaxBaseURL + ':' + this.ajaxBasePort + '/db';

        var jsonp = new enyo.JsonpRequest({
          url: checkDBUrl,
          method: "GET",
          callbackName: "callback"
        });
        // send parameters the remote service using the 'go()' method
        jsonp.go({});
        // attach responders to the transaction object
        jsonp.response(this, "processResponse");

	    }
	  , processResponse: function(inSender, inResponse) {
        console.log('processResponse');
        if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
          loginApp.view.dbAvailable();
          // this is the right way: Set the value, which the view should be bound to and looking for changes
          this.set("dbAvailable", true);
        } else {
          loginApp.view.dbNotAvailable();
          this.set("dbAvailable", false);
        }
        //console.log(JSON.stringify(inResponse, null, 2));
	   }
	});
});
