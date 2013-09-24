/**
* EmailExists Ajax GET used to see if the email already exists
* parameter email
*/
enyo.kind({
  name: 'AJAX.EmailExists'
  , kind: 'AJAX.Parent'
  , method:'GET'
  , rest:'/api/v1/user/email/exists'
  , constructor: function(props) {
      this.inherited(arguments);
      // properties mapped to published attributes get set
      // console.log(this.fireEvent)
  }
  , processResponse: function(inSender, inResponse) {
      console.log('AJAX.EmailExists processResponse ');
      this.owner.bubble(this.fireEvent, {exists: false, response: inSender.xhrResponse, message: 'Email is available.'});
      //console.log(JSON.stringify(inResponse, null, 2));
  }
  , processError: function(inSender, inResponse) {
      console.log('AJAX.EmailExists processError ' + this.fireEvent);
      if (this.fireEvent) {
        this.owner.bubble(this.fireEvent, {exists: true, response: inSender.xhrResponse, response: inResponse, message: 'Problem checking Email with server.'});
      }
  }
});





