/**
* Build the authenticated fooer
*/
enyo.kind({
  name: 'Bootplate.AuthFooterView'
  , kind: "enyo.FittableRows"
  , id: 'footerView'
  , tag: 'footer' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-height footer-width reverse-text", components: [
        {name:'footerLeftContent', content: "Auth footer-left", classes: "footer-mlr footer-mtb"},
        {name:'footerCenterContent', content: "Auth footer-center", fit: true, classes: "footer-mlr footer-mtb"},
        {name:'footerRightContent', content: "footer-right", classes: "footer-mlr footer-mtb"}
      ]}
  ]
  , rendered: function() {
      this.inherited(arguments);
      this.startSocket();
  }
  , startSocket: function() {
      if (io) {
        var footerContent = this.$.footerCenterContent;
        var host = mvcApp.wsSocketURL + ":" + mvcApp.wsSocketPort;
        var webSocket = io.connect(host);
        webSocket.on('connect', function() {
          webSocket.on('timestamp', function (data) {
            footerContent.setContent('Server time via web socket: ' + JSON.parse(data));
          });
        });
      }
  }
  , stopSocket: function() {
      this.$.webSocket.emit('close');
  }
});






