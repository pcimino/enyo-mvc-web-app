/**
* DeleteBetaInvite
* param betaCode
*/
enyo.kind({
  name: 'AJAX.DeleteBetaInvite'
  , kind: 'AJAX.Parent'
  , method:'DELETE'
  , rest:'/api/v1/beta'
});








