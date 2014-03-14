

/**
* SendMessage AJAX requests: create a new message thread by sending the first message
* takes parameters for a message thread
*
* - subject
* - message with beginning message
* - fromUserId
* - fromUsername
* - toUserId
* - toUsername
*/
enyo.kind({
  name: 'AJAX.SendMessage',
  kind: 'AJAX.Parent',
  method:'POST',
  rest:'/api/v1/messageThread'
});



