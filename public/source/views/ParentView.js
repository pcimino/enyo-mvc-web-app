// http://enyojs.com/sampler/debug.html
// http://enyojs.com/api/#enyo.Control

enyo.kind({
  name: 'Bootplate.ParentView',
  kind: "enyo.FittableRows",
  classes: "onyx",
  tag: 'body',
  fit: true,
  setupHeaderContent: function() {
    this.createComponent({name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o"});
    this.$.headerContainer.createComponent({name:'headerLeftContent', content: "header-left", classes: "fittable-sample-box fittable-sample-mlr"});
    this.$.headerContainer.createComponent({name:'headerCenterContent', content: "header-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"});
    this.$.headerContainer.createComponent({name:'headerRightContent', content: "header-right", classes: "fittable-sample-box fittable-sample-mlr"});
  },
  setupFooterContent: function() {
    this.createComponent({name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o"});
    this.$.footerContainer.createComponent({name:'footerLeftContent', content: "footer-left", classes: "fittable-sample-box fittable-sample-mlr"});
    this.$.footerContainer.createComponent({name:'footerCenterContent', content: "footer-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"});
    this.$.footerContainer.createComponent({name:'footerRightContent', content: "footer-right", classes: "fittable-sample-box fittable-sample-mlr"});
    this.$.footerContainer.createComponent({name: 'Bootplate.footerview',kind: 'Bootplate.FooterView'});
  }
});
