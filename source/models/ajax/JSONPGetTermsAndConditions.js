/**
* GetTermsAndConditions JSONP request to retrieve admin messages
* (optional) archiveFlag if true includes all
*/
enyo.kind({
  name: 'JSONP.GetTermsAndConditions'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/terms'
});











