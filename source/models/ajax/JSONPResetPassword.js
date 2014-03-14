
/**
* ResetPassword JSONP request to reset password and send email
*/
enyo.kind({
  name: 'JSONP.ResetPassword',
  kind: 'JSONP.Parent',
  rest:'/api/v1/password/sendNew'
});










