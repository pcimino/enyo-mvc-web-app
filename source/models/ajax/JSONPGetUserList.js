/**
* GetUserList JSONP request to retrieve admin messages
* (optional) archiveFlag if true includes all
*/
enyo.kind({
  name: 'JSONP.GetUserList'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/userlist'
});





