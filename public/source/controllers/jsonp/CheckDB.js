enyo.kind({
  name: 'JSONP.CheckDB'
  , kind: 'JSONP.Parent'
	, processError: function(inSender, inResponse) {
      this.inherited(arguments);
      console.log('JSONP.CheckDB processError');
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {dbAvailable: false});
      }
	}
	, processResponse: function(inSender, inResponse) {
      this.inherited(arguments);
      console.log('JSONP.CheckDB processResponse ');
      if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
       if (this.fireEvent) {
          this.owner.bubble(this.fireEvent, {dbAvailable: true});
        }
      } else {
        if (this.fireEvent) {
          this.owner.bubble(this.fireEvent, {dbAvailable: false});
        }
      }
      // console.log(JSON.stringify(inResponse, null, 2));
	}
});