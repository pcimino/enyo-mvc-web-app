/**
* AdminDeleteUser Ajax POST for creating a new user
*/
enyo.kind({
  name: 'AJAX.AdminDeleteUser'
  , kind: 'AJAX.Parent'
  , method:'DELETE'
  , rest:'/api/v1/admin/user'
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      // console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.AdminDeleteUser processResponse ');
      if (inResponse) {
       if (this.fireEvent) {
         this.owner.bubble(this.fireEvent, {userdata: inResponse, authenticated: true});
        }
      } else {
        this.owner.bubble(this.fireEvent, { response: inSender.xhrResponse, message: 'Problem contacting the server, please try again later.'});
      }
      // console.log(JSON.stringify(inResponse, null, 2));
  }
  , processError: function(inSender, inResponse) {
      this.processErrorMessage(inSender, inResponse, 'Delete Error', 'Problem deleting this user.');
  }
});







