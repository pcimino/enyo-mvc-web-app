/**
* This kind builds the public footer.
*
*/
enyo.kind({
  name: 'Bootplate.PublicFooterView'
  , kind: "enyo.FittableRows"
  , id: 'footerView'
  , tag: 'footer' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-height footer-width reverse-text", components: [
        {name:'footerLeftPage', content: "public footer left", classes: "footer-mlr footer-mtb"}
        , {name:'footerCenterPage', content: "footer center", fit: true, classes: "footer-mlr footer-mtb"}
        , {name:'footerRightPage', content: "footer right", classes: "footer-mlr footer-mtb"}
      ]}
  ]
  , constructor: function(props) {
      this.inherited(arguments);
  }
  , updateTime: function(timeStr) {
      this.$.footerCenterPage.setPage(timeStr);
  }
  , rendered: function() {
      this.inherited(arguments);
  }
});








