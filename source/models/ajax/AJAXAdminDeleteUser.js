
/**
* AdminDeleteUser Ajax DELETE for deleting a new user
*/
enyo.kind({
  name: 'AJAX.AdminDeleteUser',
  kind: 'AJAX.Parent',
  method:'DELETE',
  rest:'/api/v1/admin/user',
  constructor: function(props) {
      this.inherited(arguments);
  },
  processResponse: function(inSender, inResponse) {
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, { response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
  },
  processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'Delete Error', 'Problem deleting this user.');
  }
});









