

/**
* SendSystemMessage AJAX requests: create a system message
* takes parameters subject & message
*/
enyo.kind({
  name: 'AJAX.SendSystemMessage',
  kind: 'AJAX.Parent',
  method:'POST',
  rest:'/api/v1/systemMessage'
});



