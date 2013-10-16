/**
* GetSystemMessages JSONP request to retrieve admin messages
* (optional) archiveFlag if true includes all
*/
enyo.kind({
  name: 'JSONP.GetSystemMessages'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/systemMessage'
});










