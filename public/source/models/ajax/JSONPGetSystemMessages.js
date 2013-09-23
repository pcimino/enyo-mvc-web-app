/**
* GetSystemMessages JSONP request to retrieve admin messages
* (optional) archiveFlag if true includes all
*/
enyo.kind({
  name: 'JSONP.GetSystemMessages'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/systemMessage'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, inResponse);
      }
  }
  , processError: function(inSender, inResponse) {
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {systemMessage: inResponse});
      }
  }
});









