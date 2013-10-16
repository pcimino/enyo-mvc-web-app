/**
* ArchiveSystemMessage AJAX requests: mark a system message as archived
* takes parameter systemMessageId
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.ArchiveSystemMessage'
  , kind: 'AJAX.Parent'
  , method:'DELETE'
  , rest:'/api/v1/systemMessage'
});



