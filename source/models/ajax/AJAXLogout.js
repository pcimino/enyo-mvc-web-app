
/**
* Logout Ajax GET request to invalidate session
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.Logout',
  kind: 'AJAX.Parent',
  method:'GET',
  rest:'/api/v1/session/logout'
});



