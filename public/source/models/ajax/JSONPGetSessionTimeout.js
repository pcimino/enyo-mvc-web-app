/**
* GetSessionTimeout kind: retrieves the session timeout
* Responds with a 200 if successful
*/
enyo.kind({
  name: 'JSONP.GetSessionTimeout'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/timeout'
});




