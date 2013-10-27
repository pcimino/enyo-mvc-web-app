/**
* CheckAdmin JSONP kind: checks to see if the user is an administrator.
* Responds with a 200 if successful
*/
enyo.kind({
  name: 'JSONP.CheckAdmin'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/roles/access?role=Admin'
});



