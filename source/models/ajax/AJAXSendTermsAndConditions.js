

/**
* SendTermsAndConditions AJAX requests: create a T&C message
* takes parameters subject & message
*/
enyo.kind({
  name: 'AJAX.SendTermsAndConditions',
  kind: 'AJAX.Parent',
  method:'POST',
  rest:'/api/v1/terms'
});



