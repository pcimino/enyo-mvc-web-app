/**
* GetBetaStatus JSONP request to retrieve the beta status 
* default is true/false
* If (optional) betaCode is provided, then the BetaInvite object or null is returned
*/
enyo.kind({
  name: 'JSONP.GetBetaStatus'
  , kind: 'JSONP.Parent'
  , rest:'/api/v1/beta'
});





