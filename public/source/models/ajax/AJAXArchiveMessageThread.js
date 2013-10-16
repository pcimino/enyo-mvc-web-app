/**
* ArchiveMessageThread AJAX requests: mark a system message as archived
* takes parameter messageThreadId
*
* - processResponse()
* - processError()
*/
enyo.kind({
  name: 'AJAX.ArchiveMessageThread'
  , kind: 'AJAX.Parent'
  , method:'DELETE'
  , rest:'/api/v1/messageThread'
});




