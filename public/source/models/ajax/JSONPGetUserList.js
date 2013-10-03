/**
* GetUserList JSONP request to retrieve admin messages
* (optional) archiveFlag if true includes all
*/
enyo.kind({
  name: 'JSONP.GetUserList'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/userlist'
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , processResponse: function(inSender, inResponse) {
      // console.log("GetUserList " + this.fireEvent + ":" + JSON.stringify(inResponse))
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




