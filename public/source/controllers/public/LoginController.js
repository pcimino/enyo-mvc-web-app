enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.LoginController",
		kind: "Bootplate.PublicParentController",
    autoLoad: true,
    dbAvailable: '',
    data: {},
    handlers: {
      onCheckDB: 'checkDB'
    },
    // check database connection
    checkDB: function (inSender, inEvent) {
      var checkDBUrl = this.ajaxBaseURL + ':' + this.ajaxBasePort + '/db';

      var ajax = new enyo.Ajax({
        url: checkDBUrl,
        method: "GET",
        handleAs: "json",
        contentType: "application/x-www-form-urlencoded"
      });

		  // send parameters the remote service using the 'go()' method
		  ajax.go({});

		  // attach responders to the transaction object
		  ajax.response(this, "processResponse");

		  // handle error
		  ajax.error(this, "processError");

	  },
	  processResponse: function(inSender, inResponse) {
		  console.log('processResponse');
		  console.log(JSON.stringify(inResponse, null, 2));
      //this.waterfallDown('onDbAvailable');
      //loginApp.view.dbAvailable();
      this.set("dbAvailable", true);
	  },
	  processError: function(inSender, inResponse) {
      console.log('processError');
		  console.log(JSON.stringify(inResponse, null, 2));
      //loginApp.view.dbNotAvailable();
      this.set("dbAvailable", false);
	  }
	});
});
