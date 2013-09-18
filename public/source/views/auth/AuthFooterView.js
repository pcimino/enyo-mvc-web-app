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
  , webSocket: {}
  , components: [
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-height fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
        {name:'footerLeftContent', content: "Auth footer-left", classes: "fittable-sample-box fittable-sample-mlr"},
        {name:'footerCenterContent', content: "Auth footer-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
        {name:'footerRightContent', content: "footer-right", classes: "fittable-sample-box fittable-sample-mlr"}
      ]}
  ]
  , rendered: function() {
      this.inherited(arguments);
      this.startSocket();
  }
  , startSocket: function() {
      if (io) {
        var host = mvcApp.wsSocketURL + ":" + mvcApp.wsSocketPort;
        this.$.webSocket = io.connect(host);
        this.$.webSocket.on('connect', function() {
          this.$.webSocket.on('timestamp', function (data) {
            this.$.footerCenterContent.content = JSON.parse(data);
          });
        });
      }
  }
  , stopSocket: function() {
      this.$.webSocket.emit('close');
  }
});




