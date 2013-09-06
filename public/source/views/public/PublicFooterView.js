
enyo.kind({
  name: 'Bootplate.PublicFooterView'
  , kind: "enyo.FittableRows"
  , id: 'footerView'
  , tag: 'footer' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-height footer-width", components: [
        {name:'footerLeftContent', content: "public footer left", classes: "footer-left"}
        , {name:'footerCenterContent', content: "footer center", fit: true, classes: "footer-center"}
        , {name:'footerRightContent', content: "footer right", classes: "footer-right"}
      ]}
  ]
  , constructor: function (props) {
      this.inherited(arguments);
  }
  , updateTime: function(timeStr) {
      this.$.footerCenterContent.setContent(timeStr);
  }
  , rendered: function() {
      this.inherited(arguments);
    /*
      var host = mvcApp.getWsSocketURL() + ':' + mvcApp.getWsSocketPort();
      var timeSocket = new Socket({address: host, owner: this});

      timeSocket.on('connect', function() {
        timeSocket.on('timestamp', function (data) {
          updateTime(JSON.parse(data));
        });
      });
    */

  }
});




