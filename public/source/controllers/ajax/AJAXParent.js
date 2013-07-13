
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

  , published: {
     owner: null
     , fireEvent: null
  }
	, constructor: function (props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      console.log(this.fireEvent)
  }
  , makeRequest: function (params) {
      console.log('AJAX.Parent makeRequest ' + JSON.stringify(params));
      this.url = this.buildBaseURL() + this.rest;

      // attach responders to the transaction object
      this.response(this, "processResponse");
      this.error(this, "processError");
      this.data = params;
      this.postBody = JSON.stringify(params);
      // send parameters the remote service using the 'go()' method
      this.go();
	}
  , buildBaseURL: function() {
    return mvcApp.getAjaxBaseURL() + ':' + mvcApp.getAjaxBasePort();
  }
});
