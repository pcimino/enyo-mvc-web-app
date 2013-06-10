enyo.ready(function () {
	enyo.kind({
		name: "Bootplate.UserSignupController",
		kind: "Bootplate.PublicParentController",
		data: {
      username:'',
      password:'',
      vPassword:''
    },
    published: {
      validUsername: false
    },
    handlers: {
      onUserSignup: 'userSignup',
      onCheckUsername: 'checkUsername',
      onCancel: 'cancel'
    },
    // signup
    userSignup: function () {
      console.log('userSignup');
    },
    // CheckUsername
    checkUsername: function () {
      console.log('checkUsername');
        var checkDBUrl = this.ajaxBaseURL + ':' + this.ajaxBasePort + '/api/v1/user/username/exists';

        var jsonp = new enyo.JsonpRequest({
          url: checkDBUrl,
          method: "GET",
          callbackName: "callback"
        });
        // send parameters the remote service using the 'go()' method
      jsonp.go({username:''});
        // attach responders to the transaction object
        jsonp.response(this, "processResponse");
    },
    processResponse: function(inSender, inResponse) {
        console.log('processResponse');
        if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
          loginApp.view.dbAvailable();
          // this is the right way: Set the value, which the view should be bound to and looking for changes
          this.setValidUsername(true);
        } else {
          this.setValidUsername(false);
        }
        console.log(JSON.stringify(inResponse, null, 2));
	   },
    // Cancel
    cancel: function () {
      console.log('cancel');
    }
	});
});

