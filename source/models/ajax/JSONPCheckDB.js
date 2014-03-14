
/**
* CheckDB JSONP request to check if the database is working
*/
enyo.kind({
  name: 'JSONP.CheckDB',
  kind: 'JSONP.Parent',
  rest:'/db',
  processResponse: function(inSender, inResponse) {
      if (inResponse && inResponse.documents && inResponse.documents[0] && inResponse.documents[0].ok == '1') {
       if (this.fireEvent) {
          this.owner.bubble(this.fireEvent, {dbAvailable: true});
        }
      } else {
        if (this.fireEvent) {
          this.owner.bubble(this.fireEvent, {dbAvailable: false});
        }
      }
  }
});



