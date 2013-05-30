// Wanted to extend this like a Java object, but the Components[] have to be recreated every time
// ideally wanted a parent template and then just manipulate the bodyContainer, but no dice
enyo.kind({
  name: 'Bootplate.ParentView',
  kind: "enyo.FittableRows",
  classes: "fittable-sample-box enyo-fit",
  tag: 'body',
  fit: true,
  components: [
    {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
      {name:'headerLeftContent', content: "header-left", classes: "fittable-sample-box fittable-sample-mlr"},
			{name:'headerCenterContent', content: "header-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
			{name:'headerRightContent', content: "header-right", classes: "fittable-sample-box fittable-sample-mlr"}
		]},
    {name:'bodyContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb enyo-center", components: []},
    {name: 'footerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o", components: [
      {name:'footerLeftContent', content: "footer-left", classes: "fittable-sample-box fittable-sample-mlr"},
			{name:'footerCenterContent', content: "footer-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
			{name:'footerRightContent', content: "footer-right", classes: "fittable-sample-box fittable-sample-mlr"},
      {name: 'Bootplate.footerview',kind: 'Bootplate.FooterView'}
		]}
	],
  addBodyContent: function(enyoKindInstance) {
    this.$.bodyContainer.createComponent(enyoKindInstance);
  }
});
