
/**
* ArchiveTermsAndConditions AJAX requests: mark a T&C message as archived
* takes parameter termsAndConditionsId
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.ArchiveTermsAndConditions',
  kind: 'AJAX.Parent',
  method:'DELETE',
  rest:'/api/v1/terms'
});



