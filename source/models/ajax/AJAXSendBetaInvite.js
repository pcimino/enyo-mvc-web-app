/**
* SendBetaInvite
* param email
*/
enyo.kind({
  name: 'AJAX.SendBetaInvite'
  , kind: 'AJAX.Parent'
  , method:'POST'
  , rest:'/api/v1/beta'
});








