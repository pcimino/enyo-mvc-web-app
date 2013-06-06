
enyo.kind({
  name: "Bootplate.PublicHeaderView",
  kind: "enyo.FittableRows",
  id: 'headerView',
  tag: 'header', // give it a specific html tag
  classes: "onyx",
  fit: true,
  components: [
    {name: 'headerContainer', kind: "FittableColumns", fit: true, classes: "fittable-sample-box fittable-sample-mtb fittable-sample-o",
     components: [
       {name:'headerLeftContent', kind: "Image", src: "img/translunar.png"},
       {name:'headerCenterContent', content: "public header-center", fit: true, classes: "fittable-sample-box fittable-sample-mlr fittable-sample-o"},
       {name:'headerRightContent', content: "header-right", classes: "fittable-sample-box fittable-sample-mlr"}
     ]}
  ]
});

