enyo.kind({
  name: 'Bootplate.AuthFooterView'
  , kind: "enyo.FittableRows"
  , id: 'footerView'
  , tag: 'footer' // give it a specific html tag
  , classes: "onyx"
  , fit: true
  , components: [
      {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "footer-height fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
        {name:'footerLeftContent', content: "Auth footer-left", classes: "fittable-sample-box fittable-sample-mlr"},
        {name:'footerCenterContent', content: "Auth footer-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
        {name:'footerRightContent', content: "footer-right", classes: "fittable-sample-box fittable-sample-mlr"}
      ]}
  ]
  , rendered: function() {
      this.inherited(arguments);
      console.log(this.footerCenterContent);
  }
});

/*
var socket = new Socket({
  init: {
    on: {
      example: function(data){
        console.log(data);
      },
      example2: function(data){
        console.log(data);
      }
    }
  }
});*/
