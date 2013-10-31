/**
* UpdateBetaStatus
* param status is true or false
*/
enyo.kind({
  name: 'AJAX.UpdateBetaStatus'
  , kind: 'AJAX.Parent'
  , method:'PUT'
  , rest:'/api/v1/beta'
});










