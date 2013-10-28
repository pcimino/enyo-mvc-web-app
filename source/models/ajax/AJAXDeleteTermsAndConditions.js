/**
* DeleteTermsAndConditions AJAX requests: mark a T&C message as archived
* takes parameter termsAndConditionsId
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.DeleteTermsAndConditions'
  , kind: 'AJAX.Parent'
  , method:'DELETE'
  , rest:'/api/v1/terms/delete'
});




